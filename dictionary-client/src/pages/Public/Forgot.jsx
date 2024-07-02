import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-dictionary.png";
import icons from "../../ultils/icons";
import path from "../../ultils/path";
import { toast } from "react-toastify";

const { FcGoogle, FaEye, FaEyeSlash } = icons;

const Forgot = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[40%]">
        <div className="flex justify-center mt-5">
          <img className="w-[80px]" src={logo} alt="logo" />
        </div>
        <div className="mt-6">
          <div className=" text-[24px] text-[#242938] leading-[32px] font-semibold">
            Bạn bị quên mật khẩu ?
          </div>
          <div className="text-[15px] text-[#99a6b3] leading-[20px] font-normal mt-3">
            Hãy nhập email của bạn vào đây, mật khẩu mới sẽ được gửi cho bạn về
            địa chỉ email
          </div>
        </div>
        <div>
          <form action="" className="">
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
              />
            </div>

            <div className="flex items-center justify-center mt-8">
              <button className="w-full bg-[#d42525] p-4 text-[#fff] rounded-[8px]">
                Forgot password
              </button>
            </div>

            <div className="my-5"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
