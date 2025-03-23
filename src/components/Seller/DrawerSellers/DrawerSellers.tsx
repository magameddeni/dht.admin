import { FC } from "react"
import { $api } from "@/api"
import { ISeller } from "@/interface"
import { Input, Text } from "@/components/UI"
import { useQuery } from "@tanstack/react-query"
import s from "./style.module.scss"

interface ISellersProps {
  onClick: (seller: ISeller) => void
}

const DrawerSellers: FC<ISellersProps> = ({ onClick }) => {
  const { data } = useQuery<ISeller[]>({
    async queryFn() {
      const { data } = await $api.get("/seller")
      return data
    },
    queryKey: ["sellers_all"],
  })

  return (
    <div className={s.wrapper}>
      <div className={s.wrapper__header}>Выбор магазина</div>
      <div className={s.wrapper__search}>
        <Input name='search' fluid placeholder='Поиск магазина' />
      </div>
      <div className={s.wrapper__sellers}>
        {data &&
          data.map((v) => (
            <Text
              onClick={() => onClick(v)}
              className={s.wrapper__seller}
              as='div'>
              {v.seller_name}
            </Text>
          ))}
      </div>
    </div>
  )
}

export default DrawerSellers
