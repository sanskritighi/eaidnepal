import React,{useEffect} from 'react';
import { formatAPIDate } from '../utils/Dates'
import { Link, useParams } from 'react-router-dom'
import { useGET } from '../hooks/useApi'
import API_URLS from '../api/constants'
import { Tab } from '@headlessui/react'




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


  

const SubjectDetail = () => {
    const { courseid, subjectid } = useParams()

    const { isLoading, data, isError,error } = useGET(`${API_URLS.viewSubjects}/${subjectid}/`)

    if (isLoading) {
        return <>
            <h2 className='text-lg text-blue-600'>Loading.....</h2>
        </>
    }
    if(isError){
        return <>
        <h2 className='text-lg text-red-600'>{error}</h2>
        </>
    }
    


    return (
        <div className='w-full h-full max-h-full flex flex-col items-center p-4 gap-2 overflow-y-scroll'>
            <h2 className='p-3 text-left w-full text-2xl font-semibold text-gray-600'>{data.name}</h2>
            <div className='flex flex-wrap w-full gap-4 items-center rounded min-w-md p-4'>
                <div className="w-full px-2 sm:px-0">
                    <Tab.Group>
                        <Tab.List className="flex space-x-1 rounded-xl outline-1 outline outline-gray-700 p-1">
                            <Tab
                            key='syllabus'
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                        'ring-white/60  ring-offset-blue-400 focus:outline-none focus:ring-1',
                                        selected
                                            ? 'bg-white text-blue-600 shadow'
                                            : 'text-gray-800 hover:text-blue-700 bg-gray-300 hover:bg-white/30'
                                    )
                                }
                            >
                                Syllabus
                            </Tab>
                            <Tab
                            key='others'
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                        'ring-white/60  ring-offset-blue-400 focus:outline-none focus:ring-1',
                                        selected
                                            ? 'bg-white text-blue-600 shadow'
                                            : 'text-gray-800 hover:text-blue-700 bg-gray-300 hover:bg-white/30'
                                    )
                                }
                            >
                                Other Files
                            </Tab>

                        </Tab.List>
                        <Tab.Panels className="mt-2">
                            <Tab.Panel
                                key='syllabus-panel'
                                className={classNames(
                                    'rounded-xl bg-white p-3',
                                    'ring-white/60 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1 h-[60vh]'
                                )}
                            >   
                                {
                                    data.syllabus_url?
                                        <iframe src={data.syllabus_url} loading='lazy' width={"100%"} height={"100%"} />
                                    :
                                    <> <span className='p-4 text-lg font-semibold text-red-500'>Syllabus file not found</span></>
                                }          
                            </Tab.Panel>

                            <Tab.Panel
                            key='others-panel'
                                className={classNames(
                                    'rounded-xl bg-white p-3',
                                    'ring-white/60 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1 h-[60vh]'
                                )}
                            >
                                <ul >
                                    {
                                        data.other_files
                                        ?
                                        data.other_files?.map(
                                            item=>
                                            <>
                                            <li className='flex justify-between p-2 gap-4 outline outline-1 outline-gray-500 rounded hover:bg-gray-200'>

                                            <a href={item.url} target='__blank' className='hover:cursor-pointer text-blue-500 hover:text-blue-800'>
                                            {item?.filename}
                                            </a>
                                            <span>{formatAPIDate(item.created_at)}</span>
                                            </li>
                                            </>
                                            )
                                        :
                                            <span className='p-4 text-lg font-semibold text-red-500'>No extra files available</span>
                                    }
                                </ul>
                            </Tab.Panel>

                        </Tab.Panels>

                    </Tab.Group>
                </div>
            </div>
        </div>
    )
}

export default SubjectDetail