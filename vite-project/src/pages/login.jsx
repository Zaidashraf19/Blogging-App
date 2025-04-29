import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>  
            <div className="flex items-center justify-center">
                <div className="p-5 rounded shadow text-shadow text-lg">
                    <input type="text" placeholder="Enter email address" id="input" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                    <input type="password" placeholder="Password" id="input" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                    <button className="w-full border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-1">Login</button> <br /> <br />
                    <p className="text-red-700 cursor-pointer text-center text-sm hover:underline">Forget Password ?</p> <br /> <hr /> <br />
                    <Link to={'register'}><button className="w-full border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-1 items-center text-center"> Create New Account </button> </Link>
                </div>
            </div>
        </>
    )
}

export default Login 