import { useNavigate } from "react-router-dom"

const Post = () => {

    // FUNCTION TO GO ON HOME PAGE
    const navigate = useNavigate();
    const handleGoBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };
    return (
        <>
            <form>
                <input type="text" placeholder="Enter Text" className="p-5 border rounded m-10 w-1/2" />
                <button className="border border-[#dddfe2] rounded bg-black text-white cursor-pointer p-3" onClick={handleGoBack}>Share Post</button>
            </form>
        </>
    )
}

export default Post