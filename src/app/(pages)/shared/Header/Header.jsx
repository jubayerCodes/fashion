'use client'


import { AuthContext } from '@/app/providers/AuthProvider/AuthProvider';
import { Button, Drawer, InputBase, Menu, MenuItem, alpha, styled } from '@mui/material';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { FaBars, FaHeart, FaRegHeart, FaSearch, FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";

const Header = () => {

    const { user, logOut } = useContext(AuthContext)

    const [drawer, setDrawer] = useState(false);

    const handleClick = () => {
        setDrawer(true);
    };

    const menu = (
        <>
            <li className='menu-item cursor-pointer'>
                <Link href={'/'}>
                    Home
                </Link>
            </li>
            <li className='menu-item cursor-pointer'>
                <Link href={'#'}>
                    Categories
                </Link>
            </li>
            <li className='menu-item cursor-pointer'>
                <Link href={'#'}>
                    About Us
                </Link>
            </li>
            <li className='menu-item cursor-pointer'>
                <Link href={'#'}>
                    Contact Us
                </Link>
            </li>
        </>
    )


    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));


    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));


    const handleSearch = (e) => {
        const key = e.code
        const value = e.target.value

        if (key === 'Enter') {
            console.log(value);
        }
    }

    const handleLogOut = () => {
        logOut()
    }

    return (
        <>
            <header className='py-5 border-b border-[#222222] px-5'>
                <div className="header-container xl:w-[1200px] mx-auto w-full grid grid-cols-2 xl:grid-cols-5 items-center">
                    <div className='col-span-1'>
                        <Link href={'/'}>
                            <h1 className='text-2xl xl:text-4xl font-bold'>Fashion</h1>
                        </Link>
                    </div>
                    <div className='col-span-3 xl:flex justify-center hidden'>
                        <ul className='flex justify-between items-center gap-8 text-[14px]'>
                            {menu}
                            <li className='menu-item cursor-pointer mb-[-5px]'>
                                <Search onSubmit={() => console.log('submit hoise')}>
                                    <SearchIconWrapper>
                                        <FaSearch />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        onKeyUp={handleSearch}
                                    />
                                </Search>
                            </li>

                        </ul>
                    </div>
                    <div className='flex justify-end items-center text-xl gap-5 col-span-1'>
                        <button className='text-3xl xl:block hidden'><FaRegHeart /></button>
                        <button className='text-3xl xl:block hidden'><FaShoppingCart /></button>
                        {
                            user ?
                                <img onClick={handleLogOut} src={user?.photoURL} alt="" className='w-[40px] h-[40px] rounded-full cursor-pointer' />
                                :
                                <Link href={'/login'} className='flex items-center'>
                                    <button className='text-3xl'><FaUserCircle /></button>
                                </Link>
                        }

                        <div className='flex items-center xl:hidden'>
                            <button
                                onClick={handleClick}
                                className='text-white text-3xl p-0 m-0'
                            >
                                <FaBars />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className={`${drawer ? 'block' : 'hidden'} absolute bg-white text-black w-full p-4 z-50`}>
                <div className='flex justify-end'>
                    <FaTimes onClick={() => setDrawer(false)} className='text-3xl' />
                </div>
                <ul className='drawer-ul'>
                    {menu}
                    <li className='menu-item cursor-pointer'>
                        <Link href={'#'}>
                            Favorites
                        </Link>
                    </li>
                    <li className='menu-item cursor-pointer'>
                        <Link href={'#'}>
                            Cart
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Header;