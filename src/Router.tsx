import { Link, Route, Routes } from "react-router"
import { Products } from "@/page/Products"
import { Category } from "@/page/Category"
import { routes } from "@/constants"
import { Layout } from "@/components/Layout"
import { CreateProducts } from "@/page/CreateProducts"
import { CreateSeller } from "@/page/CreateSeller"
import { Sellers } from "./page/Sellers"

const Router = () => {
  // const navigate = useNavigate()

  // useEffect(() => {
  //   // if (!isAuth) navigate("/login")
  // }, [isAuth])

  // if (!isAuth)
  //   return (
  //     <Routes>
  //       <Route index element={<>Авторазиция</>} />
  //     </Routes>
  //   )

  return (
    <Layout>
      <Routes>
        <Route
          index
          element={
            <>
              <Link to={routes.PRODUCTS}>Товары</Link>
              <Link to={routes.CREATE_PRODUCTS}>Создать товар</Link>
              <Link to={routes.CATEGORY}>Категории</Link>
              <Link to={routes.SELLERS}>Магазины</Link>
            </>
          }
        />
        <Route path={routes.CATEGORY} element={<Category />} />
        <Route path={routes.CREATE_PRODUCTS} element={<CreateProducts />} />
        <Route path={routes.PRODUCTS} element={<Products />} />
        <Route path={routes.SELLERS} element={<Sellers />} />
        <Route path={routes.CREATE_SELLER} element={<CreateSeller />} />
      </Routes>
    </Layout>
  )
}

export default Router
