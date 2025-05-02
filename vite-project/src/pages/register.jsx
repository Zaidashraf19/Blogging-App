import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const handleGoBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };


    // SIGNIN FUNCTION OF FIREBASE
    const submit = async (event) => {
        event.preventDefault();

        // GETTING VALUES OF INPUTS
        const user = event.target.elements[0].value
        const email = event.target.elements[1].value;
        const password = event.target.elements[2].value;
        const retypePassword = event.target.elements[3].value;

        // PASSWORD MATCH
        if (password !== retypePassword) {
            alert("Passwords do not match!");
            return;
        }

        // FILL ALL INPUTS
        if (!email || !password || !retypePassword || !user) {
            setMsg("Fill all the fields please ! !");
            return;
        }

        // LOGIN
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            setMsg("Registered Succesfully")
            event.target.reset();
        }
        catch (error) {
            setMsg(error.message)
        }
    };


    return (
        <>
            <div className="flex items-center justify-center">
                <div className="p-5 rounded shadow text-shadow text-lg">
                    <h1 className="text-center text-xl font-bold">Create a new account</h1> <br /> <hr /> <br />
                    <form onSubmit={submit}>
                        <h2 className="uppercase m-2 underline text-red-800 text-xl">{msg}</h2>
                        <input type="name" placeholder="Enter Username" className="w-full border border-[#dddfe2] rounded p-3" /> <br /><br />
                        <input type="email" placeholder="Enter email address" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                        <input type="password" placeholder="New Password" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                        <input type="password" placeholder="Retype Password" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                        <button className="w-full border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-1">Sign Up</button> <br /> <br />
                    </form> <hr /> <br />
                    <button onClick={handleGoBack} className="w-full border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-1 items-center text-center"> Sign In</button>
                </div>
            </div>
        </>
    );
}


export default Register;