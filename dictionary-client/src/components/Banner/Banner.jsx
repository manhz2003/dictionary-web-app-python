import { Search } from "../index";

const Banner = () => {
  return (
    <div className="bg-custom2 h-[124px] bg-zoom-large flex items-center justify-center">
      <div className="flex justify-center items-center gap-14">
        <h1 className="flex gap-3 text-[40px] leading-[48px]">
          <div className="text-[#d42525] font-bold">DOL</div>
          <div className="text-[#242938] font-bold">Dictionary</div>
        </h1>
        <div className="mt-[10px]">
          <Search width={"750px"} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
