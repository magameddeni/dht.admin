import { PropsWithChildren, useEffect } from "react"
import ReactDOM from "react-dom"
import cx from "classnames"
import { Icon } from "@/components/UI"
import { useWindowSize, useMountTransition } from "@/hooks"
import s from "./style.module.scss"

interface IDrawerProps extends PropsWithChildren {
  show: boolean
  onClose: VoidFunction
  slideDirection?: "right" | "left"
  width?: string
  closeOnOutSide?: boolean
}

const Drawer = ({
  show,
  onClose,
  children,
  slideDirection = "right",
  width,
  closeOnOutSide = true,
}: IDrawerProps) => {
  const { isLarge: isPc } = useWindowSize()
  const shouldRenderChild = useMountTransition(show, 300)
  const isDirectionRight = slideDirection === "right"

  // useCloseOnEsc(onClose)

  useEffect(() => {
    document.body.classList.toggle(s["overflow-hidden"], show)
  }, [show])

  const renderDrawer = () => (
    <div
      className={cx(s["drawer-wrapper"], {
        [s.right]: isDirectionRight,
        [s["right--slide-in"]]: isDirectionRight && show,
        [s["right--slide-out"]]: isDirectionRight && !show,
        [s.left]: !isDirectionRight,
        [s["left--slide-in"]]: !isDirectionRight && show,
        [s["left--slide-out"]]: !isDirectionRight && !show,
      })}
      style={{ width: isPc ? width : "100%" }}
      onClick={(e) => e.stopPropagation()}>
      <div className={s.drawer}>
        <div className={s.drawer__content}>{children}</div>
        {isPc ? (
          <Icon
            className={s["drawer__close-icon"]}
            onClick={onClose}
            name='x'
          />
        ) : (
          <Icon
            onClick={onClose}
            className={s["drawer__back-icon"]}
            name='arrow-left2'
          />
        )}
      </div>
    </div>
  )

  if (!shouldRenderChild) return null

  return ReactDOM.createPortal(
    <>
      {shouldRenderChild && (
        <>
          <div
            className={cx(s["drawer-overlay"], {
              [s["drawer-overlay--enter"]]: show,
              [s["drawer-overlay--exit"]]: !show,
            })}
            onClick={closeOnOutSide ? onClose : () => {}}
          />
          {renderDrawer()}
        </>
      )}
    </>,
    document.getElementById("root") as any,
  )
}

export default Drawer
