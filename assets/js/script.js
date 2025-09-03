const API_KEY = "9xvNz9tHGBfG-GnaZqgGqvlOQQ0";
const API_URL = "https://ci-jshint.herokuapp.com/api";
// create a Bootstrap Modal object linked to the HTML modal.
// This lets you open/close the modal dynamically with JavaScript 
// (perfect for showing API results).
// https://getbootstrap.com/docs/5.0/components/modal/#via-javascript
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));

// getStatus()
// Make GET request to the API URL with the API key
// Pass the returned data to a display function

// Use async in order to be able to use the await status instead of chaining "then"
async function getStatus(e){
    // Set up GET parameter
    // https://ci-jshint.herokuapp.com/api?api_key=thisismykey
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    // fetch and json both return promises, therefore use await, to avoid using
    // "then" chains and get real values instead of promises as a result
    
    // Get Response object with info like status, headers, body stream
    const response = await fetch(queryString);
    //console.log(response);
    // Read the body of the response stream and parse it as JSON text.
    const data = await response.json();

    // If the request has gone well, the "ok" property of the response object
    // is set to "true", otherwise "false"
    if(response.ok){
        console.log(data.expiry);
    } else {
        // JS error handler
        throw new Error(data.error);
    }
}