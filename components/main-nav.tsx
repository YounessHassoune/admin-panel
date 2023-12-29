import { Links } from "./Links";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

export function MainNav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between  px-4 space-x-4 ">
        <Links />
        <ModeToggle />
      </div>
    </div>
  );
}
