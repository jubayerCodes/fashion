'use client'


import { InputBase, alpha, styled } from '@mui/material';
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

    return (
        <header className='py-5 border-b border-[#222222]'>
            <div className="header-container my-container grid grid-cols-5 items-center">
                <div className='col-span-1'>
                    <Link href={'/'}>
                        <h1 className='xl:text-4xl font-bold'>Fashion</h1>
                    </Link>
                </div>
                <div className='col-span-3 flex justify-center'>
                    <ul className='flex justify-between items-center gap-8 text-[14px]'>
                        {menu}
                        {/* <li className='menu-item cursor-pointer mb-[-5px]'></li> */}
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
                <div className='flex justify-end items-center text-xl gap-5'>
                    <button className='text-3xl'><FaRegHeart /></button>
                    <button className='text-3xl'><FaShoppingCart /></button>
                    <Link href={'/login'} className='flex items-center'>
                        <button className='text-3xl'><FaUserCircle /></button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;