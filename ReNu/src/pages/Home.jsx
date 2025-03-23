import React from 'react'
import dented from '../assets/dentedcan.jpg'

const Home = () => {
    return (
        <div>
            <div className='bg-gray-100 flex flex-row justify-between p-16'>
                <div>
                    <div className='text-5xl font-bold ml-12'>
                        <h1>Shop Sustainably,</h1>
                        <h1 style={{
                            color: '#006F61',
                        }} className='text-green-700'>Save Substantially</h1>
                    </div>
                    <div className='text-xl mt-6 max-w-3xl ml-12'>
                        <p>Get quality products at 50-70% off retail prices while reducing waste and helping the planet. ReNu revives short-dated food and defective but usable items that would otherwise go to waste.</p>
                    </div>
                    <div className='ml-12 mt-4'>
                        <button
                            className='mt-6 bg-green-500 text-white py-4 px-7 rounded-full hover:bg-green-600 transition duration-300'
                            onClick={() => window.location.href = '/map'}
                        >
                            Shop Now
                        </button>
                    </div>

                </div>

                <div className='ml-40 w-160'>
                    <img
                        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmRobHQzMWY0cHJsY2hvcHJhY2F0Z3VndHFrZmM0Z25ydGdrYTRrbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZbYn4oHxydD5oqXa7g/giphy.gif"
                        alt="Produce GIF"
                    />
                </div>
                <div>
                </div>
            </div>
            
            {/* What We Offer Section Header */}
            <div className='text-center mt-10 mb-8'>
                <h1 className='text-3xl font-bold'>What We Offer</h1>
                <h3 className='mt-3 text-gray-600 max-w-3xl mx-auto'>Browse our growing selection of sustainable shopping options at unbeatable prices</h3>
            </div>
            
            {/* Products Grid */}
            <div className='container mx-auto px-4 mb-16'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {/* Product Card 1 */}
                    <div className='bg-white border border-gray-200 rounded-xl overflow-hidden transition transform hover:shadow-xl hover:-translate-y-1'>
                        <div className='h-48 bg-gray-200 relative'>
                            {/* Replace with actual image */}
                            <img src={dented} alt='dented can' className='object-cover h-full w-full'/>
                        </div>
                        <div className='p-6'>
                            <h3 className='text-xl font-bold text-gray-800 mb-2'>Cupboard Food</h3>
                            <p className='text-gray-600 mb-4'>Quality pantry items 2-3 months before expiry or with minor packaging defects.</p>
                            <a href="/products/cupboard-food" className='text-green-600 font-medium hover:underline'>Shop Now →</a>
                        </div>
                    </div>

                    {/* Product Card 2 */}
                    <div className='bg-white border border-gray-200 rounded-xl overflow-hidden transition transform hover:shadow-xl hover:-translate-y-1'>
                        <div className='h-48 bg-gray-200 relative'>
                            {/* Replace with actual image */}
                            <div className='absolute inset-0 flex items-center justify-center text-gray-500'>
                                Product Image
                            </div>
                        </div>
                        <div className='p-6'>
                            <h3 className='text-xl font-bold text-gray-800 mb-2'>E-Commerce Returns</h3>
                            <p className='text-gray-600 mb-4'>Returned or slightly defective items that are perfectly usable at massive discounts.</p>
                            <a href="/products/ecommerce-returns" className='text-green-600 font-medium hover:underline'>Shop Now →</a>
                        </div>
                    </div>
                    
                    {/* Product Card 3 */}
                    <div className='bg-white border border-gray-200 rounded-xl overflow-hidden transition transform hover:shadow-xl hover:-translate-y-1'>
                        <div className='h-48 bg-gray-200 relative'>
                            {/* Replace with actual image */}
                            <div className='absolute inset-0 flex items-center justify-center text-gray-500'>
                                Product Image
                            </div>
                        </div>
                        <div className='p-6'>
                            <h3 className='text-xl font-bold text-gray-800 mb-2'>F&B Cooking Bundles</h3>
                            <p className='text-gray-600 mb-4'>Repackaged food from restaurants and suppliers with recipe inspirations.</p>
                            <a href="/products/cooking-bundles" className='text-green-600 font-medium hover:underline'>Shop Now →</a>
                        </div>
                    </div>
                </div>
                
                {/* View All Products Button */}
                <div className='text-center mt-12'>
                    <a href="/products" className='border border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-full text-lg font-medium inline-block transition'>View All Products</a>
                </div>
            </div>
        </div>
    )
}

export default Home