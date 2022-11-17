import create from 'zustand'

interface ShareState{
    isSidebar : boolean
    setSidebar : (val : boolean) => void
}

 const useShareState = create<ShareState>((set, get) => ({
  // initial state
  isSidebar: false,
  // methods for manipulating state,
  setSidebar(val) {
    set(( {isSidebar : val} ))
  },
 
  
}));

export default useShareState