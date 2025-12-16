import React from 'react'

export default function EmptyState() {
    return (

        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mb-6 shadow-md">
                <span className="text-4xl">👋</span>
            </div>

            <h2 className="text-2xl font-bold text-amber-600 mb-2">
                შენ ხარ ახალი აქ
            </h2>

            <p className="text-gray-500 max-w-md mb-6">
                ჯერ პოსტები არ გაქვს. დაიწყე პირველი პოსტის დაწერით ან მოიწვიე მეგობრები ✨
            </p>
        </div>

    )
}
