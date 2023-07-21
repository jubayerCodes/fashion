import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='h-[500px] w-full flex justify-center items-center'>
            <ThreeCircles
                height="100"
                width="100"
                color="#a7897b"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </div>
    );
};

export default Loader;