
import { useState } from "react";
import { useAuth } from "../context/useAuth";

function Home() {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(user.photo || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar!");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 2 MB!");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
      setError("");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = updateProfile(username, password, photo);

    if (result !== true) {
      setError(result);
      setSuccess("");
    } else {
      setError("");
      setSuccess("Profile berhasil diperbarui!");
      setPassword("");
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          Home Page
        </h1>

        <div className="flex flex-col items-center mb-6">
          {isEditing ? (
            <>
              <label htmlFor="photo" className="cursor-pointer">
                <img
                  src={photo || "https://placehold.co/120x120?text=Profile"}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-gray-600 hover:opacity-75 transition"
                />
              </label>

              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              <p className="text-gray-400 text-xs mt-2">
                Click photo to change
              </p>
            </>
          ) : (
            <img
              src={user.photo || "https://placehold.co/120x120?text=Profile"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-600"
            />
          )}

          <p className="text-gray-300 mt-4">
            Welcome, <span className="font-bold text-white">{user.username}</span>!
          </p>
        </div>

        {success && (
          <p className="text-green-500 text-sm text-center mb-4">
            {success}
          </p>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              Edit Profile
            </h2>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 w-full"
                id="username"
                type="text"
                placeholder="Enter your new username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                New Password
              </label>
              <input
                className="bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 w-full"
                id="password"
                type="password"
                placeholder="Enter your new password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <div className="flex gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1"
                type="submit"
              >
                Save Changes
              </button>

              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex-1"
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setUsername(user.username);
                  setPassword("");
                  setPhoto(user.photo || "");
                  setError("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => {
              setIsEditing(true);
              setUsername(user.username);
              setPhoto(user.photo || "");
              setError("");
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-2"
          >
            Edit Profile
          </button>
        )}

        <button
          onClick={logout}
          className="flex bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-8 ml-auto"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
