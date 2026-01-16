import React from 'react'

const Table = ({data, showPasswordIds, handleCopy, togglePasswordVisibility, handleEdit, handleDelete, updatePasswordId, setUpdatePasswordId}) => {
  return (
    <>
     <table className="w-full hidden md:table">
                <thead>
                  <tr className="bg-[#1e3a3a] text-white">
                    <th className="px-6 py-4 text-left font-bold">Site</th>
                    <th className="px-6 py-4 text-left font-bold">Username</th>
                    <th className="px-6 py-4 text-left font-bold">Password</th>
                    <th className="px-6 py-4 text-left font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={item._id || index}
                      className={`${
                        index % 2 === 0 ? "bg-[#f0fdf4]" : "bg-white"
                      } hover:bg-[#dcfce7] transition-colors`}
                    >
                      {/* Site Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline truncate max-w-xs"
                          >
                            {item.website}
                          </a>
                          <button
                            onClick={() => handleCopy(item.website, "Site URL")}
                            className="flex-shrink-0 hover:opacity-70 transition-opacity"
                            title="Copy site URL"
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
                      </td>

                      {/* Username Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700 truncate max-w-xs">
                            {item.username}
                          </span>
                          <button
                            onClick={() =>
                              handleCopy(item.username, "Username")
                            }
                            className="flex-shrink-0 hover:opacity-70 transition-opacity"
                            title="Copy username"
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
                      </td>

                      {/* Password Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700 truncate max-w-xs">
                            {showPasswordIds[item._id] || showPasswordIds[index]
                              ? item.password
                              : "•".repeat(Math.min(item.password?.length || 8, 12))}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                togglePasswordVisibility(item._id || index)
                              }
                              className="flex-shrink-0 hover:opacity-70 transition-opacity"
                              title={
                                showPasswordIds[item._id] || showPasswordIds[index]
                                  ? "Hide password"
                                  : "Show password"
                              }
                            >
                              {showPasswordIds[item._id] || showPasswordIds[index] ? (
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
                              className="flex-shrink-0 hover:opacity-70 transition-opacity"
                              title="Copy password"
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
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              handleEdit(item)
                              setUpdatePasswordId(item._id)
                            }}
                            className="hover:opacity-70 transition-opacity"
                            title="Edit password"
                          >
                            <svg
                              className="w-5 h-5 text-gray-700"
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
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="hover:opacity-70 transition-opacity"
                            title="Delete password"
                          >
                            <svg
                              className="w-5 h-5 text-red-600"
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
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
    
    </>
  )
}

export default Table