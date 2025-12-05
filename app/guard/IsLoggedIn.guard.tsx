"use client"
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import LoadingOverlay from '../components/_atoms/loadingOverlay/LoadingOverlay'

export default function IsLoggedIn({ children }: { children: React.ReactNode }) {
    const [checking, setChecking] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const token = getCookie("token")
        const timer = setTimeout(() => {
            if (!token) {
                router.push('/')
            }
            else {

                setChecking(false)
            }
        }, 200) // <-- 200ms

        return () => clearTimeout(timer)
    }, [router])

    if (checking) return <LoadingOverlay key="loading" />
    return <> {children}  </>
}
