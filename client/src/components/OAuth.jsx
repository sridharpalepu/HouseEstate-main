import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };
  return (
    <div className="bg-blue-500 w-[290px] p-1 text-justify absolute bottom-[10px] left-[550px] flex flex-row gap-5">
      <img
        src="public/google.png"
        alt=""
        className="w-[48px] h-[48px]  bg-white"
      />
      <button
        onClick={handleGoogleClick}
        type="button"
        className="flex flex-row text-white p-3 uppercase hover:placeholder-opacity-95 disabled:opacity-80"
      >
        Sign In with Google
      </button>
    </div>
  );
}
