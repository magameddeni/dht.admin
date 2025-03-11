import { Button, Drawer, Input, Text } from "@/components/UI"
import { Controller, useForm } from "react-hook-form"
import cn from "classnames"
import s from "./style.module.scss"
import { PickCategoryModal } from "@/components/Category/PickCategoryModal"
import { useState } from "react"

const MainInfo = () => {
  const [showPickCategoryModal, setShowPickCategoryModal] = useState(false)

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const next = (payload: unknown) => {
    console.log(payload)
  }

  const onOpenShowPickCategoryModal = () => setShowPickCategoryModal(true)
  const onCloseShowPickCategoryModal = () => setShowPickCategoryModal(false)

  return (
    <>
      <form onSubmit={handleSubmit(next)}>
        <div className={s.wrapper}>
          <Input
            classNameInputWrapper='offset-top-24'
            name='name'
            placeholder='Наименование'
            required
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
                        ?.map(
                          (item: { name: string; _id: string }) => item.name,
                        )
                        .join(" ")
                    : ""
                }
                suffix='arrow-right'
                errors={errors}
                fluid
                onFocus={onOpenShowPickCategoryModal}
                readOnly
                register={register}
                required
              />
            )}
          />

          <Input
            classNameInputWrapper='offset-top-12'
            name='name'
            placeholder='Штрихкод'
            register={register}
            fluid
          />
          <Input
            classNameInputWrapper='offset-top-12'
            name='name'
            placeholder='Артикул(в вашей системе)'
            errors={errors}
            register={register}
            fluid
          />
          <Input
            classNameInputWrapper='offset-top-12'
            name='name'
            placeholder='Артикул производителя'
            register={register}
            required
            fluid
          />

          <Text size='lg' as='div' className='offset-top-32'>
            Вес и габариты товара в упаковке
          </Text>
          <div className={cn("offset-top-20", s.wrapper__package)}>
            <div>
              <Input
                classNameInputWrapper='offset-top-12'
                name='width'
                placeholder='Ширина, мм'
                register={register}
                required
                fluid
                errors={errors}
                rules={{
                  required: { value: true, message: "Не указана Ширина, мм" },
                }}
              />
            </div>
            <div>
              <Input
                classNameInputWrapper='offset-top-12'
                name='height'
                placeholder='Высота, мм'
                register={register}
                required
                fluid
                errors={errors}
                rules={{
                  required: { value: true, message: "Не указана Высота, мм" },
                }}
              />
            </div>
            <div>
              <Input
                classNameInputWrapper='offset-top-12'
                name='length'
                placeholder='Длина, мм'
                errors={errors}
                rules={{
                  required: { value: true, message: "Не указана Длина, мм" },
                }}
                register={register}
                required
                fluid
              />
            </div>
            <div>
              <Input
                classNameInputWrapper='offset-top-12'
                name='weight'
                placeholder='Вес, г'
                errors={errors}
                register={register}
                rules={{
                  required: { value: true, message: "Не указан Вес, г" },
                }}
                required
                fluid
              />
            </div>
          </div>

          <Text size='lg' as='div' className='offset-top-32'>
            Цена
          </Text>
          <div className={cn("offset-top-20", s.wrapper__package)}>
            <div>
              <Input
                classNameInputWrapper='offset-top-12'
                name='price'
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
            <Input
              classNameInputWrapper='offset-top-12'
              name='discountPrice'
              placeholder='Цена до скидки'
              errors={errors}
              register={register}
              fluid
            />
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
        <PickCategoryModal />
      </Drawer>
    </>
  )
}

export default MainInfo
