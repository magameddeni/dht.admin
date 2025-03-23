import { Accept } from "react-dropzone"

export interface IUploadedFile {
  id: number
  fieldname: string
  originalname: string
  encoding: string
  mimetype: Accept
  destination: string
  filename: string
  path: string
  size: number
  islocal: boolean
  created_time: Date
  order: number
}
