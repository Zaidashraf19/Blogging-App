import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Feed = () => {

    // NAVIGATE
    const navigate = useNavigate()
    // USESTATE
    const [post, setPosts] = useState([]);

    // CHECKING USER IS LOGIN OR NOT
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
            } else {
                navigate('/')
            }
        });
    });


    // DATA MANGWA LO FIRESTORE SE 
    const getdata = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postArr = [];
        querySnapshot.forEach((doc) => {
            postArr.push({ id: doc.id, ...doc.data() })
        });
        setPosts(postArr)
    }

    useEffect( () => {
        getdata()
    }, [])


    return (
        <>
            <div className="p-5">
                <Link to={'addpost'}> <button className="border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-3 items-center text-center"> Add Post </button> </Link>
            </div>
            <div className="flex flex-col justify-center gap-5 m-3 w-1/3">
                {post.map((item, index) => (
                    <div key={item.id} className="border rounded p-3 bg-[#ff8355] shadow">
                        <h1 className="text-xl">{item.content || "No Post exists"}</h1>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Feed