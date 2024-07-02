import image1 from "../../assets/images/image-home-1.png";
import image2 from "../../assets/images/image-home-2.png";
import image3 from "../../assets/images/image-home-3.png";
import { BannerBottom } from "../../components/index";

import { Search } from "../../components/index";

const HomePage = () => {
  return (
    <>
      <div className="home">
        <div className="bg-custom h-[424px] bg-zoom">
          <div className="flex flex-col justify-center items-center ">
            <h1 className="flex mt-[110px] gap-3 text-[56px] leading-[68px]">
              <div className="text-[#d42525] font-bold">DOL</div>
              <div className="text-[#242938] font-bold">Dictionary</div>
            </h1>
            <div className="text-[18px] text-[#505460] flex flex-col justify-center items-center gap-3 mt-6">
              <div>Từ điển Việt - Anh chính xác nhất, chi tiết nhất.</div>
              <div>
                Cùng phát triển Dictionary với DOL bằng việc đề xuất thêm từ
                vựng nhé!
              </div>
            </div>

            <div className="mt-[52px]">
              <Search width={"800px"} />
            </div>
          </div>
        </div>

        <div className="flex gap-14 justify-center items-center mt-14">
          <div className="w-[478px]">
            <div className="text-[#242938] text-[32px] leading-[40px] font-bold">
              Nhiều từ Tiếng Việt được dịch nghĩa chính xác nhất
            </div>
            <div className="text-[18px] text-[#666a74] mt-5 leading-[28px] font-normal">
              Khác với các từ điển Việt - Anh thông thường. DOL xây dựng từ điển
              của mình theo hướng Việt - Việt - Anh giúp mang lại từ tiếng Anh
              có nghĩa chính xác nhất theo định nghĩa tiếng Việt của từ đang tìm
              kiếm.
            </div>
          </div>
          <div>
            <img className="w-[540px]" src={image1} alt="image1" />
          </div>
        </div>

        <div className="flex gap-14 justify-center items-center mt-14">
          <div>
            <img className="w-[540px]" src={image2} alt="image2" />
          </div>
          <div className="w-[478px]">
            <div className="text-[#242938] text-[32px] leading-[40px] font-bold">
              Ví dụ cụ thể được DOL tự viết riêng cho từng từ
            </div>
            <div className="text-[18px] text-[#666a74] mt-5 leading-[28px] font-normal">
              Với mỗi từ tiếng Anh sẽ có 2-3 ví dụ tương ứng được đội ngũ học
              thuật của DOL viết riêng theo ngữ cảnh thường dùng của từ đó, giúp
              các bạn nắm được cách mà từ này được sử dụng trong câu ứng với ngữ
              cảnh thực tế.
            </div>
          </div>
        </div>

        <div className="flex gap-14 justify-center items-center mt-14">
          <div className="w-[478px]">
            <div className="text-[#242938] text-[32px] leading-[40px] font-bold">
              Mỗi từ đều có Ghi chú riêng về cách sử dụng
            </div>
            <div className="text-[18px] text-[#666a74] mt-5 leading-[28px] font-normal">
              Đây chính là phần đắt giá nhất trong từ điển của DOL, các bạn sẽ
              được cung cấp những lưu ý quan trọng của từ khi sử dụng cũng như
              cung cấp các kiến thức liên quan về những từ vựng dễ nhầm lẫn với
              từ đang tìm kiếm, giúp việc ghi nhớ hiệu quả hơn và sử dụng chính
              xác hơn.
            </div>
          </div>
          <div>
            <img className="w-[540px]" src={image3} alt="image1" />
          </div>
        </div>

        <div className="bg-[#f9fafa] w-full h-[493px] flex items-center justify-center">
          <BannerBottom />
        </div>
      </div>
    </>
  );
};

export default HomePage;
