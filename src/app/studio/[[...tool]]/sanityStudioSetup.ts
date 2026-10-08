"use client";

import EventSourcePolyfill from "@sanity/eventsource";
import { BufferedDocument } from "@sanity/mutator";

interface PolyfillEvent {
  type: string;
  data?: string;
  lastEventId?: string;
  target?: unknown;
}

interface PolyfillInstance {
  url?: string;
  readyState?: number;
  OPEN?: number;
  CLOSED?: number;
  _close?: () => void;
  close?: () => void;
  dispatchEvent?: (event: PolyfillEvent) => void;
  _sanityFallbackMode?: boolean;
  _sanityOriginalClose?: () => void;
}

const activeFallbackSources = new Set<PolyfillInstance>();
let listenFallbackActive = false;
let initialized = false;

function emitWelcome(es: PolyfillInstance, origDispatchEvent: (event: PolyfillEvent) => void) {
  if (!es._sanityFallbackMode) return;
  es.readyState = 1;
  origDispatchEvent.call(es, {
    type: "welcome",
    data: '{"listenerName":"briticana-studio-fallback"}',
    lastEventId: "",
  });
}

function notifyFallbackListeners(includePairListeners: boolean) {
  const proto = (
    EventSourcePolyfill as unknown as {
      prototype?: { _origDispatchEvent?: (event: PolyfillEvent) => void };
    }
  )?.prototype;
  const origDispatch = proto?._origDispatchEvent;
  if (!origDispatch) return;

  activeFallbackSources.forEach((es) => {
    if (!es._sanityFallbackMode) return;
    const urlStr = String(es.url || "");
    const isPairListener = urlStr.includes("document.pair-listener");
    if (!includePairListeners && isPairListener) {
      return;
    }
    emitWelcome(es, origDispatch);
  });
}

export function installSanityStudioListenFallback(): void {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  try {
    (window as unknown as { EventSource: unknown }).EventSource = EventSourcePolyfill;
  } catch {
    // Ignore if EventSource is non-writable in environment
  }

  const proto = (
    EventSourcePolyfill as unknown as {
      prototype?: {
        dispatchEvent?: (event: PolyfillEvent) => void;
        _origDispatchEvent?: (event: PolyfillEvent) => void;
      };
    }
  )?.prototype;

  if (proto && typeof proto.dispatchEvent === "function" && !proto._origDispatchEvent) {
    const origDispatchEvent = proto.dispatchEvent;
    proto._origDispatchEvent = origDispatchEvent;

    proto.dispatchEvent = function patchedDispatchEvent(this: PolyfillInstance, event: PolyfillEvent) {
      const urlStr = String(this.url || "");
      const isSanityListen = urlStr.includes(".api.sanity.io/") && urlStr.includes("/data/listen/");

      if (isSanityListen) {
        if (event.type === "channelError") {
          listenFallbackActive = true;
          this._sanityFallbackMode = true;

          const internalClose = this._close;
          if (typeof internalClose === "function") {
            this._sanityOriginalClose = internalClose;
            internalClose.call(this);
          }

          this.readyState = 1;
          activeFallbackSources.add(this);

          this.close = () => {
            this._sanityFallbackMode = false;
            activeFallbackSources.delete(this);
            this.readyState = 2;
            if (typeof this._sanityOriginalClose === "function") {
              this._sanityOriginalClose.call(this);
            }
          };

          emitWelcome(this, origDispatchEvent);
          return;
        }

        if (this._sanityFallbackMode && (event.type === "disconnect" || event.type === "error")) {
          this.readyState = 1;
          return;
        }
      }

      return origDispatchEvent.call(this, event);
    };
  }

  const bufferedProto = BufferedDocument?.prototype as unknown as {
    _cycleCommitter?: () => void;
    _origCycleCommitter?: () => void;
  };

  if (bufferedProto && typeof bufferedProto._cycleCommitter === "function" && !bufferedProto._origCycleCommitter) {
    const origCycleCommitter = bufferedProto._cycleCommitter;
    bufferedProto._origCycleCommitter = origCycleCommitter;

    bufferedProto._cycleCommitter = function patchedCycleCommitter(this: {
      commitHandler?: ((arg: {
        mutation: unknown;
        success: () => void;
        failure: () => void;
        cancel: (err: unknown) => void;
      }) => void) & {
        _sanityFallbackWrapped?: boolean;
      };
      document?: {
        submitted?: Array<{ apply?: (doc: unknown) => unknown }>;
        HEAD?: unknown;
        updateConsistencyFlag?: () => void;
        isConsistent?: () => boolean;
      };
      handleDocConsistencyChanged?: (isConsistent: boolean) => void;
    }) {
      if (this.commitHandler && !this.commitHandler._sanityFallbackWrapped) {
        const origCommitHandler = this.commitHandler;
        const wrappedHandler = ((arg: {
          mutation: unknown;
          success: () => void;
          failure: () => void;
          cancel: (err: unknown) => void;
        }) => {
          const origSuccess = arg.success;
          arg.success = () => {
            origSuccess();
            if (listenFallbackActive && this.document) {
              while (Array.isArray(this.document.submitted) && this.document.submitted.length > 0) {
                const mut = this.document.submitted.shift();
                if (mut && typeof mut.apply === "function") {
                  this.document.HEAD = mut.apply(this.document.HEAD);
                }
              }
              this.document.updateConsistencyFlag?.();
              if (typeof this.document.isConsistent === "function") {
                this.handleDocConsistencyChanged?.(this.document.isConsistent());
              }
            }
          };
          return origCommitHandler(arg);
        }) as typeof origCommitHandler;
        wrappedHandler._sanityFallbackWrapped = true;
        this.commitHandler = wrappedHandler;
      }
      return origCycleCommitter.call(this);
    };
  }

  const origFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const urlStr = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const isSanityWrite =
      urlStr.includes(".api.sanity.io/") &&
      (urlStr.includes("/data/mutate/") || urlStr.includes("/data/actions/"));

    let isLifecycleAction = false;
    if (isSanityWrite) {
      const bodyStr = typeof init?.body === "string" ? init.body : "";
      isLifecycleAction =
        urlStr.includes("/data/mutate/") ||
        /sanity\.action\.document\.(publish|delete|unpublish|discard)/.test(bodyStr);
    }

    const response = await origFetch(input, init);

    if (isSanityWrite && response.ok && listenFallbackActive) {
      window.setTimeout(() => notifyFallbackListeners(isLifecycleAction), 150);
      window.setTimeout(() => notifyFallbackListeners(isLifecycleAction), 700);
    }

    return response;
  };
}

installSanityStudioListenFallback();
