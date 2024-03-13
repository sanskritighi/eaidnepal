import React from 'react'

export const Area = () => {
  return (
    <div>
    <div className="grid grid-cols-3 h-screen ">
      {/* Left column */}
      <div className="col-span-1 bg-purple-200">
        {/* Content for the left column */}
      </div>

      {/* Right column */}
      <div className="col-span-2 grid grid-rows-2">
        {/* Top right */}
        <div className="row-span-1 bg-yellow-200">
          {/* Content for the top right */}
        </div>

        {/* Bottom right */}
        <div className="row-span-1 bg-blue-200">
          {/* Content for the bottom right */}
        </div>
      </div>
    </div>

    </div>
  )
}
