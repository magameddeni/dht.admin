import { ICategory } from "../../../interface"
import { Icon } from "../../UI"
import s from "./style.module.scss"

interface ICategoryListProps {
  categories: ICategory[]
  onClickItem?: (c: ICategory) => void
  selectedCategory?: ICategory
  removeLastCategoryTree: () => void
}

const CategoryList = ({
  categories,
  onClickItem,
  selectedCategory,
  removeLastCategoryTree,
}: ICategoryListProps) => {
  return (
    <div className={s.list}>
      {selectedCategory && (
        <div onClick={removeLastCategoryTree} className={s.list__item}>
          <Icon name='chevron-left' /> {selectedCategory.name}
        </div>
      )}
      {categories.map((c) => (
        <div
          key={c.id}
          onClick={() => onClickItem?.(c)}
          className={s.list__item}>
          {c.name}
        </div>
      ))}
    </div>
  )
}

export default CategoryList
