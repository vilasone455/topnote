

import React from 'react';
// import { createRoot } from 'react-dom/client';
import { render  } from 'react-dom';

import App from './TestCom'
import '../../assets/styles/tailwind.css';

const body = document.querySelector('body')
const app = document.createElement('div')

app.id = 'topnote-root'

if (body) {
  body.prepend(app)
}

const container = document.getElementById('topnote-root');

render(
  <App  />,
  container,
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  if(message.action === "newnote"){
    let event = new CustomEvent("topnote-create", { detail : {url : message.url} });
    document.dispatchEvent(event);
  }
  return true
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   window.postMessage({ type: "FROM_EXT", tabs: request.tabs });
//   console.log("post success")
// });
