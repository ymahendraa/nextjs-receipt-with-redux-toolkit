'use client'
// utils imports
import StoreProvider from '@/StoreProvider'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setIsOpen } from '@/lib/features/sidebar/sidebarSlice'

// components imports
import SidebarModule from '@/components/complex-organisms/sidebar'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // get the sidebar state from the store
    const showSidebar = useAppSelector((state) => state.sidebar.isOpen)
    // define the setter for the sidebar state
    const dispatch = useAppDispatch()

    return (
        <>
            <div className="flex flex-row w-full max-w-screen-lg">
                <SidebarModule show={showSidebar} setter={() => dispatch(setIsOpen)} />
                <div className="w-full pb-8 pt-4 px-4 lg:p-8 mt-14 text-black">{children}</div>
            </div>
        </>

    )
}
