"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Links() {
  const pathname = usePathname();

  return (
    <nav className="hidden sm:flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/dashboard"
        className={
          pathname !== "/dashboard"
            ? "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            : "text-sm font-medium transition-colors hover:text-primary"
        }
      >
        Dashboard
      </Link>
      <Link
        href="/users"
        className={
          pathname !== "/users"
            ? "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            : "text-sm font-medium transition-colors hover:text-primary"
        }
      >
        Users
      </Link>
      <Link
        href="/business"
        className={
          pathname !== "/business"
            ? "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            : "text-sm font-medium transition-colors hover:text-primary"
        }
      >
        Business
      </Link>
    </nav>
  );
}
