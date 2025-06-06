'use client'
import { useState, ChangeEvent } from 'react'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import { createClient } from '@/utils/supabase/client'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
const initialState = {uuid: '', title: '', content: '' }

function CreatePost() {
  const supabase = createClient();
  const [post, setPost] = useState(initialState)
  const { title, content } = post
  const router = useRouter()

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }

  async function createNewPost() {
    if (!title || !content) return
    const {data: {user}} = await supabase.auth.getUser()
    const uid = uuid()
    post.uuid = uid
    const { data, error } = await supabase
      .from('posts')
      .insert({
          uuid: uid,
          title, 
          content, 
          user_id: user?.id, 
          user_email: user?.email 
        })
        .select()
        .single()
      console.log("inserted post", data)
    router.push(`/posts/${data?.uuid}`)
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6">Create new post</h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
      <SimpleMDE
        value={post.content}
        onChange={value => setPost({ ...post, content: value })}
      />
      <button
        type="button"
        className="mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={createNewPost}
      >Create Post</button>
    </div>
  )
}

export default CreatePost