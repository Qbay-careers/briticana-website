import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Studio | Briticana",
  description: "Redirecting to Briticana Sanity Studio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  redirect("/studio");
}
