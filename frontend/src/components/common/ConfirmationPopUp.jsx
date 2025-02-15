import { useEffect, useRef } from "react";
import { LogOutLoader } from "../../assets/SideBarIcons";

const ConfirmationPopUp = ({
  message,
  confirmMessage,
  cancelMessage,
  onClose,
  onConfirm,
  onCancel,
  loading,
}) => {
  const popUpRef = useRef(null);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (popUpRef.current && !popUpRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black/30 fixed top-0 left-0 z-50">
      <div
        ref={popUpRef}
        className="w-[577px] h-[252px] px-[120px] py-[60px] bg-primary rounded-[30px]"
      >
        <div className="flex items-center justify-center flex-col gap-[61px] text-white font-semibold text-[16px]">
          <span>{message}</span>
          <div className="w-full flex justify-center items-center gap-[31px]">
            <button
              onClick={() => onConfirm()}
              className="bg-[#009EE2] px-[47px] py-[11px] hover:cursor-pointer"
            >
              {loading ? <LogOutLoader /> : confirmMessage}
            </button>
            <button
              onClick={() => onCancel()}
              className="bg-[#9F0303] px-[47px] py-[11px] hover:cursor-pointer"
            >
              {cancelMessage}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopUp;
