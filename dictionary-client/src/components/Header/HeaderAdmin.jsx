import React, { useState, useRef, useEffect } from "react";
import icons from "../../ultils/icons";
const { IoMdArrowDropdown, FaUser } = icons;
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const HeaderAdmin = () => {
  const [isLogoutVisible, setLogoutVisible] = useState(false);
  const { logout, user } = useAuth();

  const logoutRef = useRef();
  const toggleRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        logoutRef.current &&
        !logoutRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setLogoutVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleLogout = () => {
    setLogoutVisible(!isLogoutVisible);
  };

  const handleLogout = () => {
    logout();
    setLogoutVisible(false);
  };

  return (
    <div className="flex items-center justify-between bg-[#fbfcff] h-[80px] px-[45px] border-b border-gray-100 shadow-md relative z-50">
      <div>
        <div className="font-bold text-[22px] leading-[25px]">
          PHẦN MỀM QUẢN LÝ TỪ ĐIỂN DOL
        </div>
        <div className="leading-[25px]">DOL DICTIONARY MANAGEMENT SOFTWARE</div>
      </div>
      <div className="flex items-center relative">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={toggleLogout}
          ref={toggleRef}
        >
          <div className="bg-[#d1d5da] rounded-[100%] w-[40px] h-[40px] ">
            {user && user.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-[40px] h-[40px] rounded-[100%]"
              />
            ) : (
              <div className="p-2">
                <FaUser size="24px" color="#fff" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-[#242938] select-none">
            <div>{user && user.fullname}</div>
            <IoMdArrowDropdown size="22px" color="#242938" />
          </div>
        </div>
        {isLogoutVisible && (
          <div
            ref={logoutRef}
            className="absolute top-[50px] right-0 z-[1000] bg-white border border-gray-100 rounded-[8px] w-[165px] shadow-md"
          >
            <div className="py-2 px-3 hover:bg-gray-100 cursor-pointer my-1">
              <Link
                to={"/reset"}
                onClick={() => setLogoutVisible(false)}
                className="block"
              >
                Đổi mật khẩu
              </Link>
            </div>
            <div
              className="py-2 px-3 hover:bg-gray-100 cursor-pointer my-2"
              onClick={handleLogout}
            >
              <Link to="/login" onClick={() => setLogoutVisible(false)}>
                Đăng xuất
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderAdmin;
