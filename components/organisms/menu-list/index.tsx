import Material from '@/components/molecules/material'
import { TODO } from '@/types/type'
import React from 'react'

type MenuListProps = {
    items: TODO[],
    onClick?: (item: TODO) => void
    isItemActive: (path: TODO) => boolean
    setter: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * 
 * @description
 * MenuList: MenuList component for showing menu list 
 * @param items list of menu items
 * @param toggleActive function for toggle active menu
 * @param isItemActive function for checking if menu is active
 * @param setter function for set sidebar state
 * @returns 
 * MenuList component
 */
const MenuList: React.FC<MenuListProps> = ({
    items,
    // activeRoute,
    onClick,
    isItemActive,
    setter
}) => {
    return (
        <ul className='flex flex-col gap-4'>
            {items.map((item, index) => (
                <React.Fragment key={index} >
                    <Material
                        label={item.name}
                        onClick={(item: { id: number, name: string, quantity: number, unit: string }) => onClick && onClick(item)}
                        material={item}
                    />
                </React.Fragment>

            ))}
        </ul>
    )
}

export default MenuList