import { ReactNode } from "react"
import { Navbar } from "components/Navbar"
import s from "./style.module.scss"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={s.main}>
      <div className={s.main__navbar}>
        <Navbar />
      </div>
      <div className={s.main__page}>{children}</div>
    </div>
  )
}

export default Layout
