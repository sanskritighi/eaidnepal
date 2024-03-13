
import { useState } from "react";
import BlogModal from "../components/BlogModal";
import {useGET} from '../hooks/useApi'
import { Link } from "react-router-dom";



function Blogs() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data:blogList,refetch,setData:setblogList} = useGET('view_blogs/')
  const [modalData,setModelData]=useState({
    title:'Sample Title',
    content:'Sample Content'
  })


  const toggleModal = ({card}) => {
    setModelData(card)
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div className='justify-center content-center px-4 pl-8'>
        <div className='mt-4 pr-66 font-boldtext-center text-2xl  p-2 px-4 mb-4  text-slate-700'>
          Blogs
        </div>
        {/* our cards */}
        <div className='pb-5 pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6'>
           
          { blogList?.results?.map((card, index) => (
              <div key={card.id} className="bg-white rounded-lg shadow-lg overflow-hidden ">
                <img className="h-48 w-full object-cover object-center hover:scale-110 "
                
                 src={card.image} alt="Blog post image"/>
                  <div className="p-4">
                  <p className="py-4 px-6 border-b">
                                    {card.created_by}</p>

                    <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>

                    <p className="text-gray-600 mt-2 line-clamp-3">{card.content}</p>
                    <div className="mt-4">
                      {/* <span onClick={()=>toggleModal({card})} className="text-indigo-500 cursor-pointer hover:text-indigo-600 font-medium">Read more</span> */}
                      <Link key={card.id} to={`${card.id}`} className="text-blue-700 cursor-pointer hover:text-blue-600 font-medium">Read more</Link>
                    </div>
                  </div>
              </div>
            ))
          }
          
         
        </div>
      </div>
        {/* <BlogModal data={modalData} isOpen={modalOpen} setIsOpen={setModalOpen} /> */}
    </>
  )
}

export default Blogs