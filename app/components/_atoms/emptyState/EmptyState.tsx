import Image from 'next/image'
import React from 'react'
import iamge from '../../../assets/images/465608107_2587084128167906_4063001386519578063_n.jpg'
export default function EmptyState() {
    return (

        <div className="flex flex-col items-center justify-center  py-10 text-center">
            <div className=" rounded-full flex items-center justify-center mb-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)]">
                <Image src={iamge} alt='hood-image' className='rounded-2xl  shadow-[0_0_25px_rgba(217,119,6,1.5)] ' width={250} height={100} />

            </div>
            <span className="text-4xl mb-2">👋</span>

            <h2 className="text-2xl font-bold text-amber-600 mb-2">
                შენ ხარ ახალი აქ
            </h2>

            <p className="text-gray-500 max-w-md mb-6">
                ჯერ პოსტები არ გაქვს. დაიწყე პირველი პოსტის დაწერით ან მოიწვიე მეგობრები ✨
            </p>
        </div>

    )
}
