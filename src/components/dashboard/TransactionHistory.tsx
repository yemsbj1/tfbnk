'use client';
import { Account, Transaction } from '@/utils/types';
import React, { useState } from 'react';
import { formatCurrency, formatCurrencyEuro } from '../formatCurrency';
import { HiArrowDown } from 'react-icons/hi';
import Link from 'next/link';

interface TransactionHistoryProps {
  user: Account;
  hideBalance: boolean;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ user, hideBalance }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const hasTransactions = user.transaction_history && user.transaction_history.length > 0;
  const transactionsToShow = showMore ? user.transaction_history : user.transaction_history.slice(0, 5);

  return (
    <div className="px-[16px]">
      <div className="w-full">
        <div className="text-[14px] rounded bg-[#de996f]/10 p-2 w-full font-[500] flex items-center justify-between">
          <span>Recent Transactions</span>
          {hasTransactions && (
            <Link href="/dashboard/transactions" className="text-[13px] font-[500] text-[#de996f]">
              See More
            </Link>
          )}
        </div>

        <div className="mt-[10px]">
          {hasTransactions ? (
            transactionsToShow.map((transaction: Transaction) => (
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
};

export default TransactionHistory;
