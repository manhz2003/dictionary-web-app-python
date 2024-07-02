import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-dictionary.png";
import icons from "../../ultils/icons";
import path from "../../ultils/path";
import { toast } from "react-toastify";
import { apiForgotPassword } from "../../apis/index";
import { useAuth } from "../../context/authContext";

const { FaEye, FaEyeSlash } = icons;

const Reset = () => {
  const [stateTypePassword, setStateTypePassword] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setStateTypePassword(!stateTypePassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("Mật khẩu không được bỏ trống");
    } else if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu không khớp");
    } else {
      if (user) {
        apiForgotPassword({ email: user.email, oldPassword, newPassword })
          .then((response) => {
            if (response.status === 200) {
              toast.success("Đổi mật khẩu thành công");
              navigate("/profile");
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              toast.error("Mật khẩu cũ không chính xác");
            }
          });
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[40%]">
        <div className="flex justify-center mt-5">
          <img className="w-[80px]" src={logo} alt="logo" />
        </div>
        <div className="mt-6">
          <div className=" text-[24px] text-[#242938] leading-[32px] font-semibold">
            Thay đổi mật khẩu
          </div>
          <div className="text-[15px] text-[#99a6b3] leading-[20px] font-normal mt-3">
            Hệ sinh thái từ điển Tiếng Anh dành cho người Việt
          </div>
        </div>
        <div>
          <form action="" className="" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center">
                <div className="mt-4">
                  <label
                    required
                    htmlFor="password"
                    className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                  >
                    Mật khẩu cũ
                  </label>
                </div>
              </div>
              <div>
                <input
                  type="password"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2"
                  placeholder="********"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <div className="mt-4">
                  <label
                    required
                    htmlFor="password"
                    className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                  >
                    Mật khẩu mới
                  </label>
                </div>
              </div>
              <div>
                <input
                  type="password"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2"
                  placeholder="********"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <div className="mt-4">
                  <label
                    required
                    htmlFor="password"
                    className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                  >
                    Nhập lại mật khẩu mới
                  </label>
                </div>
              </div>
              <div className=" relative">
                <input
                  type={stateTypePassword ? "password" : "text"}
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2"
                  placeholder="********"
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                Change password
              </button>
            </div>

            <div className="my-5"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
