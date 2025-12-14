"use client"
import { axiosInstance } from "@/app/lib/axios-instance"
import { CreatePostSchema, createPostSchema } from "@/app/validations/create-post.schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { getCookie } from "cookies-next"
import { watch } from "fs"
import { useRef } from "react"
import { useForm } from "react-hook-form"

export default function CreatePostForm() {
    const token = getCookie("token")
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreatePostSchema>({
        resolver: yupResolver(createPostSchema),
        defaultValues: {
            title: "",
        },
        mode: "onChange" // validation real-time
    })

    const onSubmit = async ({ title }: CreatePostSchema) => {
        try {
            const resp = await axiosInstance.post(
                "/posts/create-post",
                { title },
                { headers: { "Authorization": `Bearer ${token}` } }
            )

            if (resp.status === 201) {
                reset() // ველები გასუფთავდეს
                textareaRef.current?.focus() // textarea ისევ ფოკუსში
                console.log("posti warmatebit sheiqmna")
            }
        } catch (error) {
            console.log("Request failed", error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
                <input
                    {...register("title")}
                    type="text"
                    placeholder="Title..."
                    className="mt-4 pb-2 border-b border-b-amber-300 placeholder:text-amber-600 focus:border-b-amber-500 outline-none"
                />
                {errors.title && <p className='text-red-500 text-[14px]'>{errors.title.message}</p>}


                <button
                    type="submit"
                    className="bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition"
                >
                    Send
                </button>
            </form>
        </div>
    )
}
