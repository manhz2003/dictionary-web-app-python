import icons from "../../ultils/icons";
const { FaFacebookMessenger, FaPhone, FaMapMarkerAlt } = icons;

const BannerBottom = () => {
  return (
    <>
      <div className="bg-[#f9fafa] w-full h-[493px] flex items-center justify-center">
        <div>
          <div className="w-[490px] text-[#313a44] text-[32px] font-bold leading-[40px] ">
            Đóng góp từ mới vào từ điển cho cộng đồng{" "}
            <span className="text-[#d42525]">miễn phí</span> hãy liên hệ
          </div>
          <div className="flex flex-col gap-5 mt-10">
            <div className="flex gap-3 cursor-pointer">
              <div className="w-[40px] h-[40px] bg-[#f1f4f7] rounded-[9px] flex justify-center items-center p-1">
                <FaFacebookMessenger size="20px" color="#2096f3" />
              </div>
              <div className="flex flex-col gap-2 text-[#313a44]">
                <div className="font-bold text-[18px]">
                  Nhắn tin DOL qua Facebook
                </div>
                <div className="text-[12px]">
                  Click để nhắn tin với DOL qua fanpage chính
                </div>
              </div>
            </div>

            <div className="flex gap-3 cursor-pointer">
              <div className="w-[40px] h-[40px] bg-[#f1f4f7] rounded-[9px] flex justify-center items-center p-1">
                <FaPhone size="20px" color="#04a56c" />
              </div>
              <div className="flex flex-col gap-2 text-[#313a44]">
                <div className="font-bold text-[18px]">Gọi điện liên hệ</div>
                <div className="text-[12px]">
                  Liên hệ DOL qua hotline miễn phí: 1800 96 96 39
                </div>
              </div>
            </div>

            <div className="flex gap-3 cursor-pointer">
              <div className="w-[40px] h-[40px] bg-[#f1f4f7] rounded-[9px] flex justify-center items-center p-1">
                <FaMapMarkerAlt size="20px" color="#d42525" />
              </div>
              <div className="flex flex-col gap-2 text-[#313a44]">
                <div className="font-bold text-[18px]">
                  DOL có địa chỉ tại 4, kiều mai, quận bắc từ liêm, hà nội
                </div>
                <div className="text-[12px]">Click để xem địa chỉ chi tiết</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[40%]"></div>
      </div>
    </>
  );
};
export default BannerBottom;
