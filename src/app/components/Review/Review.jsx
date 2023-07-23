import { Rating } from '@smastrom/react-rating';
import React from 'react';
import { FaRegUser, FaUser } from 'react-icons/fa';
import '@smastrom/react-rating/style.css';

const Review = ({ review }) => {

    const { username, rating, comment } = review

    return (
        <div className='border border-[#a7897b] flex flex-col items-center justify-center rounded-lg p-5 text-center xl:h-[350px]'>
            <div className='p-3 border border-[#a7897b] inline-block rounded-full bg-[#a7897b] text-black text-2xl'>
                <FaUser />
            </div>

            <h4 className='mt-4 text-[20px]'>{username}</h4>
            <div className='flex justify-center my-3'>
                <Rating
                    style={{ maxWidth: 120 }}
                    value={rating}
                    readOnly
                />
            </div>
            <p>{comment}</p>
        </div>
    );
};

export default Review;