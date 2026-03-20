"use server";

import { getCurrentSession, signOutAction } from "@/app/actions/session";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@workspace/ui/components/dropdown-menu";
import { PenLineIcon, User2Icon } from "lucide-react";
import Link from "next/link";

export default async function HeaderUserSection() {
  const session = await getCurrentSession();

  if (!session) {
    return (
      <Button variant="ghost" size="sm">
        <Link href="/login">Sign in</Link>
      </Button>
    );
  }

  return (
    <div>
      <Button size="sm">
        <Link href="/dashboard/post" className="flex items-center gap-1.5">
          <PenLineIcon className="size-3.5" />
          Write
        </Link>
      </Button>

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
            <form action={signOutAction}>
              <button type="submit">
                <DropdownMenuItem className="cursor-pointer">
                  Sign out
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
