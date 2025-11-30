import { InferType } from "yup";
import * as yup from 'yup'

export const signInSchema = yup.object({
    email : yup.string().email("აუცილებლად უნდა იყოს იმეილი").required("გთხოვთ შეავსოთ ველი"),
    password : yup.string().min(8).max(20).required("გთხოვთ შეავსოთ ველი").matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,20}$/,
        "პაროლუ უნდა შეიცავდეს დიდ და პატარა ასოს , ასევე ციფრს"
      )
})

export type SignInType = InferType<typeof signInSchema>

