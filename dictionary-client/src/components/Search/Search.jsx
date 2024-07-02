import { useState } from "react";
import icons from "../../ultils/icons";
import { useNavigate } from "react-router-dom";
const { CiSearch, FaXmark } = icons;

const Search = ({ width }) => {
  const [inputValue, setInputValue] = useState("");
  const inputWidth = typeof width === "number" ? `${width}px` : width;
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      localStorage.setItem("searchQuery", inputValue);
      navigate(`/search-result`);
    }
  };

  return (
    <div className="relative">
      <input
        style={{ width: inputWidth }}
        className={`p-3 rounded-[14px] h-[50px] text-[18px] text-[#505460] 
              placeholder-[#a5a8b4] border-[2px] border-[#2a61d4] focus:outline-none focus:ring-4
               focus:ring-[#cad8f7]`}
        type="text"
        placeholder="Nhập từ bạn cần tìm ?"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {inputValue && (
        <div
          className="absolute bg-[#e3e7ec] p-[5px] rounded-[8px] cursor-pointer hover:bg-[#d2d3d8] 
        top-[11px] right-11"
          onClick={handleClearInput}
        >
          <FaXmark size="16px" color="#7c7f88" />
        </div>
      )}
      <div className="absolute top-3 right-3">
        <CiSearch size="24px" color="#2a61d4" fontWeight="bold" />
      </div>
    </div>
  );
};

export default Search;
