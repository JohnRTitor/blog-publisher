"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@workspace/ui/lib/utils";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  Users,
  PenSquare,
  Bookmark,
  MessageSquare,
  Menu,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { useState } from "react";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Posts", href: "/posts", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Comments", href: "/comments", icon: MessageSquare },
  { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { name: "Subscribers", href: "/subscribers", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <PenSquare className="h-6 w-6 text-primary" />
        <span className="text-xl font-semibold text-foreground">Blogify</span>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20">
            <span className="text-sm font-medium text-primary">JD</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              John Doe
            </p>
            <p className="truncate text-xs text-muted-foreground">
              john@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden border-r border-border bg-sidebar lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <SidebarContent />
    </aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        }
      />

      <SheetContent side="left" className="w-64 bg-sidebar p-0">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
