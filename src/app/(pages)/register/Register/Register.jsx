"use client"

import { AuthContext } from '@/app/providers/AuthProvider/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

const Register = () => {

    const { signUpWithEmail, updatePhotoAndName, setRefresh, refresh } = useContext(AuthContext)

    const { replace } = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const img = form.img.value
        const email = form.email.value
        const password = form.password.value

        signUpWithEmail(email, password)
            .then((res) => {
                updatePhotoAndName(res?.user, name, img)
                    .then(() => {
                        setRefresh(!refresh)
                        replace('/products/1')
                    })
                    .catch(error => console.log(error))
            })
            .catch((error) => console.log(error))
    }

    return (
        <section className='min-h-[500px] flex justify-center items-center py-10 xl:py-20 px-5'>
            <div className="my-container">
                <h2 className='text-[#a7897b] text-[36px] text-center mb-10'>Register</h2>
                <div className='xl:w-[600px] mx-auto border-[#a7897b] border p-5 xl:p-10'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-5'>
                            <label htmlFor="nameField" className='block mb-2'>
                                Full Name:
                            </label>
                            <input name='name' required id='nameField' type="text" className='w-full p-3 bg-black border border-[#a7897b] focus-within:rounded-none' placeholder='Your Name' />
                        </div>
                        <div className='mb-5'>
                            <label htmlFor="imgField" className='block mb-2'>
                                Photo URL:
                            </label>
                            <input name='img' required id='imgField' type="text" className='w-full p-3 bg-black border border-[#a7897b] focus-within:rounded-none' placeholder='Your Photo' />
                        </div>
                        <div className='mb-5'>
                            <label htmlFor="emailField" className='block mb-2'>
                                Email:
                            </label>
                            <input name='email' required id='emailField' type="email" className='w-full p-3 bg-black border border-[#a7897b] focus-within:rounded-none' placeholder='Your Email' />
                        </div>
                        <div>
                            <label htmlFor="passwordField" className='block mb-2'>
                                Password:
                            </label>
                            <input name='password' required id='passwordField' type="password" className='w-full p-3 bg-black border border-[#a7897b] focus-within:rounded-none' placeholder='Your Password' />
                        </div>

                        <input type="submit" value="Register" className='w-full py-3 cursor-pointer text-[#a7897b] font-semibold hover:text-black border border-[#a7897b] uppercase text-sm hover:bg-[#a7897b] duration-300 mt-10' />

                        <Link href={'/login'} className='text-sm mt-5 inline-block hover:text-[#a7897b] text-white'>
                            Already registered? Login...
                        </Link>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;