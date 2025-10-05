'use client';

import { Account, Transaction } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import { HiArrowDown } from 'react-icons/hi';
import { IoIosArrowBack } from 'react-icons/io';
import { formatCurrency, formatCurrencyEuro } from '../formatCurrency';
import Link from 'next/link';

export default function Transactions() {
  const [user, setUser] = useState<Account | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      try {
        const user = JSON.parse(loggedInUser) as Account;
        setUser(user);
      } catch (error) {
        console.error('Error parsing loggedInUser from localStorage', error);
      }
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const hasTransactions = user.transaction_history && user.transaction_history.length > 0;

  return (
    <div className="border w-full bg-[#FAFAF8]">
      <div className="bg-white sticky top-0 z-10 p-3 py-5 flex items-center justify-between gap-1">
        <Link href="/dashboard" className="flex items-center gap-2">
          <IoIosArrowBack />
          <span className="text-[#252525] font-semibold">Transactions</span>
        </Link>
      </div>

      <div className="pt-4">
        <div className="bg-white rounded-lg p-4">
          {hasTransactions ? (
            user.transaction_history.map((transaction: Transaction) => (
              <div key={transaction.transaction_id} className="flex justify-between py-3">
                <div className="flex gap-2 text-gray-800">
                  <button className="border-none flex items-center justify-center outline-none rounded-full w-[35px] h-[35px] bg-[#de996f]/10">
                    <HiArrowDown className={`${transaction.amount_usd < 0 ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="flex flex-col gap-1 justify-between">
                    <span className="text-[14px] uppercase font-[600] w-[150px] xxxs:w-[200px] xs:w-[250px] sm:max-w-full">{transaction.description}</span>
                    <span className="text-[10px] font-medium">{transaction.dateTime}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className={`font-[600] ${transaction.amount_usd < 0 ? 'text-red-600' : ''} ${Math.abs(transaction.amount_usd) >= 1_000_000_000 ? 'text-xs' : 'text-sm'}`}>
                    {user.bank_details.currency == 'euro' ? `${formatCurrencyEuro(transaction.amount_usd)}` : `${formatCurrency(transaction.amount_usd)}`}
                  </span>
                  <span className={`text-xs font-medium ${transaction.status === 'Pending' ? 'text-yellow-500 font-bold' : 'text-green-600'}`}>{transaction.status}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic py-4">No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
