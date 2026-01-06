import { createPortal } from "react-dom"
import css from "./Modal.module.css"
import NoteForm from "../NoteForrm/NoteForm"
import { useEffect } from "react"

interface ModalProps {
  onClose: () => void
}


const modalRoot = document.getElementById("modal-root")
function Modal({ onClose }: ModalProps) {
  
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


    return createPortal(
        <>
        <div
  className={css.backdrop}
  role="dialog"
          aria-modal="true"
          onClick={handleBackdrop}
>
  <div className={css.modal}>
            <NoteForm onCancel={onClose} />
  </div>
            </div>
        </>,
        modalRoot as HTMLDivElement

    )
    }

    export default Modal