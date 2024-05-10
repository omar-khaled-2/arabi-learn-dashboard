import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import SideBar from "@/components/SideBar";
import { NavbarLink } from "@/components/Navbar";
import Link from "next/link";

const inter = Merriweather({ weight: ["300"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arabi Learn",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div className="flex  h-screen flex-row pt-2 gap-10 ">
      <div className="flex flex-col  justify-center items-center gap-20 w-[400px]">
        <Link className="text-3xl font-thin tracking-widest" href="/dashboard/skills" >
          Skills
        </Link>
        <Link  className="text-3xl font-thin tracking-widest" href="/dashboard/questions" >Questions</Link>
        <Link className="text-3xl font-thin tracking-widest" href="/dashboard/users">Users</Link>

      </div>
      {/* <hr className="w-px h-full" /> */}
      <div className="flex-1 flex mx-10">
        {children}
        </div>
    </div>
  );
}
