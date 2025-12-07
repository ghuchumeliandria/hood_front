import Image from "next/image";
import Logo from "../../../assets/images/hood.jpg"
export default function Header() {
    return (
        <div className="w-full fixed bg-linear-to-r from-orange-500 to-yellow-300 px-3 flex items-center py-2">
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
        </div>
    )
}
