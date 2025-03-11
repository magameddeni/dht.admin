import { MainInfo } from "@/components/Product"
import { PageHeader } from "@/components/Layout"
import s from "./style.module.scss"

const CreateProducts = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.wrapper__main}>
        <PageHeader title='Создание нового товара' />
        <MainInfo />
      </div>
      <div className={s.wrapper__nav}></div>
    </div>
  )
}

export default CreateProducts
