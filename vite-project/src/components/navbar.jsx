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
                setUsername(user.displayName || "User" ); // Fallback if displayName is null
            } else {
                setUsername( <Link to={'/'}>Login</Link> );
            }
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    return (
        <>
            <div className="flex justify-between bg-[#3e3b81] text-white p-5 text-xl fixed top-0 left-0 right-0 z-50" >
                <div className="font-extrabold underline decoration-double underline-offset-8">
                    Blogging App
                </div>
                <div>
                    {username}
                </div>
                </div>
            <br /> <br /><br /><br />
        </>
    )
}

export default Navbar
