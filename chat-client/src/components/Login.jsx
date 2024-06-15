import { useRef, useState } from "react"

function Login({ setLoginStatus, setUserName }) {
    const [registration, setRegistration] = useState(true)

    const toggleRegistration = () => {
        if (registration) {
            setRegistration(false)
        } else {
            setRegistration(true)
        }
    }

    const [name, setName] = useState("")
    const [signEmail, setSignEmail] = useState("")
    const [signPass, setSignPass] = useState("")

    const [logEmail, setLogEmail] = useState("")
    const [logPass, setLogPass] = useState("")

    const [logMessage, setLogMessage] = useState("login message")
    const [signMessage, setSignMessage] = useState("signup message")

    const signLoader = useRef(null)
    const logLoader = useRef(null)

    const signUp = async (e) => {
        e.preventDefault()
        const userData = {
            name: name,
            email: signEmail,
            password: signPass
        }
        try {
            signLoader.current.classList.toggle("opacity-0")
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            const data = await response.json()
            signLoader.current.classList.toggle("opacity-0")

            setSignMessage(data.message);
            e.target.children[5].classList.toggle("opacity-0")
            setTimeout(() => {
                e.target.children[5].classList.toggle("opacity-0")
            }, 3000);
            if (data.message == "Signup successful!") {
                setUserName(name)
                setLoginStatus(true)
            }
        } catch (error) {
            console.log(`Error: ${error}`)
            alert("There was a problem while signing up!")
        }
    }

    const login = async (e) => {
        e.preventDefault()
        const userData = {
            email: logEmail,
            password: logPass
        }
        try {
            logLoader.current.classList.toggle("opacity-0")
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            const data = await response.json()
            logLoader.current.classList.toggle("opacity-0")
            
            setLogMessage(data.message);
            e.target.children[4].classList.toggle("opacity-0")
            setTimeout(() => {
                e.target.children[4].classList.toggle("opacity-0")
            }, 3000);
            if (data.message == "Login successful!") {
                setUserName(data.name)
                setLoginStatus(true)
            }
        } catch (error) {
            console.log(`Error: ${error}`)
            alert("There was a problem while logging in!")
        }
    }

    return (
        <>
            <div className="w-screen h-screen bg-[#323643] overflow-hidden p-4 flex justify-center items-center">
                <form onSubmit={ signUp } className={ `${registration ? "flex" : "hidden"} transition-all flex-col gap-4 items-center` }>
                    <input onChange={ (e) => { setName(e.target.value) } } required type="text" placeholder="Name" className="outline-none p-3 rounded w-[80vw] sm:w-[50vw] lg:w-[30vw] xl:w-[20vw] h-10 border-slate-600" />
                    <input onChange={ (e) => { setSignEmail(e.target.value) } } required type="email" placeholder="Email" className="outline-none p-3 rounded w-[80vw] sm:w-[50vw] lg:w-[30vw] xl:w-[20vw] h-10 border-slate-600" />
                    <input onChange={ (e) => { setSignPass(e.target.value) } } required type="password" placeholder="Password" className="outline-none p-3 rounded w-[80vw] sm:w-[50vw] lg:w-[30vw] xl:w-[20vw] h-10 border-slate-600" />
                    <button type="submit" className="flex justify-center items-center gap-4 text-white w-full h-10 sm:w-4/6 mt-6 bg-green-600 hover:bg-green-800 focus:bg-green-400 pl-2 pr-10 rounded">
                        <div role="status">
                            <svg ref={signLoader} className="opacity-0 transition-all inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                        Sign up</button>
                    <span data-testid="login-toggle" onClick={ toggleRegistration } className="flex text-white gap-2">Already have an account? <p className="text-blue-500 hover:text-blue-300 cursor-pointer">Login</p></span>
                    <span className="text-white bg-orange-500 p-2 rounded transition-all opacity-0">{ signMessage }</span>
                </form>
                <form onSubmit={ login } className={ `${registration ? "hidden" : "flex"} transition-all flex-col gap-4 items-center` }>
                    <input onChange={ (e) => { setLogEmail(e.target.value) } } required type="email" placeholder="Email" className="outline-none p-3 rounded w-[80vw] sm:w-[50vw] lg:w-[30vw] xl:w-[20vw] h-10 border-slate-600" />
                    <input onChange={ (e) => { setLogPass(e.target.value) } } required type="password" placeholder="Password" className="outline-none p-3 rounded w-[80vw] sm:w-[50vw] lg:w-[30vw] xl:w-[20vw] h-10 border-slate-600" />
                    <button type="submit" className="flex justify-center items-center gap-4 text-white w-full h-10 sm:w-4/6 mt-6 bg-green-600 hover:bg-green-800 focus:bg-green-400 pl-2 pr-10 rounded"><div role="status">
                        <svg ref={logLoader} className="opacity-0 inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>Login</button>
                    <span data-testid="signup-toggle" onClick={ toggleRegistration } className="flex text-white gap-2">Already have an account? <p className="text-blue-500 hover:text-blue-300 cursor-pointer">Sign up</p></span>
                    <span className="text-white bg-orange-500 p-2 rounded transition-all opacity-0">{ logMessage }</span>
                </form>
            </div>
        </>
    )
}

export default Login