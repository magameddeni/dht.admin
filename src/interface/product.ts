import { ICategory } from "./category"
import { ISeller } from "./seller"

export interface IProductMainInfo {
  product_name: string
  categories: ICategory[]
  barcode?: string | number
  SKU: string | number
  manufacturerSKU?: string | number
  width: string | number
  height: string | number
  length: string | number
  weight: string | number
  base_price: string | number
  discount_price: string | number
  seller: ISeller
}
