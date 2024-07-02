import { Header, Footer } from "..";
import { Navigate, Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <main>
      <Header />
      <div className="w-full pt-[66px]">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default ClientLayout;
