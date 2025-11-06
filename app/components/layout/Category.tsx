'use client';

import React from 'react'
import MenuCard from '../products/MenuCard'
import Link from 'next/link'

interface CategoryProps {
    isMenu?: boolean;
}

const Category = ({ isMenu = false }: CategoryProps) => {
    return (
        <div className={`flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-14 md:gap-2.5 lg:gap-10 px-6 container mx-auto max-w-[1110px] ${isMenu ? '' : 'py-16'}`}>
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
                    imageSrc="/assets/home/desktop/earphones.png"
                    name="Earphones"
                    className=""
                />
            </Link>

        </div >
    )
}

export default Category