// utils imports
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// types imports
import { Material, Receipt, Step } from "@/types/type";

const initialState: Receipt[] = [
  {
    id: 1,
    name: "Resep rendang",
    materials: [
      {
        id: 1,
        name: "Apel",
        quantity: 2,
        unit: "pcs",
      },
      {
        id: 2,
        name: "Garam",
        quantity: 5,
        unit: "sdm",
      },
      {
        id: 3,
        name: "Tepung Terigu",
        quantity: 2,
        unit: "kg",
      },
    ],
    steps: [
      {
        id: 1,
        description: "step 1",
      },
      {
        id: 2,
        description: "step 2",
      },
      {
        id: 3,
        description: "step 3",
      },
    ],
  },
];

const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {
    addReceipt: (state) => {
      state.push({
        id: state.length + 1,
        name: "New Receipt",
        materials: [],
        steps: [],
      });
    },
    editReceiptName: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const { id, name } = action.payload;
      const receipt = state.find((receipt) => receipt.id === id);
      if (receipt) {
        receipt.name = name;
      }
    },
    removeReceipt: (state, action: PayloadAction<number>) => {
      return state.filter((receipt) => receipt.id !== action.payload);
    },
    addMaterial: (
      state,
      action: PayloadAction<{ receiptId: number; material: Material }>
    ) => {
      const { receiptId, material } = action.payload;
      const receipt = state.find((receipt) => receipt.id === receiptId);
      if (receipt) {
        receipt.materials.push({ ...material });
      }
    },
    editMaterial: (
      state,
      action: PayloadAction<{ receiptId: number; material: Material }>
    ) => {
      const { receiptId, material } = action.payload;
      const receipt = state.find((receipt) => receipt.id === receiptId);
      if (receipt) {
        const materialIndex = receipt.materials.findIndex(
          (m) => m.id === material.id
        );
        if (materialIndex !== -1) {
          receipt.materials[materialIndex] = material;
        }
      }
    },
    editMaterialQuantity: (
      state,
      action: PayloadAction<{
        receiptId: number;
        materialId: number;
        quantity: number;
      }>
    ) => {
      const { receiptId, materialId, quantity } = action.payload;
      const receipt = state.find((receipt) => receipt.id === receiptId);
      if (receipt) {
        const material = receipt.materials.find((m) => m.id === materialId);
        if (material) {
          material.quantity = quantity;
        }
      }
    },
    deleteMaterial: (
      state,
      action: PayloadAction<{ receiptId: number; materialId: number }>
    ) => {
      const { receiptId, materialId } = action.payload;
      const receipt = state.find((receipt) => receipt.id === receiptId);
      if (receipt) {
        receipt.materials = receipt.materials.filter(
          (m) => m.id !== materialId
        );
      }
    },
    addStep: (
      state,
      action: PayloadAction<{ receiptId: number; step: Step }>
    ) => {
      const { receiptId, step } = action.payload;
      const receipt = state.find((receipt) => receipt.id === receiptId);
      if (receipt) {
        console.log("step", step);
        const stepId = receipt.steps.length + 1;
        step.id = stepId;
        receipt.steps.push(step);
      }
    },
    editStep: (
      state,
      action: PayloadAction<{ receiptId: number; step: Step }>
    ) => {
      const { receiptId, step } = action.payload;
      const receipt = state.find((receipt) => receipt.id === receiptId);
      if (receipt) {
        const stepIndex = receipt.steps.findIndex((s) => s.id === step.id);
        if (stepIndex !== -1) {
          receipt.steps[stepIndex] = step;
        }
      }
    },
    deleteStep: (
      state,
      action: PayloadAction<{ receiptId: number; stepId: number }>
    ) => {
      const { receiptId, stepId } = action.payload;
      const receipt = state.find((receipt) => receipt.id === receiptId);
      if (receipt) {
        receipt.steps = receipt.steps.filter((s) => s.id !== stepId);
      }
    },
    setImage: (
      state,
      action: PayloadAction<{ receiptId: number; image: File }>
    ) => {
      const { receiptId, image } = action.payload;
      const receipt = state.find((receipt) => receipt.id === receiptId);
      if (receipt) {
        receipt.image = image;
      }
    },
  },
});

export const selectReceiptById = (state: { receipt: Receipt[] }, id: number) =>
  state.receipt.find((receipt) => receipt.id == id);

export const {
  addReceipt,
  editReceiptName,
  removeReceipt,
  addMaterial,
  editMaterial,
  deleteMaterial,
  editMaterialQuantity,
  addStep,
  editStep,
  deleteStep,
  setImage,
} = receiptSlice.actions;

export default receiptSlice.reducer;
