"use client"

import { AuthContext } from '@/app/providers/AuthProvider/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

const Login = () => {

    const { signInWithEmail } = useContext(AuthContext)
    const { replace } = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        signInWithEmail(email, password)
            .then((res) => {
                replace('/products/1')
            })
            .catch((error) => console.log(error))
    }


    return (
        <section className='min-h-[500px] flex justify-center items-center py-32'>
            <div className="my-container">
                <h2 className='text-[#a7897b] text-[36px] text-center mb-10'>Login</h2>
                <div className='w-[600px] mx-auto border-[#a7897b] border p-10'>
                    <form onSubmit={handleSubmit}>
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

                        <input type="submit" value="Login" className='w-full py-3 cursor-pointer text-[#a7897b] font-semibold hover:text-black border border-[#a7897b] uppercase text-sm hover:bg-[#a7897b] duration-300 mt-10' />

                        <Link href={'/register'} className='text-sm mt-5 inline-block hover:text-[#a7897b] text-white'>
                            New to Fashion? Register...
                        </Link>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;