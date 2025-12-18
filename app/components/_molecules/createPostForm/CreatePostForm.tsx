"use client"
import { axiosInstance } from "@/app/lib/axios-instance"
import { CreatePostSchema, createPostSchema } from "@/app/validations/create-post.schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { getCookie } from "cookies-next"
import { watch } from "fs"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"

export default function CreatePostForm() {
    const [submitting, setSubmitting] = useState(false)

    const token = getCookie("token")
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreatePostSchema>({
        resolver: yupResolver(createPostSchema),
        defaultValues: {
            title: "",
        },
        mode: "onChange"
    })

    const onSubmit = async ({ title }: CreatePostSchema) => {
        try {
            setSubmitting(true)

            const resp = await axiosInstance.post(
                "/posts/create-post",
                { title },
                { headers: { "Authorization": `Bearer ${token}` } }
            )

            await new Promise(resolve => setTimeout(resolve, 2000))

            window.location.reload()

        } catch (error) {
            console.log("Request failed", error)
        }
        finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
                <textarea
                    {...register("title")}

                    placeholder="Title..."
                    className="mt-4 pb-2 border-b wrap-break-word resize-none border-b-amber-300 placeholder:text-amber-600 focus:border-b-amber-500 outline-none"
                />
                {errors.title && <p className='text-red-500 text-[14px]'>{errors.title.message}</p>}


                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-amber-500 cursor-pointer text-white p-2 rounded hover:bg-amber-600 transition disabled:opacity-50"
                >
                    {submitting ? "იგზავნება..." : "გაგზავნა"}
                </button>
            </form>
        </div>
    )
}
