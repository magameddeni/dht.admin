import { Link } from "react-router"
import { routes } from "@/constants"
import s from "./style.module.scss"

const Navbar = () => {
  const linkList = [
    { href: routes.CATEGORY, title: "Категории" },
    { href: routes.PRODUCTS, title: "Товары" },
    { href: routes.CREATE_PRODUCTS, title: "Создание товара" },
    { href: routes.SELLERS, title: "Магазины" },
  ]

  return (
    <div className={s.main}>
      <div className={s.main__header}>Маьрша вог1ила, Дени!</div>
      <div className={s.main__nav_items}>
        {linkList.map((n) => (
          <div key={n.href} className={s.main__nav_item}>
            <Link to={n.href}>{n.title}</Link>
          </div>
        ))}
      </div>

      <div className={s.main__footer}>Ара вола хьо?</div>
    </div>
  )
}

export default Navbar
