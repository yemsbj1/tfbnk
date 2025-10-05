"use client"

import React from "react";
import { fMenuLink } from "./data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-100">
      <div className="w-[90%] mx-auto flex items-center justify-between py-[10px] gap-[20px]">
        {fMenuLink.map((link, i) => (
          <Link
            href={link.slug}
            key={i}
            className={`flex flex-col items-center gap-1 ${pathname === link.slug ? "text-[#de996f]" : "text-zinc-600"}`}
          >
            <span className="text-xl">{link.icon}</span>
            <span className="text-[13px]">{link.label}</span>
          </Link>
        ))}
      </div>
    </footer>
  );
}
