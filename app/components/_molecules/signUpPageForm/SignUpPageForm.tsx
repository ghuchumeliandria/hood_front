import Link from 'next/link'
import React from 'react'

export default function SignUpPageForm() {
    return (
        <div className="w-full">

            <form className=' w-full  flex flex-col gap-6' >
                <input type="text" placeholder='Phone number , username , or email' className="w-full  px-4 py-2 rounded-full bg-amber-100 text-gray-800 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200"
                />
                <input type="text" placeholder='Password' className="w-full  px-4 py-2 rounded-full bg-amber-100 text-gray-800 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200"
                />
                <div className="flex justify-center">

                    <button type='submit' className="w-full max-w-[100px]  text-amber-500  px-4 py-2 rounded-full bg-amber-100  placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all duration-200"
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
                <h1 className="text-white text-[25px]">
                    Don't have an account?{" "}
                    <Link href="#" className="text-amber-500 font-semibold hover:underline transition-colors duration-200">
                        Sign Up
                    </Link>
                </h1>
            </div>

        </div>

    )
}
