

import React from 'react';
// import { createRoot } from 'react-dom/client';
import { render } from 'react-dom';
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
  <App />,
  container,
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  if (message.action === "newnote") {
    let event = new CustomEvent("topnote-create", { detail: { url: message.url } });
    document.dispatchEvent(event);
  } else if (message.action === "highlight") {
    console.log("on high")
    onCreateHighlight()
  }
  return true
});

const onCreateHighlight = () => {
  let selection = window.getSelection()
  console.log(selection)
  let body = {
    string: selection.toString(),
    container: getQuery(container),
    anchorNode: getQuery(selection.anchorNode),
    anchorOffset: selection.anchorOffset,
    focusNode: getQuery(selection.focusNode),
    focusOffset: selection.focusOffset,
   
  }

  console.log("body")
  console.log(body)

  let con = elementFromQuery(body.container)
  console.log("container after query")
  console.log(con)
  console.log("anchor")
  console.log(elementFromQuery(body.anchorNode))
}

function escapeCSSString(cssString) {
  return cssString.replace(/(:)/ug, "\\$1");
}

function getQuery(element) {
  if (element.id) return `#${escapeCSSString(element.id)}`;
  if (element.localName === 'html') return 'html';

  const parent = element.parentNode;

  const parentSelector = getQuery(parent);
  // The element is a text node
  if (!element.localName) {
    // Find the index of the text node:
    const index = Array.prototype.indexOf.call(parent.childNodes, element);
    return `${parentSelector}>textNode:nth-of-type(${index})`;
  } else {
    const index = Array.from(parent.childNodes).filter((child) => child.localName === element.localName).indexOf(element) + 1;
    return `${parentSelector}>${element.localName}:nth-of-type(${index})`;
  }
}

function robustQuerySelector(query) {
  try {
      return document.querySelector(query);
  } catch (error) {
      // It is possible that this query fails because of an invalid CSS selector that actually exists in the DOM.
      // This was happening for example here: https://lawphil.net/judjuris/juri2013/sep2013/gr_179987_2013.html
      // where there is a tag <p"> that is invalid in HTML5 but was still rendered by the browser
      // In this case, manually find the element:
      let element = document;
      for (const queryPart of query.split(">")) {
          if (!element) return null;

          const re = /^(.*):nth-of-type\(([0-9]+)\)$/ui;
          const result = re.exec(queryPart);
          const [, tagName, index] = result || [undefined, queryPart, 1];
          element = Array.from(element.childNodes).filter((child) => child.localName === tagName)[index - 1];
      }
      return element;
  }
}


function elementFromQuery(storedQuery) {
  const re = />textNode:nth-of-type\(([0-9]+)\)$/ui;
  const result = re.exec(storedQuery);

  if (result) { // For text nodes, nth-of-type needs to be handled differently (not a valid CSS selector)
      const textNodeIndex = parseInt(result[1], 10);
      storedQuery = storedQuery.replace(re, "");
      const parent = robustQuerySelector(storedQuery);

      if (!parent) return undefined;

      return parent.childNodes[textNodeIndex];
  }

  return robustQuerySelector(storedQuery);
}


// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   window.postMessage({ type: "FROM_EXT", tabs: request.tabs });
//   console.log("post success")
// });
