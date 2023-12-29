import { Links } from "./Links";
import { Logout } from "./logout";
import { ModeToggle } from "./mode-toggle";

export function MainNav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between  px-4 space-x-4 ">
        <Links />
        <ModeToggle />
        <Logout />
      </div>
    </div>
  );
}
