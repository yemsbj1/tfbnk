'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { mockAccounts } from '../mockData/MockData';
import Header from '../header/Header';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userAccount = mockAccounts.find(account => account.holder.username === username);
    if (!userAccount) {
      setError('User not found');
      return;
    }
    if (userAccount.holder.password !== password) {
      setError('Invalid password');
      return;
    }
    // Store user data in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(userAccount));
    router.push('/dashboard');
  };

  return (
    <div className="h-screen bg-img relative">
      <Header />
      <div className="p-4 py-0 w-full mt-32 relative z-30">
        <div className="bg-white flex flex-col items-center gap-7 justify-center mx-auto rounded-[5px] p-4 py-6 border">
          {error && <p className="my-3 text-[20px] text-center mx-auto max-w-[200px] rounded-md flex items-center justify-center text-red-600">{error}</p>}

          <Image src="https://i.imgur.com/LCqPoxJ.png" width={210} height={56} className="w-[210px] h-[56px]" alt="logo" />
          <form onSubmit={handleLogin} className="w-full">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={username}
                  placeholder="Username"
                  className="p-4 h-[49px] rounded-md text-[#333333] bg-transparent border border-[#575651] outline-none"
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  className="p-4 h-[49px] rounded-md text-[#333333] bg-transparent border border-[#575651] outline-none"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-2 mt-6">
              <button type="submit" className="p-4 py-3 bg-[#de996f] w-[200px] text-white font-semibold rounded-lg">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="w-full min-h-[70px] flex items-center justify-center absolute bottom-0 z-50 px-[10px] p-[20px]">
        <p className="text-sm text-[#22262A] text-center">© 2025 Citigroup Inc. Member FDIC. All rights reserved.</p>
      </div> */}
    </div>
  );
}
