import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUserDetails } from "../../redux/slice/user";
import ApiRequest from "../../services/axios";
import toast from "react-hot-toast";

const UseHome = () => {
  const dispatch = useDispatch();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user_details } = useSelector((state) => state.user);
  const [logoutPopup, setLogoutPopup] = useState(false);
  const [loader, setLoader] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const [loadingPasswords, setLoadingPasswords] = useState(false);
  const [showPasswordIds, setShowPasswordIds] = useState({});
  const [updatePasswordId, setUpdatePasswordId] = useState(null);

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

  // Fetch passwords
  const fetchPasswords = async () => {
    try {
      setLoadingPasswords(true);
      const { success, data } = await ApiRequest.get("/get-passwords");
      if (success) {
        setPasswords(data || []);
      }
    } catch (error) {
      console.log("error fetching passwords", error);
      toast.error(error.response?.data?.message || "Failed to fetch passwords");
    } finally {
      setLoadingPasswords(false);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        website: websiteUrl,
        username,
        password,
      };
      setLoader(true);
      const { success, message } = await ApiRequest.post(
        "/create-password",
        payload
      );
      if (success) {
        toast.success(message);
        setWebsiteUrl("");
        setUsername("");
        setPassword("");
        fetchPasswords(); // Refresh password list
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ID: updatePasswordId,
        website: websiteUrl,
        username,
        password,
      };
      setLoader(true);
      const { success, message } = await ApiRequest.put(
        "/update-password",
        payload
      );
      if (success) {
        toast.success(message);
        setWebsiteUrl("");
        setUsername("");
        setPassword("");
        setUpdatePasswordId(null);
        fetchPasswords(); // Refresh password list
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  // Copy to clipboard
  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} copied to clipboard`);
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (id) => {
    setShowPasswordIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Delete password
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this password?")) {
      return;
    }
    try {
      const { success, message } = await ApiRequest.delete("/delete-password", {
        ID: id,
      });
      if (success) {
        toast.success(message);
        fetchPasswords();
      }
    } catch (error) {
      console.log("error deleting password", error);
      toast.error(error.response?.data?.message || "Failed to delete password");
    }
  };

  // Edit password (placeholder - can be expanded)
  const handleEdit = (passwordItem) => {
    setWebsiteUrl(passwordItem.website || "");
    setUsername(passwordItem.username || "");
    setPassword(passwordItem.password || "");
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
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
  };
};

export default UseHome;
