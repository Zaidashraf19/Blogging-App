import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { collection, deleteDoc, doc, getDocs, } from "firebase/firestore";
import { useEffect, useState } from "react";

const Feed = () => {

    // NAVIGATE
    const navigate = useNavigate()

    // USESTATE
    const [post, setPosts] = useState([]);
    const [username, setUsername] = useState([]);

    // Log Out
    const logout = async (event) => {
        event.preventDefault()
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            console.log(error);
        });
    }

    // DATA MANGWA LO FIRESTORE SE 
    const getdata = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postArr = [];
        querySnapshot.forEach((doc) => {
            postArr.push({ id: doc.id, ...doc.data() })
        });
        console.log(postArr);
        setPosts(postArr)
    }
    useEffect(() => {
        getdata()
    }, [])


    // GET USERNAME POSTED BY
    const getuser = async () => {
        const querySnapshot = await getDocs(collection(db, "usersname"));
        const userArr = [];
        querySnapshot.forEach((doc) => {
            userArr.push({ id: doc.id, ...doc.data() })
        });
        setUsername(userArr)
    }
    useEffect(() => {
        getuser()
    }, [])


    return (
        <>
            <div className="px-3 py-1 flex justify-between bg-[#3e3b81] text-white">
                <Link to={'addpost'}> <button className="border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-3 items-center text-center"> Add Post </button> </Link>
                <button
                    onClick={logout}
                    className="border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-3 items-center text-center">
                    Sign Out
                </button>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 mx-3 my-10">
                {post.map((item, index) => (
                    <div key={item.id} className="bg-white rounded shadow lg:w-1/3">
                        {username.map((user, index) => (
                            <div key={user.id} >
                                <p className="text-xl flex gap-3 p-2">
                                    <span>
                                        <img
                                            src="https://images.unsplash.com/photo-1585910165033-3facaf6984d9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3Vuc2V0c3xlbnwwfHwwfHx8MA%3D%3D"
                                            className="w-10 h-10 rounded-full" />
                                    </span>
                                    <span className=" hover:underline cursor-pointer">
                                        {user.name} 
                                        <br />
                                        <span className="text-sm"> 10 mins ago</span>
                                    </span>
                                </p>
                            </div>
                        ))}
                        <div className=" p-4">
                            <p className="text-xl">{item.content}</p>
                        </div>
                        <div>
                            <img
                            src={item.img} 
                            className="w-full my-2"
                            />
                        </div>

                        <div className="flex justify-end mt-2">
                                <button
                                    onClick={async () => {
                                        await deleteDoc(doc(db, "posts", item.id));
                                    }}
                                    className="bg-[#8A0000] text-white border rounded p-2 cursor-pointer"
                                >
                                    Delete
                                </button>

                            </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Feed