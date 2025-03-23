import { Text } from "@/components/UI"
import s from "./style.module.scss"

const CreateAddress = ({
  seller_id,
  onCloseRequest,
}: {
  seller_id?: null | string
  onCloseRequest?: () => void
}) => {
  return (
    <div className={s.address}>
      <Text onClick={onCloseRequest}>Закрыть</Text>
      Создание адреса магазина
    </div>
  )
}

export default CreateAddress
