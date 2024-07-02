import React, { useEffect, useState } from "react";
import { Banner, BannerBottom } from "../../components/index";
import icons from "../../ultils/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { apiGetDictionaryByIdCategory } from "../../apis";

const {} = icons;

const WordList = () => {
  const [words, setWords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wordsPerPage] = useState(100);
  const [pageGroup, setPageGroup] = useState(1);
  const pagesPerGroup = 6;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryId = searchParams.get("categoryId");
    if (categoryId) {
      apiGetDictionaryByIdCategory(categoryId)
        .then((response) => {
          setWords(response.data);
        })
        .catch((error) => {
          console.error("Error fetching words:", error);
        });
    }
  }, [location.search]);

  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = words.slice(indexOfFirstWord, indexOfLastWord);

  const totalPageGroups = Math.ceil(
    words.length / wordsPerPage / pagesPerGroup
  );
  const totalPageInCurrentGroup = Math.min(
    pagesPerGroup,
    Math.ceil(words.length / wordsPerPage) - (pageGroup - 1) * pagesPerGroup
  );

  const paginate = (pageNumber) => {
    setCurrentPage((pageGroup - 1) * pagesPerGroup + pageNumber);
    navigate(`?page=${(pageGroup - 1) * pagesPerGroup + pageNumber}`);
  };

  const nextGroup = () => {
    setPageGroup(pageGroup + 1);
    setCurrentPage((pageGroup + 1) * pagesPerGroup + 1);
  };

  const previousGroup = () => {
    setPageGroup(pageGroup - 1);
    setCurrentPage((pageGroup - 1) * pagesPerGroup + 1);
  };

  const handleWordClick = (id) => {
    navigate(`/vocabulary-detail/${id}`);
  };

  return (
    <>
      <div>
        <Banner />
        <div className="w-full flex justify-center">
          <div className="w-[76%]">
            <div className="flex justify-center my-6 text-[32px] leading-[40px] text-[#242938] font-bold">
              Danh sách từ mới nhất
            </div>
            <div className="flex flex-wrap gap-8 my-10">
              {currentWords.map((word, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer gap-3 items-center text-[#7c7f88] w-[240px]"
                  onClick={() => handleWordClick(word.id)}
                >
                  <span className="text-[18px] leading-[24px]">
                    {index + 1}:{" "}
                  </span>
                  <span className="text-[#2a61d4] text-[18px] leading-[28px]">
                    <a href="#">{word.vietnamese}</a>
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3 my-10">
              {pageGroup > 1 && <button onClick={previousGroup}>...</button>}
              {[...Array(totalPageInCurrentGroup)].map((_, i) => (
                <button
                  className={`py-3 px-4 ${
                    currentPage === (pageGroup - 1) * pagesPerGroup + i + 1
                      ? "text-[#2a61d4] bg-[#f3f4f6]"
                      : ""
                  } hover:text-[#2a61d4] hover:bg-[#f3f4f6]`}
                  key={i}
                  onClick={() => paginate(i + 1)}
                >
                  {(pageGroup - 1) * pagesPerGroup + i + 1}
                </button>
              ))}
              {pageGroup < totalPageGroups && (
                <button onClick={nextGroup}>...</button>
              )}
            </div>
          </div>
        </div>
        <BannerBottom />
      </div>
    </>
  );
};

export default WordList;
