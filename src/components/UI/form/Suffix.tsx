import { PropsWithChildren } from "react"
import s from "./style.module.scss"
import { Icon } from "@/components/UI"

interface ISuffixProps extends PropsWithChildren {
  suffix?: string | undefined
  onClick?: VoidFunction
}

export const Suffix = ({ children, suffix, onClick }: ISuffixProps) => (
  <span className={s.suffix} onClick={onClick}>
    {children}
    {suffix && <Icon name={suffix} />}
  </span>
)
