import { useForm } from "react-hook-form"
import { Button, Input } from "@/components/UI"
import { PageHeader } from "@/components/Layout"
import { useNavigate } from "react-router"
import { ISeller } from "@/interface"
import { $api } from "@/api"
import s from "./style.module.scss"

const CreateSeller = () => {
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISeller>()

  const onBack = () => navigate(-1)

  const onSubmitForm = async (formData: ISeller) => {
    const { data, status } = await $api.post("/seller", formData)
    if (status > 300) alert("Ошибка при создании магазина")
    return data
  }

  return (
    <div className={s.create}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <PageHeader title='Создание магазина' />
        <div className={s.create__body}>
          <div>
            <Input
              errors={errors}
              classNameInputWrapper='offset-top-12'
              rules={{
                required: {
                  value: true,
                  message: "Заполните поле название магазина",
                },
              }}
              name='seller_name'
              register={register}
              placeholder='Название магазина'
              fluid
            />
          </div>
          <div>
            <Input
              classNameInputWrapper='offset-top-16'
              errors={errors}
              rules={{
                required: {
                  value: true,
                  message: "Заполните поле номер телефона",
                },
              }}
              name='phone_number'
              register={register}
              placeholder='Номер телефона'
              fluid
            />
          </div>
          <div>
            <Input
              classNameInputWrapper='offset-top-16'
              errors={errors}
              rules={{
                required: {
                  value: true,
                  message: "Заполните поле почта",
                },
              }}
              name='email'
              register={register}
              placeholder='Почта'
              fluid
            />
          </div>
          <div>
            <Input
              classNameInputWrapper='offset-top-16'
              errors={errors}
              rules={{
                required: {
                  value: true,
                  message: "Заполните поле владелец",
                },
              }}
              name='owner_name'
              register={register}
              placeholder='Владелец'
              fluid
            />
          </div>
          <div>
            <Input
              classNameInputWrapper='offset-top-16'
              errors={errors}
              name='owner_phone'
              register={register}
              placeholder='Номер владельца'
              fluid
            />
          </div>
        </div>

        <div className={s.create__footer}>
          <Button onClick={onBack} view='link'>
            Назад
          </Button>
          <Button className={s.create__submit} type='submit'>
            Создать
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateSeller
