'use client'
import { 
  useEffect,
  useState,
  use
 } from 'react'
import ReactMarkdown from 'react-markdown'
import { createClient } from '@/utils/supabase/client'

const initialState = {user_email: '', title: '', content: '' }

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const supabase = createClient()
  const [post, setPost] = useState(initialState)

  useEffect(() => {
    fetchPost()
    async function fetchPost() {
      if (!id) return
      const { data } = await supabase
        .from('posts')
        .select()
        .filter('uuid', 'eq', id)
        .single()
      setPost(data)
    }
  }, [id])

  return (
    <div>
      <h1 className="text-5xl mt-4 font-semibold tracking-wide">{post.title}</h1>
      <p className="text-sm font-light my-4">by {post.user_email}</p>
      <div className="mt-8">
        <ReactMarkdown className='prose' children={post.content} />
      </div>
    </div>
  ) 
}