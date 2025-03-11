import { useState } from "react"
import { useGetCategories } from "@/api"
import { useTreeCategories } from "@/lib"
import { CreateAttributes } from "@/components/Attributes"
import { CategoryList, CreateCategory } from "@/components/Category"
import { Drawer, Text } from "@/components/UI"
import { PageHeader } from "@/components/Layout"
import s from "./style.module.scss"

const Category = () => {
  const [createCategoryModal, setCreateCategoryModal] = useState(false)
  const [createAttributesModal, setCreateAttributesModal] = useState(false)

  const { data } = useGetCategories()
  const { handleCategoryItemClick, categoriesTree, removeLastCategoryTree } =
    useTreeCategories()

  const onShowCreateCategoryModal = () => setCreateCategoryModal(true)
  const onCLoseCreateCategoryModal = () => setCreateCategoryModal(false)

  const onShowCreateCharacteristicsModal = () => setCreateAttributesModal(true)

  const onCLoseCreateAttributesModal = () => setCreateAttributesModal(false)

  if (!data) return <>Ошибка</>
  const { categories } = data

  return (
    <div className={s.main}>
      <PageHeader title='Категория' />
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

      <div className={s.main__page_footer}>
        {Boolean(categoriesTree.at(-1)) && (
          <Text
            as='div'
            cursor='pointer'
            onClick={onShowCreateCharacteristicsModal}>
            Создать характеристики
          </Text>
        )}

        <Text as='div' cursor='pointer' onClick={onShowCreateCategoryModal}>
          Создать категорию
        </Text>
      </div>
      <Drawer show={createCategoryModal} onClose={onCLoseCreateCategoryModal}>
        <CreateCategory parent_category={categoriesTree.at(-1)} />
      </Drawer>

      <Drawer
        show={createAttributesModal}
        onClose={onCLoseCreateAttributesModal}>
        <CreateAttributes parent_category={categoriesTree.at(-1)} />
      </Drawer>
    </div>
  )
}

export default Category
