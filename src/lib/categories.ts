import { ICategory } from "@/interface"
import { useState } from "react"

interface ICategoryWithSubcategories extends ICategory {
  sub?: ICategory[]
}

export const useTreeCategories = () => {
  const [categoriesTree, setCategoriesTree] = useState<
    ICategoryWithSubcategories[]
  >([])

  const handleCategoryItemClick = (c: ICategory) =>
    setCategoriesTree((prev) => [...prev, c])

  const removeLastCategoryTree = () => {
    setCategoriesTree((prev) => {
      const lastElement = prev.at(-1)
      return prev.filter((item) => item.id !== lastElement?.id)
    })
  }

  return {
    categoriesTree,
    handleCategoryItemClick,
    removeLastCategoryTree,
  }
}
