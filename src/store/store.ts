// // store.ts
// import { create } from 'zustand';

// interface FormulaState {
//   formula: string;
//   setFormula: (formula: string) => void;
// }

// export const useFormulaStore = create<FormulaState>((set:any) => ({
//   formula: '',
//   setFormula: (formula:any) => set({ formula }),
// }));




// store.ts
import {create} from 'zustand';

interface FormulaState {
  formula: string;
  tags: string[];
  setFormula: (formula: string) => void;
  setTags: (tags: string[]) => void;
  addTag: (tag: string) => void;
  removeTag: (index: number) => void;
}

export const useFormulaStore = create<FormulaState>((set) => ({
  formula: '',
  tags: [],
  setFormula: (formula) => set({ formula }),
  setTags: (tags) => set({ tags }),
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  removeTag: (index) =>
    set((state) => ({ tags: state.tags.filter((_, i) => i !== index) })),
}));