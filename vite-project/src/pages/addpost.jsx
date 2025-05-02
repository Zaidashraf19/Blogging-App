import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { useRef } from "react";
import { collection, addDoc } from "firebase/firestore";

const Addpost = () => {

    // NAVIGATE
    const navigate = useNavigate();

    // GETTING VALUE OF INPUT
    const text = useRef();

    // CREATING FUNCTION TO SEND DATA TO FIRESTORE
    const post = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                content: text.current.value,
                uid: auth.currentUser.uid
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        // WHEN THE USER SHARES THE POST THIS FUNCTION WILL TAKE THE USER TO FEED PAGE
        navigate('/feed')

        // INPUT FIELD EMPTY
        text.current.value = ''
    }


    // IT WILL CHECK, IS USER LOGIN OR NOT 
    // IF USER IS NOT LOGIN THEN USER WILL GO TO LOGIN PAGE
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
        } else {
            navigate('/')
        }
    });

    return (
        <>
            <form
                onSubmit={post}>
                <input
                    type="text"
                    ref={text}
                    placeholder="Enter Content"
                    className="p-5 border rounded m-10 w-1/2 bg-[#ff8355]" />
                <button
                    className="border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-3" >
                    Share Post
                </button>
            </form>
        </>
    )
}

export default Addpost