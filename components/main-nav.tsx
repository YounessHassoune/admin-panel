import { Links } from "./Links";
import { Logout } from "./logout";
import MobileNav from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";

export function MainNav() {
  return (
    <div className="border-b  w-full sm:w-min">
      <div className="flex h-16 items-center  justify-end sm:justify-between px-4 space-x-4 ">
        <Links />
        <ModeToggle />
        <Logout />
        <MobileNav />
      </div>
    </div>
  );
}
