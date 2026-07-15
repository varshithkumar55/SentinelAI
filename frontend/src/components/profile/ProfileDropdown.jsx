import { useState } from "react";
import {
  User,
  Settings,
  Lock,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProfileDropdown() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const initials = user
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "??";

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (

    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-xl border border-app bg-surface px-3 py-2 hover:bg-slate-100"
      >

        {user?.profile_image ? (

          <img
            src={`http://127.0.0.1:8000${user.profile_image}`}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />

        ) : (

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 font-semibold text-white">

            {initials}

          </div>

        )}

        <ChevronDown size={18} />

      </button>

      {open && (

        <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-app bg-surface shadow-2xl">

          <div className="border-b border-app p-5">

            <h3 className="font-bold">

              {user?.full_name}

            </h3>

            <p className="text-sm text-slate-500">

              {user?.email}

            </p>

          </div>

          <MenuItem
            icon={User}
            text="My Profile"
            onClick={() => navigate("/profile")}
          />

          <MenuItem
            icon={Settings}
            text="Account Settings"
            onClick={() => navigate("/settings")}
          />

          <MenuItem
            icon={Lock}
            text="Change Password"
            onClick={() => navigate("/change-password")}
          />

          <div className="border-t border-app">

            <MenuItem
              icon={LogOut}
              text="Logout"
              danger
              onClick={handleLogout}
            />

          </div>

        </div>

      )}

    </div>

  );

}

function MenuItem({

  icon: Icon,

  text,

  onClick,

  danger,

}) {

  return (

    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-5 py-4 text-left transition

      ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "hover:bg-slate-50"
      }`}
    >

      <Icon size={18}/>

      {text}

    </button>

  );

}

export default ProfileDropdown;