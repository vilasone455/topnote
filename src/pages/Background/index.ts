import LocalNoteService from "../../services/notes/LocalNote";
import { nanoid } from "nanoid"
import LocalCategoryService from "../../services/categorys/LocalCategory";

console.log('This is the background pagesasss.');
console.log('Put the background scripts here.');

// let da = doc(db , "testcol" , "m536f0bYZ4ukwfW79LqA")
// console.log("start get doc")
// getDoc(da).then(r=>{
//   console.log("get data")
//   console.log(r.data())
// }).catch(err=>{
//   console.log("error fail")
//   console.log(err)
// })


async function onContext(info: any, tab: any) {
  let menuId: string = info.menuItemId
  if (menuId === "higlight-here") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id || 0, { action: "highlight", url: tabs[0].url || "" }, function (response) { });
    });
    return
  }
  console.log(menuId)
  if (menuId === "save-note-here") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id || 0, { action: "newnote", url: tabs[0].url || "" }, function (response) { });
    });
    console.log("send message success")
    return
  }
  if (menuId.includes("savenote") === false) {
    return;
  }
  let infoText = info.selectionText
  console.log("info text : " + infoText)

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: getTitle,
    },
    async (injectionResults) => {

      for (const frameResult of injectionResults) {
        let at = nanoid(9)
        console.log('Frame Title: ' + at + frameResult.result);
        let body: any = {
          id: nanoid(8),
          title: frameResult.result,
          content: infoText,
          categoryId: menuId.split("-")[1] || "",
          url: tab.url
        }
        console.log(body)
        let service = await new LocalNoteService()
        let notes = await service.getAllNotes()
        let res = await service.newNote(notes, body)
        console.log(res)

      }


    });

  // chrome.scripting.executeScript(
  //   {
  //     target: {tabId: tab.id},
  //     func: getTitle,
  //   },
  //   () => { 

  //    });

  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   func : getTitle,

  //   // files: ['/addnote.bundle.js'],
  // })


}

const getTitle = () => {
  let titleName = prompt("Enter note title", "")
  return titleName || ""
}

// const onfunc = async (menuId : string , tab : string , infoText : any) => {
//   let titleName = prompt("Enter note title" , "")
//   console.log(menuId)
//   console.log(tab)
//   console.log(titleName)
//   console.log(infoText)
//   try {
//     let host = new URL(tab)
//     console.log(host)
//     // let notes = await chrome.storage.local.get(["notes"])
//     // alert(notes.notes)
//     let body : any = {
//       id : nanoid(8),
//       title : titleName,
//       content : infoText,
//       categoryId : menuId.split("-")[1] || "",
//       url : host.hostname
//     }
//     alert(JSON.stringify(body))
//     let cat = new Date()
//     alert("not pass")
//   // new LocalNoteService().getAllNotes().then(res=>{
//   //   alert(JSON.stringify(res))
//   // })
//   // alert("service pass")
//   // let items = await service.getAllNotes()
//   // alert("item pass")
//   // // let noteName = await prompt("Scrolling delay (seconds) ?", "");
//   // alert(JSON.stringify(items))
//   // // // let noteName = prompt("Please enter note name", "");

//   // let category = menuId.split("-")
//   // alert(category)
//   // alert(host)
//   } catch (error) {
//     console.log('errr')
//     console.log(error)
//   }

//   // let addItem = {
//   //   id: nanoid(8),
//   //   title: titleName?.toString() + host.hostname,
//   //   content: infoText,
//   //   categoryId : category[1] || ""
//   // }
//   // alert(JSON.stringify(addItem))
//   // service.newNote(items, addItem)
// }


let cat = new LocalCategoryService()
cat.getAllCategory().then(res => {
  let parent = chrome.contextMenus.create({ id: "parent-save", "title": "Save note as :", "contexts": ["selection"] });
  chrome.contextMenus.create({
    "title": "No category", "parentId": parent, "id": "savenote-0", "contexts": ["selection"]
  });

  for (let i = 0; i < res.length; i++) {
    let myWords = res[i];
    chrome.contextMenus.create({
      "title": myWords.title, "parentId": parent, "id": `savenote-${myWords.id}`, "contexts": ["selection"]
    });

  }
})


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action === "setbadge") {
      chrome.action.setBadgeText({ text: request.num })
      sendResponse("success");
    } else {
      sendResponse("fail");
    }


  }
);



chrome.contextMenus.create({ id: "higlight-here", "title": "Save higlight " , "contexts": ["selection"] });

chrome.contextMenus.create({ id: "save-note-here", "title": "Save note here " });

chrome.contextMenus.onClicked.addListener(onContext)