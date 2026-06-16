import type { ReactNode } from "react";
import Link from "next/link";

import { isInternalAppPath } from "@/lib/studentApplicationForm";

type MarketingCtaLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** Internal routes use Next `Link`; external URLs (e.g. Google Forms) use `<a target="_blank">`. */
export default function MarketingCtaLink({ href, className, children }: MarketingCtaLinkProps) {
  if (isInternalAppPath(href)) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
