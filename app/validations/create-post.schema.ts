import { InferType } from "yup";
import * as yup from 'yup'

export const createPostSchema = yup.object({
    title : yup.string().required("შეავსე ველი"),
})

export type CreatePostSchema = InferType<typeof createPostSchema>