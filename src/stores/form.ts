import { create } from 'zustand';

type FormState = {
  processStep: number;
  nextStep: () => void;
  prevStep: () => void;
};

export const useFormSlice = create<FormState>((set) => ({
    processStep: 0,
    nextStep: () => set((state) => ({ processStep: state.processStep + 1 })),
    prevStep: () => set((state) => ({ processStep: state.processStep - 1 }))
}));