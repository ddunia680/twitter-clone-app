import React from 'react';
import TrendItem from '../../components/trendItem/trendItem';

function Trends(props) {
    return (
        <div className='my-[1rem] w-[100%] bg-darkComponent pt-[1rem] rounded-2xl'>
            <h3 className='w-[100%] text-[15px] md:text-xl font-bold px-[1rem]'>Trends for you</h3>
            
            <TrendItem/>
            <TrendItem/>
            <TrendItem/>
            <TrendItem/>
            <TrendItem/>
            <TrendItem/>
            <TrendItem/>
        </div>
    );
}

export default Trends;