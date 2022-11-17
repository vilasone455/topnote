import { CategoryService } from ".";

class LocalCategoryService extends CategoryService {
    async getAllCategory(user?: string): Promise<any[]> {
        try {
            let res  = await chrome.storage.local.get(["categorys"])
            if(res.categorys){
                return res.categorys
            }
            return []
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async editCategory(categorys : any[] ,id: string, note: any) : Promise<any[]> {
        let newCategorys = [...categorys]
        let updateIndex = newCategorys.findIndex(n=>n.id === id)
        if(updateIndex !== -1){
            newCategorys[updateIndex] = note
        }
        try {
            await chrome.storage.local.set({categorys: newCategorys})
            return newCategorys
        } catch (error) {
            console.log(error)
            return newCategorys
        }
    }

    async newCategory(categorys : any[],note: any) {
        let res =  [...categorys , note]
        try {
            let response =   await chrome.storage.local.set({categorys: res})
            console.log(response)
            return res
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async removeCategory(categorys: any[], id: string): Promise<any[]> {
        let index = categorys.findIndex(n=>n.id === id)
        let newCategorys = [...categorys]
        try {
            if(index !== -1){
                newCategorys.splice(index , 1)
            }
            await chrome.storage.local.set({categorys: newCategorys})
            return newCategorys
        } catch (error) {
            console.log(error)
            return newCategorys
        }
    }


}

export default LocalCategoryService