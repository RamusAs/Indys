const button_summarize = document.querySelector('#button-summarize');
const button_reformulate = document.querySelector('#button-reformulate');
const text_area = document.querySelector('.text_selected');
const loader_summarize = document.getElementById('loader-summarize');
const buttons_length = document.querySelectorAll('.content_summarize-options ul li a');

button_summarize.addEventListener('click', event => {
    event.preventDefault()
    loader_summarize.style.display = 'none';
    text_area.textContent = '';
    getSelectedText()
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'getSelectedText') {
        var selectedText = '';
        if (window.getSelection) {
            selectedText = window.getSelection().toString();
        } else if (document.getSelection) {
            selectedText = document.getSelection().toString();
        } else if (document.selection) {
            selectedText = document.selection.createRange().text;
        }
        sendResponse({ selectedText: selectedText });
    }
});
function getSelectedText() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelectedText' }, function (response) {
            if (response && response.selectedText) {
                loader_summarize.style.display = 'block';
                if (response.selectedText.length <= 100000) {
                    summarize(response.selectedText)
                } else {
                    text_area.textContent = 'Selected text too long';
                }
            } else {
                text_area.textContent = 'Please select some text';
            }
        });
    });
}
function summarize(text) {

    const options = {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'authorization': 'Bearer 3xD2wbyAVLNHBxfwK4Co9SZzuDZztmVBErNJ50Y8'
        },
        body: JSON.stringify({
          'length': 'medium',
          'format': 'bullets',
          'model': 'summarize-xlarge',
          'temperature': 0.3,
          'text':  `${text}`,
          'additional_command': 'write it in french'
        })
      };
    fetch('https://api.cohere.ai/v1/summarize', options)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error : ' + response.status);
            }
        })
        .then(function(data) {
            console.log(data);
            loader_summarize.style.display = 'none';
            text_area.textContent = data.summary;
            // text_area.textContent = data.summary.replace('- ', '\n');
        })
        .catch(function(error) {
            loader_summarize.style.display = 'none';
            text_area.textContent = 'Error while summarizing';
            console.error(error);
        });
}


buttons_length.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      buttons_length.forEach(btn => {
        btn.classList.remove("js-active");
      });
      button.classList.add("js-active");
    });
  });