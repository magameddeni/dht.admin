import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { $api } from "../../http/axios"
import { ICategory } from "../../interface"
import { CategoryList } from "../../components/Category"
import s from "./style.module.scss"

interface ICategoryWithSubcategories extends ICategory {
  sub?: ICategory[]
}

const Category = () => {
  const [categories, setCategories] = useState<ICategoryWithSubcategories[]>([])
  const [categoriesTree, setCategoriesTree] = useState<
    ICategoryWithSubcategories[]
  >([])

  const searchRecursiveSubCategories = (
    categoryId: number,
    fullCategories: ICategory[],
  ): any => {
    const subCategories = fullCategories?.filter(
      ({ parent_id }) => parent_id === categoryId,
    )
    return subCategories?.map((category) => ({
      ...category,
      sub: searchRecursiveSubCategories(category.id, fullCategories),
    }))
  }

  useQuery({
    queryFn: async () => {
      const { data: response, status } = await $api.get<ICategory[]>(
        "/category",
      )
      if (status !== 200) return null
      const mainCategories = response?.filter(({ nesting }) => nesting === 0)

      setCategories(
        mainCategories.map((category: ICategory) => ({
          ...category,
          sub: searchRecursiveSubCategories(category.id, response),
        })),
      )

      return mainCategories
    },

    queryKey: ["categories"],
  })

  const handleCategoryItemClick = (c: ICategory) =>
    setCategoriesTree((prev) => [...prev, c])

  const removeLastCategoryTree = () =>
    setCategoriesTree((prev) => prev.splice(-1, 1))

  return (
    <div className={s.main}>
      <div className={s.main__header}>
        <div>Категории</div>
      </div>

      <div className={s.main__categories}>
        <CategoryList
          onClickItem={handleCategoryItemClick}
          removeLastCategoryTree={removeLastCategoryTree}
          selectedCategory={categoriesTree.at(-1)}
          categories={
            categoriesTree.length === 0
              ? categories
              : categoriesTree.at(-1)?.sub ?? []
          }
        />
      </div>

      <div className={s.main__page_footer}>подвал сайта</div>
    </div>
  )
}

export default Category
