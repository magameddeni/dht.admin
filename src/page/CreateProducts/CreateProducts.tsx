import { useState } from "react"
import {
  Attributes,
  MainInfo,
  Preview,
  UploadImage,
} from "@/components/Product"
import {
  IProductMainInfo,
  IRequredAttributes,
  IUploadedFile,
} from "@/interface"
import { PageHeader } from "@/components/Layout"
import { useForm } from "react-hook-form"

import s from "./style.module.scss"

const CreateProducts = () => {
  const [step, setStep] = useState(0)
  const [possiblyNextStep, setPossiblyNextStep] = useState<number>(-1)

  const { setValue, watch, getValues } = useForm()

  const onSuccessTriggerForm = (pageTo: number) => {
    setPossiblyNextStep(pageTo)
    if (pageTo !== -1) setStep(pageTo)
  }

  const onSuccessMainInfo = (formData: IProductMainInfo) => {
    onSuccessTriggerForm(1)
    setValue("mainInfo", formData)
  }

  const onSuccesAttributes = (formData: IRequredAttributes) => {
    setValue("attributes", formData)
    onSuccessTriggerForm(2)
  }

  const onSuccesUploadFiles = (files: IUploadedFile[]) => {
    onSuccessTriggerForm(3)
    setValue("files", files)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.wrapper__main}>
        <PageHeader title='Создание нового товара' />
        {step === 0 && (
          <MainInfo
            mainInfo={getValues("mainInfo")}
            onNextStep={onSuccessMainInfo}
          />
        )}
        {step === 1 && (
          <Attributes
            data={getValues("attributes")}
            category_id={getValues("mainInfo").categories.at(-1).id}
            onNextStep={onSuccesAttributes}
          />
        )}
        {step === 2 && (
          <UploadImage
            data={getValues("files")}
            onNextStep={onSuccesUploadFiles}
          />
        )}
        {step === 3 && <Preview watch={watch} />}
      </div>
      <div className={s.wrapper__nav}></div>
    </div>
  )
}

export default CreateProducts
