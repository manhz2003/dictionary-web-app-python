import { useState, useEffect } from "react";
import { Table, Drawer, Button } from "../../components/index";
import icons from "../../ultils/icons";
const { IoIosCreate, CiExport, FiTrash2, LuPencilLine, FaRegTrashCan } = icons;
import imageDefault from "../../assets/images/avatar-default.jpeg";
import {
  apiDeleteCategory,
  apiUpdateCategory,
  apiCreateCategory,
  apiGetAllCategory,
} from "../../apis";
import { toast } from "react-toastify";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const ManageCategory = () => {
  const [clearSearch, setClearSeach] = useState("");
  const [showDes, setShowDes] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [defaultImage, setDefaultImage] = useState(imageDefault);
  const [nameCategory, setNameCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  // call api lấy toàn bộ category
  useEffect(() => {
    apiGetAllCategory()
      .then((response) => {
        if (response.status === 200) {
          setCategoryData(response.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch category: ", error);
      });
  }, []);

  // hàm tải lại dữ liệu category
  const reloadCategory = async () => {
    try {
      const response = await apiGetAllCategory();
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch users: ", error);
    }
  };

  // Xử lý xóa category
  const handleDelete = async (record) => {
    try {
      const response = await apiDeleteCategory(record.id);
      if (response.status === 200) {
        toast.success("Xóa danh mục thành công");
        reloadCategory();
      } else {
        toast.error("Xóa danh mục thất bại: Lỗi không xác định");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error(
            "Xóa danh mục thất bại: Danh mục đang có từ điển liên quan"
          );
        } else if (error.response.status === 500) {
          toast.error("Xóa danh mục thất bại: Lỗi máy chủ nội bộ");
        } else {
          toast.error("Xóa danh mục thất bại: Lỗi không xác định");
        }
      } else {
        console.error("Failed to delete category: ", error);
        toast.error("Xóa danh mục thất bại: Lỗi không xác định");
      }
    }
  };

  // Xử lý sửa category
  const handleEdit = (record) => {
    setNameCategory(record.nameCategory);
    setDescription(record.describe);
    setDefaultImage(record.thumbnail);
    setThumbnail(record.thumbnail);
    setIdCategory(record.id);
    setShowDes(true);
    setDrawerTitle("Cập nhật danh mục");
    setIsEditMode(true);
  };

  // xủ lý xuất file excel
  async function exportToExcel(dataSelect) {
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("category");

    worksheet.columns = [
      { header: "No", key: "no", width: 10 },
      { header: "nameCategory", key: "nameCategory", width: 30 },
      { header: "description", key: "description", width: 30 },
      { header: "thumbnail", key: "thumbnail", width: 20 },
    ];

    dataSelect?.forEach((value, index) => {
      worksheet.addRow({
        no: index + 1,
        nameCategory: value.nameCategory,
        description: value.description,
        thumbnail: value.thumbnail,
      });
    });

    let buffer = await workbook.xlsx.writeBuffer();
    let blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "category.xlsx");
  }

  const handleExportClick = async () => {
    if (Array.isArray(categoryData) && categoryData.length > 0) {
      await exportToExcel(categoryData);
    } else {
      toast.error("Không có dữ liệu để xuất file");
    }
  };

  const handleClearSearch = () => {
    setClearSeach("");
  };

  const handleDeleteImage = () => {
    setThumbnail(defaultImage);
  };

  const handleThumnailChange = (e) => {
    setThumbnail(e.target.value);
  };

  const handleSubmit = async () => {
    if (!nameCategory || !description || !thumbnail) {
      toast.error("Vui lòng nhập đủ thông tin");
      return;
    }

    const categoryEdit = {
      id: idCategory,
      nameCategory,
      description,
      thumbnail,
    };

    const categoryCreate = {
      nameCategory,
      description,
      thumbnail,
    };

    try {
      if (isEditMode) {
        await apiUpdateCategory(categoryEdit)
          .then((response) => {
            if (response.status === 200) {
              toast.success("Cập nhật danh mục thành công");
            }
          })
          .catch((error) => {
            toast.error("Đã xảy ra lỗi khi cập nhật danh mục");
          });
      } else {
        await apiCreateCategory(categoryCreate)
          .then((response) => {
            if (response.status === 201) {
              toast.success("Thêm mới danh mục thành công");
            }
          })
          .catch((error) => {
            toast.error("Đã xảy ra lỗi khi thêm mới danh mục");
          });
      }

      setShowDes(false);
      reloadCategory();
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cập nhật/thêm mới danh mục");
    }
  };

  const handleAddNew = () => {
    setShowDes(true);
    setDrawerTitle("Thêm mới danh mục");
    setIsEditMode(false);
    setNameCategory("");
    setDescription("");
    setDefaultImage(imageDefault);
  };

  const column = [
    {
      title: "No",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên danh mục",
      key: "nameCategory",
      sort: true,
    },
    {
      title: "Mô tả",
      key: "describe",
      sort: true,
    },
    {
      title: "Hình ảnh",
      key: "thumbnail",
      sort: true,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-3 cursor-pointer">
            <FiTrash2 color="red" onClick={() => handleDelete(record)} />
            <LuPencilLine color="#1677ff" onClick={() => handleEdit(record)} />
          </div>
        );
      },
    },
  ];

  const [valueSearch, setValueSearch] = useState("");

  const handleSearch = (searchTerm) => {
    setValueSearch(searchTerm);
  };

  const groupButton = [
    {
      id: 1,
      button: (
        <div className="">
          <input
            className="text-[15px] p-[11px] border-2 border-gray-100 rounded-[7px] outline-none w-[300px]"
            type="text"
            placeholder="Tìm kiếm ..."
            onChange={(e) => setValueSearch(e.target.value)}
            value={valueSearch}
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
      <div className="bg-[#fff] border-2 border-gray-100 drop-shadow p-5 rounded-[6px]  h-[100%]">
        <div className="flex justify-between items-center border-b-2 border-gray-100 drop-shadow bg-[#fafafa] rounded-[8px] p-3">
          <div className="font-semibold text-[21px]">Manage category</div>
          <div className="flex items-center gap-3">
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
            title="Danh mục từ vựng"
            columns={column}
            data={categoryData.filter((category) =>
              category.nameCategory
                .toLowerCase()
                .includes(valueSearch.toLowerCase())
            )}
            maxH={300}
            groupButton={groupButton}
            handleSearch={handleSearch}
          />
        </div>
        {showDes && (
          <Drawer
            onClose={() => setShowDes(false)}
            title={drawerTitle}
            style={showDes ? "block gap-x-5 gap-y-3" : "hidden"}
          >
            <div className="">
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal "
                >
                  Tên danh mục
                </label>
                <input
                  required
                  type="text"
                  id="text"
                  className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder="Động vật"
                  value={nameCategory}
                  onChange={(e) => setNameCategory(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal mt-5"
                >
                  Mô tả danh mục
                </label>
                <textarea
                  required
                  id="text"
                  className="w-full h-[98px] border border-[#e4e6e8] rounded-[8px] p-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                  placeholder="Động vật là một nhóm sinh vật đa bào, nhân chuẩn ..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-[15px] text-[#242938] leading-[20px] font-normal mt-5"
                >
                  Hình ảnh
                </label>
                <div>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-solid border-[#e5e5e5] rounded-[8px] mt-4"
                    placeholder="Dán url ảnh vào đây"
                    onChange={handleThumnailChange}
                    value={thumbnail}
                  />
                </div>
                <div className=" mt-5">
                  <div
                    className="w-[120px] h-[90px] rounded-[10px] cursor-pointer relative group"
                    onClick={handleDeleteImage}
                  >
                    <div className="border-solid border-2 border-[#ebebeb] rounded-[10px]">
                      <img
                        className="w-[120px] h-[90px] rounded-[10px]"
                        src={thumbnail || defaultImage}
                        alt="avatar"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 rounded-[10px]">
                        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 group-hover:opacity-100">
                          <FaRegTrashCan color="#fff" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                      handleDeleteImage();
                      setNameCategory("");
                      setDescription("");
                      setThumbnail("");
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
    </>
  );
};

export default ManageCategory;
