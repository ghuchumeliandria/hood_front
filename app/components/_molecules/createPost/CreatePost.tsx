"use client"

import { axiosInstance } from "@/app/lib/axios-instance"
import { User } from "@/app/types/types"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import LoadingOverlay from "../../_atoms/loadingOverlay/LoadingOverlay"
import Image from "next/image"
import CreatePostForm from "../createPostForm/CreatePostForm"

export default function CreatePost() {
    const [user, setUser] = useState<User | null>(null)
    const token = getCookie("token")
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const FetchUser = async () => {
            try {
                const { data } = await axiosInstance.get<User>("users/profile", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setUser(data)
                setLoading(false)
            } catch (error) {
                setUser(null)
            }

        }
        FetchUser()
    }, [])
    if (loading) return <LoadingOverlay />
    return (
        <div className="w-full  border-2 border-amber-500 rounded-lg mt-3  p-5  bg-white shadow-md">
            <div className="flex items-center gap-3">
                {user?.avatar ? (
                    <Image
                        src={user.avatar}
                        alt="user profile"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
                ) : (
                    <p className="text-gray-500">nothing</p>
                )}
                <span className="font-semibold text-[15px] text-amber-600">{user?.fullname}</span>
            </div>

            <CreatePostForm />

        </div>
    )
}
