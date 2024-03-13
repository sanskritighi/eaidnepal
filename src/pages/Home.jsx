import React from 'react'
import { motion } from 'framer-motion';
import HomeHero from '../assets/HomeAsset.svg'

const Home = () => {


  return (
    <>
      <div className="grid grid-cols-1 md:py-10 justify-items-center sm:grid-cols-1  lg:grid-cols-2 w-full h-full">
        <div className="text-gray-100 pt-14">
          <motion.div className="text-4xl space-y-2 md:text-6xl"
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay: 0.5, duration: 1.5 }}>
            <h2 className='text-blue-600 font-bold'>Online Courses</h2>
            <h2 className="text-gray-700 font-bold">for </h2>
            <h2 className='text-blue-600 font-bold' >MBBS & AG</h2>
          </motion.div>
          <div className="pt-14 text-gray-600 space-y-2 w-full">
            <h2 className="leading-4 tracking-wide">
              Join our commnunity now.
            </h2>
            <div className="flex flex-col sm:flex-wrap lg:flex-nowrap gap-4 md:gap-2 md:flex-row items-center space-x-2">

              <div>
                <motion.button
                  type="button"
                  className="py-2 px-3 rounded bg-red-400 text-gray-100 focus:outline-none hover:bg-purple-400"
                  whileHover={{
                    scale:1.1,
                    textShadow:"0px 0px 8px rgb(255,255,255)",
                  }}
                >
                  Get Notified
                </motion.button>
              </div>
            </div>

          </div>
        </div>
        <div className=" relative px-10 py-10 md:grid justify-items-center w-full h-full ">
            <div className='w-full h-full rounded-md'>
                    <img src={HomeHero}/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Home





