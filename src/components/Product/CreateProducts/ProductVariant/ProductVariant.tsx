import { FC } from "react"

interface IProductVariantProps {
  onNextStep: (props: any) => void
}

const ProductVariant: FC<IProductVariantProps> = ({ onNextStep }) => {
  return <div>ProductVariant</div>
}

export default ProductVariant
