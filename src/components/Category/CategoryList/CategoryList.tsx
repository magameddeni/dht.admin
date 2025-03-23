import { ICategory } from "@/interface"
import { Icon, Text } from "@/components/UI"
import cn from "classnames"
import s from "./style.module.scss"

interface ICategoryListProps {
  categories: ICategory[]
  onClickItem?: (c: ICategory) => void
  selectedCategory?: ICategory
  removeLastCategoryTree: () => void
  border?: boolean
}

const CategoryList = ({
  categories,
  onClickItem,
  selectedCategory,
  removeLastCategoryTree,
}: ICategoryListProps) => {
  const classnames = cn(s.list)

  return (
    <div className={classnames}>
      {selectedCategory && (
        <Text
          as='div'
          cursor='pointer'
          onClick={removeLastCategoryTree}
          className={s.list__item}>
          <Icon name='chevron-left' /> {selectedCategory.name}
        </Text>
      )}
      {categories?.map((c) => (
        <Text
          as='div'
          cursor='pointer'
          key={c.id}
          onClick={() => onClickItem?.(c)}
          className={s.list__item}>
          {c.name}
        </Text>
      ))}
    </div>
  )
}

export default CategoryList
