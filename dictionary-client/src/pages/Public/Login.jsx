import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-dictionary.png";
import icons from "../../ultils/icons";
import path from "../../ultils/path";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiLogin } from "../../apis/index";
import { useAuth } from "../../context/authContext";

const { FcGoogle, FaEye, FaEyeSlash } = icons;

const Login = () => {
  const [stateTypePassword, setStateTypePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleShowPassword = () => {
    setStateTypePassword(!stateTypePassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Vui lòng nhập địa chỉ email.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Địa chỉ email không hợp lệ.");
      return;
    }

    if (!password.trim()) {
      toast.error("Vui lòng nhập mật khẩu.");
      return;
    }

    // Gọi API login
    apiLogin({ email, password })
      .then((response) => {
        const roles = response.data.roles.map((role) => role.nameRole);
        login(response.data);

        if (roles.includes("Admin")) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error("Tài khoản hoặc mật khẩu không chính xác !");
      });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[40%]">
        <div className="flex justify-center mt-5">
          <img className="w-[80px]" src={logo} alt="logo" />
        </div>
        <div className="mt-6">
          <div className=" text-[24px] text-[#242938] leading-[32px] font-semibold">
            Đăng nhập vào DOL
          </div>
          <div className="text-[15px] text-[#99a6b3] leading-[20px] font-normal mt-3">
            Hệ sinh thái từ điển Tiếng Anh dành cho người Việt
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="">
            <div>
              <label
                htmlFor="email"
                className="block text-[15px] text-[#242938] leading-[20px] font-normal mt-5"
              >
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2"
                placeholder="yourname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center">
                <div className="mt-4">
                  <label
                    required
                    htmlFor="password"
                    className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                  >
                    Mật khẩu
                  </label>
                </div>

                <div className="ml-auto mt-4">
                  <Link
                    to={path.FORGOT}
                    className="text-[15px] text-[#2a61d4] leading-[20px] font-normal "
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>
              <div className=" relative">
                <input
                  type={stateTypePassword ? "password" : "text"}
                  id="password"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className=" absolute top-[50%] translate-y-[-30%] right-5 cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {stateTypePassword ? (
                    <FaEyeSlash size="20px" />
                  ) : (
                    <FaEye size="20px" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                className="w-full bg-[#d42525] p-4 text-[#fff] rounded-[8px]"
              >
                Login
              </button>
            </div>

            <div className="my-10 relative bg-[#99a6b3] border-2 h-[1px] w-full">
              <div className=" absolute bg-[#fff] p-3 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                or
              </div>
            </div>

            <div className="flex items-center justify-center mt-8">
              <Link
                to={path.REGISTER}
                className="w-full bg-[#f1f6ff] p-4 text-[#2a61d4] rounded-[8px] hover:bg-[#d1e4ff] block text-center"
              >
                Register with Email
              </Link>
            </div>

            <div className="flex items-center justify-center mt-8">
              <div
                className="w-full bg-[#f6f6f7] p-4 text-[#242938] rounded-[8px] border-2
               border-[#e4e6e8] flex gap-3 items-center justify-center cursor-pointer"
              >
                <span>
                  <FcGoogle size="16px" />
                </span>
                <span>Continue with Google</span>
              </div>
            </div>

            <div className="my-5"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
