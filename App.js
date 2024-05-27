document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const word = document.getElementById('search-input').value.trim();
    if (word) {
        fetchDefinition(word);
    }
});

function fetchDefinition(word) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<p class="loading">Loading</p>';

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
            resultsContainer.innerHTML = '';
            if (data.title) {
                resultsContainer.innerHTML = `<p>${data.message}</p>`;
            } else {
                data[0].meanings.forEach(meaning => {
                    const definitionElement = document.createElement('div');
                    definitionElement.className = 'definition';
                    definitionElement.innerHTML = `
                        <h3>${meaning.partOfSpeech}</h3>
                        <p>${meaning.definitions[0].definition}</p>
                        ${meaning.definitions[0].example ? `<p class="example">Example: ${meaning.definitions[0].example}</p>` : ''}
                    `;
                    resultsContainer.appendChild(definitionElement);
                });
            }
        })
        .catch(error => {
            resultsContainer.innerHTML = '<p>Could not fetch the definition. Please try again later.</p>';
            console.error('Error fetching the definition:', error);
        });
}