
import SignUpPageForm from '@/app/components/_molecules/signUpPageForm/SignUpPageForm'
import Link from 'next/link'

export default function page() {


    return (
        <div className="w-full min-h-screen flex justify-center items-center   px-2 md:px-20 bg-linear-to-r from-orange-500 to-yellow-300">

            <div className='w-full flex flex-col max-w-[500px] items-center '>
                <SignUpPageForm />
                <div className="">

                    <div className="">
                        <div className="flex items-center my-4 w-full max-w-md">
                            <hr className="grow border-t border-white/50" />
                            <span className="mx-3 text-white text-sm font-semibold">or</span>
                            <hr className="grow border-t border-white/50" />
                        </div>
                    </div>
                    <div className="mt-4 w-full max-w-md text-center md:text-left">
                        <h1 className="text-white text-[25px] max-[500px]:text-[20px]" >
                            already have an account?{" "}
                            <Link href="/" className="text-amber-500 font-semibold hover:underline transition-colors duration-200">
                                Sign In
                            </Link>
                        </h1>
                    </div>
                </div>

            </div>
        </div>
    )
}
