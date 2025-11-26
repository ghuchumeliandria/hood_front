import { InferType, object, string } from "yup";
import * as yup from 'yup'

export const signInSchema = yup.object({
    email : yup.string().email("აუცილებლად უნდა იყოს იმეილი").required("გთხოვთ შეავსოთ ველი"),
    password : yup.string().min(8).max(20).matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,20}$/,
        "პაროლუ უნდა შეიცავდეს დიდ და პატარა ასოს , ასევე ციფრს"
      ).required("გთხოვთ შეავსოთ ველი"),
      fullname : yup.string().required("გთხოვთ შეავსოთ ველი"),
      confirmPassword :yup.string().min(8).max(20).matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,20}$/,
        "პაროლუ უნდა შეიცავდეს დიდ და პატარა ასოს , ასევე ციფრს"
      ).required("გთხოვთ შეავსოთ ველი")
})

export type SignInType = InferType<typeof signInSchema>