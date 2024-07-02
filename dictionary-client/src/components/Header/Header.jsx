import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo-index.png";
import path from "../../ultils/path";
import { useAuth } from "../../context/authContext";
import icons from "../../ultils/icons";
const { IoMdArrowDropdown, FaUser } = icons;

const Header = () => {
  const location = useLocation();
  const [isLogoutVisible, setLogoutVisible] = useState(false);

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

  const { user, logout } = useAuth();
  const [activeItem, setActiveItem] = useState(() => {
    const currentPath = window.location.pathname;
    return currentPath !== path.HOME
      ? localStorage.getItem("activeItem")
      : null;
  });

  const toggleLogout = () => {
    setLogoutVisible(!isLogoutVisible);
  };

  const handleLogout = () => {
    logout();
    setLogoutVisible(false);
  };

  const paths = {
    Home: path.HOME,
    Quizz: path.RIDDLE,
    Discover: path.EXPLORE_WORD,
    Login: path.LOGIN,
  };
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath !== path.HOME) {
      const activeItem = Object.keys(paths).find(
        (key) => paths[key] === currentPath
      );
      if (activeItem) {
        setActiveItem(activeItem);
        localStorage.setItem("activeItem", activeItem);
      }
    }
  }, [location.pathname]);

  const handleClick = (item) => {
    setActiveItem(item);
    localStorage.setItem("activeItem", item);
  };

  const handleLogoClick = () => {
    setActiveItem(null);
    localStorage.removeItem("activeItem");
  };

  return (
    <header
      className="fixed top-0 left-0 w-full h-[65px] border-b-2 border-gray-100 drop-shadow 
    flex items-center bg-white z-50 opacity-100"
    >
      <div className="w-full flex items-center gap-20 relative">
        <Link
          to={paths.Home}
          className="ml-[56px] cursor-pointer"
          onClick={handleLogoClick}
        >
          <img className="w-[110px]" src={logo} alt="logo" />
        </Link>
        <div className="absolute left-[50%]">
          <ul className="flex gap-14 text-[16px] font-medium translate-x-[-50%]">
            {["Home", "Discover"].map((item, index) => (
              <li
                key={index}
                className={`cursor-pointer hover:text-[#2a61d4] ${
                  activeItem === item ? "text-[#2a61d4]" : ""
                }`}
                onClick={() => handleClick(item)}
              >
                <Link to={paths[item]}>{item}</Link>
              </li>
            ))}
            {user ? (
              <li className="cursor-pointer hover:text-[#2a61d4]"></li>
            ) : (
              <li
                className={`cursor-pointer hover:text-[#2a61d4] ${
                  activeItem === "Login" ? "text-[#2a61d4]" : ""
                }`}
                onClick={() => handleClick("Login")}
              >
                <Link to={paths.Login}>Login</Link>
              </li>
            )}
          </ul>
        </div>
        {user && (
          <div className="flex items-center absolute right-10">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={toggleLogout}
              ref={toggleRef}
            >
              <div className="bg-[#d1d5da] rounded-[100%]">
                {user.avatar ? (
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
                    to={path.PROFILE}
                    onClick={() => setLogoutVisible(false)}
                    className="block"
                  >
                    Trang cá nhân
                  </Link>
                </div>

                <div className="py-2 px-3 hover:bg-gray-100 cursor-pointer my-1">
                  <Link
                    to={path.RESET}
                    onClick={() => setLogoutVisible(false)}
                    className="block"
                  >
                    Đổi mật khẩu
                  </Link>
                </div>

                <div
                  className="py-2 px-3 hover:bg-gray-100 cursor-pointer my-1"
                  onClick={handleLogout}
                >
                  <Link to={paths.Login}>Đăng xuất</Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
