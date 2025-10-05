import Image from "next/image";
import React from "react";

export default function Cards() {
  return (
    <div className="p-4">
      <div className="bg-white rounded-lg p-4 px-0 mb-4">
        <div className="card rounded-[20px] p-4 mx-auto max-w-[400px] bg-[#B31E30]">
          <div className="flex flex-col items-end justify-end">
            <Image src="https://i.imgur.com/QqV2zAU.png" width={100} height={100} className="rounded-lg w-[70px]" alt="logo" />
            <p className="text-white">Premium Debit Card</p>
          </div>
          <div className="font-semibold mt-2">
            <div className="flex items-center gap-2">
               <Image src="https://i.imgur.com/XZrYTEk.jpeg" width={100} height={100} className="rounded-lg w-[50px] h-[40px]" alt="cjj" />
               <Image src="https://i.imgur.com/EUguxFO.png" width={100} height={100} className="rounded-lg w-full h-[50px]" alt="cjj" />
            </div>
            <p className="px-0 p-[20px] hidden text-2xl text-white font-semibold">4586 **** **** 6388</p>
          </div>
          <div className="text-lg mt-5 font-semibold text-white">
            <p>Card Holder</p>
            <p>Nikhil Bobade</p>
          </div>
        </div>
      </div>
    </div>
  );
}
