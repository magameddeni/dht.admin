import React, { useEffect } from "react"
import { IAttributes, IRequredAttributes } from "@/interface"
import { Button, Input, Text, Textarea } from "@/components/UI"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { $api } from "@/api"
import cn from "classnames"

import s from "./style.module.scss"

interface ICreateProductAttributesProps {
  category_id: string
  onNextStep: (formData: IRequredAttributes) => void
  data: IRequredAttributes
}

const Attributes: React.FC<ICreateProductAttributesProps> = ({
  category_id,
  onNextStep,
  data,
}) => {
  const { data: attributes } = useQuery({
    queryFn: async () => {
      const { data, status } = await $api.get<IAttributes[]>(
        `/attributes/${category_id} `,
      )
      if (status !== 200) return "Не удалось получить атрибуты"
      return data
    },
    queryKey: ["get_attributes", category_id],
  })

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IRequredAttributes>({
    defaultValues: {
      ...data,
    },
  })

  const { fields } = useFieldArray({
    control,
    name: "attributes",
    keyName: "key",
  })

  const onSubmitForm = (fromData: IRequredAttributes) => {
    onNextStep(fromData)
  }

  useEffect(() => {
    setValue("attributes", Array.isArray(attributes) ? attributes : [])
  }, [attributes])

  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmitForm)} className={s.wrapper__form}>
        <div className={s.wrapper__body}>
          <div className={s.wrapper__required}>
            <Text size='lg' as='div' className={cn("offset-top-12")}>
              Основные атрибуты
            </Text>

            <div className={cn("offset-top-12")}>
              {fields
                .filter((v) => v.required)
                .map((v) => {
                  const correctIndex = getValues("attributes").findIndex(
                    (a) => a.id === v.id,
                  )
                  return (
                    <Controller
                      key={v.id}
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: `Не заполнено поле ${v.attribute_name}`,
                        },
                      }}
                      name={`attributes.${correctIndex}.value`}
                      render={({ field: { value, onChange } }) => (
                        <Input
                          fluid
                          name='value'
                          value={value}
                          onChange={onChange}
                          placeholder={v.attribute_name}
                          classNameInputWrapper='offset-top-16'
                          errors={errors.attributes?.[correctIndex]}
                        />
                      )}
                    />
                  )
                })}
            </div>

            <Input
              name='manufacturer_name'
              register={register}
              placeholder='Производитель'
              required
              fluid
              classNameInputWrapper='offset-top-16'
              rules={{
                required: {
                  value: true,
                  message: "Не заполнено поле Производитель",
                },
              }}
              errors={errors}
            />
            <Input
              name='brand_name'
              register={register}
              placeholder='Бренд'
              required
              fluid
              classNameInputWrapper='offset-top-16'
              rules={{
                required: {
                  value: true,
                  message: "Не заполнено поле Бренд",
                },
              }}
              errors={errors}
            />
            <Input
              name='country_manufacturer'
              register={register}
              placeholder='Страна-производитель'
              required
              fluid
              classNameInputWrapper='offset-top-16'
              rules={{
                required: {
                  value: true,
                  message: "Не заполнено поле Страна-производитель",
                },
              }}
              errors={errors}
            />

            <Textarea
              autoHeight
              register={register}
              fluid
              placeholder='Описание'
              style={{ height: "100px" }}
              classNameInputWrapper='offset-top-20'
              rows={5}
              name='description'
            />
          </div>
          <Text size='lg' as='div' className={cn("offset-top-28")}>
            Дополнительные атрибуты
          </Text>
          <div className={cn("offset-top-12")}>
            {fields
              .filter((v) => !v.required)
              .map((v) => {
                const correctIndex = getValues("attributes").findIndex(
                  (a) => a.id === v.id,
                )
                return (
                  <Controller
                    key={v.id}
                    control={control}
                    name={`attributes.${correctIndex}.value`}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        fluid
                        name='value'
                        value={value}
                        onChange={onChange}
                        placeholder={v.attribute_name}
                        classNameInputWrapper='offset-top-15'
                        errors={errors.attributes?.[correctIndex]}
                      />
                    )}
                  />
                )
              })}
          </div>
        </div>

        <div className={s.wrapper__footer}>
          <div></div>
          <Button type='submit'>Далее</Button>
        </div>
      </form>
    </div>
  )
}

export default Attributes
