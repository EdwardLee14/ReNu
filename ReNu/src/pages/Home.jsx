import React from 'react'

const Home = () => {
    return (
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
    )
}

export default Home