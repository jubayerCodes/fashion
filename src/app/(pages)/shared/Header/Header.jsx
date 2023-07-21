import Link from 'next/link';
import React from 'react';
import { FaHeart, FaRegHeart, FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Header = () => {


    const menu = (
        <>
            <li className='menu-item cursor-pointer'>Home</li>
            <li className='menu-item cursor-pointer'>Shop</li>
            <li className='menu-item cursor-pointer'>About Us</li>
            <li className='menu-item cursor-pointer'>Contact Us</li>
        </>
    )


    return (
        <header className='py-5 border-b border-[#222222]'>
            <div className="header-container my-container grid grid-cols-4 items-center">
                <div className='col-span-1'>
                    <Link href={'/'}>
                        <h1 className='xl:text-4xl font-bold'>Fashion</h1>
                    </Link>
                </div>
                <div className='col-span-2 flex justify-center'>
                    <ul className='flex justify-between items-center gap-8 text-[14px]'>
                        {menu}
                        <li className='menu-item cursor-pointer mb-[-5px]'><FaSearch /></li>
                    </ul>
                </div>
                <div className='flex justify-end items-center text-xl gap-5'>
                    <button className='text-2xl'><FaRegHeart /></button>
                    <button className='text-2xl'><FaShoppingCart /></button>
                    <button className='text-2xl'><FaUserCircle /></button>
                </div>
            </div>
        </header>
    );
};

export default Header;