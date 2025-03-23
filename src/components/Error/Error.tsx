import React from "react"

interface IErrorProps {
  error: string
  action: () => void
  actionTitle: string
}

const Error: React.FC<IErrorProps> = ({ error, action, actionTitle }) => {
  return <div onClick={action}>{error}</div>
}

export default Error
