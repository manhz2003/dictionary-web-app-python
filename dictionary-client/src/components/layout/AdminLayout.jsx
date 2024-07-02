import { Navigate, Outlet } from "react-router-dom";
import { HeaderAdmin, SideBar } from "..";

const AdminLayout = () => {
  return (
    <main>
      <div className="flex">
        <div className="fixed w-[20%] bg-[#fff] h-screen border-r-2 border-gray-100 drop-shadow">
          <SideBar />
        </div>
        <div className="w-[80%] ml-[20%] bg-[#fbfcff]">
          <div className="fixed w-[80%] z-10 bg-[#fbfcff]">
            <HeaderAdmin />
          </div>
          <div className="mt-[78px] p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
