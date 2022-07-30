import React from 'react'
import Delivery from '../img/delivery.png'
import Bg from '../img/heroBg.png'
import { data } from '../utils/Data'

const HomeContainer = () => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-[calc(100%-88px)]'>
            <div className='py-2 flex-1 flex flex-col items-start justify-center gap-10 '>
                <div className='flex items-center gap-2 justify-center  bg-orange-200 rounded-full px-4 py-1 mt-4 w-fit'>
                    <p className=' text-red-600 font-semibold'>Bike Delivery</p>
                    <div className='bg-white rounded-full overflow-hidden drop-shadow-xl w-8 h-8'>
                        <img src={Delivery} alt="image" className='w-full h-full object-contain' />
                    </div>
                </div>
                <p className='text-[2.5rem] lg:text-[4rem] font-bold tracking-wide'>The Fastest Delivery In <span className='text-orange-300 text-[2.5rem] lg:text-[5rem]'>Your City</span></p>

                <p className='text-gray-300 text-center md:text-left'>sadf sdfsd f sdf sd fsd f sdf sd f sdf  f sf sd f sf sd fsd fsd fsd f sdf f sdf sf sf fsdf sda f fd fsd f fds fsd f fs fsd f fsd fs f fasd fsd f sdf f ds fs f fasfasd ff dsf sda f
                </p>


                <button type='button' className='mt-2 md:w-auto w-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg px-2 py-1 hover:shadow-lg transition-all ease-in-out duration-100'>Order Now</button>
            </div>


            <div className='py-2 flex-1 flex items-center relative'>
                <img src={Bg} alt="Background" className='lg:h-[600px] h-[420px] ml-auto w-full lg:w-auto ' />

                <div className='w-full h-full absolute flex items-center justify-center top-0 left-0 lg:px-32 py-4 gap-4 flex-wrap'>
                    {
                        data.map((ele) => (
                            <div key={ele.id} className='min-w-[150px] lg:min-w-[190px] p-4 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center drop-shadow-lg'>
                                <img src={ele.Image} alt="image" className='w-28 lg:w-40 -mt-5 lg:-mt-15' />
                                <p className='text-base lg:text-xl font-semibold text-black mt-2 lg:mt-4'>
                                    {ele.name}
                                </p>
                                <p className='text-[12px] lg:text-sm text-black font-semibold my-1 lg:my-3'>
                                    {ele.des}
                                </p>
                                <p className='text-sm font-semibold text-gray-500'>
                                    <span className='text-xs text-red-400'>{ele.price}</span>
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>

        </section>
    )
}

export default HomeContainer