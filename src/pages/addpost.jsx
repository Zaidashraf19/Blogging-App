import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { useRef } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Addpost = () => {

    // NAVIGATE
    const navigate = useNavigate();

    // GETTING VALUE OF INPUT
    const text = useRef();
    const image = useRef();
    const imageURL = useRef()

    // CREATING FUNCTION TO SEND DATA TO FIRESTORE
    const post = async (event) => {
        event.preventDefault();

        // UPLOAD IMAGE OR ADD TEXT
        if (!text.current.value && !image.current.value && !imageURL.current.value) {
            alert("Kindly upload image or add text")
            return;
        }
        // SENDING DATA TO FIRESTORE DATABASE
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                content: text.current.value,
                uid: auth.currentUser.uid,
                imgURL: imageURL.current.value,
                // img: "",
                PostAt: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        // WHEN THE USER SHARES THE POST THIS FUNCTION WILL TAKE THE USER TO FEED PAGE
        navigate('/')

        // INPUT FIELD EMPTY
        text.current.value = ''
        image.current.value = ''
    }


    // IT WILL CHECK, IS USER LOGIN OR NOT 
    // IF USER IS NOT LOGIN THEN USER WILL GO TO LOGIN PAGE
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
        } else {
            navigate('/')
            alert("Please login !!")
        }
    });

    return (
        <>
            <div className=" flex items-center justify-center p-4">
                <form
                    onSubmit={post}
                    className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full max-h-[600px] overflow-y-auto flex flex-col gap-6"
                >
                    <h1 className="text-2xl font-bold text-center text-gray-800">Upload Image & Description</h1>
                    <input ref={image} type="file" className="text-sm text-gray-500 border border-gray-300 p-1 rounded-lg cursor-pointer" />
                    <input
                        type="text"
                        placeholder="Image URL"
                        ref={imageURL}
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    <textarea
                        placeholder="Write a description..."
                        rows={4}
                        ref={text}
                        className="resize-none w-full rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 px-4 py-3 text-gray-700 placeholder-gray-400 transition duration-300"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    >
                        Add Post
                    </button>
                </form>
            </div>
        </>
    )
}

export default Addpost