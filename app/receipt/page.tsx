'use client'
import React from 'react'

// hooks import
import { useAppDispatch, useAppSelector } from '@/lib/hooks'

// utils import
import { addReceipt, removeReceipt } from '@/lib/features/receipt/receiptSlice'
import { RootState } from '@/lib/store'
import Link from 'next/link'

// components import
import Section from '@/components/atoms/section'
import Button from '@/components/atoms/button'
import { TrashIcon } from '@heroicons/react/24/outline'

/**
 * @description ReceiptPage component is a page to show all the receipts
 * @returns ReceiptPage component
 */
const ReceiptPage = () => {
    // get the receipt from the store
    const receipt = useAppSelector((state: RootState) => state.receipt)

    // define dispatch
    const dispatch = useAppDispatch()
    return (
        <Section>
            <Section className='flex justify-between items-center'>
                <h1 className='text-4xl font-bold'>Daftar resep</h1>
                <Link
                    href={`/receipt/${receipt.length + 1}`}
                    onClick={() => {
                        dispatch(addReceipt())
                    }}
                    className='bg-primary text-white px-4 py-2 rounded-md'
                >Tambah resep</Link>
            </Section>
            <ul className='flex gap-4 flex-col'>
                {receipt.map((r) => (
                    <li key={r.id} className='flex items-center justify-between'>
                        <Section className='flex gap-2 items-center'>
                            <div className='bg-primary w-2 h-2 rounded-full' />
                            <Link href={`/receipt/${r.id}`} key={r.id} className='hover:underline'>{r.name}</Link>
                        </Section>
                        <Button
                            onClick={() => {
                                dispatch(removeReceipt(r.id))
                            }}
                            className='bg-red-500 text-white px-2 py-1 rounded-md'
                            icon={<TrashIcon className="w-4 h-4" />}
                        />
                    </li>
                ))}
            </ul>
        </Section>
    )
}

export default ReceiptPage