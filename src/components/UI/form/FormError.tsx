import { Text } from "UI/index"
import s from "./style.module.scss"

interface IFormErrorProps {
  message?: string
}

const FormError = ({ message }: IFormErrorProps) => (
  <>
    {message && (
      <Text color='danger' className={s["error-message"]}>
        {message}
      </Text>
    )}
  </>
)

export default FormError
