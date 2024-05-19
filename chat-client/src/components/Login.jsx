import { useState } from "react"

function Login({setLoginStatus, setUserName}) {
    const[registration, setRegistration] = useState(true)

    const toggleRegistration = () => {
        if (registration) {
            setRegistration(false)
        } else {
            setRegistration(true)
        }
    }

    const[name, setName] = useState("")
    const[signEmail, setSignEmail] = useState("")
    const[signPass, setSignPass] = useState("")

    const[logEmail, setLogEmail] = useState("")
    const[logPass, setLogPass] = useState("")

    const[logMessage, setLogMessage] = useState("login message")
    const[signMessage, setSignMessage] = useState("signup message")

    const signUp = async (e) => {
        e.preventDefault()
        const userData = {
            name: name,
            email: signEmail,
            password: signPass
        }
        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(userData)
            })
            const data = await response.json()
            console.log(data)
            setLogMessage(data.message);
            e.target.children[4].classList.toggle("opacity-0")
            setTimeout(() => {
                e.target.children[4].classList.toggle("opacity-0")
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
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(userData)
            })
            const data = await response.json()
            console.log(data)
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
                <form onSubmit={signUp} className={`${registration? "flex" : "hidden"} transition-all flex-col gap-4 items-center`}>
                    <input onChange={(e) => {setName(e.target.value)}} required type="text" placeholder="Name" className="outline-none p-3 rounded w-[80vw] sm:w-[50vw] lg:w-[30vw] xl:w-[20vw] h-10 border-slate-600" />
                    <input onChange={(e) => {setSignEmail(e.target.value)}} required type="email" placeholder="Email" className="outline-none p-3 rounded w-[80vw] sm:w-[50vw] lg:w-[30vw] xl:w-[20vw] h-10 border-slate-600" />
                    <input onChange={(e) => {setSignPass(e.target.value)}} required type="password" placeholder="Password" className="outline-none p-3 rounded w-[80vw] sm:w-[50vw] lg:w-[30vw] xl:w-[20vw] h-10 border-slate-600" />
                    <button type="submit" className="text-white w-full h-10 sm:w-4/6 mt-6 bg-green-600 hover:bg-green-800 focus:bg-green-400 pl-2 pr-2 rounded">Sign up</button>
                    <span onClick={toggleRegistration} className="flex text-white gap-2">Already have an account? <p className="text-blue-500 hover:text-blue-300 cursor-pointer">Login</p></span>
                    <span className="text-white bg-orange-500 p-2 rounded transition-all opacity-0">{signMessage}</span>
                </form>
                <form onSubmit={login} className={`${registration? "hidden" : "flex"} transition-all flex-col gap-4 items-center`}>
                    <input onChange={(e) => {setLogEmail(e.target.value)}} required type="email" placeholder="Email" className="outline-none p-3 rounded w-[80vw] sm:w-[50vw] lg:w-[30vw] xl:w-[20vw] h-10 border-slate-600" />
                    <input onChange={(e) => {setLogPass(e.target.value)}} required type="password" placeholder="Password" className="outline-none p-3 rounded w-[80vw] sm:w-[50vw] lg:w-[30vw] xl:w-[20vw] h-10 border-slate-600" />
                    <button type="submit" className="text-white w-full h-10 sm:w-4/6 mt-6 bg-green-600 hover:bg-green-800 focus:bg-green-400 pl-2 pr-2 rounded">Login</button>
                    <span onClick={toggleRegistration} className="flex text-white gap-2">Already have an account? <p className="text-blue-500 hover:text-blue-300 cursor-pointer">Sign up</p></span>
                    <span className="text-white bg-orange-500 p-2 rounded transition-all opacity-0">{logMessage}</span>
                </form>
            </div>
        </>
    )
}

export default Login