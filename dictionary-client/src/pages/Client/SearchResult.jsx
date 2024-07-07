import { Banner, BannerBottom } from "../../components/index";
import { useState, useEffect } from "react";
import { apiSearchListDictionaryVietnamese } from "../../apis";
import { useNavigate, useLocation } from "react-router-dom";

const truncateDescription = (description, wordLimit = 20) => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return description;
};

const SearchResult = () => {
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const storedQuery = localStorage.getItem("searchQuery");
    if (storedQuery) {
      setQuery(storedQuery);
    }
  }, []);

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const response = await apiSearchListDictionaryVietnamese(query, 0, 10);
        console.log(response.data);
        setSearchResult(response.data);
      } catch (error) {
        console.error("Error fetching search result:", error);
      }
    };

    if (query !== "") {
      fetchSearchResult();
    }
  }, [query]);

  const handleNavigateToDetail = (id) => {
    navigate(`/vocabulary-detail/${id}`);
  };

  return (
    <>
      <div className="search-result">
        <div className="w-full flex justify-center">
          <div className="w-[50%]">
            <div className="flex items-center gap-2 font-normal text-[18px] leading-[28px] my-8">
              <span className="font-bold text-[#242938]">
                {searchResult.length}
              </span>
              <span className="text-[#8e9199]">
                kết quả tìm kiếm liên quan đến từ khoá
              </span>
              <span className="font-bold text-[#242938]">{query}</span>
            </div>
            <div className="flex flex-col gap-5">
              {searchResult.map((result, index) => (
                <div
                  key={index}
                  className="flex gap-3 cursor-pointer"
                  onClick={() => handleNavigateToDetail(result.id)}
                >
                  <div className="cursor-pointer rounded-[8px] w-[75px] h-[75px]">
                    <img
                      className="rounded-[8px] w-[75px] h-[75px]"
                      src={result.thumbnail}
                      alt="searchResult"
                    />
                  </div>
                  <div className="items-center flex-col mb-10">
                    <div className="text-[18px] text-[#242938] font-semibold leading-[28px]">
                      {result.english}
                    </div>
                    <div className="font-normal leading-[20px] text-[14px] text-[#82858d]">
                      {truncateDescription(result.explanation)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-10"></div>

        <div className="bg-[#f9fafa] w-full h-[493px] flex items-center justify-center">
          <BannerBottom />
        </div>
      </div>
    </>
  );
};

export default SearchResult;
