import { Icon, Text } from "@/components/UI"
import { FC } from "react"
import { useNavigate } from "react-router"
import s from "./style.module.scss"

interface IPageHeaderProps {
  title: string
}

const PageHeader: FC<IPageHeaderProps> = ({ title }) => {
  const navigate = useNavigate()
  return (
    <div className={s.header}>
      <Icon onClick={() => navigate(-1)} name='arrow-left' title='Назад' />
      <Text>{title}</Text>
    </div>
  )
}

export default PageHeader
