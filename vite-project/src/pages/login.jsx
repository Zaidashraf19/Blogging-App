import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate()
    const [msg, setMsg] = useState('');

    const signin = async (event) => {

        event.preventDefault();

        // GETTING VALUE OF INPUTS
        const email = event.target.elements[0].value;
        const password = event.target.elements[1].value;


        // SIGN IN
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setMsg("Sucessfully Login ");
                event.target.reset();
                navigate('home');
            })
            .catch((error) => {
                setMsg("LOgin failed," + error.message )
            });


        // FILL ALL INPUTS
        if (!email || !password) {
            setMsg("Please fill all fields");
            return;
        }
    }
    return (
        <>
            <div className="flex items-center justify-center">
                <div className="p-5 rounded shadow text-shadow text-lg">
                    <h1 className="text-center text-xl font-bold">Sign In</h1> <br /> <hr /> <br />
                    <form onSubmit={signin}>
                        <h2 className="text-center uppercase m-2 underline text-red-800 text-xl"> {msg}</h2>
                        <input type="text" placeholder="Enter email address" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                        <input type="password" placeholder="Password" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                        <button className="w-full border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-1"> Login  </button> <br /> <br />
                    </form>
                    <p className="text-red-700 cursor-pointer text-center text-sm hover:underline">Forget Password ?</p> <br /> <hr /> <br />
                    <Link to={'register'}><button className="w-full border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-1 items-center text-center"> Create New Account </button> </Link>
                </div>
            </div>
        </>
    )
}


export default Login