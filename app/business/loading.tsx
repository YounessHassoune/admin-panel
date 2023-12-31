import { Spinner } from "@/components/spinner";

export default function Loading() {
  // Yu can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col justify-center m-auto">
     <Spinner className="w-8 h-8 animate-spin" />
    </div>
  );
}
