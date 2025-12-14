"use client"
import { axiosInstance } from '@/app/lib/axios-instance'
import { Post } from '@/app/types/types'
import { getCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'
import LoadingOverlay from '../../_atoms/loadingOverlay/LoadingOverlay'
import Image from 'next/image'

export default function FeedPost() {

    const [posts, setPosts] = useState<Post[]>([])
    const token = getCookie("token")
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        const FetchPosts = async () => {
            try {
                const { data } = await axiosInstance.get<Post[]>("/posts/feed", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                setPosts(data)
                setLoading(false)
            } catch (error) {
                setLoading(true)
            }
        }
        FetchPosts()
    }, [])
    console.log(posts)

    if (loading) return <LoadingOverlay />
    return (
        <div className='w-full bg-white p-5 border-2 border-amber-500 rounded-lg shadow-md '>

            {posts.map((el: Post) => (
                <div key={el._id} className="p-5 border-b border-b-amber-500">
                    <div className="flex items-center gap-3">

                        {el?.authorId.avatar ? (
                            <Image
                                src={el.authorId.avatar}
                                alt="user profile"
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <p className="text-gray-500">nothing</p>
                        )}
                        <span className="font-semibold text-[15px] text-amber-600">{el?.authorId.fullname}</span>
                    </div>

                    <h1>{el.title}</h1>
                    <p>{el.content}</p>
                </div>
            ))}
        </div>
    )
}
