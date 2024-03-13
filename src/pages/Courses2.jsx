import React from 'react'
import { formatAPIDate } from '../utils/Dates'
import { Link } from 'react-router-dom'
import { useGET } from '../hooks/useApi'
import API_URLS from '../api/constants'


function Course2() {
  const { isLoading, data } = useGET(API_URLS.viewCategorys)
  const { isLoading: fetchingImages, data: filesData } = useGET(API_URLS.viewFiles)

  function getCategoryImage(categoryId, text = '') {
    const result = filesData.find(item => item.category === categoryId && item.category_image);
    return result ? result.category_image : `https://placehold.co/600x400?text=${text.toUpperCase()}`;
  }


  if (isLoading || fetchingImages) {
    return <>
      <h2 className='text-lg text-blue-600'>Loading.....</h2>
    </>
  }
  return (
    <>
      <div className='w-full h-full max-h-full flex flex-col items-center p-4 gap-2 overflow-y-scroll'>
        <h2 className='p-3 text-left w-full text-2xl font-semibold text-gray-600'>Courses</h2>
        <div className='flex flex-wrap w-full gap-4 items-center rounded min-w-md p-4'>
          {
            data?.map(
              item => (
                  <Link to={`${item.id}`} key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-4 mb-8">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md">
                      <div className="aspect-video">
                        <img
                          src={getCategoryImage(item.id,item.name)}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                        {/* Course created on <span className='font-[600]'>{formatAPIDate(item.date_created)}</span> */}
                        </p>
                      </div>
                    </div>
                  </Link>
              )
            )
          }
        </div>
      </div>
    </>
  )
}

export default Course2