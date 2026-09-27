import * as React from "react";
import { CircleAlert, HandHelping, Menu, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export interface NavigationSection {
  title: string;
  href: string;
}

export const NAVIGATION: NavigationSection[] = [
  { title: "Home", href: "/" },
  { title: "Browse Items", href: "/browse" },
  { title: "How It Works", href: "/#how-it-works" },
  { title: "About", href: "/#about" },
];

function useIsActive() {
  const { pathname, hash } = useLocation();
  return (href: string) => {
    const [path, anchor] = href.split("#");
    if (anchor) return pathname === (path || "/") && hash === `#${anchor}`;
    return pathname === path && (path !== "/" || hash === "");
  };
}

export function Navbar() {
  const isActive = useIsActive();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/80 shadow-[0_8px_30px_-20px_rgb(15_17_40/0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        onClick={(e) => {
          // With HashRouter a bare "#main" would be treated as a route, so move focus manually.
          e.preventDefault();
          const main = document.getElementById("main");
          main?.focus();
          main?.scrollIntoView();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="container flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Logo />

        <NavigationMenu className="hidden lg:flex" aria-label="Main">
          <NavigationMenuList className="gap-1 space-x-0 rounded-full border border-border/70 bg-background/60 p-1 backdrop-blur">
            {NAVIGATION.map((item) => {
              const active = isActive(item.href);
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild active={active}>
                    <Link
                      to={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                        active && "bg-foreground text-background hover:text-background",
                      )}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden rounded-full xl:inline-flex">
            <Link to="/report?type=lost">
              <CircleAlert className="h-4 w-4" aria-hidden="true" />
              Report Lost
            </Link>
          </Button>
          <Button asChild size="sm" className="hidden rounded-full px-4 sm:inline-flex">
            <Link to="/report?type=found">
              <HandHelping className="h-4 w-4 group-hover/btn:-rotate-12" aria-hidden="true" />
              I Found Something
            </Link>
          </Button>
          <Button asChild variant="outline" size="icon" className="h-9 w-9 rounded-full">
            <Link to="/my-reports" aria-label="Your profile and reports">
              <UserRound className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-full lg:hidden" aria-label="Open menu">
                <Menu className="h-4 w-4" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[86%] flex-col gap-6 border-l-0 bg-background/95 backdrop-blur-xl sm:max-w-sm">
              <SheetHeader className="text-left">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">Main navigation and quick actions</SheetDescription>
                <Logo />
              </SheetHeader>
              <nav aria-label="Mobile" className="grid gap-1">
                {NAVIGATION.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        to={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "rounded-xl px-4 py-3 font-display text-lg font-semibold transition-colors hover:bg-accent",
                          active && "bg-accent text-accent-foreground",
                        )}
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  );
                })}
                <SheetClose asChild>
                  <Link to="/my-reports" className="rounded-xl px-4 py-3 font-display text-lg font-semibold transition-colors hover:bg-accent">
                    My Reports
                  </Link>
                </SheetClose>
              </nav>
              <div className="mt-auto grid gap-2">
                <SheetClose asChild>
                  <Button asChild variant="outline" size="lg" className="rounded-full">
                    <Link to="/report?type=lost">
                      <CircleAlert className="h-4 w-4" aria-hidden="true" /> Report Lost
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild size="lg" className="rounded-full">
                    <Link to="/report?type=found">
                      <HandHelping className="h-4 w-4" aria-hidden="true" /> I Found Something
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
