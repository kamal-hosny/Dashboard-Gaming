import React from 'react'

const LogOut = () => {
  return (
    <div
    className={`fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] justify-center items-center rounded-lg w-96 bg-sectionColor border-2 `}
>
    <div className="modal-head w-full p-5 text-lg font-semibold justify-center text-center text-colorText1">
        Modal
    </div>
    <div className="modal-body w-full flex justify-start gap-2 p-3 border-y-2 border-colorBorder">
        <form action="" className="w-full grid grid-cols-2 gap-2">
           <div>
            textttttt
           </div>
            {/* S btn */}
            <div className="col-span-2 flex justify-between gap-2 mt-2 items-center">
                <div className="flex items-center gap-2">
                    <button className="bg-green-500 text-white px-3 py-2 rounded-sm">
                        Submit
                    </button>
                    <button className="bg-gray-500 text-white px-3 py-2 rounded-sm">
                        Cancel
                    </button>
                </div>
            </div>
            {/* E btn */}
        </form>
    </div>
</div>
  )
}

export default LogOut