import { ReactNode } from "react"
import s from "./style.module.scss"
import { Navbar } from "../Navbar"

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className={s.main}>
      <div className={s.main__navbar}>
        <Navbar />
      </div>
      <div className={s.main__page}>{children}</div>
    </div>
  )
}

export default Container
