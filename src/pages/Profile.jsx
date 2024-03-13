import React from 'react'
import { useState,useRef } from 'react'
import AvtLog2 from "../assets/avtlog2.png";
import { BiEditAlt } from 'react-icons/bi';


const Profile = () => {

    const fileuploadRef=useRef()

    const baseFormData = {
        firstName: '',
        lastName: '',
        email:'',
        gender: 'M',
        contact: '',
        profileImage: AvtLog2
    }
    const baseFormErrors = {
        firstName: null,
        lastName: null,
        email:null,
        gender: null,
        contact: null,
        profileImage: null
    }
    const [editProfileActive, setEditProfileActive] = useState(false)
    const [formData, setFormData] = useState(baseFormData);
    const [formErrors,setformErrors]=useState(baseFormErrors)

    const handleFnameChange=(e)=>{
        setFormData(prevVal=>({...prevVal,firstName:e.target.value}))
    }
    const handleLnameChange=(e)=>{
        setFormData(prevVal=>({...prevVal,lastName:e.target.value}))
    }
    const handleEmailChange=(e)=>{
        setFormData(prevVal=>({...prevVal,email:e.target.value}))
    }

    const handlegenderChange=(e)=>{
        setFormData(prevval=>({...prevval,gender:e.target.value}))
    }
    const handlecontactChange=(e)=>{
        if (/^$|(^\d+$)/.test(e.target.value)){
            setFormData(prevVal=>({...prevVal,contact:e.target.value}))
        }
    }
    // const handleimageChange=(e)=>{
    //     setFormData({...baseFormData,profileImage:e.target.value})
    // }
    const handleimageChange = (e) => {
        const { files } = e.target;
        if (files && files.length) {
          let imagePath = URL.createObjectURL(files[0]);
          setFormData(prevval=>({...prevval,profileImage:imagePath}))
        //   setImage(imagePath);
        }
      };
      const handleUploadClick = () => {
        fileuploadRef.current.click();
      };
    

    const toggleProfileEdit=(e)=>{
        setEditProfileActive(!editProfileActive)
    }

    const allValidationsPassed=()=>{
        var allok=true;
        if(formData.firstName.length < 3){
                setformErrors(prevval=>({...prevval,firstName:'First Name should be greater than 3 character'}))
                allok=false
            }
        if(formData.lastName.length < 3){
                setformErrors(prevval=>({...prevval,lastName:'Last Name should be greater than 3 character'}))
                allok=false
            }
        if(formData.contact.length !== 10){
                setformErrors(prevval=>({...prevval,contact:'Contact should be 10 digit number'}))
                allok=false
            }

        return allok;

        }

    const handleProfileEdit=(e)=>{
        e.preventDefault()
        const isValid=allValidationsPassed()
        console.log(formErrors)
        console.log(isValid)
        if (isValid){
            setEditProfileActive(false)
        }
    }



    return (
        <div className='w-full h-full max-h-full flex flex-col items-center p-4 gap-2 overflow-y-scroll'>
            <h2 className='p-3 text-left w-full text-2xl font-semibold text-gray-600'>Admin Profile</h2>
            <div className='flex gap-1 flex-col items-center bg-gray-100 rounded min-w-md p-4'>

                {/* for edit button */}
                <div className='flex w-full justify-end'>
                    <button onClick={toggleProfileEdit} className={`outline outline-1 hover:text-gray-100 transition-colors rounded px-3 py-2 ${editProfileActive ?'outline-red-500 hover:bg-red-500' :'outline-blue-500 hover:bg-blue-500' }`}>
                        {
                            editProfileActive ? 'Cancel Edit':'Edit Profile'
                        }
                    </button>
                </div>

                {/* for image */}
                <div className='w-24 h-24 relative rounded-full'>
                    <a href={formData.profileImage} target='_blank'>
                    <img src={formData?.profileImage} className='w-full h-full rounded-full outline outline-1 outline-offset-2' />
                    </a>
                    {
                        editProfileActive &&
                        <span onClick={handleUploadClick} className='absolute bottom-1 right-0 p-2 rounded-full bg-blue-400 hover:cursor-pointer hover:bg-blue-500'><BiEditAlt className='text-gray-200 w-4 h-4' /></span>
                    }
                    <input ref={fileuploadRef} onChange={handleimageChange} type='file' className='hidden appearance-none'/>
                </div>
                <form onSubmit={handleProfileEdit} className='pt-4 flex flex-col gap-2'>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        <div className='block space-y-1 p-2'>
                            <label className='text-gray-500 text-md tracking-wider'>First Name</label>
                            <input required placeholder='John'   value={formData.firstName} onChange={handleFnameChange} readOnly={!editProfileActive} type='text' className='peer px-2 py-1 w-full border border-gray-600 rounded' />
                            {formErrors?.firstName && <p className='text-red-500 text-sm font-thin'>{formErrors.firstName}</p>}
                        </div>
                        <div className='block space-y-1 p-2'>
                            <label className='text-gray-500 text-md tracking-wider'>Last Name</label>
                            <input required placeholder='Doe' value={formData.lastName} onChange={handleLnameChange} readOnly={!editProfileActive} type='text' className='px-2 py-1 w-full border border-gray-600 rounded' />
                            {formErrors?.lastName && <p className='text-red-500 text-sm font-thin'>{formErrors.lastName}</p>}

                        </div>
                    </div>
                    <div className='flex flex-col space-y-1 p-2'>
                        <label className='text-gray-500 text-md tracking-wider'>Email</label>
                        <input value={formData.email} onChange={handleEmailChange} required placeholder='johndoe007@gmail.com' readOnly={!editProfileActive} type='email' className='px-2 py-1 w-full border border-gray-600 rounded' />
                    </div>
                    
                    <div className='flex flex-col space-y-1 p-2'>
                        <label className='text-gray-500 text-md tracking-wider'>Contact</label>
                        <input value={formData.contact} onChange={handlecontactChange} required placeholder='98458XXXXX' maxLength={10} readOnly={!editProfileActive} type='tel' className='px-2 py-1 w-full border border-gray-600 rounded' />
                        {formErrors?.contact && <p className='text-red-500 text-sm font-thin'>{formErrors.contact}</p>}

                    </div>
                    <div className='flex flex-col space-y-1 p-2'>
                        <label className='text-gray-500 text-md tracking-wider'>Gender</label>
                        <div className='flex gap-12 justify-start'>
                            <label htmlFor='radio-male' className='flex gap-2 ring-1  hover:ring-2 border-1 border-gray-600 rounded px-2 py-1 cursor-pointer'>
                                <input onChange={handlegenderChange} checked={formData.gender=='M'} disabled={!editProfileActive} id='radio-male' name='male' type='radio' value={'M'} className='apperance-none' />
                                <span className='text-slate-700'>Male</span>
                            </label>
                            <label htmlFor='radio-female' className='flex gap-2 ring-1  hover:ring-2 border-1 border-gray-600 rounded px-2 py-1 cursor-pointer'>
                                <input onChange={handlegenderChange} checked={formData.gender=='F'} disabled={!editProfileActive} id='radio-female' name='male' type='radio' value={'F'} className='apperance-none' />
                                <span className='text-slate-700'>Female</span>
                            </label>
                            <label htmlFor='radio-others' className='flex gap-2 ring-1  hover:ring-2 border-1 border-gray-600 rounded px-2 py-1 cursor-pointer'>
                                <input onChange={handlegenderChange} checked={formData.gender=='O'} disabled={!editProfileActive} id='radio-others' name='male' type='radio' value={'O'} className='apperance-none' />
                                <span className='text-slate-700'>Others</span>
                            </label>
                        </div>
                    </div>
                    {
                        editProfileActive && 
                        <div className='flex max-w-sm w-full p-2 md:w-24'>
                        <button className='px-3 w-full py-2 bg-blue-500 rounded text-gray-200 hover:bg-blue-400'>Save</button>
                    </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default Profile;