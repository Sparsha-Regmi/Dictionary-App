document.getElementById('searchBtn').addEventListener('click', function () {
    var word = document.getElementById('wordInput').value;
    var apiKey = 'b4538785-72e7-47e2-b0e5-d6775afd0af2';
    var url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;

    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            var resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '';  // Clear previous results

            if (data.length === 0) {
                resultDiv.innerHTML = 'No results found.';
                return; 
            }

            if (typeof data[0] === 'string') {
                resultDiv.innerHTML = 'Did you mean: ' + data.join(', ') + '?';
            } else {
                var definition = data[0].shortdef[0];
                resultDiv.innerHTML = `<strong>${word}</strong>: ${definition}`;
                // console.log(data[0])
            }
        })
        .catch(function(error) {
            document.getElementById('result').innerHTML = 'Error: ' + error.message;
        });
});
