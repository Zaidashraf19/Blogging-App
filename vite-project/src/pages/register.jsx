import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection , getDocs } from "firebase/firestore";

const Register = () => {
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();


    // GETTING VALUES OF INPUTS
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const retypePassword = useRef();


    // SIGNUP FUNCTION OF FIREBASE
    const submit = async (event) => {
        event.preventDefault();
        
        // PASSWORD MATCH
        if (password.current.value !== retypePassword.current.value) {
            setMsg("Passwords do not match!!");
            return;
        }


        // FILL ALL INPUTS
        if (!email.current.value || !password.current.value || !retypePassword.current.value || !username.current.value) {
            setMsg("Fill all the fields please!!");
            return;
        }


        // SENDING USERNAME TO DATABASE
        try {
            const docRef = await addDoc(collection(db, "usersname"), {
                name: username.current.value,
                uid: auth.currentUser.uid
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }


        // LOGIN
        try {
            const response = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
            setMsg("Registered Successfully");
            // Resetting the input fields
            email.current.value = '';
            password.current.value = '';
            retypePassword.current.value = '';
            username.current.value = '';
            navigate('/')
        } catch (error) {
            setMsg("Registration failed!!");
        }

    };

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="p-5 rounded bg-[#ff8355] shadow shadow-[#ff8355] text-lg">
                    <h1 className="text-center text-xl font-bold">Create a new account</h1> <br /> <hr /> <br />
                    <form onSubmit={submit}>
                        <h2 className="uppercase m-2 underline text-xl">{msg}</h2>
                        <input type="text" ref={username} placeholder="Enter Username" className="w-full border border-[#dddfe2] rounded p-3" /> <br /><br />
                        <input type="email" ref={email} placeholder="Enter email address" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                        <input type="password" ref={password} placeholder="New Password" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                        <input type="password" ref={retypePassword} placeholder="Retype Password" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                        <button className="w-full border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-1">Sign Up</button> <br /> <br />
                    </form>
                </div>
            </div>
        </>
    );
}


export default Register;