import Feed from '@/app/components/_organisms/feed/Feed'
import IsLoggedIn from '@/app/guard/IsLoggedIn.guard'
import Image from 'next/image'
import React from 'react'

export default function page() {
    return (
        <IsLoggedIn >
            <div className='flex items-center justify-center'>
                {/* <Image src={"https://media.tenor.com/0rKL5dtMPkgAAAAe/monkey.png"} alt='monkey' width={200} height={200} />
                <h1>ravqna jer meti araferia</h1>
                <h2>uceb ragaca davamate da test</h2>
                <h2>uceb ragaca davamate da test</h2> */}

                <Feed />
            </div>
        </ IsLoggedIn >
    )
}
