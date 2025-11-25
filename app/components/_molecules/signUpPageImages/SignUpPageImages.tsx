import Image from 'next/image'
import hoodImagე1 from '../../../assets/images/hood.jpg'
import hoodImage2 from '../../../assets/images/hood2.jpg'
import hoodImagე3 from '../../../assets/images/hood3.jpg'

export default function SignUpPage() {
    return (
        <div className="relative w-full  flex justify-center items-center gap-[-60px] p-2 ">
            <Image
                src={hoodImage2}
                alt="img1"
                width={200}
                height={300}
                className="rounded-3xl shadow-2xl -rotate-6 z-10 -mr-5 max-h-[300px] h-full max-w-[270px] w-full "
            />
            <Image
                src={hoodImagე1}
                alt="img2"
                width={200}
                height={300}
                className="rounded-3xl shadow-2xl  z-20 max-w-[450px] w-full max-h-[650px] h-full"
            />
            <Image
                src={hoodImagე3}
                alt="img3"
                width={200}
                height={300}
                className="rounded-3xl shadow-2xl rotate-6 -ml-5 z-5 max-h-[300px] max-w-[270px] w-full"
            />
        </div>
    )
}
