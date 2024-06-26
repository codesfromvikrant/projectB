import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkspaceLayout = () => {
  useEffect(() => {
    document.title = "Documents | WorkFlow";
  }, []);

  return (
    <main className="w-full h-[100vh] overflow-y-auto">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Outlet />
    </main>
  );
};

export default WorkspaceLayout;
