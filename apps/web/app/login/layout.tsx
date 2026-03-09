import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Login to your account to access the dashboard",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
