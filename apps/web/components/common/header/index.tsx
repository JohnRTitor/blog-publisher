import { Button } from "@workspace/ui/components/button";
import { PenLineIcon } from "lucide-react";
import Link from "next/link";
import HeaderUserSection from "./user-section";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Blog Publisher
        </Link>

        <nav className="flex items-center gap-2">
          <HeaderUserSection />
        </nav>
      </div>
    </header>
  );
}
