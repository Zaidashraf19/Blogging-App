import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { collection, deleteDoc, doc, getDocs, } from "firebase/firestore";
import { useEffect, useState } from "react";

const Feed = () => {

    // NAVIGATE
    const navigate = useNavigate()

    // USESTATE
    const [post, setPosts] = useState([]);
    const [username, setUsername] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null)


    // Log Out
    const logout = async (event) => {
        event.preventDefault()
        signOut(auth).then(() => {
            navigate('login')
        }).catch((error) => {
            console.log(error);
        });
    }


    // Get logged-in user ID
    const getLoggedInUserId = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedInUser(user.uid);
            }
        });
    };
    useEffect(() => {
        getLoggedInUserId();
    }, []);


    // DATA MANGWA LO FIRESTORE SE 
    const getdata = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postArr = [];
        querySnapshot.forEach((doc) => {
            postArr.push({ id: doc.id, ...doc.data() })
            const PostId = doc.data().uid
        });
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
            <div className="flex flex-col items-center justify-center gap-5 mx-30 my-10">
                    {post.map((item, index) => (
                        <div key={item.id} className="bg-white rounded shadow w-70">
                            {username.map((user, index) => (
                                <div key={user.id}>
                                    {user.uid === item.uid && (
                                        <p className="text-xl flex gap-3 p-2">
                                            <span>
                                                <img
                                                    src={user.img}
                                                    className="w-10 h-10 rounded-full" />
                                            </span>
                                            <span className="hover:underline cursor-pointer">
                                                {user.name}
                                                <br />
                                            </span>
                                        </p>
                                    )}
                                </div>
                            ))}
                            <div className="p-4">
                                <p className="text-xl">{item.content}</p>
                            </div>
                            <div>
                                <img
                                    src={item.img}
                                    className="w-full my-2"
                                />
                                <img
                                    src={item.imgURL}
                                    className="w-full my-2"
                                />
                            </div>
                            {/* Conditional rendering for the Delete button */}
                            {item.uid === loggedInUser && (
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
                            )}
                        </div>
                    ))}
                </div>
        </>
    )
}

export default Feed