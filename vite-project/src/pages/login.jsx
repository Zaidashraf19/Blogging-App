import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const Login = () => {
    const navigate = useNavigate()
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
                    navigate('feed');
                }
                ).catch((error) => {
                    setMsg("LOgin failed!!")
                });
        }
    }


    return (
        <>
            <div className="flex items-center justify-center">
                <div className="p-5 rounded bg-[#ff8355] shadow shadow-[#ff8355] text-lg">
                    <h1 className="text-center text-2xl font-bold">Sign In</h1> <br /> <hr /> <br />
                    <form onSubmit={signin}>
                        <h2 className="text-center uppercase m-2 underline text-xl"> {msg}</h2>
                        <input type="email" ref={email} placeholder="Enter email address" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                        <input type="password" ref={password} placeholder="Password" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                        <button className="w-full border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-1"> Login  </button> <br /> <br />
                    </form>
                    <p className="cursor-pointer text-center text-sm hover:underline">Forget Password ?</p> <br /> <hr /> <br />
                    <Link to={'register'}><button className="w-full border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-1 items-center text-center"> Create New Account </button> </Link>
                </div>
            </div>
        </>
    )
}


export default Login