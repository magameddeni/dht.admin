import { components, OptionProps } from "react-select"
import { ISelectOption } from "../"
import { Icon } from "../../"

export const SelectOption = ({ ...props }: OptionProps<ISelectOption>) => (
  <components.Option {...props}>
    {props.data.label}
    {props.isSelected && <Icon name='check' size='sm' />}
  </components.Option>
)
