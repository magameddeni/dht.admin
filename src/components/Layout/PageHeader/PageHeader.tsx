import { Icon, Text } from "@/components/UI"
import { FC, ReactNode } from "react"
import { useNavigate } from "react-router"
import { useWindowSize } from "@/hooks"

import s from "./style.module.scss"

interface IPageHeaderProps {
  title: string
  action?: ReactNode
}

const PageHeader: FC<IPageHeaderProps> = ({ title, action }) => {
  const { isSmall } = useWindowSize()
  const navigate = useNavigate()
  return (
    <div className={s.header}>
      <div className={s.header__title}>
        {isSmall && (
          <Icon onClick={() => navigate(-1)} name='arrow-left' title='Назад' />
        )}
        <Text size='xxl'>{title}</Text>
      </div>
      <div>{action}</div>
    </div>
  )
}

export default PageHeader
