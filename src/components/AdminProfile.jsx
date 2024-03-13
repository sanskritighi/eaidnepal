import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import {RiAdminLine} from 'react-icons/ri'
import {AiOutlineMail} from 'react-icons/ai'

const AdminProfile = () => {

  const { user, getUser } = useAuth()

  // const {data}=useGET('/profile/',{},true)
  // console.log(data)

  useEffect(() => {
    getUser()
    return () => {
    }
  }, [])


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Profile</h2>
      </div>
      <div className='flex justify-center items-center w-full h-max'>
        <div className='w-full md:max-w-md mt-2 rounded flex flex-col gap-3 justify-center items-center p-4  shadow-md bg-gray-100'>
          <div className='w-16 h-16 uppercase text-2xl rounded-full bg-blue-700 text-gray-100 flex justify-center items-center'>
            {user?.name?.charAt(0)}
          </div>
          <div className='flex flex-col space-y-4  justify-center '>
            <div className='flex w-full group gap-1 justify-start items-center space-x-4 hover:cursor-pointer hover:bg-gray-200 p-2 rounded'>
              <RiAdminLine className='w-6 h-6 group-hover:text-red-500'/>
              <span className='text-md capitalize'>{user?.name}</span>
            </div>
            <div className='flex group w-full gap-1 justify-start items-center space-x-4 hover:cursor-pointer hover:bg-gray-200 p-2 rounded'>
            <AiOutlineMail className='w-6 h-6 group-hover:text-blue-500'/>
            <span>{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile