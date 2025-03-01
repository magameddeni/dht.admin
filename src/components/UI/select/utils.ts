import { ISelectOption } from "../"

export const data2Select = <T>(
  value: T,
  label: string | any,
  rest?: Omit<ISelectOption, "value" | "label">,
): ISelectOption<T> => ({
  value,
  label,
  ...rest,
})
