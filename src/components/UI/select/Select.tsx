import React, { ForwardedRef, useEffect, useState } from "react"
import BaseSelect, { OptGroup, Option } from "rc-select"
import cn from "classnames"
import FormError from "../form/FormError"
import FormLabel from "../form/FormLabel"
import s from "../form/style.module.scss"

interface ISelect {
  children?: React.ReactNode
  id?: string
  name: string
  className?: string
  style?: React.CSSProperties
  value: any
  defaultValue?: any
  label?: string
  required?: boolean
  onChange?: (event?: React.ChangeEvent<HTMLInputElement> | any) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement> | any) => void
  onDeselect?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onPopupScroll?: (event: React.UIEventHandler<HTMLInputElement> | any) => void
  rules?: any
  errors?: any
  fluid?: boolean
  arrowIcon?: string
  classNameInputWrapper?: string
  view?: string
  open?: boolean
  animation?: "slide-up"
  mode?: "combobox" | "multiple" | "tags" | undefined
  placeholder?: string
  disabled?: boolean
  textCenter?: boolean
  showSearch?: boolean
  menuItemSelectedIcon?: React.ReactNode
  allowClear?: boolean
  virtual?: boolean
  loadNextOptions?: (value: boolean) => void
  loading?: boolean
  isActive?: boolean
}

const Select = React.forwardRef(
  (
    {
      children,
      name,
      className,
      style,
      value,
      defaultValue,
      label,
      required,
      onChange,
      onBlur,
      onPopupScroll,
      rules,
      errors,
      fluid,
      classNameInputWrapper,
      view,
      disabled,
      placeholder,
      textCenter,
      allowClear,
      virtual = true,
      loading = false,
      loadNextOptions,
      isActive,
      ...rest
    }: ISelect,
    ref: ForwardedRef<any>,
  ) => {
    const [isRequired, setIsRequired] = useState(false)
    const [inputActive, setInputActive] = useState<boolean>(
      isActive ||
        (Array.isArray(value) && Boolean(value?.length)) ||
        (!Array.isArray(value) && Boolean(String(value))) ||
        Boolean(placeholder) ||
        false,
    )

    const formInputWrapperClassList = cn(
      s["form-input-wrapper"],
      {
        [s.error]: errors?.[name],
        [s.fluid]: fluid,
        [s.active]: inputActive,
        [s[`view-${view}`]]: view,
        [s["text-center"]]: textCenter,
      },
      classNameInputWrapper,
    )

    const selectClassList = cn(
      {
        fluid,
        error: errors?.[name],
      },
      className,
    )

    const handlerInputActive = (v: boolean) => {
      if (!placeholder) setInputActive(v)
    }

    const popupScrollHandler = (
      e: React.UIEventHandler<HTMLInputElement> | any,
    ) => {
      if (onPopupScroll && !loadNextOptions) return onPopupScroll(e)
      if (!onPopupScroll && loadNextOptions) {
        return (
          loadNextOptions &&
          loadNextOptions(
            e.target.offsetHeight + e.target.scrollTop ===
              e.target.scrollHeight,
          )
        )
      }

      if (onPopupScroll) onPopupScroll(e)
      if (loadNextOptions)
        loadNextOptions(
          e.target.offsetHeight + e.target.scrollTop === e.target.scrollHeight,
        )
    }

    useEffect(() => {
      setIsRequired(required || rules?.required?.value)
    }, [])

    return (
      <label className={formInputWrapperClassList}>
        <FormLabel label={label} required={isRequired} />
        <div className={s["input-container"]} ref={ref}>
          <BaseSelect
            ref={ref}
            className={selectClassList}
            style={style}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
              if (onBlur) onBlur(e)
              if (!value?.length) handlerInputActive(false)
            }}
            onFocus={() => handlerInputActive(true)}
            onPopupScroll={
              onPopupScroll || loadNextOptions ? popupScrollHandler : () => {}
            }
            disabled={disabled}
            notFoundContent='Не найдено'
            virtual={!loadNextOptions ? virtual : false}
            allowClear={allowClear}
            loading={loading}
            placeholder={placeholder}
            {...rest}>
            {children}
          </BaseSelect>
        </div>
        <FormError message={errors?.[name]?.message} />
      </label>
    )
  },
)

export default Object.assign(Select, {
  Option,
  OptGroup,
})
