"use client"

import React, { useEffect } from "react";
import { usePathname, redirect } from "next/navigation";

export default function ProtectedRoute({ children }:any) {
  const pathname = usePathname();
  let isAuthenticated = false;

  if (typeof window !== 'undefined') {
    // Check if user is authenticated
    const userData = localStorage.getItem("loggedInUser");
    isAuthenticated = !!userData; // Check if userData exists in localStorage
  }

  useEffect(() => {
    // If user is not authenticated and trying to access a protected route, redirect to login
    if (!isAuthenticated && pathname.startsWith("/dashboard")) {
      redirect("/");
    }

    // If user is authenticated and trying to access the login or signup page, redirect to accounts
    if (isAuthenticated && (pathname === "/")) {
      redirect("/dashboard");
    }
  }, [pathname, isAuthenticated]);

  return <>{children}</>;
}
