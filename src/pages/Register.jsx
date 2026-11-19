import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = register(username, password);

    if (success !== true) {
      setError(success);
    } else {
      setError("");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input className="bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 w-full" id="username" type="text" placeholder="Enter your username..." value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 w-full" id="password" type="password" placeholder="Enter your password..." value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Register
              </button>
              <Link to="/login" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-auto">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}