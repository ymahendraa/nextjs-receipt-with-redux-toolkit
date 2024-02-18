'use client'

import React from 'react'

// components import
import Section from '@/components/atoms/section'
import InputText from '@/components/atoms/input/input-text'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

// utils import
import { useAppSelector } from '@/lib/hooks'
import { addStep, deleteMaterial, deleteStep, editMaterialQuantity, editReceiptName, editStep, selectReceiptById, setImage } from '@/lib/features/receipt/receiptSlice'
import { useAppDispatch } from '@/lib/hooks'
import { onChangeStep, clearTemporaryStep } from '@/lib/features/new-step/stepSlice'
import { onChangeActive, clearTemporaryActive } from '@/lib/features/active-state/activeStateSlice'
import { clearCurrentState, onChangeCurrentState } from '@/lib/features/current-step/currentStepSlice'

// types import
import { RootState } from '@/lib/store'
import Button from '@/components/atoms/button'
import InputTextArea from '@/components/atoms/input/input-text-area'
import { setIsOpen } from '@/lib/features/sidebar/sidebarSlice'
import InputImage from '@/components/atoms/input/input-image'
import Image from 'next/image'

/**
 * @description DetailReceipt is a page to show detail of a receipt
 * @param {string} id - id of the receipt
 * @returns DetailReceipt component 
 */
