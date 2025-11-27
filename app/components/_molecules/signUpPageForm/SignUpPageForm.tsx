"use client"
import { axiosInstance } from '@/app/lib/axios-instance'
import { signUpSchema, SignUpType } from '@/app/validations/sign-up.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function SignUpPageForm() {
    const router = useRouter()
    const {
        register, handleSubmit, formState: { errors },
    } = useForm({
        resolver: yupResolver(signUpSchema)
    })
    const onSubmit = async ({ email, password, fullname, confirmPassword }: SignUpType) => {
        const resp = await axiosInstance.post("/auth/sign-up", {
            email, password, fullname, confirmPassword
        })
        console.log("shemovida")
        if (resp.status === 201) {
            router.push("/home")
            return
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
            <div className="flex justify-center">

                <button type='submit' className="w-full max-w-[100px]  text-amber-500  px-4 py-2 rounded-full bg-amber-100  placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200"
                >Submit</button>
            </div>
        </form>

    )
}
