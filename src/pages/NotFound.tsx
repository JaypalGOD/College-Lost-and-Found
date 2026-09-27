import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold">This page got lost too.</h1>
      <p className="mt-2 text-muted-foreground">Good thing you know where to look.</p>
      <Button asChild className="mt-6 rounded-full"><Link to="/">Back to home</Link></Button>
    </div>
  );
}
