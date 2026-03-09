import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Page",
  description:
    "Register to start publishing your blogs and sharing your thoughts with the world!",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
