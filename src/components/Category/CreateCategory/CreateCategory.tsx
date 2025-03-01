import React from "react"
import { ICategory } from "interface/index"
import { Button, Input, Text } from "UI/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { $api } from "src/http"
import s from "./style.module.scss"

interface ICreateCategoryProps {
  parent_category?: ICategory
}

const CreateCategory: React.FC<ICreateCategoryProps> = ({
  parent_category,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: "" } })
  const client = useQueryClient()

  const { mutate } = useMutation({
    async mutationFn({ name }: { name: string }) {
      const { data, status } = await $api.post("/category", {
        name,
        parent_id: parent_category?.id ?? null,
        nesting: parent_category ? parent_category?.nesting + 1 : 0,
      })
      if (status !== 200) return null
      alert(`Категория ${data[0].name} успешно добавлена!`)
      return data
    },

    onSuccess() {
      client.invalidateQueries({
        refetchType: "all",
        queryKey: ["categories", "all"],
      })
    },
  })

  return (
    <form className={s.main} onSubmit={handleSubmit((e) => mutate(e))}>
      <div className={s.main__header}>
        <Text size='lg'>Создание категории</Text>
      </div>

      <div className={s.main__body}>
        <Input
          register={register}
          errors={errors}
          required={true}
          rules={{
            required: "Это поле обязательное",
          }}
          fluid
          name='name'
          placeholder='Название категории'
        />
      </div>

      <div className={s.main__footer}>
        <Button type='submit'>Сохранить</Button>
      </div>
    </form>
  )
}

export default CreateCategory
