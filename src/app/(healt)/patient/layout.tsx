import { getUserInfo } from '@/lib/users/getUserInfo';
import { redirect } from 'next/navigation';
import React from 'react'

interface layoutProps {
    children: React.ReactNode
}


export default async function layout({ children }: layoutProps) {
  const user = await getUserInfo();

  if (!user) {
    redirect("/auth/login");
  }

  if (!user.completedProfile) {
    redirect("/welcome");
  }

  return (
    <div className='h-full flex flex-col w-full'>
      {children}
    </div>
  );
}

