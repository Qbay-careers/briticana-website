import type { ReactNode } from "react";
import Link from "next/link";

import { isInternalAppPath } from "@/lib/studentApplicationForm";

type MarketingCtaLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

/** Internal routes use Next `Link`; external URLs (e.g. Google Forms) use `<a target="_blank">`. */
export default function MarketingCtaLink({ href, className, children, onClick }: MarketingCtaLinkProps) {
  if (isInternalAppPath(href)) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {children}
    </a>
  );
}
