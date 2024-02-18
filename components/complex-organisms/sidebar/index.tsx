import React, { useState } from 'react'
// component imports
import MenuList from '@/components/organisms/menu-list'
import Image from 'next/image'

// hooks imports
import { usePathname, useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'
import { useAppDispatch } from '@/lib/hooks'

// utils imports
import { LIST_MATERIAL } from '@/utils/list-material'
import { RootState } from '@/lib/store'
import { addMaterial, selectReceiptById } from '@/lib/features/receipt/receiptSlice'
import { Material } from '@/types/type'


type SidebarProps = {
    show: boolean
    setter: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarModule: React.FC<SidebarProps> = ({ show, setter }) => {
    // define dispatch
    const dispatch = useAppDispatch()

    // onClick handler
    const onClick = ({ id, name, quantity, unit }: Material) => {
        dispatch(addMaterial({ receiptId: receiptId, material: { id, name, quantity, unit } }))
    }
    // Define our base class
    const className =
        'flex flex-col bg-white w-[300px] lg:w-[400px] transition-[opacity] ease-in-out duration-500 fixed lg:sticky top-0 bottom-0 left-0 z-40 gap-y-6 shadow-lg px-4 py-4 justify-between h-screen'

    // Append class based on state of sidebar visiblity
    const appendClass = show ? 'opacity-100' : 'opacity-0'

    // get current route 
    const pathname = usePathname()

    // get the id from the pathname
    const receiptId = parseInt(pathname.split('/')[2])

    // get current receipt
    const receipt = useAppSelector((state: RootState) => selectReceiptById(state, receiptId))

    // filter the list of material if already in the receipt
    const FILTERED_LIST_MATERIAL = LIST_MATERIAL.filter((material) => {
        if (receipt?.materials.find((m) => m.id === material.id)) {
            return false
        }
        return true
    })

    return (
        <>
            <aside className={`${className} ${appendClass}`}>
                <div className="flex flex-col gap-y-6">
                    {/* HEADER */}
                    <div className={`flex flex-row gap-4 items-center`}>
                        {/* LOGO */}
                        <Image src="/logo.png" alt="logo" width={30} height={60} />
                        {/* APP NAME */}
                        <section>
                            <h1 className="text-lg text-primary font-bold">List</h1>
                            <h3 className="text-xs text-slate-800 font-medium">
                                Bahan Baku
                            </h3>
                        </section>
                    </div>

                    {/* MENU */}
                    <div className="h-[500px] overflow-y-auto scrollbar-hide">
                        <MenuList
                            setter={setter}
                            items={FILTERED_LIST_MATERIAL}
                            // activeRoute={}
                            onClick={onClick}
                            isItemActive={() => false}
                        />
                    </div>
                </div>

            </aside>
            {/* Overlay to prevent clicks in background, also serves as our close button */}
            {/* {show ? <ModalOverlay setter={setter} /> : <></>} */}
        </>

    )
}

export default SidebarModule