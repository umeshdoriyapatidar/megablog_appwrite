import React from 'react'

function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'texh-white',
  className = '',
  ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor} ${type} `} {...props}>
      {children}
    </button>
  )
};

export default Button