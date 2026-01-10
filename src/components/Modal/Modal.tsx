import { createPortal } from "react-dom"
import css from "./Modal.module.css"
import { useEffect, type ReactNode } from "react"

interface ModalProps {
  onClose: () => void,
  children: ReactNode
}


const modalRoot = document.getElementById("modal-root")
function Modal({ onClose, children }: ModalProps) {
  
useEffect(() => {
const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose])

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!modalRoot) return null;

    return createPortal(
        <>
        <div
  className={css.backdrop}
  role="dialog"
          aria-modal="true"
          onClick={handleBackdrop}
>
  <div className={css.modal}>
            {children}
  </div>
            </div>
        </>,
        modalRoot as HTMLDivElement

    )
    }

    export default Modal