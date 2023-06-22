const button_suggest = document.querySelector('#button-suggest');
const input_suggest = document.querySelector('#suggest-textarea');
const text_area_suggest = document.querySelector('.text_area_suggest');
const loader_suggest = document.getElementById('loader-suggest');

button_suggest.addEventListener('click', event => {
    event.preventDefault()
    loader_suggest.style.display = 'none';
    text_area_suggest.textContent = '';
    const text = input_suggest.value
    suggest(text)
    // console.log(`donne moi une possible suite de la phrase suivante en francais : ${text}`)
});


function suggest(text) {

    const options = {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'authorization': 'Bearer 3xD2wbyAVLNHBxfwK4Co9SZzuDZztmVBErNJ50Y8'
        },
        body: JSON.stringify({
            'max_tokens': 100,
            'return_likelihoods': 'NONE',
            'truncate': 'END',
            'prompt': `donne moi une possible suite de la phrase suivante en francais : ${text}`
        })
      };
    fetch('https://api.cohere.ai/v1/generate', options)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error : ' + response.status);
            }
        })
        .then(function(data) {
            console.log(data);
            loader_suggest.style.display = 'none';
            text_area_suggest.textContent = data.generations[0]['text'].replace(text, '...');
            console.log(data.generations[0]['text'])
        })
        .catch(function(error) {
            loader_suggest.style.display = 'none';
            text_area_suggest.textContent = 'Error while suggesting';
            console.error(error);
        });
}