import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { ICategory, ICategoryAttribute } from "@/interface"
import { Button, Checkbox, Input, Text } from "@/components/UI"
import { AttributeItem } from "../AttributeItem"
import { $api } from "@/api"
import s from "./style.module.scss"

interface ICreateAttributesProps {
  parent_category?: ICategory
}

const CreateAttributes: React.FC<ICreateAttributesProps> = ({
  parent_category,
}) => {
  const [attributes, setAttributes] = useState<ICategoryAttribute[]>([])
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategoryAttribute>({
    defaultValues: {
      unit: "",
      data_type: "",
      required: false,
      attribute_name: "",
    },
  })

  const onSubmit = (payload: ICategoryAttribute) => {
    setAttributes((prev) => [...prev, payload])
    setValue("attribute_name", "")
    setValue("data_type", "")
    setValue("required", false)
    setValue("unit", "")
  }

  const { mutate } = useMutation({
    mutationFn: async () => {
      const { data, status } = await $api.post("/attributes", {
        parent_category,
        attributes,
      })
      if (status !== 201)
        throw new Error("Ошибка при запросе на создании аттрибутов.")
      return data
    },
  })

  return (
    <div className={s.main}>
      <div className={s.main__header}>
        <Text>Создание характеристик</Text>
      </div>

      <div className={s.main__body}>
        {Boolean(attributes.length) && (
          <div className={s.main__attributes}>
            {attributes.map((item) => (
              <AttributeItem key={item.attribute_name} {...item} />
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Checkbox
              name='required'
              errors={errors}
              register={register}
              className={s.main__checkbox}
              checked={watch("required")}
              label='Сделать поле обязательным'
              onChange={(e) => setValue("required", e.target.checked)}
            />
          </div>
          <>
            <Input
              fluid
              rules={{
                required: "Это обязательное поле",
              }}
              errors={errors}
              register={register}
              name='attribute_name'
              className={s.main__name_input}
              placeholder='Название харакетиристики'
            />
          </>

          <div className={s.main__inputs}>
            <Input
              fluid
              rules={{
                required: "Это обязательное поле",
              }}
              errors={errors}
              name='data_type'
              register={register}
              placeholder='Тип строки'
            />
            <Input
              fluid
              name='unit'
              errors={errors}
              register={register}
              placeholder='Единица измерения'
            />
          </div>

          <div className={s.main__submit}>
            <Button
              type='submit'
              view='secondary'
              className={s.main__submit_btn}>
              Добавить
            </Button>
          </div>
        </form>
      </div>
      <div className={s.main__footer}>
        <Button onClick={mutate}>Сохранить</Button>
      </div>
    </div>
  )
}

export default CreateAttributes
