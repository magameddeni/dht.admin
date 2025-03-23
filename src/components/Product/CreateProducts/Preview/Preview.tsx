import { useCallback, useState } from "react"
import { FieldValues, UseFormWatch } from "react-hook-form"
import { IAttributes, IUploadedFile } from "@/interface"
import { Button, Text } from "@/components/UI"
import { useMutation } from "@tanstack/react-query"
import { PACKAGE, MAIN_INFO } from "@/constants"
import { $api, serverBaseUrl } from "@/api"
import cn from "classnames"

import s from "./style.module.scss"

const Preview = ({ watch }: { watch: UseFormWatch<FieldValues> }) => {
  // TODO: переделать это безобразие
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [createProductErrors, setCreateProductErrors] = useState([])
  const mainInfo = watch("mainInfo")
  const files: IUploadedFile[] = watch("files")
  const { attributes, description, ...rest } = watch("attributes")

  const formatFiles = useCallback(
    () =>
      files
        .sort((a, b) => a.order - b.order)
        .map((f) => ({
          file_type: f.mimetype,
          file_order: f.order,
          file_link: f.filename,
          file_key: f.filename,
        })),
    [files],
  )

  const { mutate, isPending } = useMutation({
    async mutationFn() {
      return await $api.post("/product", {
        attributes,
        description,
        files: formatFiles(),
        category_id: mainInfo.categories.at(-1).id,
        seller_id: mainInfo.seller.id,
        ...mainInfo,
        ...rest,
      })
    },

    onError(error: any) {
      // TODO: переделать это безобразие
      setCreateProductErrors(error.response.data.errors)
      setShowErrorModal(true)
    },
  })

  const renderItem = (key: string, value: string) => {
    if (value !== "")
      return (
        <Text
          as='div'
          className={cn(s.preview__maininfo_item, "offset-top-12")}>
          <Text as='div'>{key}</Text>
          <Text as='div'>{value}</Text>
        </Text>
      )
  }
  return (
    <div className={s.preview}>
      <Text as='div' weight='bold' size='lg'>
        Основная информация
      </Text>

      <Text as='div' className='offset-top-20'>
        {MAIN_INFO.map((item) => renderItem(item.value, mainInfo[item.key]))}
        {renderItem("Категория", mainInfo.categories.at(-1).name)}
      </Text>

      <Text as='div' weight='bold' size='lg' className='offset-top-24'>
        Описание
      </Text>

      <Text className='offset-top-12' as='div'>
        {description ?? "Тут должно быть описание товара"}
        уава
      </Text>

      <Text as='div' weight='bold' size='lg' className='offset-top-24'>
        Медиафайлы
      </Text>

      <Text className={cn(s.preview__files, "offset-top-12")} as='div'>
        {files.map((v: IUploadedFile) => (
          <div className={s.preview__file}>
            <img src={`${serverBaseUrl}/${v.filename}`} />
          </div>
        ))}
      </Text>

      <Text as='div' weight='bold' size='lg' className='offset-top-24'>
        Габариты
      </Text>

      <Text className='offset-top-12' as='div'>
        {PACKAGE.map((item) => renderItem(item.value, mainInfo[item.key]))}
      </Text>

      <Text as='div' weight='bold' size='lg' className='offset-top-24'>
        Атрибуты
      </Text>

      <Text className='offset-top-12' as='div'>
        {attributes.map((item: IAttributes) =>
          renderItem(item.attribute_name, item.value),
        )}
      </Text>
      <div className='offset-top-32'>
        <Button disabled={isPending} onClick={mutate}>
          Создать
        </Button>
      </div>
    </div>
  )
}

export default Preview
