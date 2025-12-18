"use client"
import { axiosInstance } from '@/app/lib/axios-instance'
import { Post } from '@/app/types/types'
import { getCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'
import LoadingOverlay from '../../_atoms/loadingOverlay/LoadingOverlay'
import Image from 'next/image'
import EmptyState from '../../_atoms/emptyState/EmptyState'
import { jwtDecode } from 'jwt-decode'
export default function FeedPost() {
    const [posts, setPosts] = useState<Post[]>([])
    const token = getCookie("token")
    const [loading, setLoading] = useState(true)


    const decoded: any = jwtDecode(token as string);
    const userId = decoded.id;

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
        const interval = setInterval(() => {
            FetchPosts()
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const toggleLike = async (postId: string) => {
        console.log(userId)
        if (!userId) return
        setPosts(prevPosts =>
            prevPosts.map(post => {
                if (post._id === postId) {
                    const isLiked = post.likes.includes(userId!)
                    return {
                        ...post,
                        likes: isLiked
                            ? post.likes.filter(id => id !== userId)
                            : [...post.likes, userId],
                        isLiked: !isLiked
                    }
                }
                return post
            })
        )

        try {
            await axiosInstance.post(`/posts/post-like/${postId}`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log('yleo problemaa')
            setPosts(prevPosts =>
                prevPosts.map(post => {
                    if (post._id === postId) {
                        const isLiked = post.likes.includes(userId!)
                        return {
                            ...post,
                            likes: isLiked
                                ? post.likes.filter(id => id !== userId)
                                : [...post.likes, userId],
                            isLiked: !isLiked
                        }
                    }
                    return post
                })
            )
        }
    }

    if (loading) return <LoadingOverlay />
    return (
        <div className='w-full bg-white p-5 border-2 border-amber-500 rounded-lg shadow-md '>
            {posts.length === 0 ? <EmptyState /> :
                posts.map((el: Post) => (
                    <div key={el._id} className="p-5 border-b border-b-amber-500">
                        <div className="flex justify-between items-center">

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
                            <h1>{new Date(el.createdAt).toLocaleDateString('ka-GE')}</h1>
                        </div>

                        <h1>{el.title}</h1>
                        <div className="flex mt-2 relative">
                            <button
                                onClick={() => toggleLike(el._id)}
                                className={`flex-1 flex items-center gap-2 py-1 px-2 font-semibold transition-all duration-200 rounded cursor-pointer
              ${el.isLiked ? "text-blue-500 hover:bg-blue-200" : "text-amber-600 hover:bg-[#ffb7747d]"}`}
                            >
                                {el.likes.length}
                                <svg
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`w-6 h-6 transition-colors duration-200 ${el.isLiked ? 'text-blue-500' : 'text-amber-500'}`}
                                >
                                    <path
                                        fill="currentColor"
                                        d="M22 11.5c0-2.097-1.228-3.498-3.315-3.498h-2.918c.089-.919.133-1.752.133-2.502 0-1.963-1.81-3.5-3.64-3.5-1.414 0-1.81.81-2.049 2.683-.004.034-.094.762-.125.995-.055.407-.112.77-.182 1.133-.273 1.414-.989 2.944-1.727 3.841a2.317 2.317 0 0 0-.456-.318C7.314 10.116 6.838 10 6.153 10h-.306c-.685 0-1.16.116-1.568.334a2.272 2.272 0 0 0-.945.945c-.218.407-.334.883-.334 1.568v5.306c0 .685.116 1.16.334 1.568.218.407.538.727.945.945.407.218.883.334 1.568.334h.306c.685 0 1.16-.116 1.568-.334.235-.126.441-.286.615-.477.697.525 1.68.811 2.985.811h4.452c1.486 0 2.565-.553 3.253-1.487.284-.384.407-.652.597-1.166a.806.806 0 0 1 .162-.214c.026-.028.11-.112.208-.21.135-.134.296-.295.369-.373.323-.346.576-.69.782-1.103.357-.713.406-1.258.337-2.173-.026-.35-.027-.464-.008-.542.034-.145.075-.265.147-.447l.066-.166c.22-.552.314-.971.314-1.619z"
                                    />
                                </svg>
                                {el.isLiked ? "მოწონებულია" : "მოწონება"}
                            </button>
                            <button className='flex-1 flex gap-2 py-1 px-1 font-semibold text-amber-600 hover:bg-[#ffb7747d] transition-all duration-200 cursor-pointer'>
                                <svg viewBox="0 0 32 32" fill="none" className='w-6' xmlns="http://www.w3.org/2000/svg" stroke="#FFC107"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clipPath="url(#clip0_901_2836)"> <path d="M25.9199 27H7.99988C7.44988 27 6.99988 26.55 6.99988 26V21V8C6.99988 7.45 7.44988 7 7.99988 7H24.9999H29.9999C30.5499 7 30.9999 7.45 30.9999 8V30C30.9999 31 30.5499 31.61 28.9409 30C28.4199 29.48 27.0799 28.16 25.9199 27Z" fill="#FFC44D"></path> <path d="M25 2V7H8C7.45 7 7 7.45 7 8V21H2C1.45 21 1 20.55 1 20V2C1 1.45 1.45 1 2 1H24C24.6 1 25 1.44 25 2Z" fill="#FFE6EA"></path> <path d="M23.875 25C23.875 25 27.937 29 28.937 30C30.547 31.609 31 31 31 30V8C31 7.447 30.553 7 30 7H8C7.447 7 7 7.447 7 8V26C7 26.553 7.447 27 8 27H22M13 15H25M13 19H18M25 4V2C25 1.437 24.604 1 24 1H2C1.447 1 1 1.447 1 2V20C1 20.553 1.447 21 2 21H7" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> <defs> <clipPath id="clip0_901_2836"> <rect width="32" height="32" fill="white"></rect> </clipPath> </defs> </g></svg>
                                კომენტარი</button>
                            <button className='flex-1 flex gap-2 py-1 px-1 font-semibold text-amber-600 hover:bg-[#ffb7747d] transition-all duration-200 cursor-pointer'>
                                <svg viewBox="0 0 1024 1024" className="w-6" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M760.5 568.6l-37-46.9-162.5 128V421.8H449.9v306.3L301.1 606.8l-37.8 46.3 186.6 152.2v128H561V725.9z" fill="#D68231"></path><path d="M301.1 606.8l-37.8 46.4 83.9 68.4c18.5-10.1 32.8-25.8 40.1-44.5l-86.2-70.3zM723.5 521.7l-88 69.3c6.3 19.2 19.9 35.5 37.9 46.3l87.2-68.7-37.1-46.9zM449.9 421.8v187.8c18.2 2.5 36.8 3.8 55.5 3.8 18.8 0 37.3-1.3 55.5-3.8V421.8h-111z" fill=""></path><path d="M207.2 316a298.3 250.7 0 1 0 596.6 0 298.3 250.7 0 1 0-596.6 0Z" fill="#00AD68"></path><path d="M648.4 545.1a93.6 84.8 0 1 0 187.2 0 93.6 84.8 0 1 0-187.2 0Z" fill="#7CDFA8"></path><path d="M188.6 630a93.6 84.8 0 1 0 187.2 0 93.6 84.8 0 1 0-187.2 0Z" fill="#218649"></path><path d="M648.1 921.9c0-10.3-8.4-18.7-18.7-18.7H381.5c-10.3 0-18.7 8.4-18.7 18.7v18.7c0 10.3 8.4 18.7 18.7 18.7h247.9c10.3 0 18.7-8.4 18.7-18.7v-18.7z" fill="#218649"></path><path d="M377.8 391.3c-16.7-16.7-71.2-33.3-73.9-30.5-2.8 2.8 13.8 57.2 30.5 73.9 16.7 16.7 40 20.5 52 8.5 11.9-11.9 8.1-35.2-8.6-51.9z" fill="#7CDFA8"></path><path d="M616.2 414.6c16.7-16.7 33.3-71.2 30.5-73.9-2.8-2.8-57.2 13.8-73.9 30.5-16.7 16.7-20.5 40-8.5 52 11.9 11.9 35.2 8.1 51.9-8.6zM471.1 220.7c0-23.6-26.8-73.9-30.7-73.9-3.9 0-30.7 50.2-30.7 73.9s13.7 42.8 30.7 42.8 30.7-19.2 30.7-42.8z" fill="#218649"></path><path d="M681.1 267.6c16.7-16.7 33.3-71.2 30.5-73.9-2.8-2.8-57.2 13.8-73.9 30.5-16.7 16.7-20.5 40-8.5 52 11.9 11.9 35.2 8.1 51.9-8.6z" fill="#7CDFA8"></path></g></svg>                                პროსტა</button>

                        </div>

                    </div>
                ))
            }
        </div >
    )
}
