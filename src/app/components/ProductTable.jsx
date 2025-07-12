"use client"
import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Edit, Plus, Search, Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

function ProductTable() {
  const router = useRouter()
    const[products, setProducts] = useState([])
    const[seacrhTerm, setSearchTerm] = useState("")
    

    const addProduct = () => {
      router.push('/addproducts')
    }
    const filterProducts = useMemo((e)=>{
        return products.filter((product)=>{
            return product.name.toLowerCase().includes(seacrhTerm.toLowerCase()) || product.category.toLowerCase().includes(seacrhTerm.toLowerCase())
        })
    },[products,seacrhTerm])

    
    useEffect(() => {
       axios.get("http://127.0.0.1:8000/view_products/")
       .then((res)=>{
        // The API returns { count: number, data: array }
        console.log('API Response:', res.data);
        console.log('Products Data:', res.data.data);
        setProducts(res.data.data || [])
       })
       .catch((err)=>{
        console.error('Error fetching products:', err)
        setProducts([]) // Ensure products is always an array
       })
    }, [])
    const handleDelete = (e) => {
      // Get the button element that was clicked
      e.preventDefault()
      const button = e.currentTarget;
      const id = button.getAttribute("data-id");
      
      console.log('Deleting product with ID:', id); // Debug log
      
      if (!id) {
        console.error('No product ID found');
        toast.error("Error: Could not find product ID");
        return;
      }
      
      // Create form data and append the ID
      const formData = new FormData();
      formData.append('id', id);
      
      // Log the form data for debugging
      console.log('Sending form data:', Object.fromEntries(formData.entries()));
      
      axios.post("http://127.0.0.1:8000/delete_products/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('Delete response:', res.data);
        // Convert id to number for comparison since product.id is a number
        setProducts(products.filter((product) => product.id !== parseInt(id, 10)));
        toast.success("Product deleted successfully");
      })
      .catch((err) => {
        console.error('Error deleting product:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
        toast.error(err.response?.data?.error || "Failed to delete product");
      });
    }
    const handleUpdate = (e) => {
    const id = e.target.getAttribute("data-id")
    console.log(id)
    router.push(`/updateproducts/${id}`)
    }
  return (
    <motion.div 
    initial={{ opacity: 0,y:20 }}
    animate={{ opacity: 1,y:0 }}
    transition={{ duration: 0.5,delay:0.4 }}
    className='bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-[#1f1f1f]'> 

    <div className=' flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0'>
        <h2 className='text-base md:text-lg font-medium mb-4 text-gray-100 text-center px-4 pt-2 md:text-left'>Product Table</h2>

        <div className='relative w-full md:w-auto'>
            <input type="text" placeholder='Search'
            onChange={(e)=>setSearchTerm(e.target.value)}
            value={seacrhTerm}
            className='bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 mr-2 py-2 md:w-64 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-duration-200 text-sm'/>

            <Search className='absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400' size={18}/>
            <Plus className='absolute top-1/2 right-4 transform bg-[#1e1e1e] p-1 rounded-lg -translate-y-1/2 text-gray-400 cursor-pointer' size={25} onClick={addProduct}/>
        </div>
    </div>
    <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700 rounded-lg'>
            <thead>
                <tr>
                    {[
                        "Name",
                        "Product ID",
                        "Catagory",
                        "Price",
                        "Stock",
                        "Sales",
                        "Action"
                    ].map((header,index)=>(
                        <th key={index} className='px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider hidden md:table-cell'>
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
                {
                    filterProducts.map((product,index)=>(
                        <motion.tr
                        initial={{ opacity: 0,y:20 }}
                        animate={{ opacity: 1,y:0 }}
                        transition={{ duration: 0.5,delay:0.6 }}
                        key={product.id}
                        className='hover:bg-gray-800 border-gray md:border-none p-2 md:p-0 flex flex-col md:table-row mb-4 md:mb-0'>
                           {/* Mobile View */}
                           <td className='md:hidden px-3 py-2'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                   <Image 
                                     src={product.image ? `http://127.0.0.1:8000${product.image}` : '/images/placeholder.png'}
                                     alt={product.name} 
                                     width={50} 
                                     height={50} 
                                     className='h-12 w-12 rounded-lg object-cover'
                                     onError={(e) => {
                                       e.target.onerror = null;
                                       e.target.src = '/images/placeholder-product.png';
                                     }}
                                   />
                                   <div className='ml-3'>
                                     <p className='text-sm font-medium text-gray-100'>{product.name}</p>
                                     <p className='text-xs text-gray-400'>{product.category}</p>
                                     <p className='text-sm text-blue-400 font-medium'>${product.price}</p>
                                     <div className='flex items-center mt-1'>
                                       <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 20 ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                                         {product.stock > 20 ? 'In Stock' : 'Low Stock'}
                                       </span>  
                                     </div>
                                   </div>
                                </div>
                            </div>
                           </td>
                           
                           {/* Desktop View */}
                           <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap'>
                             <div className='flex items-center'>
                               <Image 
                                 src={product.image ? `http://127.0.0.1:8000${product.image}` : '/images/placeholder.png'}
                                 alt={product.name} 
                                 width={40} 
                                 height={40} 
                                 className='h-10 w-10 rounded-lg object-cover'
                                 onError={(e) => {
                                   e.target.onerror = null;
                                   e.target.src = '/images/placeholder-product.png';
                                 }}
                               />
                               <div className='ml-4'>
                                 <div className='text-sm font-medium text-gray-100'>{product.name}</div>
                                 <div className='text-sm md:hidden md:table-cell text-gray-400'>{product.category}</div>
                               </div>
                             </div>
                           </td>
                           <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-400'>
                             {product.productid}
                           </td>
                           <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-400'>
                             {product.category}
                           </td>
                           <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-100 font-medium'>
                             ${product.price}
                           </td>
                           <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap'>
                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 20 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                               {product.stock} in stock
                             </span>
                           </td>
                           <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-400'>
                             {product.sales} sold
                           </td>
                           <td className='sm:text-center md:table-cell px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                             <button 
                               className='text-blue-400 hover:text-blue-300 mr-4' 
                               onClick={handleUpdate} data-id={product.id}
                               aria-label={`Update product ${product.name}`}
                             >
                               <Edit size={16} />
                             </button>
                             <button className='text-red-400 hover:text-red-300' onClick={handleDelete} data-id={product.id}><Trash size={16}/></button>
                           </td>
                        </motion.tr>
                    ))
                }
            </tbody>
        </table>
    </div>
    </motion.div>
  )
}

export default ProductTable