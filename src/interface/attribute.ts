export interface IAttributes {
  id: number
  required: boolean
  unit: string
  attribute_name: string
  data_type: string
  value: string
  options?: string[]
}

export interface IRequredAttributes {
  attributes: IAttributes[]
  description: string
  country_manufacturer: string
  manufacturer_name: string
  brand_name: string
}
