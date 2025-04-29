const Register = () => {
    return (
        <>
            <div className="flex items-center justify-center">
                <div className="p-5 rounded shadow text-shadow text-lg">
                    <h1 className="text-center text-xl font-bold">Create a new account</h1> <br /> <hr /> <br />
                    <input type="text" placeholder="Enter email address" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                    <input type="text" placeholder="Enter Username" className="w-full border border-[#dddfe2] rounded p-3" /> <br /><br />
                    <input type="password" placeholder="New Password" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                    <input type="password" placeholder="Password" className="w-full border border-[#dddfe2] rounded p-3" /> <br /> <br />
                    <button className="w-full border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-1">Sign Up</button> <br /> <br />
                </div>
            </div>
        </>
    )
}

export default Register 