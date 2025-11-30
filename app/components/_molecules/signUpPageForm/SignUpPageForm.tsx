"use client"
import { axiosInstance } from '@/app/lib/axios-instance'
import { signUpSchema, SignUpType } from '@/app/validations/sign-up.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from "axios";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function SignUpPageForm() {
    const [error, setError] = useState("")
    const router = useRouter()
    const {
        register, handleSubmit, formState: { errors },
    } = useForm({
        resolver: yupResolver(signUpSchema)
    })
    const onSubmit = async ({ email, password, fullname, confirmPassword }: SignUpType) => {
        try {

            const resp = await axiosInstance.post("/auth/sign-up", {
                email, password, fullname, confirmPassword
            })
            console.log("shemovida")
            console.log(resp.data.message, "mesijiaaa")
            if (resp.status === 201) {
                router.push("/")
                return
            }
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            if (err.response) {
                setError(err.response.data.message)
            }
        }
    }
    useEffect(() => {
        console.log("errors", errors)
    }, [errors])
    return (

        <form className=' w-full flex-1  flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)} >
            <input {...register('fullname')} type="text" placeholder='Fullname' className="w-full  px-4 py-2 rounded-full bg-amber-100 text-gray-800 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200"
            />
            {errors.fullname && <p className='text-red-500 text-[14px]'>{errors.fullname.message}</p>}
            <input {...register("email")} type="text" placeholder='Phone number , username , or email' className="w-full  px-4 py-2 rounded-full bg-amber-100 text-gray-800 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200"
            />
            {errors.email && <p className='text-red-500 text-[14px]'>{errors.email.message}</p>}
            <input {...register("password")} type="password" placeholder='Password' className="w-full  px-4 py-2 rounded-full bg-amber-100 text-gray-800 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200"
            />
            {errors.password && <p className='text-red-500 text-[14px]'>{errors.password.message}</p>}
            <input {...register("confirmPassword")} type="password" placeholder='Confirm password' className="w-full  px-4 py-2 rounded-full bg-amber-100 text-gray-800 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200"
            />

            {errors.confirmPassword && <p className='text-red-500 text-[14px]'>{errors.confirmPassword.message}</p>}

            {error !== "" && <h1 className='text-red-500 text-[20px] font-bold text-center mt-1'>{error}</h1>}

            <div className="flex justify-center">

                <button type='submit' className="w-full max-w-[100px] hover:text-white hover:border-white hover:border hover:bg-transparent cursor-pointer text-amber-500  px-4 py-2 rounded-full bg-amber-100  placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200"
                >Submit</button>
            </div>
        </form>

    )
}
