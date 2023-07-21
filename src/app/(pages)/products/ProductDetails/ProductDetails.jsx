"use client"

import Loader from '@/app/components/Loader/Loader';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';

const ProductDetails = ({ id = 1 }) => {

    const [quantity, setQuantity] = useState(1)
    const [img, setImg] = useState(0)

    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id])


    if (!product?.product) {
        console.log(product);
        return (
            <Loader />
        )
    }

    const handleChangeIndex = (e) => {
        const value = e.target.value
        const index = product?.product?.colors.indexOf(value)
        setImg(index);
    }

    return (
        <>
            <section className='py-24 pt-40'>
                <div className="my-container grid xl:grid-cols-2 gap-16 items-center justify-between">
                    <div>
                        <div className='border border-[#a7897b] flex justify-center items-center rounded-xl'>
                            <img src={product?.product?.images[img]} alt="" />
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-between items-center mb-10'>
                            <div className='flex justify-start gap-3 items-center text-black'>
                                {
                                    product?.product?.category.map((cat, idx) => <span className='rounded-full bg-[#a7897b] p-1 px-3' key={idx}>{cat}</span>)
                                }
                            </div>
                            <button><FaRegHeart className='text-[#a7897b] text-[26px]' /></button>
                        </div>
                        <h2 className='text-[#a7897b] text-[42px] font-bold mb-5'>{product?.product?.name}</h2>
                        <div className='flex justify-start gap-10 mb-5'>
                            <div>
                                <label htmlFor="color">Color:</label>
                                <select onChange={handleChangeIndex} id="color" className='border capitalize p-1 px-2 rounded-full ml-2 bg-transparent'>
                                    {
                                        product?.product?.colors.map((color, idx) => <option className='text-black' key={idx} value={color}>{color}</option>)
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor="size">Sizes:</label>
                                <select id="size" className='border capitalize p-1 px-2 rounded-full ml-2 bg-transparent'>
                                    {
                                        product?.product?.sizes.map((size, idx) => <option className='text-black' key={idx} value={size}>{size}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='flex justify-between items-center gap-10 mb-5'>
                            <div>
                                <span>Quantity:</span>
                                <input onChange={(e) => setQuantity(parseInt(e.target.value))} type="number" name="quantity" id="" className='border capitalize p-1 px-2 rounded-full ml-2 bg-transparent w-[100px]' min={1} defaultValue={1} />
                            </div>
                            <div>
                                <h3 className='text-[#a7897b] text-[24px] font-semibold'>{(product?.product?.price * quantity).toFixed(2)} USD</h3>
                            </div>
                        </div>
                        <p>{product?.product?.description.split(' ').slice(0, 25).join(' ')}...</p>
                        <div className='grid grid-cols-2 mt-10 gap-5'>
                            <button className='w-full py-2 hover:text-[#a7897b] font-semibold text-black border border-[#a7897b] rounded-full uppercase text-sm bg-[#a7897b] duration-300 hover:bg-black'>Buy now</button>
                            <button className='w-full py-2 text-[#a7897b] font-semibold hover:text-black border border-[#a7897b] rounded-full uppercase text-sm hover:bg-[#a7897b] duration-300'>Add to cart</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetails;