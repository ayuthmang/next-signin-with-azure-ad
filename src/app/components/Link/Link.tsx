import * as React from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

interface LinkProps extends NextLinkProps {
  children: React.ReactNode
  className?: string
}

const Link = ({ children, className, ...props }: LinkProps) => {
  return (
    <NextLink className={className} {...props}>
      {children}
    </NextLink>
  )
}

export default Link
