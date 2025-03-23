import { FC, useState } from "react"
import { $api, serverBaseUrl } from "@/api"
import { IUploadedFile } from "@/interface"
import { Dropzone } from "@/components/Dropzone"

import s from "./style.module.scss"
import { Button } from "@/components/UI"

interface IUploadedFileProps {
  onNextStep: (files: IUploadedFile[]) => void
  data?: IUploadedFile[]
}

const UploadImage: FC<IUploadedFileProps> = ({ onNextStep, data }) => {
  const [files, setFiles] = useState<IUploadedFile[]>(data ?? [])

  const onDrop = async (files: File[]) => {
    const formData = new FormData()

    for (const file of files) {
      formData.append("files", file)
    }

    const { data, status } = await $api.post("/file", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    if (status === 200) {
      data.map((f: IUploadedFile) =>
        setFiles((prev) => [...prev, { ...f, order: prev.length + 1 }]),
      )
    }
  }

  const handlerButtomSubmit = () => {
    if (files.length > 0) onNextStep(files)
  }

  return (
    <div className={s.main}>
      {Boolean(files.length) && (
        <div className={s.main__files}>
          {files.map((v) => (
            <div className={s.main__file} key={v.filename}>
              <img
                src={`${serverBaseUrl}/${v.filename}`}
                className={s.main__file_img}
              />
            </div>
          ))}
        </div>
      )}
      {files.length < 10 && (
        <Dropzone
          className={s.main__dropzone}
          accept={{
            "image/jpeg": [".jpeg"],
            "image/png": [".png"],
            "image/jpg": [".jpg"],
          }}
          maxFiles={10}
          onDrop={onDrop}
          maxSize={10 * 1e6}
        />
      )}

      <div className={s.main__footer}>
        <Button onClick={handlerButtomSubmit} disabled={!files.length}>
          Далее
        </Button>
      </div>
    </div>
  )
}

export default UploadImage
