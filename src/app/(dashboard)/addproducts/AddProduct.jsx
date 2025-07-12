"use client"
import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

function AddProduct() {
    const router = useRouter()
    const name = useRef()
    const category = useRef()
    const price = useRef()
    const stock = useRef()
    const sales = useRef()
    const image = useRef()
    const productid = useRef()
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', name.current.value);
        formData.append('productid',productid.current.value)
        formData.append('category', category.current.value);
        formData.append('price', price.current.value);
        formData.append('stock', stock.current.value);
        formData.append('sales', sales.current.value);
        
        // Check if a file is selected
        if (image.current.files[0]) {
            formData.append('image', image.current.files[0]);
        }
        
        axios.post("http://127.0.0.1:8000/add_product/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response)=>{
            console.log(response.data)
            toast.success("Product added successfully",{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            router.push('/Product')
        })
        .catch((error)=>{
            console.log(error)
            toast.error("Something went wrong",{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        })
    }
    return (
       <motion.div 
       initial={{ opacity: 0,y:20 }}
       animate={{ opacity: 1,y:0 }}
       transition={{ duration: 0.5 }}
       className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl mx-8 my-4 border border-[#1f1f1f]'>
        <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0'>
            <h2 className='text-base md:text-lg font-medium mb-4 text-gray-100 text-center px-4 pt-2 md:text-left'>Add Product</h2>
        </div>
        <form action="" method='POST' onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                <div className='mb-4'>
                    <label htmlFor="name" className='block text-sm font-medium text-gray-100 mb-2'>Product Name</label>
                    <input type="text" id="name" name="name" ref={name} className='w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600'/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="productid" className='block text-sm font-medium text-gray-100 mb-2'>Product ID</label>
                    <input type="text" id="productid" name="productid" ref={productid} className='w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600'/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="category" className='block text-sm font-medium text-gray-100 mb-2'>Category</label>
                    <input type="text" id="category" name="category" ref={category} className='w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600'/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="price" className='block text-sm font-medium text-gray-100 mb-2'>Price</label>
                    <input type="text" id="price" name="price" ref={price} className='w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600'/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="stock" className='block text-sm font-medium text-gray-100 mb-2'>Stock</label>
                    <input type="text" id="stock" name="stock" ref={stock} className='w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600'/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="sales" className='block text-sm font-medium text-gray-100 mb-2'>Sales</label>
                    <input type="text" id="sales" name="sales" ref={sales} className='w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600'/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="image" className='block text-sm font-medium text-gray-100 mb-2'>Image</label>
                    <input type="file" id="image" name="image" ref={image} className='w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600'/>
                </div>
            </div>
            <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mb-4 ml-4 rounded-lg'>Add Product</button>
        </form>
       </motion.div>
    )
}

export default AddProduct   