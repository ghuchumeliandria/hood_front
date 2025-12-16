"use client"
import { axiosInstance } from "@/app/lib/axios-instance"
import { User } from "@/app/types/types"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import LoadingOverlay from "../../_atoms/loadingOverlay/LoadingOverlay"

export default function Suggestions() {
    const token = getCookie("token")
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
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
        <div className=" max-w-87.5 w-full border-2 border-amber-500 rounded-lg mt-3  p-5  bg-white shadow-md">
            {users.map((el: User) => (
                <div className="" key={el._id}>{el.fullname}</div>
            ))}
        </div>
    )
}
