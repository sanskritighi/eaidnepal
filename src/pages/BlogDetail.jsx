import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGET } from '../hooks/useApi';
import API_URLS from '../api/constants';
import { IoMdArrowRoundBack } from "react-icons/io";
import { formatAPIDate } from '../utils/Dates';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const BlogDetail = () => {

    const { blogid } = useParams()

    const [commentuser, setCommentUser] = useState('')
    const [commentBody, setCommentBody] = useState('')

    const { isLoading, data, isError } = useGET(`${API_URLS.viewBlogs}/${blogid}/`)
    const { isLoading: commentsLoad, data: commentsData, isError: commentError, refetch: reloadComment } = useGET(`${API_URLS.comments}?post=${blogid}`)

    if (isLoading) {
        return <>
            <h2 className='text-lg text-blue-600'>Loading.....</h2>
        </>
    }

    const handleSubmit = () => {
        axios.post(API_URLS.comments, {
            name: commentuser,
            body: commentBody,
            post: blogid
        }).then(resp => {
            reloadComment()
        }).catch(err => {
            toast.error('Unable to process')
        })

    }


    return (
        <div className='justify-center content-center px-4 pl-8 w-full'>
            <div className='mt-4 pr-66 font-bold text-center text-2xl  p-2 px-4 mb-4  text-slate-700'>
                <Link to='/blogs' className='flex gap-2 items-center text-blue-500'><IoMdArrowRoundBack />All Blogs</Link>
            </div>
            {/* our cards */}
            <div className='pb-5 pt-2 px-4 flex flex-col gap-2 w-full'>
                <h1 className='text-2xl font-semibold'>{data?.title}</h1>
                <hr className='h-1 w-full bg-gray-700' />
                <div className='flex justify-between'>
                    <h3>{data?.created_by}</h3>
                    <h3>{formatAPIDate(data?.date_created)}</h3>
                </div>
                <hr className='h-1 w-full bg-gray-700' />
                <div className='flex justify-center py-2'>
                    <img src={data?.image} className='w-full object-cover max-w-md rounded' />
                </div>
                <div>
                    {data?.content}
                </div>
                {/* <div className='pt-8 flex flex-col gap-4'>
                    <hr className='h-1 w-full bg-gray-700' />
                    <h2 className='font-semibold text-lg'>Comments</h2>
                    <div className='flex'>
                        <div className='flex flex-col md:items-start w-full gap-4'>
                            <div className='flex flex-col gap-1 w-full'>
                                <label htmlFor='body'>Message</label>
                                <textarea minLength={5} required value={commentBody} onChange={e=>setCommentBody(e.target.value)} name='body' className='rounded max-w-md outline outline-1 px-3 py-1' placeholder='The article is good...' rows={3} />
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <label htmlFor=''>Username</label>
                                <input minLength={5} required value={commentuser} onChange={e=>setCommentUser(e.target.value)} name='name' className='rounded max-w-md outline outline-1 px-3 py-1' placeholder='John Doe' type='text' />
                            </div>
                            <button onClick={handleSubmit} className='px-5 py-2 rounded bg-blue-700 hover:bg-blue-500 text-gray-100'>Post</button>
                        </div>
                        <div className='flex flex-1 bg-gray-700'>
                            {
                                commentsData?.map(item=>{
                                    <div className='w-full p-2 bg-gray-400 rounded text-gray-700'>
                                        <div className='flex justify-between'>
                                            <span>{item.name}</span>
                                            <span>{item.body}</span>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div> */}
                <div className="max-w-screen-xl my-4 flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 lg:pr-8">
                        <h2 className="text-xl font-semibold mb-4">Leave a Comment</h2>

                        <div className="mb-4">
                            <label htmlFor="commentUser" className="block text-sm font-medium text-gray-600">
                                Display Name
                            </label>
                            <input
                                type="text"
                                id="commentUser"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                placeholder="Enter your display name"
                                value={commentuser}
                                onChange={(e) => setCommentUser(e.target.value)}
                            />
                        </div>

                        <div className="mb-4 ">
                            <label htmlFor="commentBody" className="block text-sm font-medium text-gray-600">
                                Comment
                            </label>
                            <textarea
                                id="commentBody"
                                rows="4"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                placeholder="Enter your comment"
                                value={commentBody}
                                onChange={(e) => setCommentBody(e.target.value)}
                            ></textarea>
                        </div>

                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={handleSubmit}
                        >
                            Submit Comment
                        </button>
                    </div>

                    <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0 border-0 border-l-2 border-gray-700 w-full">
                        <h3 className="text-xl font-semibold mb-4">Comments</h3>
                        {commentsData?.map((c, index) => (
                            <div key={c.id} className="mb-4 p-2 outline outline-1 rounded w-full">
                                <p className="font-semibold">{c.name}</p>
                                <p>{c.body}</p>
                                <p className="text-gray-500 text-sm">{formatAPIDate(c.date_added)}</p>
                            </div>))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BlogDetail;