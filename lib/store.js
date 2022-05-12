import create from "zustand";

const useStore = create((set) => ({
  issues: [],
  updateIssue: (payload) => set(state => ({ issues: payload })),
}));

export default useStore;
