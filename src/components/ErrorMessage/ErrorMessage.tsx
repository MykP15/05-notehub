import css from "./ErrorMessage.module.css"


function ErrorMessage() {

  return (
    <>
      <p className={css.text}>There was an error, please try again later...</p>
    </>
  )
}

export default ErrorMessage