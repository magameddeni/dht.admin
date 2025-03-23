import { useState } from "react"
import cn from "classnames"
import { Button, Drawer, Input, Text } from "@/components/UI"
import { Controller, useForm } from "react-hook-form"
import { PickCategoryModal } from "@/components/Category/PickCategoryModal"
import { ICategory, IProductMainInfo, ISeller } from "@/interface"
import { DrawerSellers } from "@/components/Seller/DrawerSellers"
import { PACKAGE } from "@/constants"
import s from "./style.module.scss"

interface IMainInfo {
  onNextStep: (formData: IProductMainInfo) => void
  mainInfo: IProductMainInfo
}

const MainInfo: React.FC<IMainInfo> = ({ onNextStep, mainInfo }) => {
  const [showPickCategoryModal, setShowPickCategoryModal] = useState(false)
  const [showSellerModal, setShowSellersModal] = useState(false)

  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IProductMainInfo>({ defaultValues: { ...mainInfo } })

  const submitForm = (formData: IProductMainInfo) => {
    onNextStep(formData)
  }

  const onCLoseSellersModal = () => setShowSellersModal(false)
  const onOpenSellersModal = () => setShowSellersModal(true)

  const handleSellersItemClick = (seller: ISeller) => {
    setValue("seller", seller)
    onCLoseSellersModal()
  }

  const onOpenShowPickCategoryModal = () => setShowPickCategoryModal(true)

  const onCloseShowPickCategoryModal = (categories?: ICategory[]) => {
    setShowPickCategoryModal(false)
    if (Array.isArray(categories)) setValue("categories", categories)
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className={s.wrapper}>
          <Input
            classNameInputWrapper='offset-top-24'
            name='productName'
            placeholder='Наименование'
            fluid
            errors={errors}
            register={register}
            rules={{
              required: {
                value: true,
                message: "Название товара не может быть пустым",
              },
            }}
          />

          <Controller
            name='categories'
            control={control}
            rules={{
              required: { value: true, message: "Не указана Категория" },
            }}
            render={({ field: { value } }) => (
              <Input
                classNameInputWrapper='offset-top-12'
                name='categories'
                placeholder='Категория'
                value={
                  value
                    ? value
                        ?.map((item: { name: string }) => item.name)
                        .join(", ")
                    : ""
                }
                suffix={value?.length > 0 ? "check" : "arrow-right"}
                errors={errors}
                fluid
                onFocus={onOpenShowPickCategoryModal}
                register={register}
                required
              />
            )}
          />

          <Controller
            name='seller'
            control={control}
            rules={{
              required: { value: true, message: "Не указан магазин" },
            }}
            render={({ field: { value } }) => (
              <Input
                classNameInputWrapper='offset-top-12'
                name='seller'
                placeholder='Магазин'
                errors={errors}
                register={register}
                value={value?.seller_name ?? ""}
                onFocus={onOpenSellersModal}
                fluid
                suffix={value?.seller_name ? "check" : "arrow-right"}
              />
            )}
          />

          <Input
            classNameInputWrapper='offset-top-12'
            name='barcode'
            placeholder='Штрихкод'
            errors={errors}
            register={register}
            fluid
          />
          <Input
            classNameInputWrapper='offset-top-12'
            name='SKU'
            placeholder='Артикул(в вашей системе)'
            errors={errors}
            register={register}
            fluid
          />
          <Input
            classNameInputWrapper='offset-top-12'
            name='manufacturerSKU'
            errors={errors}
            placeholder='Артикул производителя'
            register={register}
            fluid
          />

          <Text size='lg' as='div' className='offset-top-32'>
            Вес и габариты товара в упаковке
          </Text>
          <div className={cn("offset-top-20", s.wrapper__package)}>
            {PACKAGE.map((v) => (
              <div>
                <Input
                  classNameInputWrapper='offset-top-12'
                  name={v.key}
                  placeholder={v.value}
                  register={register}
                  required
                  fluid
                  errors={errors}
                  rules={v.rules}
                />
              </div>
            ))}
          </div>

          <Text size='lg' as='div' className='offset-top-32'>
            Цена
          </Text>
          <div className={cn("offset-top-20", s.wrapper__package)}>
            <div>
              <Input
                classNameInputWrapper='offset-top-12'
                name='base_price'
                placeholder='Цена'
                errors={errors}
                register={register}
                rules={{
                  required: { value: true, message: "Не указана цена" },
                }}
                required
                fluid
              />
            </div>
            <div>
              <Input
                classNameInputWrapper='offset-top-12'
                name='stock_quantity'
                placeholder='Остатки на складе'
                errors={errors}
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "Не указаны остатки на складе",
                  },
                }}
                fluid
                required
              />
            </div>
          </div>

          <Text size='lg' as='div' className='offset-top-32'>
            Цвет
          </Text>
          <div className={cn("offset-top-20", s.wrapper__package)}>
            <div>
              <Input
                classNameInputWrapper='offset-top-12'
                name='color_name'
                placeholder='Цвет товара'
                errors={errors}
                register={register}
                rules={{
                  required: { value: true, message: "Не указана цвет" },
                }}
                required
                fluid
              />
            </div>
            <div>
              <Input
                classNameInputWrapper='offset-top-12'
                name='color_hex'
                placeholder='hex-цвет'
                errors={errors}
                required
                rules={{
                  required: { value: true, message: "Не указана hex-цвет" },
                }}
                register={register}
                fluid
              />
            </div>
          </div>
        </div>
        <div className={s.wrapper__btn}>
          <Button type='submit' className={s.wrapper__submit}>
            Далее
          </Button>
        </div>
      </form>

      <Drawer
        show={showPickCategoryModal}
        onClose={onCloseShowPickCategoryModal}>
        <PickCategoryModal
          selectedCategories={watch("categories")}
          onClose={onCloseShowPickCategoryModal}
        />
      </Drawer>
      <Drawer show={showSellerModal} onClose={onCLoseSellersModal}>
        <DrawerSellers onClick={handleSellersItemClick} />
      </Drawer>
    </>
  )
}

export default MainInfo
