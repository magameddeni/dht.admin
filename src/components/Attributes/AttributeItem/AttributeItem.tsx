import { Checkbox, Input } from "@/components/UI"
import { ICategoryAttribute } from "@/interface"
import s from "./style.module.scss"

const AttributeItem: React.FC<ICategoryAttribute> = ({
  attribute_name,
  data_type,
  unit,
  required,
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.wrapper__required}>
        <Checkbox name='' label='Обязательное поле' checked={required} />
      </div>
      <div className={s.wrapper__attribute_name}>
        <Input fluid name='' readOnly value={attribute_name} />
      </div>
      <div className={s.wrapper__unit_type}>
        <div className={s.wrapper__type}>
          <Input name='' readOnly value={data_type} />
        </div>
        <div className={s.wrapper__unit}>
          <Input name='' readOnly value={unit} />
        </div>
      </div>
    </div>
  )
}

export default AttributeItem
