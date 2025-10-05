'use client';

import React, { useEffect, useState, Fragment } from 'react';
import SelectBks from '../dropdown/SelectBks';
import { formatCurrency, formatCurrencyEuro } from '../formatCurrency';
import { Account } from '@/utils/types';
import { generateRandomCode } from './generateRandomCode';
import Link from 'next/link';
import Loader from '../Loader';
import { Dialog, Transition } from '@headlessui/react';
import { getInitials } from '../getInitials';
// import { TelegramSendMessage } from "../TelegramSendMessage";

interface Bks {
  id: number;
  name: string;
}

interface FormErrors {
  routingNumber?: string;
  accountNumber?: string;
  selectedBank?: string;
  amount?: string;
  transCode?: string;
}

export default function Transfer() {
  const [user, setUser] = useState<Account | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    routingNumber: '',
    accountNumber: '',
    selectedBank: null as Bks | null,
    amount: '',
    remark: '',
    transCode: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (step === 3) {
      const code = generateRandomCode();
      setGeneratedCode(code);
      // TelegramSendMessage(`Your transaction code is: ${code}`);
    }
  }, [step]);

  const handleNext = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      if (step === 2 && user) {
        const enteredAmount = parseFloat(formData.amount);
        if (enteredAmount > user.bank_details.balance_usd) {
          setErrors({ amount: 'Insufficient balance' });
          return;
        }
      }
      setStep(step + 1);
    } else {
      setErrors(validationErrors);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? parseFloat(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false); // Stop loading after 5 seconds
        setStep(step + 1); // Proceed to the next step (success message)
      }, 5000); // Simulate loading for 5 seconds
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    const isAccountNumber = !!user?.bank_details.isAccountNumber;

    if (step === 1) {
      if (!formData.routingNumber) {
        errors.routingNumber = 'Routing number is required';
      } else if (formData.routingNumber.length < 9 || formData.routingNumber.length > 12) {
        errors.routingNumber = 'Routing number must be between 9 and 12 digits';
      }

      if (isAccountNumber) {
        if (!formData.accountNumber) {
          errors.accountNumber = 'Account number is required';
        } else if (formData.accountNumber.length < 8 || formData.accountNumber.length > 12) {
          errors.accountNumber = 'Account number must be between 8 and 12 digits';
        }
      }

      if (!formData.selectedBank) errors.selectedBank = 'Bank selection is required';
    } else if (step === 2) {
      if (!formData.amount) errors.amount = 'Amount is required';
    } else if (step === 3) {
      // Only validate transaction code if it exists
      if (user?.transaction_mgs_code.transaction_code && formData.transCode !== user.transaction_mgs_code.transaction_code) {
        errors.transCode = 'Incorrect transaction code';
      }
      // if (formData.transCode !== generatedCode) errors.transCode = "Incorrect transaction code";
    }
    return errors;
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <div>
              <h2 className="text-[#2e2e2e] text-lg font-semibold mb-4">Recipient Account</h2>
              <div className="">
                <input
                  type="number"
                  name="routingNumber"
                  value={formData.routingNumber}
                  onChange={handleChange}
                  placeholder="Routing Number"
                  required
                  className="w-full p-3 my-2 mb-2 min-h-[60px] bg-[#f8f8f8] rounded-lg border-none text-[#2e2e2e] focus:outline-none"
                />
                {errors.routingNumber && <p className="text-red-500 text-sm mb-2">{errors.routingNumber}</p>}
                {user.bank_details.isAccountNumber && (
                  <>
                    <input
                      type="number"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      placeholder="Account Number"
                      required
                      className="w-full p-3 mb-2 min-h-[60px] bg-[#f8f8f8] rounded-lg border-none text-[#2e2e2e] focus:outline-none"
                    />
                    {errors.accountNumber && <p className="text-red-500 text-sm mb-2">{errors.accountNumber}</p>}
                  </>
                )}

                <SelectBks selectedBank={formData.selectedBank} setSelectedBank={bks => setFormData({ ...formData, selectedBank: bks })} />
                {errors.selectedBank && <p className="text-red-500 text-sm mt-2">{errors.selectedBank}</p>}
              </div>
              <div className="flex items-center justify-between gap-20">
                <Link href="/dashboard" className="max-w-max flex items-center justify-center rounded-full mt-4 px-4 min-h-[50px] text-xl bg-[#de996f] text-white">
                  Cancel
                </Link>
                <button type="button" className="w-full rounded-full mt-4 px-4 min-h-[50px] text-xl bg-[#de996f] text-white" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-3">
                <span className="">Transfer From</span>
                <div className="flex gap-2 mt-2">
                  <div className="rounded-lg flex items-center justify-center w-[35px] h-[35px] bg-[#de996f] text-white">{getInitials(user.holder.fullName)}</div>
                  <div className="flex flex-col gap-1">
                    <span className="uppercase">
                      {user.holder.fullName} {user.holder.lastName}
                    </span>
                    <span className="text-sm text-[#303030]">
                      Balance: {user.bank_details.currency === 'euro' ? formatCurrencyEuro(user.bank_details.balance_usd ?? 0) : formatCurrency(user.bank_details.balance_usd ?? 0)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative mb-4">
                  <label htmlFor="" className="text-[#2e2e2e] text-sm">
                    Amount
                  </label>
                  <button className="absolute text-[#888888] w-[50px] min-h-[50px] border-r left-0 text-lg bottom-[2px]">{user.bank_details.currency == 'euro' ? `$` : `€`}</button>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                    className="w-full pl-[60px] p-3 mt-2 min-h-[60px] bg-[#f8f8f8] rounded-lg border-none text-[#2e2e2e] focus:outline-none"
                  />
                </div>
                {errors.amount && <p className="text-red-500 text-sm mb-2">{errors.amount}</p>}
                <label htmlFor="" className="text-[#2e2e2e] text-sm">
                  What's this expense for? (Optional)
                </label>
                <textarea
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  placeholder="Narration"
                  required
                  className="w-full mt-2 border-none bg-[#f8f8f8] rounded-lg p-3 outline-none min-h-[105px] text-[#2e2e2e]"
                />
              </div>
              <div className="flex items-center justify-between gap-20">
                <Link href="/dashboard" className="max-w-max flex items-center justify-center rounded-full mt-4 px-4 min-h-[50px] text-xl bg-[#de996f] text-white">
                  Cancel
                </Link>
                <button type="button" className="w-full rounded-full mt-4 px-4 min-h-[50px] text-xl bg-[#de996f] text-white" onClick={handleNext}>
                  Proceed
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-[14px] text-center text-zinc-700">
                You are about to transfer {user.bank_details.currency === 'euro' ? formatCurrencyEuro(Number(formData.amount)) : formatCurrency(Number(formData.amount))} to&nbsp;
                <span className="uppercase font-[600]">{formData.selectedBank?.name}</span>
                &nbsp;from your&nbsp;
                <span className="font-[500]">CHECKING ACCOUNT</span>
                <br />
              </p>
              <h2 className="text-[#2e2e2e] text-lg hidden mb-4">Please input the code sent to you</h2>
              {user?.transaction_mgs_code.transaction_code && (
                <>
                  <p className="text-[14px] text-center text-zinc-700 my-2 mt-2">To continue, Please input the code sent to you</p>
                  <div className="">
                    <input
                      type="number"
                      name="transCode"
                      value={formData.transCode}
                      onChange={handleChange}
                      placeholder="Input transaction code sent to you"
                      // required
                      className="w-full p-3 my-2 mb-2 min-h-[60px] text-center bg-[#f8f8f8] rounded-lg border-none text-[#2e2e2e] focus:outline-none"
                    />
                    {loading ? '' : errors.transCode && <p className="text-red-500 text-center text-sm">{errors.transCode}</p>}
                  </div>
                </>
              )}

              <div className="flex items-center justify-between gap-20">
                <Link href="/dashboard" className="max-w-max flex items-center justify-center rounded-full mt-4 px-4 min-h-[50px] text-xl bg-[#de996f] text-white">
                  Cancel
                </Link>
                <button type="submit" className="w-full rounded-full mt-4 px-4 min-h-[50px] text-xl bg-[#de996f] text-white">
                  {loading ? 'Loading...' : 'Transfer'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25"></div>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="mt-4">
                          {user.transaction_mgs_code.lastStepText ? (
                            <p className="text-lg font-medium leading-6 text-gray-9000">
                              {user.transaction_mgs_code.headerText}
                              <br />
                              <br />
                              {user.transaction_mgs_code.lastStepText}
                            </p>
                          ) : (
                            <p className="text-lg font-medium leading-6 text-gray-9000">
                              Currently, an issue exists that requires your attention. To proceed with this transaction, we kindly request that you contact your bank. Thank you for your cooperation.
                            </p>
                          )}
                        </div>
                        <div className="mt-4">
                          <Link
                            href="/dashboard"
                            className="flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          >
                            Go Home
                          </Link>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          )}
        </form>
      </div>
    </div>
  );
}
