"use client";

import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full min-h-[70px] relative z-30 flex items-center justify-center p-[20px] py-2 rounded-t-xl">
      <Image src="https://i.imgur.com/Y8m5rV5.png" width={300} height={69} className="w-[300px] h-[69px]" alt="logo" />
    </div>
  );	
}
