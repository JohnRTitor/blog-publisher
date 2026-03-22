"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@workspace/ui/components/dropdown-menu";
import { User2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderUserSection() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // While loading, show a minimal placeholder to avoid layout shift
  if (isPending) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <User2Icon className="opacity-50" />
      </Button>
    );
  }

  if (!session) {
    return (
      <Button variant="ghost" size="sm">
        <Link href="/login">Sign in</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" />}>
        <User2Icon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={async () => {
              await signOut();
              router.push("/login");
              router.refresh();
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
