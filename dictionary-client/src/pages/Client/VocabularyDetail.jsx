import React, { useState, useEffect } from "react";
import { Banner, BannerBottom } from "../../components/index";
import icons from "../../ultils/icons";
import image from "../../assets/images/image-detail.jpeg";
import { apiGetDictionaryById } from "../../apis";
import { useNavigate, useParams } from "react-router-dom";

const { MdOutlineSpeakerNotes, IoIosArrowForward, FaRegStar, FaStar } = icons;

const VocabularyDetail = () => {
  const [word, setWord] = useState("");
  const { vocabularyId } = useParams();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState(null);

  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  const isFavourite = favourites.some((fav) => fav.id === word.id);

  useEffect(() => {
    const fetchWordDetail = async () => {
      try {
        const response = await apiGetDictionaryById(vocabularyId);
        setCategoryId(response.data.category.id);
        setWord(response.data);
      } catch (error) {
        console.error("Error fetching word:", error);
      }
    };

    if (vocabularyId) {
      fetchWordDetail();
    }
  }, [vocabularyId]);

  const handleClick = () => {
    let updatedFavourites;
    if (isFavourite) {
      updatedFavourites = favourites.filter((fav) => fav.id !== word.id);
    } else {
      updatedFavourites = [...favourites, word];
    }
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  if (!word) {
    return null;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full">
        <Banner />
      </div>
      <div className="w-[76%] flex justify-center flex-col">
        <div className="w-full flex mt-10 justify-between">
          <div>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleClick}
            >
              <div className="text-[20px] text-[#242938] leading-[60px] font-semibold">
                Đánh dấu từ yêu thích
              </div>
              <div className="cursor-pointer">
                {isFavourite ? <FaStar color="#f0d002" /> : <FaRegStar />}
              </div>
            </div>
            <div className="text-[14px] text-[#a6a9ae] leading-[20px] font-semibold">
              ENGLISH
            </div>
            <div className="text-[28px] text-[#242938] leading-[40px] font-semibold">
              {word.english}
            </div>
            <div className="text-[18px] leading-[28px] font-normal text-[#242938]">
              {word.phoneticTranscription}
            </div>
          </div>
          <div className="rounded-[10px] w-[170px]">
            <img
              className="rounded-[10px] w-[170px]"
              src={word.thumbnail || image}
              alt="image detail"
            />
          </div>
        </div>
        <div>
          <div className="text-[14px] text-[#a6a9ae] leading-[20px] font-semibold mt-3">
            VIETNAMESE
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[28px] text-[#242938] leading-[40px] font-semibold">
              {word.vietnamese}
            </div>
            <div className="font-semibold leading-[20px] text-[14px] text-[#2a61d4] flex justify-center items-center py-1 px-3 border-solid border-[1px] border-[#2a61d4] rounded-[14px]">
              {word.wordType}
            </div>
          </div>

          <div className="text-[18px] leading-[28px] font-normal text-[#242938] mt-4">
            {word.explanation || "No explanation available"}
          </div>
        </div>
        <div className="bg-[#f8f6fd] p-5 rounded-[10px] mb-5 mt-10">
          <div className="flex gap-3 items-center">
            <div className="bg-[#f0edfc] p-2 rounded-[10px] flex items-center justify-center">
              <MdOutlineSpeakerNotes color="#5b37d2" size="26px" />
            </div>
            <div className="font-semibold text-[24px] leading-[32px] text-[#242938]">
              Ví dụ
            </div>
          </div>
          <div className="mt-5">
            {word.vietnameseExample.map((example, index) => (
              <div key={index} className="mt-5 ml-3">
                <div className="font-medium text-[18px] text-[#242938] leading-[40px] ">
                  {word.englishExample[index]}
                </div>
                <div className="text-[18px] text-[#41444b] leading-[40px] font-normal">
                  {index + 1}. {example}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 mb-10 font-normal leading-[20px] text-[14px] flex items-center gap-2">
          <span className="text-[#242938]">Danh sách từ mới nhất: </span>
          <span
            className="cursor-pointer text-[#2a61d4]"
            onClick={() => {
              navigate(`/word-list?categoryId=${categoryId}`);
            }}
          >
            Xem chi tiết
          </span>{" "}
          <span className="cursor-pointer">
            <IoIosArrowForward color="#2a61d4" size="14px" />
          </span>
        </div>
      </div>
      <div className="bg-[#f9fafa] w-full h-[493px] flex items-center justify-center">
        <BannerBottom />
      </div>
    </div>
  );
};

export default VocabularyDetail;
