import { create } from 'zustand'

export const useGlobalState = create((set) => ({
  toolPanelModalOpen: false,
  setToolPanelModalOpen: (open) => set(state => ({ 
    toolPanelModalOpen: open
  })),
  sideBarChoosedOption : "",
  setSideBarChoosedOption: (option) => set({ sideBarChoosedOption: option }),

  activeStage:undefined,
  setActiveStage : (satge)=>set({activeStage:satge})
}))