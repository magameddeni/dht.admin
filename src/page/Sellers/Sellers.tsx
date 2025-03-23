import { $api } from "@/api"
import { Button, Drawer, Table } from "@/components/UI"
import { ISeller } from "@/interface"
import { useQuery } from "@tanstack/react-query"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import { PageHeader } from "@/components/Layout"
import { useNavigate } from "react-router"
import { routes } from "@/constants"

import s from "./style.module.scss"
import { useState } from "react"
import { CreateAddress } from "@/components/Address/CreateAddress"
const Sellers = () => {
  const [showCreateAddressModal, setShowCreateAddressModal] = useState<{
    show: boolean
    seller_id: null | undefined | string
  }>({
    show: false,
    seller_id: null,
  })

  const navigate = useNavigate()
  const { data } = useQuery<ISeller[]>({
    async queryFn() {
      const { data } = await $api.get("/seller")
      return data
    },
    queryKey: ["sellers"],
  })

  const toCreateShop = () => navigate(routes.CREATE_SELLER)

  const onCloseAddressModal = () => {
    setShowCreateAddressModal({ show: false, seller_id: null })
  }

  const rowFeatures = (seller?: ISeller) => {
    const actions = []

    if (!seller?.address)
      actions.push({
        icon: "plus1",
        text: "Добавить адрес",
        onClick: () =>
          setShowCreateAddressModal({ show: true, seller_id: seller?.id }),
      })

    return actions
  }

  const columns: ColumnDef<ISeller>[] = [
    {
      header: "№",
      size: 30,
      enableSorting: false,
      cell: (info: CellContext<ISeller, unknown>) => info.row.index + 1,
    },
    {
      size: 150,
      accessorKey: "seller_name",
      header: "Название магазина",
    },
    {
      size: 150,
      accessorKey: "phone_number",
      header: "Номер телефона",
      enableSorting: false,
    },
    {
      size: 150,
      accessorKey: "email",
      header: "Почта",
    },
    {
      size: 120,
      accessorKey: "owner_name",
      header: "Владелец",
      cell: (info: CellContext<ISeller, unknown>) => {
        const owner_name = info.getValue() as string
        if (owner_name) return owner_name
        else return "Не указан"
      },
    },
    {
      size: 120,
      accessorKey: "owner_phone",
      header: "Номер владельца",
      cell: (info: CellContext<ISeller, unknown>) => {
        const owner_phone = info.getValue() as string
        if (owner_phone) return owner_phone
        else return "Не указан"
      },
    },
    {
      size: 120,
      accessorKey: "address",
      header: "Адрес",
      cell: (info: CellContext<ISeller, unknown>) => {
        const address = info.getValue() as string
        if (address) return address
        else return "Не указан"
      },
    },
  ]

  return (
    <div className={s.sellers}>
      <PageHeader
        title='Магазины'
        action={
          <Button onClick={toCreateShop} view='secondary'>
            Создать магазин
          </Button>
        }
      />
      <div className={s.sellers__table}>
        <Table<ISeller>
          defaultData={data ?? []}
          defaultColumns={columns}
          rowFeatures={rowFeatures}
          manualSelect
          resize
          fluid
        />
      </div>

      <Drawer
        width='100%'
        show={showCreateAddressModal.show}
        onClose={onCloseAddressModal}>
        <CreateAddress
          onCloseRequest={onCloseAddressModal}
          seller_id={showCreateAddressModal.seller_id}
        />
      </Drawer>
    </div>
  )
}

export default Sellers
