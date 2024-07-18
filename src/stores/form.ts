import { create } from 'zustand';

type FormState = {
  processStep: number;
  step: number;
  nextProcessStep: () => void;
  prevProcessStep: () => void;
  nextStep: () => void;
  prevStep: () => void;
};

export const useFormSlice = create<FormState>((set) => ({
    processStep: 0,
    step: 0,
    nextStep: () => set((state) => ({ processStep: state.processStep + 1 })),
    prevStep: () => set((state) => ({ processStep: state.processStep - 1 })),
    nextProcessStep: () => set((state) => ({ step: state.step + 1 })),
    prevProcessStep: () => set((state) => ({ step: state.step - 1 })),
}));