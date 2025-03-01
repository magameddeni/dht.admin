import cx from "classnames"
import { Text } from "UI/index"
import s from "./style.module.scss"

interface IFormLabel {
  label?: string | undefined
  isActive?: boolean
  color?: string
  required?: boolean
  requiredColor?: string | undefined
}

function FormLabel({ label, isActive, ...rest }: IFormLabel) {
  return (
    <>
      {label && (
        <Text className={cx(s.label, { [s.active]: isActive })} {...rest}>
          {label}
        </Text>
      )}
    </>
  )
}

export default FormLabel
