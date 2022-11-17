import { NoteSerivce } from ".";

class LocalNoteService extends NoteSerivce {
    async getAllNotes(user?: string): Promise<any[]> {
        try {
            let res  = await chrome.storage.local.get(["notes"])
            if(res.notes){
                return res.notes
            }
            return []
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async editNote(notes : any[] ,id: string, note: any) : Promise<any[]> {
        let newNotes = [...notes]
        let updateIndex = newNotes.findIndex(n=>n.id === id)
        if(updateIndex !== -1){
            newNotes[updateIndex] = note
        }
        try {
            await chrome.storage.local.set({notes: newNotes})
            return newNotes
        } catch (error) {
            console.log(error)
            return newNotes
            
        }

    }

    async newNote(notes : any[],note: any) {
        let res =  [...notes , note]
        try {
            let response =   await chrome.storage.local.set({notes: res})
            console.log(response)
            return res
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async removeNote(notes: any[], id: string): Promise<any[]> {
        let index = notes.findIndex(n=>n.id === id)
        let newNotes = [...notes]
        try {
            if(index !== -1){
                newNotes.splice(index , 1)
            }
            await chrome.storage.local.set({notes: newNotes})
            return newNotes
        } catch (error) {
            console.log(error)
            return newNotes
        }
    }


}

export default LocalNoteService