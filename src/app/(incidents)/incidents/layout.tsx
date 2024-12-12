import Navbar from '@/components/Navbar';
import { SessionProvider } from 'next-auth/react';
import React from 'react'

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SessionProvider>
        <Navbar />
        {children}
      </SessionProvider>
    </div>
  )
}
