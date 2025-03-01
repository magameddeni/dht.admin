import { Route, Routes } from "react-router"
import Products from "./page/Product"
import { Category } from "./page/Category"
import { routes } from "constants/index"
import { Layout } from "components/Layout"

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
        <Route index element={<></>} />
        <Route path={routes.CATEGORY} element={<Category />} />
        <Route path={routes.PRODUCTS} element={<Products />} />
      </Routes>
    </Layout>
  )
}

export default Router
