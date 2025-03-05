import Link from "next/link";
import { Frown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex h-[80vh] max-w-4xl flex-col items-center justify-center space-y-6 text-center">
      <div className="rounded-full bg-muted p-6">
        <Frown className="h-16 w-16 text-muted-foreground" />
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <h2 className="text-2xl font-semibold">Page not found</h2>
        <p className="text-muted-foreground">
          Sorry, we could not find the page you are looking for.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-3 pt-6">
        <Button asChild variant="default" className="min-w-[200px]">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
