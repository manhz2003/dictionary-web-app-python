import { useState, useRef, useEffect } from "react";
import { Table, Drawer, Button } from "../../components/index";
import icons from "../../ultils/icons";
import { toast } from "react-toastify";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import {
  apiGetAllRole,
  apiGetAllUser,
  apiGetTotalUser,
  apiDeleteUserById,
  apiUpdateUserById,
  apiCreateUserById,
  apiGetTotalCategory,
  apiGetTotalDictionary,
} from "../../apis";
const {
  IoIosCreate,
  CiExport,
  FiTrash2,
  LuPencilLine,
  FaUser,
  TbVocabulary,
  BiCategory,
  MdOutlineDescription,
} = icons;

const DashBoard = () => {
  const [valueSearch, setValueSearch] = useState("");
  const [showDes, setShowDes] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [nameRole, setNameRole] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [vocabCount, setVocabCount] = useState(0);
  const [exampleCount, setExampleCount] = useState(0);
  const [roles, setRoles] = useState([]);
  const [userLimit, setUserLimit] = useState([]);
  const [categoryLimit, setCategoryLimit] = useState([]);
  const [userId, setUserId] = useState(null);
  const [categoryCount, setCategoryCount] = useState(0);
  const [vocabLimit, setVocabLimit] = useState([]);
  const [explanationLimit, setExplanationLimit] = useState([]);
  const [users, setUsers] = useState([]);

  // call api lấy tổng số user
  useEffect(() => {
    apiGetTotalUser()
      .then((response) => {
        if (response.status === 200) {
          setUserLimit(response.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user count: ", error);
      });
  }, []);

  // call api lấy tổng số category
  useEffect(() => {
    apiGetTotalCategory()
      .then((response) => {
        if (response.status === 200) {
          setCategoryLimit(response.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch category count: ", error);
      });
  }, []);

  // call api lấy tổng số từ vựng
  useEffect(() => {
    apiGetTotalDictionary()
      .then((response) => {
        if (response.status === 200) {
          setExplanationLimit(response.data.totalVietnameseCount);
          setVocabLimit(response.data.totalExplanationsCount);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch vocab count: ", error);
      });
  }, []);

  // call api lấy toàn bộ role cho select option
  useEffect(() => {
    apiGetAllRole()
      .then((response) => {
        if (response.status === 200) {
          setRoles(response.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch roles: ", error);
      });
  }, []);

  // call api lấy toàn bộ user
  useEffect(() => {
    apiGetAllUser()
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch users: ", error);
      });
  }, []);

  // hàm tải lại dữ liệu user
  const reloadUser = async () => {
    try {
      const response = await apiGetAllUser();
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch users: ", error);
    }
  };

  // thống kê số lượng user, từ vựng, ví dụ, mô tả
  useEffect(() => {
    const incrementCount = (setCount, limit) => {
      setCount((prevCount) => {
        if (prevCount < limit) {
          setTimeout(() => incrementCount(setCount, limit), 100);
          return prevCount + 1;
        } else {
          return prevCount;
        }
      });
    };

    incrementCount(setUserCount, userLimit);
    incrementCount(setVocabCount, vocabLimit);
    incrementCount(setExampleCount, explanationLimit);
    incrementCount(setCategoryCount, categoryLimit);
  }, [userLimit, categoryLimit, vocabLimit, explanationLimit]);

  const handleSubmit = async () => {
    if (!fullName || !address || !phoneNumber || !email || !nameRole) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const userData = {
      fullname: fullName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      roleId: roles.find((role) => role.nameRole === nameRole)?.id,
    };

    const userDataEdit = {
      fullname: fullName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      roleId: roles.find((role) => role.nameRole === nameRole)?.id,
      userId: userId,
    };

    try {
      if (isEditMode) {
        await apiUpdateUserById(userDataEdit)
          .then((response) => {
            if (response.status === 200) {
              toast.success("Cập nhật người dùng thành công");
            }
          })
          .catch((error) => {
            console.error("Failed to update user: ", error);
            toast.error("Đã xảy ra lỗi khi cập nhật/thêm mới người dùng");
          });
      } else {
        await apiCreateUserById(userData)
          .then((response) => {
            if (response.status === 201) {
              toast.success("Thêm mới người dùng thành công");
            }
          })
          .catch((error) => {
            console.error("Failed to create user: ", error);
            toast.error("Đã xảy ra lỗi khi cập nhật/thêm mới người dùng");
          });
      }

      setShowDes(false);
      reloadUser();
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cập nhật/thêm mới người dùng");
    }
  };

  // Xử lý xóa user
  const handleDelete = async (record) => {
    try {
      const response = await apiDeleteUserById(record.id);
      if (response.status === 200) {
        toast.success("Xóa user thành công");
        reloadUser();
      }
    } catch (error) {
      console.error("Failed to delete user: ", error);
      toast.error("Xóa user thất bại");
    }
  };

  const handleCreate = () => {
    setShowDes(true);
    setDrawerTitle("Thêm mới user");
    setIsEditMode(false);
    setFullName("");
    setAddress("");
    setPhoneNumber("");
    setEmail("");
    setNameRole("");
  };

  const handleEdit = (record) => {
    setUserId(record.id);
    setFullName(record.fullname);
    setAddress(record.address);
    setPhoneNumber(record.phoneNumber);
    setEmail(record.email);
    setNameRole(record.nameRole);
    setShowDes(true);
    setDrawerTitle("Cập nhật user");
    setIsEditMode(true);
  };

  const handleDeleteImage = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const column = [
    {
      title: "No",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Họ và tên",
      key: "fullname",
      dataIndex: "fullname",
      sort: true,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      sort: true,
    },
    {
      title: "Số điện thoại",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      sort: true,
    },
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: "address",
      sort: true,
    },
    {
      title: "Role",
      key: "role",
      render: (text, record) => record.roles.join(", "),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center gap-3 cursor-pointer">
          <FiTrash2 color="red" onClick={() => handleDelete(record)} />
          <LuPencilLine color="#1677ff" onClick={() => handleEdit(record)} />
        </div>
      ),
    },
  ];

  // xủ lý xuất file excel
  async function exportToExcel(dataSelect) {
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
      { header: "No", key: "no", width: 10 },
      { header: "FullName", key: "fullname", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "NumberPhone", key: "phoneNumber", width: 20 },
      { header: "Address", key: "address", width: 30 },
      { header: "Role", key: "role", width: 20 },
    ];

    dataSelect?.forEach((value, index) => {
      let roles = value.role?.join(", ");
      worksheet.addRow({
        no: index + 1,
        fullname: value.fullname,
        email: value.email,
        phoneNumber: value.phoneNumber,
        address: value.address,
        role: roles,
      });
    });

    let buffer = await workbook.xlsx.writeBuffer();
    let blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "users.xlsx");
  }

  const handleExportClick = async () => {
    if (Array.isArray(users) && users.length > 0) {
      await exportToExcel(users);
    } else {
      toast.error("Không có dữ liệu để xuất file");
    }
  };

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
            handleOnclick={() => {}}
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
            handleOnclick={() => {
              setValueSearch("");
            }}
          >
            Clear
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#fff] border-2 border-gray-100 drop-shadow p-5 rounded-[6px]">
      <div className="flex flex-col  border-b-2 border-gray-100 drop-shadow bg-[#fafafa] rounded-[8px] p-3">
        <div className="font-semibold text-[21px]">Dasdboad</div>
        <div className="flex items-center justify-center gap-8 my-4">
          <div className="bg-[#fff] text-[#333] leading-3 text-[20px] rounded-[6px] h-[130px] w-[238px] flex justify-center items-center gap-5">
            <div className="bg-[#08d6b8] p-5 rounded-[100%] ">
              <FaUser size="22px" color="#fff" />
            </div>
            <div className="flex flex-col gap-3 w-[50%]">
              <div className=" text-[30px] font-bold leading-[22px]">
                {userCount}
              </div>
              <div className="font-semibold leading-[22px]">Người dùng</div>
            </div>
          </div>

          <div className="bg-[#fff] text-[#333] leading-3 text-[20px] rounded-[6px] h-[130px] w-[238px] flex justify-center items-center gap-5">
            <div className="bg-[#ffba67] p-5 rounded-[100%]">
              <BiCategory size="22px" color="#fff" />
            </div>
            <div className="flex flex-col gap-3 w-[50%]">
              <div className=" text-[30px] font-bold leading-[22px]">
                {categoryCount}
              </div>
              <div className="font-semibold leading-[22px]">Danh mục</div>
            </div>
          </div>

          <div className="bg-[#fff] text-[#333] leading-3 text-[20px] rounded-[6px] h-[130px] w-[238px] flex justify-center items-center gap-5">
            <div className="bg-[#ff9b89] p-5 rounded-[100%]">
              <TbVocabulary size="22px" color="#fff" />
            </div>
            <div className="flex flex-col gap-3 w-[50%]">
              <div className=" text-[30px] font-bold leading-[22px]">
                {exampleCount}
              </div>
              <div className="font-semibold leading-[22px]">Từ vựng</div>
            </div>
          </div>

          <div className="bg-[#fff] text-[#333] leading-3 text-[20px] rounded-[6px] h-[130px] w-[238px] flex justify-center items-center gap-5">
            <div className="bg-[#d592fe] p-5 rounded-[100%]">
              <MdOutlineDescription size="22px" color="#fff" />
            </div>
            <div className="flex flex-col gap-3 w-[50%]">
              <div className=" text-[30px] font-bold leading-[22px]">
                {vocabCount}
              </div>
              <div className="font-semibold leading-[22px]">Mô tả</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center border-b-2 border-gray-100 drop-shadow bg-[#fafafa] rounded-[8px] p-3">
        <div className="font-semibold text-[21px]">Điều khiển</div>
        <div className="flex items-center gap-3">
          <div>
            <Button
              style={
                "bg-[#d42525] text-[#fff] py-3 text-[16px] flex item-center gap-2"
              }
              icon={<IoIosCreate />}
              handleOnclick={handleCreate}
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
      <div className="mt-6 border-t-2 border-gray-100 drop-shadow">
        <Table
          title="Quản lý user"
          columns={column}
          data={users.filter((user) =>
            Object.values(user).some(
              (val) =>
                typeof val === "string" &&
                val.toLowerCase().includes(valueSearch.toLowerCase())
            )
          )}
          maxH={300}
          groupButton={groupButton}
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
              <label
                htmlFor="role"
                className="block text-[15px] text-[#242938] leading-[20px] font-normal "
              >
                Role
              </label>
              <select
                required
                id="role"
                className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                value={nameRole}
                onChange={(e) => setNameRole(e.target.value)}
              >
                <option value="">Phân quyền hạn</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.nameRole}>
                    {role.nameRole}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-[15px] text-[#242938] leading-[20px] font-normal "
              >
                Họ và tên
              </label>
              <input
                required
                type="text"
                id="text"
                className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                placeholder="Nguyễn Văn A"
                value={fullName || ""}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-[15px] text-[#242938] leading-[20px] font-normal "
              >
                Email
              </label>
              <input
                required
                type="text"
                id="text"
                className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                placeholder="nguyenvana@gmail.com"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-[15px] text-[#242938] leading-[20px] font-normal "
              >
                Số điện thoại
              </label>
              <input
                required
                type="text"
                id="text"
                className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                placeholder="0987739823"
                value={phoneNumber || ""}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-[15px] text-[#242938] leading-[20px] font-normal "
              >
                Địa chỉ
              </label>
              <input
                required
                type="text"
                id="text"
                className="w-full h-[48px] border border-[#e4e6e8] rounded-[8px] px-4 mt-2 focus:outline-none focus:ring-1 focus:ring-[#d42525]"
                placeholder="Địa chỉ của bạn"
                value={address || ""}
                onChange={(e) => setAddress(e.target.value)}
              />
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
                    setFullName("");
                    setAddress("");
                    setPhoneNumber("");
                    setEmail("");
                    setNameRole("");
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
  );
};

export default DashBoard;
