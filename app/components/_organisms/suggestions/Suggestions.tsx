"use client"
import { axiosInstance } from "@/app/lib/axios-instance"
import { User } from "@/app/types/types"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import LoadingOverlay from "../../_atoms/loadingOverlay/LoadingOverlay"
import Image from "next/image"

export default function Suggestions() {
    const token = getCookie("token")
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [followedUsers, setFollowedUsers] = useState<Record<string, boolean>>({})
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null)

    const Follow = async (targetUserId: string) => {

        setLoadingUserId(targetUserId)

        setFollowedUsers(prev => ({
            ...prev,
            [targetUserId]: !prev[targetUserId],
        }))

        try {
            console.log(targetUserId)
            const resp = await axiosInstance.patch("/users/follow", {
                targetUserId
            },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }

                })


        } catch (error) {
            setFollowedUsers(prev => ({
                ...prev,
                [targetUserId]: !prev[targetUserId],
            }))
        }
        finally {
            setLoadingUserId(null)
        }
    }

    useEffect(() => {
        const FetchSuggestionUsers = async () => {
            try {
                const resp = await axiosInstance.get("/users/all-users", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }

                })
                if (resp.status === 200) {
                    setUsers(resp.data)
                    setLoading(false)
                }
            } catch (error) {
                console.log("something happend , try again")
                setLoading(true)
            }
        }
        FetchSuggestionUsers()
    }, [])

    if (loading) return <LoadingOverlay />

    return (
        <div className="max-w-87.5 w-full border-2 border-amber-500 flex flex-col gap-3 max-[500px]:flex-wrap rounded-lg mt-3 p-5 bg-white shadow-md">
            <h1 className="text-[17px] font-medium mb-2">People You May Know</h1>

            {users.map((el: User) => {
                const isFollowed = followedUsers[el._id]

                return (
                    <div className="flex gap-2" key={el._id}>
                        <Image
                            src={el.avatar}
                            alt="profile img"
                            width={50}
                            height={50}
                            className="rounded-full object-cover"
                        />

                        <div className="flex flex-col gap-1">
                            <h1 className="font-semibold text-[15px]">{el.fullname}</h1>
                            <div className="">

                                <button
                                    onClick={() => Follow(el._id)}
                                    disabled={loadingUserId === el._id}
                                    className={`
                                    font-semibold text-[14px] px-3 py-1.5 rounded-[13px]
                                    shadow-sm transition-all duration-150 active:scale-95 cursor-pointer
                                    ${isFollowed
                                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            : "bg-amber-500 text-white hover:bg-amber-700"}
                                        ${loadingUserId === el._id && "opacity-70 cursor-not-allowed"}
                                        `}
                                >
                                    {loadingUserId === el._id
                                        ? "იგზავნება..."
                                        : isFollowed
                                            ? "დამატებულია"
                                            : "დაამატე"}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}
