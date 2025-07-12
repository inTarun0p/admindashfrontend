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
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', name.current.value);
        formData.append('productid', productid.current.value);
        formData.append('category', category.current.value);
        formData.append('price', price.current.value);
        formData.append('stock', stock.current.value);
        formData.append('sales', sales.current.value);

        // Append image only if file is selected
        if (image.current.files.length > 0) {
            const file = image.current.files[0];
            console.log('Selected image:', {
                name: file.name,
                type: file.type,
                size: file.size
            });
            
            // Add image with additional metadata
            formData.append('image', file, file.name);
            formData.append('image_name', file.name);
            formData.append('image_type', file.type);
            formData.append('image_size', file.size);
        } else {
            console.log('No image selected');
        }
        
        // Add validation before sending request
        if (!name.current.value || !category.current.value || !price.current.value || !stock.current.value) {
            toast.error("Please fill all required fields", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        // Validate and log form data before sending
        const formDataObject = {
            name: name.current.value.trim(),
            productid: productid.current.value.trim(),
            category: category.current.value.trim(),
            price: parseFloat(price.current.value.trim()),
            stock: parseInt(stock.current.value.trim()),
            sales: parseInt(sales.current.value.trim()),
            image: image.current.files[0]
        };

        // Validate image if selected
        if (formDataObject.image) {
            const maxSize = 5 * 1024 * 1024; // 5MB
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

            if (!allowedTypes.includes(formDataObject.image.type)) {
                toast.error("Please upload a valid image file (JPEG, PNG, or GIF)", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }

            if (formDataObject.image.size > maxSize) {
                toast.error("Image file is too large. Maximum size is 5MB", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return;
            }
        }

        // Log all form data values
        console.log('Form data values:', {
            name: formDataObject.name,
            productid: formDataObject.productid,
            category: formDataObject.category,
            price: formDataObject.price,
            stock: formDataObject.stock,
            sales: formDataObject.sales,
            image: formDataObject.image ? {
                name: formDataObject.image.name,
                type: formDataObject.image.type,
                size: formDataObject.image.size
            } : 'No file selected'
        });

        // Log the actual FormData object
        const formDataEntries = Array.from(formData.entries());
        console.log('FormData entries:', formDataEntries);

        // Validate data types
        if (isNaN(formDataObject.price) || isNaN(formDataObject.stock)) {
            toast.error("Price and stock must be valid numbers", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        // Add error handling for network issues
        try {
            const response = await axios.post("https://adminbackend-czlc.onrender.com/add_product/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                timeout: 10000,
                validateStatus: function (status) {
                    // Consider any status between 200-599 as successful
                    return status >= 200 && status < 600;
                }
            });
            
            console.log('Success response:', response.data);
            toast.success("Product added successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            
            // Refresh the products list
            router.refresh();
            router.push('/Product');
        } catch (error) {
            console.error('Request failed:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                request: {
                    method: error.config?.method,
                    url: error.config?.url,
                    headers: error.config?.headers,
                    data: Array.from(formData.entries())
                }
            });

            // Try to get more detailed error information
            if (error.response?.data) {
                try {
                    const errorData = JSON.parse(error.response.data);
                    console.error('Parsed error response:', errorData);
                } catch (parseError) {
                    console.error('Could not parse error response:', error.response.data);
                }
            }

            // Show detailed error message to user
            // Log the full request configuration
            console.error('Request configuration:', {
                url: error.config?.url,
                method: error.config?.method,
                headers: {
                    ...error.config?.headers,
                    'Content-Type': error.config?.headers?.['Content-Type']
                },
                timeout: error.config?.timeout
            });

            // Log the server response
            console.error('Server response:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                headers: error.response?.headers
            });

            // Show detailed error message to user
            let errorMessage = "Failed to add product. Please check:";
            if (error.response?.data) {
                try {
                    const errorData = JSON.parse(error.response.data);
                    if (errorData.error?.includes('InvalidStorageError')) {
                        errorMessage += `\n- Storage configuration error: ${errorData.error}`;
                        errorMessage += '\n- Please contact the administrator to check the storage settings';
                    } else {
                        errorMessage += `\n- Server error: ${errorData.error || errorData.message || 'Unknown error'}`;
                    }
                } catch {
                    errorMessage += `\n- Server error: ${error.response.data}`;
                }
            } else {
                errorMessage += `\n- Server returned status ${error.response?.status || 'unknown'}`;
            }

            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                className: "max-w-full"
            });
            
            // Check for specific error types
            if (error.response) {
                // The request was made and the server responded with a status code
                toast.error(error.response.data?.message || `Server error: ${error.response.status}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if (error.request) {
                // The request was made but no response was received
                toast.error("No response from server. Please check your internet connection.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error(error.message || "Failed to add product. Please check the console for details.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
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