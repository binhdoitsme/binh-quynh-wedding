import { Button, Input } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="max-w-md w-full space-y-6 px-4 sm:px-0">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Coming Soon</h1>
          <p className="mt-3 text-muted-foreground">
            Stay tuned for the launch of our exciting new product or service.
            Sign up below to be the first to know when we go live.
          </p>
        </div>
        <form className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1"
          />
          <Button color="primary" type="submit">Subscribe</Button>
        </form>
      </div>
    </div>
  );
}
