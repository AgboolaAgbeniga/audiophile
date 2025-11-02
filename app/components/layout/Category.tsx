'use client';

import React from 'react'
import MenuCard from '../products/MenuCard'
import Link from 'next/link'

const Category = () => {
    return (
        <div className='flex flex-col md:flex-row justify-center items-center gap-4 md:gap-2.5 lg:gap-10 py-16'>
            <Link href="/headphones">
                <MenuCard
                    imageSrc="/assets/home/desktop/headphones.png"
                    name="Headphones"
                    className=""
                />
            </Link>
            <Link href="/speakers">
                <MenuCard
                    imageSrc="/assets/home/desktop/speakers.png"
                    name="Speakers"
                    className=""
                />
            </Link>
            <Link href="/earphones">
                <MenuCard
                    imageSrc="/assets/home/desktop/Earphones.png"
                    name="Earphones"
                    className=""
                />
            </Link>

        </div >
    )
}

export default Category