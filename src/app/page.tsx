import Image from "next/image";
import Page from "./localization/page";
import { Toaster } from "@/components/ui/toaster";
export default function Home() {
  return (
    <main>
      <Page />
      <Toaster />
    </main>
  );
}
