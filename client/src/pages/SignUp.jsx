import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false), setError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
        <input
          type="text"
          placeholder="USERNAME"
          className="border p-3 rounded-lg bg-neutral-200 w-[500px]"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="E-MAIL"
          className="border p-3 rounded-lg bg-neutral-200 w-[500px]"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          className="border p-3 rounded-lg bg-neutral-200 w-[500px]"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-red-600 items-center w-[155px] text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5 text-justify absolute top-[435px] right-[500px]">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
