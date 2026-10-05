import { create } from "zustand";

export type SignupDraft = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  referralCode: string | null;
};

type SignupDraftStore = {
  draft: SignupDraft | null;
  setDraft: (draft: SignupDraft) => void;
  clearDraft: () => void;
};

// deliberately NOT persisted: the password only ever lives in memory
export const useSignupDraftStore = create<SignupDraftStore>((set) => ({
  draft: null,
  setDraft: (draft) => set({ draft }),
  clearDraft: () => set({ draft: null }),
}));
