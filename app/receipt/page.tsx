'use client'
import React from 'react'

// hooks import
import { useAppDispatch, useAppSelector } from '@/lib/hooks'

// components import
import Section from '@/components/atoms/section'
import Link from 'next/link'
import { RootState } from '@/lib/store'
import { addReceipt } from '@/lib/features/receipt/receiptSlice'

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
            <ul>
                {receipt.map((r) => (
                    <li key={r.id} className='flex items-center gap-2'>
                        <div className='bg-primary w-2 h-2 rounded-full' />
                        <Link href={`/receipt/${r.id}`} key={r.id} className='hover:underline'>{r.name}</Link>
                    </li>
                ))}
            </ul>
        </Section>
    )
}

export default ReceiptPage