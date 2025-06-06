// pages/edit-post/[id].js
'use client'
import { useEffect, useState, ChangeEvent, use } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import { createClient } from '@/utils/supabase/client'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
const initialState = {uuid: '', title: '', content: '' }

function EditPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = createClient();
  const [post, setPost] = useState(initialState)
  const router = useRouter()
  const { id } = use(params)

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
  if (!post) return null

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }

  const { title, content } = post

  async function updateCurrentPost() {
    if (!title || !content) return
    await supabase
      .from('posts')
      .update([
          { title, content }
      ])
      .match({ uuid: id })
    router.push('posts/my-posts')
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Edit post</h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
      <SimpleMDE value={post.content} onChange={value => setPost({ ...post, content: value })} />
      <button
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={updateCurrentPost}>Update Post</button>
    </div>
  )
}

export default EditPost