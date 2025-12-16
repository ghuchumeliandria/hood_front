import Feed from '@/app/components/_organisms/feed/Feed'
import Suggestions from '@/app/components/_organisms/suggestions/Suggestions'
import IsLoggedIn from '@/app/guard/IsLoggedIn.guard'
import Image from 'next/image'
import React from 'react'

export default function page() {
    return (
        <IsLoggedIn >
            <div className='flex gap-5 justify-end'>

                <Feed />
                <Suggestions />
            </div>
        </ IsLoggedIn >
    )
}
