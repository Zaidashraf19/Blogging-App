import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const Login = () => {

    // NAVIGATION
    const navigate = useNavigate();

    // USESTATE
    const [msg, setMsg] = useState('');


    // GETTING VALUE OF INPUTS
    const email = useRef();
    const password = useRef();


    const signin = async (event) => {

        event.preventDefault();

        // ALL FEILDS SHOULD BE FILL
        if (!email.current.value || !password.current.value) {
            setMsg("Please fill all fields!!");
            return;
        } else {
            // SIGN IN
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setMsg("Sucessfully Login!!");
                    email.current.value = ''
                    password.current.value = ''
                    navigate('/');
                }
                ).catch((error) => {
                    console.log(error.message);
                    setMsg("LOgin failed!!" + error.message)
                });
        }
    }


    return (
        <>
            <div className="flex items-center justify-center">
                <div className="bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

                    <form onSubmit={signin}>
                        <h2 className="text-center uppercase m-2 underline text-xl text-red-800">{msg}</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
                            <input ref={email} type="email" placeholder="Enter email address" className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-500" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Enter Password</label>
                            <input ref={password} type="password" placeholder="Enter Password" className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-500" />
                        </div>

                        <button className="w-full bg-black text-white font-semibold rounded-lg p-2 hover:bg-gray-800 transition duration-200">Login</button>
                    </form>

                    <p className="cursor-pointer text-center text-sm hover:underline mt-4 text-red-800">Forget Password?</p>
                    <hr className="my-4" />

                    <Link to={'register'}>
                        <button className="w-full bg-black text-white font-semibold rounded-lg p-2 hover:bg-gray-800 transition duration-200">Create New Account</button>
                    </Link>
                </div>
            </div>
        </>
    )
}


export default Login