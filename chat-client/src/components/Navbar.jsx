import { useState } from 'react'
import logo from '../assets/logo.png'

function Navbar() {

    const [translate, setTranslate] = useState(60)

    const toggleSideNav = () => {
        if (translate == 0) {
            setTranslate(60)
        }
        else {
            setTranslate(0)
        }
    }

    return (
        <>
            {/* Navbar */ }
            <nav className="h-16 bg-[#333333] p-2 fixed w-screen">
                <ul className="flex justify-between">
                    <li className="font-mono text-white text-xl flex gap-2 items-center"><img src={ logo } width={ 40 } alt="logo" /><p className="hidden sm:block">Latracal Chat Room</p></li>
                    <button onClick={toggleSideNav} className="inline-flex mr-8 items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </ul>
            </nav>

            {/* Side nav bar */ }

            <div className={ `bg-[#333333] top-16 w-60 h-full transition-all -translate-x-${translate} p-2 fixed flex flex-col` }>
                <h4 className='text-white text-center text-xl font-bold'>Online Users</h4><hr className='mt-2 mb-1 border-slate-600' />
                <div className='h-4/6 text-white text-center overflow-y-scroll'>
                    <p className='mt-3'>User1</p>
                    <p className='mt-3'>User1</p>
                    <p className='mt-3'>User1</p>
                    <p className='mt-3'>User1</p>
                    <p className='mt-3'>User1</p>
                    <p className='mt-3'>User1</p>
                    <p className='mt-3'>User1</p>
                    <p className='mt-3'>User1</p>
                    <p className='mt-3'>User1</p>
                    <p className='mt-3'>User1</p>
                    <p className='mt-3'>User1</p>
                    <p className='mt-3'>User1</p>
                    <p className='mt-3'>User2</p>
                    <p className='mt-3'>User2</p>
                    <p className='mt-3'>User2</p>
                    <p className='mt-3'>User2</p>
                    <p className='mt-3'>User2</p>
                    <p className='mt-3'>User2</p>
                    <p className='mt-3'>User2</p>
                    <p className='mt-3'>User2</p>
                    <p className='mt-3'>User2</p>
                    <p className='mt-3'>User2</p>
                    <p className='mt-3'>User2</p>
                    <p className='mt-3'>User2</p>
                    <p className='mt-3'>User2</p>
                    <p className='mt-3'>User3</p>
                    <p className='mt-3'>User3</p>
                    <p className='mt-3'>User3</p>
                    <p className='mt-3'>User3</p>
                </div>
                <button type="button" class="text-white mt-8 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Logout</button>
            </div>
        </>
    )
}

export default Navbar