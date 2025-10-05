import Transfer from "@/components/dashboard/Transfer";
import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function TransferPage() {
  return (
    <div className="h-screen bg-[#FAFAF8]">
      <div className="bg-[#de996f] text-[#ffffff] sticky top-0 z-10 p-3 py-5 flex items-center justify-between gap-1">
        <Link href="/dashboard" className="flex items-center gap-2">
          <IoIosArrowBack className="relative top-[1px]" />
          <span className="font-semibold">Transfer to Bank Account</span>
        </Link>
        <Link href="/dashboard/transactions" className="text-sm hover:underline underline-offset-4">
          <span className="font-semibold">History</span>
        </Link>
      </div>
      <Transfer />
    </div>
  );
}
