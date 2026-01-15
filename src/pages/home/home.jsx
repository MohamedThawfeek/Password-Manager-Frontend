import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUserDetails } from "../../redux/slice/user";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user_details, token } = useSelector((state) => state.user);
  const [logoutPopup, setLogoutPopup] = useState(false);

  const handleLogout = () => {
    setLogoutPopup(false);
    dispatch(resetUserDetails());
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.id !== "logout-popup") {
        setLogoutPopup(false);
      }
    });
    return () => {
      window.removeEventListener("click", (e) => {
        if (e.target.id !== "logout-popup") {
          setLogoutPopup(false);
        }
      });
    };
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    // Handle save logic here
    console.log({ websiteUrl, username, password });
  };

  console.log(user_details, token);
  return (
    <div className="w-dvw min-h-dvh bg-white">
      {/* Header Section */}
      <header className="bg-[#1e3a3a] w-full px-6 py-4 flex items-center justify-between">
        <div className="text-white text-2xl font-bold">&lt;PassOP/&gt;</div>
        <div className="cursor-pointer relative">
          <p
            id="logout-popup"
            onClick={() => setLogoutPopup(!logoutPopup)}
            className="w-[40px] h-[40px] border-2 border-white rounded-full text-white text-lg font-bold flex items-center justify-center"
          >
            {user_details?.name.slice(0, 1)}
          </p>

          {logoutPopup && (
            <div className="absolute top-[110%] shadow-md rounded-md p-2 right-0 w-[150px] h-[60px] bg-white flex items-center justify-center">
              <p
                onClick={handleLogout}
                className="text-black text-lg font-bold cursor-pointer hover:bg-gray-200 rounded-md p-2 w-full text-center"
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#4ade80] mb-2">
            &lt;PassOP/&gt;
          </h1>
          <p className="text-gray-600 text-lg">Your own Password Manager</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSave} className="w-full max-w-2xl space-y-4">
          {/* Website URL Input */}
          <div>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="Enter website URL"
              className="w-full px-4 py-3 border-2 border-[#86efac] rounded-lg focus:outline-none focus:border-[#4ade80] transition-colors"
            />
          </div>

          {/* Username Input */}
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="w-full px-4 py-3 border-2 border-[#86efac] rounded-lg focus:outline-none focus:border-[#4ade80] transition-colors"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-3 pr-12 border-2 border-[#86efac] rounded-lg focus:outline-none focus:border-[#4ade80] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-[#4ade80] text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-[#22c55e] transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
              </svg>
              Save
            </button>
          </div>
        </form>

        {/* Password List Section */}
        <div className="w-full max-w-2xl mt-12 px-4">
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Your Passwords
          </h2>
          <p className="text-gray-600">No passwords to show</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
