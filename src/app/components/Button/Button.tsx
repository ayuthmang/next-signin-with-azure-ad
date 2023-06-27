import clsx from 'clsx'
import * as React from 'react'

type ButtonProps = React.JSX.IntrinsicElements['button']

function Button({ onClick, children, className, ...delegated }: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        'bg-blue-500 text-white px-4 py-2 rounded',
        className
      )}
      onClick={onClick}
      {...delegated}
    >
      {children}
    </button>
  )
}

export default Button
