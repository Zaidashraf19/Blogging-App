import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <div className="flex justify-between bg-black text-white p-5 text-xl fixed top-0 left-0 right-0 z-50" >
                <div className="font-extrabold underline decoration-double underline-offset-8">
                    Blogging App
                </div>
                <div>
                    <p className="cursor-pointer hover:underline"><Link to={'home'}>Home</Link></p>
                </div>
                <div>
                    Username
                </div>
            </div>
            <br /> <br /><br /><br />
        </>
    )
}
export default Navbar
