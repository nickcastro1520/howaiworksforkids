import type { Metadata } from "next";
import { Certificate } from "@/components/Certificate";

export const metadata: Metadata = {
  title: "Finish line and certificate",
  description: "Finish all 7 lessons to light up Pip's brain and print a certificate. Nothing is saved or sent.",
  alternates: { canonical: "/finish" },
  robots: { index: false, follow: true },
};

export default function FinishPage() {
  return (
    <div className="wrap finish-wrap">
      <Certificate />
    </div>
  );
}
