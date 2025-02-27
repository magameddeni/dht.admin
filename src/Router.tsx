import { Route, Routes } from "react-router"
import { Category } from "./page/Category"
import Products from "./page/Product"
import { Container } from "./components/Container"
import { routes } from "./constants"

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
    <Container>
      <Routes>
        <Route index element={<></>} />
        <Route path={routes.CATEGORY} element={<Category />} />
        <Route path={routes.PRODUCTS} element={<Products />} />
      </Routes>
    </Container>
  )
}

export default Router
