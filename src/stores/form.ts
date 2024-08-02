import { create } from 'zustand';

type FormState = {
  processStep: number;
  step: number;
  nextProcessStep: () => void;
  prevProcessStep: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  setProcessStep: (processStep: number) => void;
};

export const useFormSlice = create<FormState>((set) => ({
    processStep: 0,
    step: 0,
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: state.step - 1 })),
    nextProcessStep: () => set((state) => ({ processStep: state.processStep + 1 })),
    prevProcessStep: () => set((state) => ({ processStep: state.processStep - 1 })),
    setStep: (newStep: number) => set((state) => ({ step: newStep })),
    setProcessStep: (newProcessStep: number) => set((state) => ({ processStep: newProcessStep })),
}));