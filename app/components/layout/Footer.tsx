import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#141414] text-white py-12 px-9">
      <div className="max-w-[689px] lg:max-w-[1110px] mx-auto w-full flex flex-col items-center justify-center lg:block">
        {/* Logo + Navigation */}
        <div className="flex justify-center mb-9 flex-col lg:justify-between lg:flex-row gap-8 w-full">
          <Link href="/">
            <Image
              src="/assets/shared/desktop/logo.svg"
              alt="Audiophile Logo"
              width={143}
              height={25}
              className="brightness-0 invert mx-auto sm:mx-0 cursor-pointer"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex flex-col sm:flex-row text-center gap-8 lg:gap-8 text-[13px]">
            <Link href="/" className="text-white hover:text-primary transition-colors duration-200 uppercase text-sm font-bold tracking-wider">
              Home
            </Link>
            <Link href="/headphones" className="text-white hover:text-primary transition-colors duration-200 uppercase text-sm font-bold tracking-wider">
              Headphones
            </Link>
            <Link href="/speakers" className="text-white hover:text-primary transition-colors duration-200 uppercase text-sm font-bold tracking-wider">
              Speakers
            </Link>
            <Link href="/earphones" className="text-white hover:text-primary transition-colors duration-200 uppercase text-sm font-bold tracking-wider">
              Earphones
            </Link>
          </nav>
        </div>

        {/* Description + Copyright + Socials */}
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-start">
          {/* Left Section */}
          <div className="flex flex-col gap-7 lg:max-w-md">
            <p className="text-white/50 leading-relaxed text-center sm:text-left">
              Audiophile is an all-in-one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility — we're open 7 days a week.
            </p>

            <p className="text-white/50 text-sm mt-14 hidden lg:block">
              Copyright 2021. All Rights Reserved
            </p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-start lg:items-end gap-8 w-full">
            <div
              className="
                flex flex-col items-center justify-center 
                sm:grid sm:grid-cols-2 sm:items-center sm:justify-between 
                md:flex md:flex-row md:items-center md:justify-between lg:justify-end
                gap-12 md:gap-8 sm:mt-20 mt-12 w-full
              "
            >
              {/* Copyright for Tablet */}
              <p className="text-white/50 text-sm sm:text-start block lg:hidden">
                Copyright 2021. All Rights Reserved
              </p>

              {/* Social Icons */}
              <div className="flex justify-end gap-4 sm:text-end">
                <Link href="#" className="text-white hover:text-primary transition-colors duration-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325V22.676C0 23.407 0.593 24 1.325 24H12.82V14.706H9.692V11.084H12.82V8.413C12.82 5.313 14.713 3.625 17.479 3.625C18.804 3.625 19.942 3.724 20.274 3.768V7.008L18.356 7.009C16.852 7.009 16.561 7.724 16.561 8.772V11.085H20.148L19.681 14.707H16.561V24H22.677C23.407 24 24 23.407 24 22.675V1.325C24 0.593 23.407 0 22.675 0Z" />
                  </svg>
                </Link>

                <Link href="#" className="text-white hover:text-primary transition-colors duration-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </Link>

                <Link href="#" className="text-white hover:text-primary transition-colors duration-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    {/* ✅ Fixed JSX attribute casing */}
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0ZM12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM5.838 12C5.838 8.597 8.597 5.838 12 5.838C15.403 5.838 18.162 8.597 18.162 12C18.162 15.404 15.403 18.163 12 18.163C8.597 18.163 5.838 15.403 5.838 12ZM12 16C9.791 16 8 14.21 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.21 14.209 16 12 16ZM16.965 5.595C16.965 4.8 17.61 4.155 18.406 4.155C19.201 4.155 19.845 4.8 19.845 5.595C19.845 6.39 19.201 7.035 18.406 7.035C17.61 7.035 16.965 6.39 16.965 5.595Z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
