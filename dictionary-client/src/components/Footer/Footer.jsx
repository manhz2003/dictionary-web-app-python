import logoFooter from "../../assets/images/logo-footer.png";
import logoDMCA from "../../assets/images/dmca.png";
import icons from "../../ultils/icons";

const { TiSocialFacebook, FaYoutube, FaTiktok } = icons;

const Footer = () => {
  return (
    <footer className="h-[534px] bg-[#242938] font-sans flex justify-center">
      <div className="flex flex-col justify-start items-center w-[90%]">
        <div className="mt-12 w-[88%] flex justify-start">
          <img className="w-[120px]" src={logoFooter} alt="logoFooter" />
        </div>
        <div className="flex gap-16 mt-10 justify-center w-full">
          <ul className="text-[#fff] list-none p-0 flex flex-col gap-4 text-[14px]">
            <li>
              Một sản phẩm với mục đích học tập, không với mục đích thương mại (
              Mạnh Nguyễn)
            </li>
            <li className="flex gap-1">
              <span className=" font-bold">Trụ sở:</span>{" "}
              <div className="hover:text-[#2a61d4] cursor-pointer">
                Ngõ 4, phố Kiều Mai, Quận Bắc Từ Liêm, TP.Hà Nội
              </div>
            </li>
            <li className="flex gap-1">
              <span className=" font-bold">Hotline:</span>{" "}
              <div className="hover:text-[#2a61d4] cursor-pointer">
                1800 96 96 39
              </div>
            </li>
            <li className="flex gap-1">
              <span className=" font-bold">Inbox:</span>{" "}
              <div className="hover:text-[#2a61d4] cursor-pointer">
                m.me/dolenglish.ieltsmanhnguyen
              </div>
            </li>
            <li className=" font-bold">Theo dõi DOL tại</li>
            <li className="flex gap-5">
              <div className="flex justify-center items-center h-[40px] w-[40px] bg-[#505460] rounded-[100%] p-1 cursor-pointer transform transition duration-400 hover:scale-95">
                <TiSocialFacebook size="28px" color="#8594a3" />
              </div>
              <div className="flex justify-center items-center h-[40px] w-[40px] bg-[#505460] rounded-[100%] p-1 cursor-pointer transform transition duration-400 hover:scale-95">
                <FaYoutube size="24px" color="#8594a3" />
              </div>
              <div className="flex justify-center items-center h-[40px] w-[40px] bg-[#505460] rounded-[100%] p-1 cursor-pointer transform transition duration-400 hover:scale-95">
                <FaTiktok size="20px" color="#8594a3" />
              </div>
            </li>
          </ul>
          <ul className="list-none p-0 flex flex-col gap-4 text-[14px]">
            <li className="text-[#818f9e] font-bold text-[16px]">
              VỀ DOL ENGLISH - IELTS MẠNH NGUYỄN
            </li>
            <li className="hover:text-[#2a61d4] cursor-pointer text-white">
              Linearthinking
            </li>
            <li className="hover:text-[#2a61d4] cursor-pointer text-white">
              Nền tảng công nghệ
            </li>
            <li className="hover:text-[#2a61d4] cursor-pointer text-white">
              Đội ngũ giáo viên
            </li>
            <li className="hover:text-[#2a61d4] cursor-pointer text-white">
              Thành tích học viên
            </li>
            <li className="hover:text-[#2a61d4] cursor-pointer text-white">
              Khóa học tại DOL
            </li>
            <li className="hover:text-[#2a61d4] cursor-pointer text-white">
              Tạo CV và tìm việc miễn phí
            </li>
          </ul>
          <ul className="list-none p-0 flex flex-col gap-4 text-[14px]">
            <li className="text-[#818f9e] font-bold text-[16px]">
              DOL ECOSYSTEM
            </li>
            <li className="hover:text-[#2a61d4] cursor-pointer text-white">
              DOL Grammar
            </li>
            <li className="hover:text-[#2a61d4] cursor-pointer text-white">
              DOL Tự Học
            </li>
            <li className="hover:text-[#2a61d4] cursor-pointer text-white">
              Kiến thức IELTS tổng hợp
            </li>
            <li className="hover:text-[#2a61d4] cursor-pointer text-white">
              DOL superLMS
            </li>
          </ul>
        </div>
        <div className="mt-16 w-[89%] bg-[#8594a3] border-2 h-[1px]"></div>
        <div className="mt-10 w-[89%] flex justify-start ">
          <ul className="list-none p-0 flex flex-col gap-2">
            <li className="text-[14px] text-[#818f9e]">
              © 2024 DOL English. All rights reserved.
            </li>
            <li>
              <img src={logoDMCA} alt="logoDMCA" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
