import React from "react";

const Modal = ({
  show,
  setShow,
  title,
  disableOkBtn,
  onClickBtnOk,
  textOk,
  onClickBtnCancel,
  children,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 h-screen">
      <div className="bg-white p-5 rounded-lg max-w-full max-h-full w-[90%] h-[90%] mx-4 overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button className="text-2xl font-bold" onClick={() => setShow(false)}>
            ×
          </button>
        </div>
        <div className="py-4">{children}</div>
        <div className="flex justify-end space-x-3 pt-3">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClickBtnCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClickBtnOk}
            disabled={disableOkBtn}
          >
            {textOk}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
