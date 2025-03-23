import React from "react"
import Error from "@/components/Error/Error"
import { useGetCategories } from "@/api"
import { useTreeCategories } from "@/lib"
import { CategoryList } from "../CategoryList"
import { Button } from "@/components/UI"
import { ICategory } from "@/interface"
import s from "./style.module.scss"

interface IPickCategoryModal {
  onClose: (c: ICategory[]) => void
  selectedCategories: ICategory[]
}

const PickCategoryModal: React.FC<IPickCategoryModal> = ({
  onClose,
  selectedCategories,
}) => {
  const { data, refetch } = useGetCategories()
  const { categoriesTree, handleCategoryItemClick, removeLastCategoryTree } =
    useTreeCategories({ selectedCategories })

  const selectCategoryAndCloseModal = () => {
    onClose(categoriesTree)
  }

  if (!data)
    return (
      <Error
        error='Ошибка получения категорий'
        action={refetch}
        actionTitle='Повторить запрос'
      />
    )

  const { categories } = data

  return (
    <div className={s.category}>
      <div className={s.category__body}>
        <CategoryList
          onClickItem={handleCategoryItemClick}
          selectedCategory={categoriesTree.at(-1)}
          categories={
            categoriesTree.length === 0
              ? categories
              : categoriesTree.at(-1)?.sub ?? []
          }
          removeLastCategoryTree={removeLastCategoryTree}
        />
      </div>

      <div className={s.category__footer}>
        <Button onClick={selectCategoryAndCloseModal}>Выбрать</Button>
      </div>
    </div>
  )
}

export default PickCategoryModal
