'use client'
// pages/my-posts.js
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function MyPosts() {
  const supabase = createClient();
  const [posts, setPosts] = useState<any[] | null>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const {data: {user}} = await supabase.auth.getUser()
    if(user) {
      try { 
        const { data } = await supabase
          .from('posts')
          .select('*')
          .filter('user_id', 'eq', user.id)
        setPosts(data)
      } catch (err) {
        setError('Failed to fetch posts')
      } finally {
        setLoading(false);
      }
    }
  }

  async function deletePost(id: string) {
    await supabase
      .from('posts')
      .delete()
      .match({ id })
    fetchPosts()
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">My Posts</h1>
      {
        posts ? (posts.map((post, index) => (
          <div key={index} className="border-b border-gray-300	mt-8 pb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500 mt-2 mb-2">Author: {post.user_email}</p>
            <Link href={`/posts/edit-post/${post.uuid}`}>
              <span className="text-sm mr-4 text-blue-500">Edit Post</span>
            </Link>
            <Link href={`/posts/${post.uuid}`}>
              <span className="text-sm mr-4 text-blue-500">View Post</span>
            </Link>
            <button
              className="text-sm mr-4 text-red-500"
              onClick={() => deletePost(post.uuid)}
            >Delete Post</button>
          </div>
        ))
        ) : (
          <p>No posts found.</p>
        )
      }
    </div>
  )
}