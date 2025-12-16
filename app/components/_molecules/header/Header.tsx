import Image from "next/image";
import Logo from "../../../assets/images/hood.jpg"
import logout from '../../../assets/images/log-out_5791613.png'
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
export default function Header() {
    const router = useRouter()
    const Logout = () => {
        deleteCookie("token")
        router.push("/")
    }
    return (
        <div className="w-full fixed bg-linear-to-r from-orange-500 to-yellow-300 px-3 flex items-center py-2 justify-between">
            <div className="flex items-center gap-3">

                <div className=" w-13 h-13 overflow-hidden  rounded-full">
                    <Image
                        src={Logo}
                        alt="logo"
                        width={60}
                        height={60}
                        className="object-cover"
                    />
                </div>
                <h1 className=" text-3xl  font-hotel text-center text-white   ">
                    Sick Nation
                </h1>
            </div>
            <div className="">
                <button className="flex gap-3 items-center cursor-pointer" onClick={() => Logout()}>
                    <Image src={logout} alt="logout icon" width={30} height={10} />
                    <h1 className="text-white font-hotel text-[27px] font-bold">Log out</h1>
                </button>
            </div>
        </div>
    )
}
