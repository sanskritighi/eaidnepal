import React,{useState} from 'react'
import axios from '../api/axios';
import API_URLS from '../api/constants';
import {toast} from 'react-toastify'

const Contact = () => {

  const [formData, setformData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
    })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    name: null,
    phone: null,
    email: null,
    message: null,
    api: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSuccess = () => {
    setError("");
    setformData({
      name: "",
      phone: "",
      email: "",
      message: "",
    })
    toast.success('Message Sent Successfully')
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const localValidationOk = handleValidation()
    if (localValidationOk === false) {
      setLoading(false)
      return
    }
    setError({ api: null, name: null, email: null, phone: null, message: null})
    console.log(formData)
    axios.post(`${API_URLS.contact}/`,{
      'name':formData.name, 
      'email':formData.email, 
      'phone':formData.phone, 
      'message':formData.message
    }).then(
      resp => {
          handleSuccess()
      }
    ).catch(
      err =>{
        toast.error(err.message)
      }
        
    ).finally(
          () => { setLoading(false) }
        )
  }

  const handleValidation = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Name is required.";
    }

    if (!formData.email) {
      errors.email = "Email is required.";
    }  


    if (!formData.message) {
      errors.message = "Message is required.";
    }


    setError(errors);

    // Return true if there are no errors, otherwise return false
    return Object.keys(errors).length === 0;
  };

  return (
    <div className='justify-center content-center px-4 pl-8 w-full'>
    <div className='mt-4 pr-66 font-boldtext-center text-2xl  p-2 px-4 mb-4  text-slate-700'>
      Contact Us
    </div>
    <form onSubmit={handleSubmit} className='w-full px-10'>
        <div className="mb-4 w-full">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-600">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="mt-1 p-2 w-full border rounded-md"
            required
          ></textarea>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
  }



export default Contact;