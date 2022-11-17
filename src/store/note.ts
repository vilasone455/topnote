import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CrudInterface } from '../interface/CrudInterface'
import LocalNoteService from '../services/notes/LocalNote'

interface NoteState extends CrudInterface<any> {
}


 const useNoteStore = create<NoteState>((set, get) => ({
  // initial state
  items: [],
  // methods for manipulating state,
  async editItem(id, item) {
    let itemState = get().items
    let res = await new LocalNoteService().editNote(itemState , id  , item)
    set( ( {items : res} ) )
  },
  async fetchItem() {
    let res = await new LocalNoteService().getAllNotes()
    set(({items : res}))
  },
  addItem: async (item: any) => {
    let itemState = get().items
    let res = await new LocalNoteService().newNote(itemState , item)
    console.log(res)
    set(({items : res}))
  },
  deleteItem: async (id) => {
    let itemState = get().items
    let res = await new LocalNoteService().removeNote(itemState , id)
    set(({items : res}))
  
  }
  
}));

export default useNoteStore