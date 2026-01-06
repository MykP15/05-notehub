import { createPortal } from "react-dom"
import css from "./Modal.module.css"
import NoteForm from "../NoteForrm/NoteForm"

interface ModalProps {
  onClose: () => void
}


const modalRoot = document.getElementById("modal-root")
function Modal({onClose}: ModalProps) {
    return createPortal(
        <>
        <div
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
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