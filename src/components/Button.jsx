import React, { memo } from 'react'

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

export default memo(Button)
// useEffect 3 way execute
// useMemo vs useCallback
// useEffect vs useLayoutEffect
// useReducer
// useState
// debounce
// memo
// useContext
// formik , yup validation

