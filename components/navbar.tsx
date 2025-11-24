"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  // {
  //   label: "Our Team",
  //   children: [
  //     { label: "Patrons", href: "/patron" },
  //     { label: "All Members", href: "/all-members" },
  //   ],
  // },
  { label: "Our Team", href: "/all-members" },
  { label: "Updates", href: "/updates" },
  { label: "Contact", href: "/contact" },
];

const loginItem: NavItem = { label: "Join Us", href: "/joinUs" };

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href?: string) =>
    href && (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo area */}
        <Link href="/" className="flex items-center gap-5">
          {/* Replace src with your logo */}
          <Image
            src="/logo.svg"
            alt="Association Logo"
            width={80}
            height={80}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-md font-semibold uppercase tracking-[0.14em]">
              National Journalist Association
            </span>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-[0.14em]">
              कलम की ताकत पत्रकारों की आवाज़
            </span>
          </div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-5 text-sm font-medium">
            {navItems.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`inline-flex items-center gap-1 border-b-2 border-transparent pb-1 transition hover:border-primary/60 ${
                          item.children.some((c) => isActive(c.href))
                            ? "border-primary text-primary"
                            : ""
                        }`}
                      >
                        {item.label}
                        <span className="text-[10px]">▾</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.label} asChild>
                          <Link href={child.href}>{child.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href ?? "#"}
                    className={`border-b-2 border-transparent pb-1 text-sm transition hover:border-primary/60 ${
                      isActive(item.href)
                        ? "border-primary text-primary"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Login / Join button */}
          <Button size="sm" asChild className="rounded-full">
            <Link href={loginItem.href ?? "#"}>{loginItem.label}</Link>
          </Button>

          {/* Theme switch */}
          <ModeToggle />
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-3 lg:hidden">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetHeader className="mb-4">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-1 m-4 flex-col gap-4 text-sm font-medium">
                {navItems.map((item) =>
                  item.children ? (
                    <div key={item.label} className="flex flex-col gap-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {item.label}
                      </span>
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={`rounded-md px-2 py-1.5 ${
                            isActive(child.href)
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href ?? "#"}
                      className={`rounded-md px-2 py-1.5 ${
                        isActive(item.href)
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                )}

                <div className="mt-2">
                  <Button className="w-full rounded-full" asChild>
                    <Link href={loginItem.href ?? "#"}>{loginItem.label}</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
