"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      async () => 
        {
          checkUser()
        }
    )
    checkUser()
    return () => {
      data.subscription.unsubscribe()
    };
  }, [])

  async function checkUser() {
    const {data: {user}} = await supabase.auth.getUser()
    setUser(user)
  }

  return (
    <div className='w-full'>
      <nav className="p-6 border-b border-gray-300">
        <Link href="/posts">
          <span className="mr-6 cursor-pointer">Home</span>
        </Link>
        {
          user && (
            <Link href="/posts/create-post">
              <span className="mr-6 cursor-pointer">Create Post</span>
            </Link>
          )
        }
        {
          user && (
            <Link href="/posts/my-posts">
              <span className="mr-6 cursor-pointer">My Posts</span>
            </Link>
          )
        }
      </nav>
      <div className="py-8 px-16">
        { children }
      </div>
    </div>
  );
}