import React from 'react'

export default function UtilityContainer({ children }: { children: React.ReactNode }

) {
  return (
    <div className="flex flex-col items-center  px-4 py-2 ">{children}</div>
  )
}

