import { useState, useCallback, useEffect } from "react";
import { Table, Drawer, Button, Modal, DragFile } from "../../components/index";
import icons from "../../ultils/icons";
import { toast } from "react-toastify";
import { readFileDataImport } from "../../ultils/helper";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import {
  apiDeleteDictionary,
  apiUpdateDictionary,
  apiCreateDictionary,
  apiGetAllDictionary,
  apiGetAllCategory,
} from "../../apis";

const {
  IoIosCreate,
  CiExport,
  FiTrash2,
  LuPencilLine,
  CiImport,
  IoIosAddCircleOutline,
  CiCircleMinus,
} = icons;

const ManageVocabulary = () => {
  const [clearSearch, setClearSearch] = useState("");
  const [showDes, setShowDes] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [english, setEnglish] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [wordType, setWordType] = useState("");
  const [phoneticTranscription, setPhoneticTranscription] = useState("");
  const [explain, setExplain] = useState("");
  const [thumnail, setThumnail] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [dataImport, setDataImport] = useState({});
  const [englishExample, setEnglishExample] = useState([""]);
  const [vietnameseExample, setVietnameseExample] = useState([""]);
  const [idCategory, setIdCategory] = useState("");
  const [dataDictionary, setDataDictionary] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);
  const [idVocabulary, setIdVocabulary] = useState("");
  const [valueSearch, setValueSearch] = useState("");

  // call api hiển thị data dictionary
  useEffect(() => {
    apiGetAllDictionary()
      .then((response) => {
        if (response.status === 200) {
          setDataDictionary(Array.isArray(response.data) ? response.data : []);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch dictionary: ", error);
      });
  }, []);

  // refresh data dictionary
  const reloadDictionary = () => {
    apiGetAllDictionary()
      .then((response) => {
        if (response.status === 200) {
          setDataDictionary(Array.isArray(response.data) ? response.data : []);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch dictionary: ", error);
      });
  };

  // Xử lý chọn category
  useEffect(() => {
    apiGetAllCategory()
      .then((response) => {
        setCategorySelect(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch category: ", error);
      });
  }, []);

  // select category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Cập nhật danh mục được chọn khi người dùng thay đổi lựa chọn
  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedCategory = categorySelect.find(
      (category) => category.id === parseInt(selectedId)
    );
    setIdCategory(selectedId);
    setNameCategory(selectedCategory?.nameCategory || "");

    // Cập nhật danh mục được chọn
    setSelectedCategory(selectedCategory);
  };

  // Lọc dataDictionary dựa trên danh mục được chọn
  const filteredDataDictionary = selectedCategory
    ? dataDictionary?.filter((word) => word.category.id === selectedCategory.id)
    : dataDictionary || [];

  // xử lý xuất file excel
  async function exportToExcel(dataSelect) {
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("dictionary");

    worksheet.columns = [
      { header: "No", key: "no", width: 10 },
      { header: "english", key: "english", width: 40 },
      { header: "vietnamese", key: "vietnamese", width: 40 },
      { header: "explanation", key: "explanation", width: 40 },
      { header: "wordType", key: "wordType", width: 40 },
      { header: "category", key: "category", width: 40 },
      {
        header: "phoneticTranscription",
        key: "phoneticTranscription",
        width: 40,
      },
      { header: "englishExample", key: "englishExample", width: 40 },
      { header: "vietnameseExample", key: "vietnameseExample", width: 40 },
      { header: "thumbnail", key: "thumbnail", width: 40 },
    ];

    dataSelect?.forEach((value, index) => {
      worksheet.addRow({
        no: index + 1,
        english: value.english,
        vietnamese: value.vietnamese,
        explanation: value.explanation,
        wordType: value.wordType,
        category: value.category.nameCategory,
        phoneticTranscription: value.phoneticTranscription,
        englishExample: value.englishExample.join(", "),
        vietnameseExample: value.vietnameseExample.join(", "),
        thumbnail: value.thumbnail,
      });
    });

    let buffer = await workbook.xlsx.writeBuffer();
    let blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "dictionary.xlsx");
  }

  const handleExportClick = async () => {
    if (Array.isArray(dataDictionary) && dataDictionary.length > 0) {
      await exportToExcel(dataDictionary);
    } else {
      toast.error("Không có dữ liệu để xuất file");
    }
  };

  const handleAddEnglish = () => {
    setEnglishExample([...englishExample, ""]);
  };

  const handleAddVietnamese = () => {
    setVietnameseExample([...vietnameseExample, ""]);
  };

  const handleRemoveEnglish = (index) => {
    setEnglishExample(englishExample.filter((_, i) => i !== index));
  };

  const handleRemoveVietNamese = (index) => {
    setVietnameseExample(vietnameseExample.filter((_, i) => i !== index));
  };

  const handleChangeEnglish = (e, index) => {
    const newItems = [...englishExample];
    newItems[index] = e.target.value;
    setEnglishExample(newItems);
  };

  const handleChangeVietnamese = (e, index) => {
    const newItemsV = [...vietnameseExample];
    newItemsV[index] = e.target.value;
    setVietnameseExample(newItemsV);
  };

  // Xử lý xóa từ điển
  const handleDelete = async (record) => {
    try {
      const response = await apiDeleteDictionary(record.id);
      if (response.status === 204) {
        toast.success("Xóa từ điển thành công");
        reloadDictionary();
      }
    } catch (error) {
      console.error("Failed to delete dictionary: ", error);
      toast.error("Xóa từ điển thất bại");
    }
  };

  // Xử lý cập nhật từ điển
  const handleEdit = (record) => {
    setIdVocabulary(record.id);
    setIdCategory(record.category.id);
    setNameCategory(record.category);
    setEnglish(record.english);
    setVietnamese(record.vietnamese);
    setPhoneticTranscription(record.phoneticTranscription);
    setExplain(record.explanation);
    setWordType(record.wordType);
    setThumnail(record.thumbnail);
    setEnglishExample(
      Array.isArray(record.englishExample) ? record.englishExample : []
    );
    setVietnameseExample(
      Array.isArray(record.vietnameseExample) ? record.vietnameseExample : []
    );
    setShowDes(true);
    setDrawerTitle("Cập nhật từ điển");
    setIsEditMode(true);
  };

  // Xử lý thêm mới từ điển
  const handleAddNew = () => {
    setShowDes(true);
    setDrawerTitle("Thêm mới từ điển");
    setIsEditMode(false);
    setNameCategory("");
    setEnglish("");
    setVietnamese("");
    setPhoneticTranscription("");
    setExplain("");
    setWordType("");
    setThumnail("");
    setEnglishExample([]);
    setVietnameseExample([]);
  };

  // Xử lý import từ điển
  const handleImportButtonClick = () => {
    if (dataImport) {
      apiCreateDictionary(dataImport)
        .then((response) => {
          if (response.status === 201) {
            toast.success("Import thành công");
            setShowModal(false);
            setFileName(null);
            setDataPreview([]);
            reloadDictionary();
          }
        })
        .catch((error) => {
          toast.error("Import thất bại");
        });
    }
  };

  // Xử lý xem trước dữ liệu import
  const handlePreviewData = useCallback(
    (fileValue) => {
      readFileDataImport(fileValue)
        .then((dataMain) => {
          const dataFormat = Array.isArray(dataMain.dataMain)
            ? dataMain.dataMain.map((data) => ({
                english: data["Tiếng Anh"],
                vietnamese: data["Tiếng việt"],
                phoneticTranscription: String(data["Phiên âm"]),
                explanation: data["Giải nghĩa từ"],
                wordType: data["Loại từ"],
                thumbnail: data["link ảnh"],
                englishExample: [data["Đặt câu"]],
                vietnameseExample: [data["Dịch nghĩa câu"]],
                category: { nameCategory: nameCategory },
              }))
            : [];

          const dataImport = dataFormat.map((item) => ({
            ...item,
            category: +idCategory,
          }));

          setDataPreview(dataFormat);

          // Convert dataImport to the desired format
          const convertedData = dataImport.map((item) => ({
            english: item.english,
            vietnamese: item.vietnamese,
            phoneticTranscription: item.phoneticTranscription,
            explain: item.explanation,
            wordType: item.wordType,
            thumbnail: item.thumbnail,
            englishExample: item.englishExample,
            vietnameseExample: item.vietnameseExample,
            category: item.category,
          }));

          console.log(convertedData);
          setDataImport(convertedData);
        })
        .catch((error) => {
          toast.error("File không đúng định dạng !");
        });
    },
    [idCategory, nameCategory]
  );

  const handleClearSearch = () => {
    setClearSearch("");
  };

  // Xử lý cập nhật từ điển hoặc thêm mới từ điển
  const handleSubmit = async () => {
    if (
      !idCategory ||
      !english ||
      !vietnamese ||
      !thumnail ||
      !explain ||
      !wordType ||
      !phoneticTranscription
    ) {
      toast.error("Vui lòng nhập đủ thông tin");
      return;
    }

    const vocabularyEdit = [
      {
        id: idVocabulary,
        english: english,
        vietnamese: vietnamese,
        phoneticTranscription: phoneticTranscription,
        explain: explain,
        wordType: wordType,
        thumbnail: thumnail,
        englishExample: englishExample,
        vietnameseExample: vietnameseExample,
        category: idCategory,
      },
    ];

    const vocabularyCreate = [
      {
        english,
        vietnamese,
        phoneticTranscription,
        explain: explain,
        wordType,
        thumbnail: thumnail,
        category: +idCategory,
        vietnameseExample: vietnameseExample,
        englishExample: englishExample,
      },
    ];

    console.log(vocabularyCreate);

    try {
      if (isEditMode) {
        await apiUpdateDictionary(vocabularyEdit)
          .then((response) => {
            if (response.status === 200) {
              toast.success("Cập nhật từ điển thành công");
            }
          })
          .catch((error) => {
            toast.error("Đã xảy ra lỗi khi cập nhật từ điển");
          });
      } else {
        await apiCreateDictionary(vocabularyCreate)
          .then((response) => {
            if (response.status === 200) {
              toast.success("Thêm mới từ điển thành công");
            }
          })
          .catch((error) => {
            toast.error("Đã xảy ra lỗi khi thêm mới từ điển");
          });
      }

      setShowDes(false);
      reloadDictionary();
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cập nhật/thêm mới từ điển");
    }
  };

  const handleSearch = (searchValue) => {
    const filtered = dataDictionary.filter((item) =>
      item.vietnamese.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered); // set the filtered data
  };

  const column = [
    {
      title: "No",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "English",
      key: "english",
      render: (text, record) => record.english || "",
    },
    {
      title: "Vietnamese",
      key: "vietnamese",
      render: (text, record) => record.vietnamese || "",
    },
    {
      title: "Phiên âm",
      key: "phoneticTranscription",
      sort: true,
    },
    {
      title: "Giải thích",
      key: "explanation",
      sort: true,
    },
    {
      title: "Loại từ",
      key: "wordType",
      sort: true,
    },
    {
      title: "Danh mục",
      key: "category",
      render: (text, record) => record.category.nameCategory || "",
    },
    {
      title: "Ví dụ tiếng anh",
      key: "englishExample",
      render: (text, record) => {
        return (
          <div>
            {Array.isArray(record.englishExample) &&
            record.englishExample.length > 0 ? (
              record.englishExample.map((item, index) => (
                <p key={index}>{`${index + 1}. ${item}`}</p>
              ))
            ) : (
              <p>Không có ví dụ</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Ví dụ tiếng việt",
      key: "vietnameseExample",
      render: (text, record) => {
        return (
          <div>
            {Array.isArray(record.vietnameseExample) &&
            record.vietnameseExample.length > 0 ? (
              record.vietnameseExample.map((item, index) => (
                <p key={index}>{`${index + 1}. ${item}`}</p>
              ))
            ) : (
              <p>Không có ví dụ</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Ảnh mô tả",
      key: "thumbnail",
      sort: true,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-3 cursor-pointer">
            <FiTrash2
              color="red"
              onClick={() => handleDelete(record)}
              title="Delete"
            />
            <LuPencilLine
              color="#1677ff"
              onClick={() => handleEdit(record)}
              title="Edit"
            />
          </div>
        );
      },
    },
  ];

  const groupButton = [
    {
      id: 1,
      button: (
        <div className="">
          <input
            className="text-[15px] p-[11px] border-2 border-gray-100 rounded-[7px] outline-none w-[300px]"
            type="text"
            placeholder="Tìm kiếm ..."
            onChange={(e) => {
              setClearSearch(e.target.value);
              handleSearch(e.target.value);
            }}
            value={clearSearch}
          />
        </div>
      ),
    },
    {
      id: 2,
      button: (
        <div>
          <Button
            style={
              "bg-[#d42525] text-[#fff] py-3 text-[16px] flex item-center gap-2"
            }
            handleOnclick={() => {
              console.log("search");
            }}
          >
            search
          </Button>
        </div>
      ),
    },
    {
      id: 3,
      button: (
        <div>
          <Button
            style={
              "bg-[#fff] text-[#000] py-3 text-[16px] flex item-center gap-2"
            }
            handleOnclick={handleClearSearch}
          >
            Clear
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-[#fff] border-2 border-gray-100 drop-shadow p-5 rounded-[6px]">
        <div className="flex justify-between items-center border-b-2 border-gray-100 drop-shadow bg-[#fafafa] rounded-[8px] p-3">
          <div className="font-semibold text-[21px]">Manage vocabulary</div>
          <div className="flex items-center gap-3">
            <div>
              <select
                required
                className="w-full h-[42px] border border-[#e4e6e8] rounded-[8px] px-5 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                value={idCategory}
                onChange={handleSelectChange}
              >
                <option value="">Danh mục</option>
                {categorySelect.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nameCategory}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Button
                style={
                  "bg-[#d42525] text-[#fff] py-3 text-[16px] flex item-center gap-2"
                }
                icon={<IoIosCreate />}
                handleOnclick={handleAddNew}
              >
                Create
              </Button>
            </div>

            <div>
              <Button
                style={
                  "bg-[#d42525] text-[#fff] py-3 text-[16px] flex item-center gap-2"
                }
                icon={<CiImport />}
                handleOnclick={() => {
                  if (!nameCategory) {
                    toast.error("Vui lòng chọn danh mục trước khi import");
                  } else {
                    setShowModal(true);
                  }
                }}
              >
                Import
              </Button>
            </div>

            <div>
              <Button
                style={
                  "bg-[#d42525] text-[#fff] py-3 text-[16px] flex item-center gap-2"
                }
                icon={<CiExport />}
                handleOnclick={handleExportClick}
              >
                Export
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t-2 border-gray-100 drop-shadow">
          <Table
            title="Danh sách từ vựng"
            columns={column}
            data={filteredDataDictionary?.filter((item) =>
              item.vietnamese.toLowerCase().includes(valueSearch.toLowerCase())
            )}
            // groupButton={groupButton}
            valueSearch={valueSearch}
            handleSearch={handleSearch}
          />
        </div>
        {showDes && (
          <Drawer
            onClose={() => setShowDes(false)}
            title={drawerTitle}
            style={showDes ? "block gap-x-5 gap-y-3" : "hidden"}
          >
            <div className="flex flex-col gap-3">
              <div>
                <select
                  required
                  className="w-full h-[42px] border border-[#e4e6e8] rounded-[8px] px-5 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  value={idCategory}
                  onChange={handleSelectChange}
                >
                  <option value="">Danh mục</option>
                  {categorySelect.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nameCategory}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  English
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder="Banana"
                  value={english}
                  onChange={(e) => setEnglish(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  Vietnamese
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder="Quả chuối"
                  value={vietnamese}
                  onChange={(e) => setVietnamese(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  Phiên âm
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder="bəˈnæn.ə"
                  value={phoneticTranscription}
                  onChange={(e) => setPhoneticTranscription(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  Giải nghĩa
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder="Quả chuối là loại quả có vỏ màu vàng"
                  value={explain}
                  onChange={(e) => setExplain(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  Loại từ
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder="Danh từ"
                  value={wordType}
                  onChange={(e) => setWordType(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  Link ảnh mô tả
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder="Địa chỉ của ảnh"
                  value={thumnail}
                  onChange={(e) => setThumnail(e.target.value)}
                />
              </div>
              <div>
                <div
                  className="cursor-pointer flex gap-2 items-center mt-3"
                  onClick={handleAddEnglish}
                >
                  <div>Thêm ví dụ tiếng anh</div>
                  <div className="mt-[2.5px]">
                    <IoIosAddCircleOutline />
                  </div>
                </div>
                {englishExample.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 mt-5">
                    <div className="flex items-center gap-3 w-[10%]">
                      <div className="text-[15px] text-[#242938] leading-[20px] font-normal ">
                        Ví dụ {index + 1}
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleRemoveEnglish(index)}
                      >
                        <div>
                          <CiCircleMinus />
                        </div>
                      </div>
                    </div>
                    <input
                      required
                      type="text"
                      className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                      placeholder="I like banana"
                      value={item}
                      onChange={(e) => handleChangeEnglish(e, index)}
                    />
                  </div>
                ))}
              </div>

              <div>
                <div
                  className="cursor-pointer flex gap-2 items-center mt-3"
                  onClick={handleAddVietnamese}
                >
                  <div>Thêm ví dụ tiếng việt</div>
                  <div className="mt-[2.5px]">
                    <IoIosAddCircleOutline />
                  </div>
                </div>
                {vietnameseExample.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 mt-5">
                    <div className="flex items-center gap-3 w-[10%]">
                      <div className="text-[15px] text-[#242938] leading-[20px] font-normal ">
                        Ví dụ {index + 1}
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleRemoveVietNamese(index)}
                      >
                        <div>
                          <CiCircleMinus />
                        </div>
                      </div>
                    </div>
                    <input
                      required
                      type="text"
                      className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                      placeholder="Tôi thích quả chuối"
                      value={item}
                      onChange={(e) => handleChangeVietnamese(e, index)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-5 justify-end">
                <div>
                  <Button
                    style={"bg-[#d42525] text-[#fff] px-6 py-3 text-[16px]"}
                    handleOnclick={handleSubmit}
                  >
                    {isEditMode ? "Update" : "Add New"}
                  </Button>
                </div>
                <div>
                  <Button
                    style={"bg-white text-black py-3 text-[16px]"}
                    handleOnclick={() => {
                      setNameCategory("");
                      setEnglish("");
                      setVietnamese("");
                      setPhoneticTranscription("");
                      setExplain("");
                      setThumnail("");
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </Drawer>
        )}
      </div>
      {showModal && (
        <Modal
          show={showModal}
          setShow={setShowModal}
          title={"Import từ vựng"}
          disableOkBtn={dataPreview?.length < 1}
          onClickBtnOk={handleImportButtonClick}
          textOk={"Import"}
          onClickBtnCancel={() => {
            setShowModal(false);
            setFileName(null);
            setDataPreview([]);
          }}
        >
          <DragFile
            data={dataPreview}
            columns={column}
            onChange={handlePreviewData}
            fileName={fileName}
            setFileName={setFileName}
          />
        </Modal>
      )}
    </>
  );
};

export default ManageVocabulary;
