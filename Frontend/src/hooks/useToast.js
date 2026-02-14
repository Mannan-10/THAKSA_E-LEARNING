import { useContext } from "react";
import ToastCtx from "../context/toastCtx";

export default function useToast() {
  const context = useContext(ToastCtx);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
