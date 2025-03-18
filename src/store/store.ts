// store.ts
import { create } from 'zustand';

interface FormulaState {
  formula: string;
  setFormula: (formula: string) => void;
}

export const useFormulaStore = create<FormulaState>((set:any) => ({
  formula: '',
  setFormula: (formula:any) => set({ formula }),
}));