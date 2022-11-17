import create from 'zustand'
import { CrudInterface } from '../interface/CrudInterface'
import LocalCategoryService from '../services/categorys/LocalCategory'

interface CategoryState extends CrudInterface<any> {
}

 const useCategoryStore = create<CategoryState>((set, get) => ({
  // initial state
  items: [],
  // methods for manipulating state,
  async editItem(id, item) {
    let itemState = get().items
    let res = await new LocalCategoryService().editCategory(itemState , id  , item)
    set( ( {items : res} ) )
  },
  async fetchItem() {
    let res = await new LocalCategoryService().getAllCategory()
    set(({items : res}))
  },
  addItem: async (item: any) => {
    let itemState = get().items
    let res = await new LocalCategoryService().newCategory(itemState , item)
    console.log(res)
    set(({items : res}))
  },
  deleteItem: async (id) => {
    let itemState = get().items
    console.log(itemState)
    let res = await new LocalCategoryService().removeCategory(itemState , id)
    console.log("res ; ")
    console.log(res)
    set(({items : res}))
  }
  
}));

export default useCategoryStore