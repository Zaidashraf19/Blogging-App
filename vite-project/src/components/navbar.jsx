import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const Navbar = () => {

    // USESTATE
    const [username, setUsername] = useState([]);

    // PEHLE CHECK KRNA HA USER LOGIN HA YA NAHI, AGR NAHI HA TOU LOGIN KA BUTTON KRNA HOGA AGR HA TOU USER KA NAME DISPLAY HOGA
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsername(user.email || "User");
            } else {
                setUsername(<Link to={'login'}>Login</Link>);
            }
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);


    return (
        <>
            <div className="flex justify-between bg-[#3e3b81] text-white p-5 text-xl fixed top-0 left-0 right-0 z-50" >
                <div className="font-extrabold underline decoration-double underline-offset-8 text-sm">
                    Blogging App
                </div>
                <div className="">
                    <Link to={"/"}>
                        <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd" />
                        </svg>

                    </Link>
                </div>
                <div className="text-sm">
                    {username}
                </div>
            </div>
            <br /> <br /><br /><br />
        </>
    )
}

export default Navbar