"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export async function getCurrentSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  // Revalidate session tag to force re-render of components using session data
  revalidateTag("session", { expire: 0 });

  redirect("/login");
}
