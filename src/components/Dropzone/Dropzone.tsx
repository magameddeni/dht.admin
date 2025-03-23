import { FC, useCallback } from "react"
import { Text } from "@/components/UI"
import { DropzoneOptions, useDropzone } from "react-dropzone"
import cn from "classnames"
import s from "./style.module.scss"

interface IDropzoneProps extends DropzoneOptions {
  onDrop: (f: File[]) => void
  className?: string
}

const Dropzone: FC<IDropzoneProps> = ({
  onDrop,
  accept,
  className,
  maxSize = 10,
  ...rest
}) => {
  const onDropFile = useCallback((acceptedFiles: File[]) => {
    onDrop(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    maxSize,
    onDrop: onDropFile,
    accept,
    ...rest,
  })

  const renderFileAccept = Object.values(accept ?? {}).map(
    (item) => " " + item[0],
  )

  const classname = cn(s.dropzone, className)

  return (
    <Text className={classname} as='div' {...getRootProps()}>
      <input {...getInputProps()} />
      <img className='offset-top-24' src='./public/pic_icon.svg' />
      <Text as='div' size='xs' className='offset-top-24'>
        Выберите или перетащите файлы в эту область для загрузки
      </Text>
      <Text as='div' size='xxs' className='offset-top-16'>
        Формат:{renderFileAccept}. Общий размер файлов не больше {maxSize / 1e6}{" "}
        Мб.
      </Text>
    </Text>
  )
}

export default Dropzone
