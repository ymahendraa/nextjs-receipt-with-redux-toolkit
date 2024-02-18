import Section from '@/components/atoms/section'
import { Material } from '@/types/type'
import React from 'react'

type MaterialProps = {
    label?: string
    material: Material
    onClick: ({ id, name, quantity, unit }: { id: number, name: string, quantity: number, unit: string }) => void
}

const Material: React.FC<MaterialProps> = ({
    label,
    material,
    onClick,
}) => {
    const handleClick = () => {
        onClick({
            id: material.id,
            name: material.name,
            quantity: 1, // Provide a default value for quantity
            unit: material.unit || '', // Provide a default value for unit
        });
    };
    return (
        <Section onClick={handleClick} className='cursor-pointer hover:bg-primaryLight p-2 rounded-md' >
            <div className="flex flex-row gap-x-3 text-black">
                <p
                >
                    {label}
                </p>
            </div>
        </Section>
    )
}

export default Material