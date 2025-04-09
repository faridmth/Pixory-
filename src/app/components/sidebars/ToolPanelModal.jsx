import { useGlobalState } from '@/app/store/store';

const ToolPanelModal = ({children}) => {
        const toolPanelModalOpen = useGlobalState((state)=>state.toolPanelModalOpen)
        const setToolPanelModalOpen = useGlobalState((state)=>state.setToolPanelModalOpen)
        const setSideBarChoosedOption = useGlobalState((state)=>state.setSideBarChoosedOption)

    const toggleSidebar = () => {
      setToolPanelModalOpen()
      setSideBarChoosedOption('')
    };

  return (
    <div className=''>
            <div 
        className={`fixed top-0 left-[95px] h-[calc(100%-69px)] mt-[69px] bg-gray-50 shadow-lg transition-all duration-100 ease-in-out ${
          toolPanelModalOpen ? 'w-[300px]' : 'w-0 overflow-hidden'
        }`}
      >
        
        {children}
      </div>

      {/* Toggle Button - Positioned at middle height */}
      <button
  onClick={toggleSidebar}
  className={`fixed top-1/2 cursor-pointer -translate-y-1/2 transition-all 
    duration-100 ease-in-out z-10 bg-white text-white h-[60px] w-[45px] border-gray-800
    [clip-path:polygon(0_0,22%_14%,22%_78%,0%_100%)] ${
    toolPanelModalOpen ? 'left-[395px]' : 'left-[95px]'
  }`}
>
  {/* Button content */}

        {toolPanelModalOpen&&(
          <svg className='absolute top-[20px] -left-[4px]' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#696969" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        ) }

      </button>

    </div>
  )
}

export default ToolPanelModal