const DetailReceipt = ({ params }: { params: { id: string } }) => {
    // get the id from the params
    const id = parseInt(params.id)

    // get the receipt from the store
    const receipt = useAppSelector((state: RootState) => selectReceiptById(state, id))

    // get the new step from the store
    const newStep = useAppSelector((state: RootState) => state.newStep)

    // get the current state from the store
    const currentState = useAppSelector((state: RootState) => state.currentState)

    // get the active state from the store
    const activeState = useAppSelector((state: RootState) => state.activeState)

    // define dispatch
    const dispatch = useAppDispatch()

    // effect for closing the sidebar
    // set timeout to wait for the sidebar to close
    // but it's only working when ever the activeState false
    // remove the timeout if the activeState is true
    React.useEffect(() => {
        if (activeState.status === false) {
            setTimeout(() => {
                dispatch(setIsOpen(false))
            }, 3000)
        }

        if (activeState.status === true) {
            dispatch(setIsOpen(true))
        }
    }, [activeState])

    const handleFileChange = (file: File | null) => {
        if (file) {
            dispatch(setImage({ receiptId: id, image: file }))
        }
    }

    return (
        <main className='flex flex-col gap-4'>
            {activeState.identifier === (id + (receipt?.name ?? '')) && activeState.status ? (
                <InputText
                    defaultValue={receipt?.name}
                    value={currentState}
                    placeholder={receipt?.name}
                    onChange={(e) => dispatch(onChangeCurrentState(e.target.value))}
                    onBlur={(e) => {
                        dispatch(editReceiptName({ id, name: e.target.value }))
                        dispatch(clearTemporaryActive())
                        dispatch(clearCurrentState())
                    }}
                />
            ) : (
                <h1
                    className='text-4xl font-bold cursor-pointer hover:underline'
                    onClick={(e) => {
                        e.stopPropagation()
                        dispatch(onChangeActive({ identifier: id + (receipt?.name ?? ''), type: 'receipt', status: true }))
                    }}
                >{receipt?.name}</h1>
            )}
            <p className='text-xs text-slate-500'>Klik judul untuk mengedit</p>

            {/* Materials */}
            <Section className='flex flex-col gap-2'>
                <h2 className='text-lg font-bold'>Bahan:</h2>
                <Section className='ml-4'>
                    <ul>
                        {receipt?.materials.map((m) => (
                            <li
                                key={m.id}
                                className='flex gap-4 text-md justify-between cursor-pointer hover:bg-slate-200 p-2 rounded-md'
                                onClick={() => {
                                    dispatch(onChangeActive({
                                        identifier: m.id + m.name,
                                        type: 'material',
                                        status: false
                                    }))
                                    dispatch(setIsOpen(true))
                                }}
                            >
                                {/* INFO SECTION */}
                                <Section className='flex gap-2'>
                                    <Section className='flex gap-2'>
                                        <Section>
                                            {activeState.identifier === (m.id + m.name) && activeState.status == true ? (
                                                <Section className='w-16'>
                                                    <InputText
                                                        type='number'
                                                        value={currentState || m.quantity}
                                                        onChange={(e) => dispatch(onChangeCurrentState(e.target.value))}
                                                        onBlur={(e) => {
                                                            dispatch(editMaterialQuantity({ receiptId: id, materialId: m.id, quantity: parseInt(e.target.value) }))
                                                            dispatch(clearTemporaryActive())
                                                            dispatch(clearCurrentState())
                                                        }}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </Section>
                                            ) : (
                                                m.quantity
                                            )
                                            }
                                        </Section>
                                        <span>{m.unit}</span>
                                    </Section>
                                    <span>{m.name}</span>
                                </Section>
                                {/* EDIT & DELETE SECTION */}
                                {activeState.identifier === (m.id + m.name) && (
                                    <Section className='flex gap-2 items-center'>
                                        <Button
                                            onClick={(e) => {
                                                dispatch(clearTemporaryActive())
                                                e.stopPropagation()
                                                dispatch(onChangeActive({
                                                    identifier: m.id + m.name,
                                                    type: 'material',
                                                    status: true
                                                }))
                                            }}
                                            className='bg-primary hover:bg-primaryDark text-white rounded-md p-1'
                                            icon={<PencilIcon className='w-3 h-3' />}
                                        />
                                        <Button
                                            onClick={() => {
                                                dispatch(clearTemporaryActive())
                                                dispatch(deleteMaterial({ receiptId: id, materialId: m.id }))
                                            }}
                                            className='bg-red-500 hover:bg-red-600 text-white rounded-md p-1'
                                            icon={<TrashIcon className='w-3 h-3' />}
                                        />
                                    </Section>
                                )}
                            </li>
                        ))}
                    </ul>
                </Section>
            </Section>


            {/* Steps */}
            <Section className='flex flex-col gap-2'>
                <h2 className='text-lg font-bold'>Tata cara:</h2>
                <Section className='ml-4'>
                    <ol>
                        {receipt?.steps.map((s, index) => (
                            <li
                                key={s.id}
                                className='flex text-md items-center justify-between hover:bg-slate-200 p-2 rounded-md cursor-pointer'
                                onClick={() => {
                                    dispatch(clearTemporaryActive())
                                    dispatch(onChangeActive({
                                        identifier: s.id + s.description,
                                        type: undefined,
                                        status: false
                                    }))
                                }}
                            >
                                {/* INFO SECTION */}
                                <Section className='flex gap-2'>
                                    <span>{index + 1}. </span>
                                    {
                                        activeState.identifier === (s.id + s.description) && activeState.status == true ? (
                                            <InputTextArea
                                                defaultValue={s.description}
                                                placeholder={s.description}
                                                value={currentState}
                                                onChange={(e) => dispatch(onChangeCurrentState(e.target.value))}
                                                onBlur={(e) => {
                                                    dispatch(editStep({ receiptId: id, step: { id: s.id, description: e.target.value } }))
                                                    dispatch(clearTemporaryActive())
                                                    dispatch(clearCurrentState())
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            <span>{s.description}</span>
                                        )
                                    }
                                </Section>

                                {/* EDIT & DELETE SECTION */}
                                {activeState.identifier === (s.id + s.description) && (
                                    <Section className='flex gap-2 items-center'>
                                        <Button
                                            onClick={(e) => {
                                                dispatch(clearTemporaryActive())
                                                e.stopPropagation()
                                                dispatch(onChangeActive({
                                                    identifier: s.id + s.description,
                                                    type: 'step',
                                                    status: true
                                                }))
                                            }}
                                            className='bg-primary hover:bg-primaryDark text-white rounded-md p-1'
                                            icon={<PencilIcon className='w-3 h-3' />}
                                        />
                                        <Button
                                            onClick={() => {
                                                dispatch(clearTemporaryActive())
                                                dispatch(deleteStep({ receiptId: id, stepId: s.id }))

                                            }}
                                            className='bg-red-500 hover:bg-red-600 text-white rounded-md p-1'
                                            icon={<TrashIcon className='w-3 h-3' />}
                                        />
                                    </Section>
                                )}
                            </li>
                        ))}
                    </ol>
                </Section>

                <InputTextArea
                    label='Tambah langkah'
                    value={newStep}
                    onChange={(e) => dispatch(onChangeStep(e.target.value))}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && newStep !== '') {
                            dispatch(addStep({ receiptId: id, step: { id: receipt?.steps.length ?? 0 + 1, description: newStep } }))
                            dispatch(clearTemporaryStep())
                        }
                    }}
                />

                <InputImage
                    onChange={handleFileChange}
                    currentImage={receipt?.image ? URL.createObjectURL(receipt?.image) : '/no-image.png'}
                />

                {/* <Image
                    src={receipt?.image ? URL.createObjectURL(receipt?.image) : '/no-image.png'}
                    alt='receipt image'
                    width={200}
                    height={200}
                /> */}

            </Section>

        </main>
    )
}

export default DetailReceipt