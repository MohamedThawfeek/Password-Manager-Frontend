import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUserDetails } from "../../redux/slice/user";
import { useNavigate } from "react-router-dom";
import UseHome from "../../hooks/home/home";
import { ClipLoader } from "react-spinners";
import Table from "../../components/Table/table";

const Home = () => {
  const {
    websiteUrl,
    setWebsiteUrl,
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleSave,
    logoutPopup,
    setLogoutPopup,
    handleLogout,
    user_details,
    loader,
    passwords,
    loadingPasswords,
    showPasswordIds,
    handleCopy,
    togglePasswordVisibility,
    handleDelete,
    handleEdit,
    updatePasswordId,
    setUpdatePasswordId,
    handleUpdate,
  } = UseHome();

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
      <div className="flex flex-col items-center justify-start min-h-[calc(100vh-80px)] px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#4ade80] mb-2">
            &lt;PassOP/&gt;
          </h1>
          <p className="text-gray-600 text-lg">Your own Password Manager</p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={(e) => {
            if (updatePasswordId) {
              handleUpdate(e);
            } else {
              handleSave(e);
            }
          }}
          className="w-full max-w-2xl space-y-4"
        >
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
              disabled={loader}
              className="bg-[#4ade80] text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-[#22c55e] transition-colors font-semibold"
            >
              {loader ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                  </svg>
                  {updatePasswordId ? "Update" : "Save"}
                </>
              )}
            </button>
          </div>
        </form>

        {/* Password List Section */}
        <div className="w-full max-w-6xl mt-12 px-4">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Your Passwords
          </h2>

          {loadingPasswords ? (
            <div className="flex justify-center items-center py-12">
              <ClipLoader color="#4ade80" size={30} />
            </div>
          ) : passwords.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No passwords to show
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow-md">
              {/* Desktop Table */}
              <Table
                data={passwords}
                showPasswordIds={showPasswordIds}
                handleCopy={handleCopy}
                togglePasswordVisibility={togglePasswordVisibility}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                updatePasswordId={updatePasswordId}
                setUpdatePasswordId={setUpdatePasswordId}
              />

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {passwords.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="bg-[#f0fdf4] rounded-lg p-4 shadow-sm border border-[#dcfce7]"
                  >
                    {/* Site */}
                    <div className="mb-3">
                      <label className="text-xs font-semibold text-gray-600 uppercase">
                        Site
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex-1 truncate"
                        >
                          {item.website}
                        </a>
                        <button
                          onClick={() => handleCopy(item.website, "Site URL")}
                          className="flex-shrink-0"
                        >
                          <svg
                            className="w-4 h-4 text-gray-700"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Username */}
                    <div className="mb-3">
                      <label className="text-xs font-semibold text-gray-600 uppercase">
                        Username
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-700 flex-1 truncate">
                          {item.username}
                        </span>
                        <button
                          onClick={() => handleCopy(item.username, "Username")}
                          className="flex-shrink-0"
                        >
                          <svg
                            className="w-4 h-4 text-gray-700"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                      <label className="text-xs font-semibold text-gray-600 uppercase">
                        Password
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-700 flex-1 truncate">
                          {showPasswordIds[item._id] || showPasswordIds[index]
                            ? item.password
                            : "•".repeat(
                                Math.min(item.password?.length || 8, 12)
                              )}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              togglePasswordVisibility(item._id || index)
                            }
                            className="flex-shrink-0"
                          >
                            {showPasswordIds[item._id] ||
                            showPasswordIds[index] ? (
                              <svg
                                className="w-4 h-4 text-gray-700"
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
                                className="w-4 h-4 text-gray-700"
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
                          <button
                            onClick={() =>
                              handleCopy(item.password, "Password")
                            }
                            className="flex-shrink-0"
                          >
                            <svg
                              className="w-4 h-4 text-gray-700"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-3 border-t border-[#dcfce7]">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center gap-2 text-gray-700 hover:text-[#1e3a3a] transition-colors"
                      >
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        <span className="text-sm">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                      >
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span className="text-sm">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
