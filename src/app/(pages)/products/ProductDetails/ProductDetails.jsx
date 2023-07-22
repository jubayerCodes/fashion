"use client"

import Loader from '@/app/components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductDetails = ({ id = 1 }) => {

    const [quantity, setQuantity] = useState(1)
    const [img, setImg] = useState(0)
    const [product, setProduct] = useState({})
    const [color, setColor] = useState(product?.product?.colors[0])
    const [favorite, setFavorite] = useState(false)
    const [carted, setCarted] = useState(false)

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)

                const favorites = JSON.parse(localStorage.getItem('favoriteProducts')) || []

                const exist = favorites.find(pd => pd.productId === data?.product?.id)

                if (exist) {
                    setFavorite(true)
                }


                const cart = JSON.parse(localStorage.getItem('cart')) || []
                const isCarted = cart.find(pd => (pd.productId === data?.product?.id))


                if (isCarted) {
                    const cartedQuantity = isCarted?.quantity
                    setQuantity(cartedQuantity)
                    setCarted(true)
                }
            })
    }, [id])


    if (!product?.product) {
        return (
            <Loader />
        )
    }

    const handleChangeIndex = (e) => {
        const value = e.target.value
        const index = product?.product?.colors.indexOf(value)
        setImg(index);
        setColor(value)
    }

    const addToFavorites = (id) => {
        let favorites = []

        const storedFavorites = JSON.parse(localStorage.getItem('favoriteProducts'))

        favorites = storedFavorites || []

        const favoriteProduct = { productId: id }

        const exist = favorites.find(pd => pd.productId === id)

        if (!exist) {
            favorites.push(favoriteProduct)
            setFavorite(true)
        }


        localStorage.setItem('favoriteProducts', JSON.stringify(favorites))
    }

    const removeFromFavorites = (id) => {
        let favorites = []

        const storedFavorites = JSON.parse(localStorage.getItem('favoriteProducts'))

        favorites = storedFavorites || []

        const remaining = favorites.filter(pd => pd.productId !== id)

        localStorage.setItem('favoriteProducts', JSON.stringify(remaining))

        setFavorite(false)
    }

    const addToCart = (id) => {
        let cart = []

        const storedCart = JSON.parse(localStorage.getItem('cart'))

        cart = storedCart || []

        const cartProduct = { productId: id, quantity: quantity }

        const exist = cart.find(pd => pd.productId === id)

        if (!exist) {
            cart.push(cartProduct)
        } else {
            if (exist.quantity !== quantity) {
                const remaining = cart.filter(pd => pd.productId !== id)
                remaining.push(cartProduct)
                cart = [...remaining]
            }
        }


        localStorage.setItem('cart', JSON.stringify(cart))

        setCarted(true)
    }

    const updateQuantity = (e) => {
        setQuantity(parseInt(e.target.value))
        setCarted(false)
    }

    const handleMouseEnter = (e) => {
        e.target.style.transform = 'scale(300%)'
        console.log(e);
    }

    const handleMouseleave = (e) => {
        e.target.style.transform = 'scale(100%)'
        e.target.style.top = '0'
        e.target.style.left = '0'

    }

    const handleMouseMove = (e) => {
        e.target.style.left = `0`
    }

    return (
        <>
            <section className='py-24 pt-40'>
                <div className="my-container grid xl:grid-cols-2 gap-16 items-center justify-between">
                    <div className='grid grid-cols-4 gap-5'>
                        <div className=' flex flex-col justify-center items-center col-span-1 gap-5'>
                            {
                                product?.product?.images.map((image, idx) =>
                                    <div key={idx} onClick={() => setImg(idx)} className={`cursor-pointer flex justify-center items-center p-3 border rounded-md ${img === idx ? 'border-white' : 'border-[#a7897b]'}`}>
                                        <img className='w-[80px]' src={image} alt="" />
                                    </div>
                                )
                            }
                        </div>
                        <div className='border border-[#a7897b] flex justify-center items-center rounded-xl col-span-3 p-5'>
                            <img id='productImg' src={product?.product?.images[img]} alt="" className='' />
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-between items-center mb-10'>
                            <div className='flex justify-start gap-3 items-center text-black'>
                                {
                                    product?.product?.category.map((cat, idx) => <span className='rounded-full bg-[#a7897b] p-1 px-3' key={idx}>{cat}</span>)
                                }
                            </div>
                            {
                                favorite ?
                                    <button onClick={() => removeFromFavorites(product?.product?.id)}><FaHeart className='text-[#a7897b] text-[26px]' /></button>
                                    :
                                    <button onClick={() => addToFavorites(product?.product?.id)}><FaRegHeart className='text-[#a7897b] text-[26px]' /></button>
                            }
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
                                <input onChange={updateQuantity} type="number" name="quantity" id="" className='border capitalize p-1 px-2 rounded-full ml-2 bg-transparent w-[100px]' min={1} defaultValue={quantity} />
                            </div>
                            <div>
                                <h3 className='text-[#a7897b] text-[24px] font-semibold'>{(product?.product?.price * quantity).toFixed(2)} USD</h3>
                            </div>
                        </div>
                        <p>{product?.product?.description.split(' ').slice(0, 25).join(' ')}...</p>
                        <div className='grid grid-cols-2 mt-10 gap-5'>
                            <button className='w-full py-2 hover:text-[#a7897b] font-semibold text-black border border-[#a7897b] rounded-full uppercase text-sm bg-[#a7897b] duration-300 hover:bg-black'>Buy now</button>

                            <button disabled={carted} onClick={() => addToCart(product?.product?.id)} className='w-full py-2 text-[#a7897b] font-semibold hover:text-black border border-[#a7897b] rounded-full uppercase text-sm hover:bg-[#a7897b] duration-300 disabled:hover:bg-black disabled:hover:text-[#a7897b]'>
                                {
                                    carted ?
                                        'Already Added'
                                        :
                                        'Add to cart'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetails;