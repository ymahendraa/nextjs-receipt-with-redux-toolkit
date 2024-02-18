export type Material = {
  id: number;
  name: string;
  unit?: "kg" | "sdm" | "sdt" | "pcs" | "ml";
  quantity?: number;
};

export type Step = {
  id: number;
  description: string;
};

export type Receipt = {
  id: number;
  name: string;
  materials: Array<Material>;
  steps: Array<Step>;
  image?: File | null;
};

export type TODO = any;
