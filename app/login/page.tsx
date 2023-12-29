import { Metadata } from "next";
import { SignInForm } from "./signin-form";

export const metadata: Metadata = {
  title: "sign-in page",
  description: "logging to your account",
};

export default function SignInPage() {
  return (
    <div className="flex flex-col justify-center m-auto">
      <div className=" flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      </div>
      <SignInForm />
    </div>
  );
}
