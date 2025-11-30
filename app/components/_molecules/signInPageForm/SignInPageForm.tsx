"use client"
import { axiosInstance } from '@/app/lib/axios-instance'
import { signInSchema, SignInType } from '@/app/validations/sign-in.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { setCookie } from "cookies-next"
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
export default function SignInPageForm() {
    const [error, setError] = useState("")

    const router = useRouter()
    const {
        register, handleSubmit, formState: { errors },
    } = useForm({
        resolver: yupResolver(signInSchema)
    })
    const onSubmit = async ({ email, password }: SignInType) => {
        try {

            const resp = await axiosInstance.post("/auth/sign-in", {
                email, password
            })

            if (resp.status === 201) {
                setCookie("token", resp.data.token, { maxAge: 60 * 120 })
                router.push("/home")
                return
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            if (err.response) {
                setError(err.response.data.message)

            }
        }
    }
    console.log(errors)

    useEffect(() => {
        console.log(errors)
    }, [errors])
    return (
        <div className="w-full">

            <form className=' w-full  flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)} >
                <input {...register('email')} type="text" placeholder='Phone number , username , or email' className="w-full  px-4 py-2 rounded-full bg-amber-100 text-gray-800 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200"
                />
                {errors.email && <p className='text-red-500 text-[14px]'>{errors.email.message}</p>}

                <input {...register('password')} type="password" placeholder='Password' className="w-full  px-4 py-2 rounded-full bg-amber-100 text-gray-800 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200"
                />
                {errors.password && <p className='text-red-500 text-[14px]'>{errors.password.message}</p>}
                {error !== "" && <h1 className='text-red-500 text-[20px] font-bold text-center mt-1'>{error}</h1>}

                <div className="flex justify-center">

                    <button type='submit' className="w-full max-w-[100px] hover:text-white hover:border-white hover:border hover:bg-transparent cursor-pointer text-amber-500  px-4 py-2 rounded-full bg-amber-100  placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200"
                    >Submit</button>
                </div>
            </form>
            <div className="">
                <div className="flex items-center my-4 w-full max-w-md">
                    <hr className="grow border-t border-white/50" />
                    <span className="mx-3 text-white text-sm font-semibold">or</span>
                    <hr className="grow border-t border-white/50" />
                </div>
            </div>
            <div className="mt-4 w-full max-w-md text-center md:text-left">
                <h1 className="text-white text-[25px] max-[500px]:text-[20px]">
                    Don't have an account?{" "}
                    <Link href="/sign-up" className="text-amber-500 font-semibold hover:underline transition-colors duration-200 ">
                        Sign Up
                    </Link>
                </h1>
            </div>

        </div>

    )
}
