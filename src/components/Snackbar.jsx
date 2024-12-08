import { forwardRef, useImperativeHandle, useState } from "react";

const Snackbar = forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000); // Snackbar disappears after 3 seconds
    },
  }));

  return (
    <div
      className={`fixed left-1/2 top-5 transform -translate-x-1/2 w-[350px] h-[60px] rounded-lg flex items-center text-center transition-opacity duration-500 ${
        showSnackbar ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{
        backgroundColor: props.type === "success" ? "#009358" : "#99001f",
        color: props.type === "success" ? "white" : "white",
        zIndex: 9999,
      }}
    >
      <div className="flex-[20%] text-2xl">
        {props.type === "success" ? (
          <span>&#x2713;</span>
        ) : (
          <span>&#x2613;</span>
        )}
      </div>
      <div className="flex-[80%] text-left font-bold">{props.message}</div>
    </div>
  );
});

export default Snackbar;
