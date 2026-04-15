import { useNavigate } from "react-router-dom";
import {} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

const Addpost = () => {
  // NAVIGATE
  const navigate = useNavigate();

  // const [user, setUser] = useState([]);
  // let userid;

  // GETTING VALUE OF INPUT
  const text = useRef();
  const image = useRef();
  const imageURL = useRef();

  // // GETTING USER ID
  // const getuserid = async () => {
  //   const querySnapshot = await getDocs(collection(db, "usersname"));
  //   const userArr = [];
  //   querySnapshot.forEach((doc) => {
  //     userArr.push({ id: doc.id, ...doc.data() });
  //   });
  //   setUser(userArr);
  // };
  // useEffect(() => {
  //   getuserid();
  // }, []);

  // user.map((data, index) => {
  //   userid = data?.id;
  // });

  // CREATING FUNCTION TO SEND DATA TO FIRESTORE
  const post = async (event) => {
    event.preventDefault();

    // UPLOAD IMAGE OR ADD TEXT
    if (!text.current.value && !imageURL.current.value) {
      alert("Kindly upload image or add text");
      return;
    }

    // SENDING DATA TO FIRESTORE DATABASE
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        content: text.current.value,
        uid: auth.currentUser.uid,
        imgURL: imageURL.current.value,
        // UserId: h,
        PostAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // WHEN THE USER SHARES THE POST THIS FUNCTION WILL TAKE THE USER TO FEED PAGE
    navigate("/");

    // INPUT FIELD EMPTY
    text.current.value = "";
    image.current.value = "";
  };

  return (
    <>
      <div className=" flex items-center justify-center p-4">
        <form
          onSubmit={post}
          className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full max-h-[600px] overflow-y-auto flex flex-col gap-6"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Upload Image & Description
          </h1>
          <input
            type="text"
            ref={imageURL}
            placeholder="Image URL"
            className="border border-gray-300 rounded-lg p-2"
          />
          <textarea
            placeholder="Write a description..."
            rows={4}
            ref={text}
            className="resize-none w-full rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 px-4 py-3 text-gray-700 placeholder-gray-400 transition duration-300"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Add Post
          </button>
        </form>
      </div>
    </>
  );
};

export default Addpost;
