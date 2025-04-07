import { create } from 'zustand'

export const useSideBar = create((set) => ({
  toolPanelModalOpen: false,
  setToolPanelModalOpen: (open) => set(state => ({ 
    toolPanelModalOpen: open
  })),
  sideBarChoosedOption : "",
  setSideBarChoosedOption: (option) => set({ sideBarChoosedOption: option })
}))