import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const Register = () => {

    // USESTATE
    const [msg, setMsg] = useState('');

    // NAVIGATION
    const navigate = useNavigate();


    // GETTING VALUES OF INPUTS
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const retypePassword = useRef();
    const image = useRef()


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
                email: email.current.value,
                img: image.current.value
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }


        // CREATE USER
        try {
            const response = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
            setMsg("Registered Successfully");

            // Resetting the input fields
            email.current.value = '';
            password.current.value = '';
            retypePassword.current.value = '';
            username.current.value = '';
            navigate('login')
        } catch (error) {
            setMsg("Registration failed!!" + error.message);
        }
    };
    return (
        <>
            <div className="flex items-center justify-center">
                <div className="bg-white shadow-md rounded-lg p-2.5">
                    <h2 className="text-2xl font-semibold text-center mb-6">Create Your Account</h2>
                    <h3 className="text-center uppercase m-2 underline text-xl text-red-800">{msg}</h3>
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="img">Profile Image</label>
                            <input ref={image} type="file" className="text-sm text-gray-500 border border-gray-300 p-1 rounded-lg cursor-pointer" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username</label>
                            <input ref={username} type="text" placeholder="Enter Username" className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-500" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
                            <input ref={email} type="email" placeholder="Enter email address" className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-500" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">New Password</label>
                            <input ref={password} type="password" placeholder="New Password" className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-500" />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="retypePassword">Retype Password</label>
                            <input ref={retypePassword} type="password" placeholder="Retype Password" className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-500" />
                        </div>

                        <button className="w-full bg-black text-white font-semibold rounded-lg p-2 hover:bg-gray-800 transition duration-200">Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;