chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'getSelectedText') {
      var selectedText = '';
      // window.getSelection
      if (window.getSelection) {
        selectedText = window.getSelection().toString();
      }
      // document.getSelection
      else if (document.getSelection) {
        selectedText = document.getSelection().toString();
      }
      // document.selection
      else if (document.selection) {
        selectedText = document.selection.createRange().text;
      }
  
      sendResponse({ selectedText: selectedText });
    }
  });