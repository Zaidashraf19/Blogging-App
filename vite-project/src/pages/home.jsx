import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="p-5">
                <Link to={'post'}> <button className="border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-3 items-center text-center"> Add Post </button> </Link>
            </div>
        </>
    )
}

export default Home