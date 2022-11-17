export interface CrudInterface<T>{
    items : T[] 
    addItem : (item : T) => void
    deleteItem : (id : string) => void
    editItem : (id : string , item : T) => void
    fetchItem : () => void
}