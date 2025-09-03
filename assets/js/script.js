const API_KEY = "9xvNz9tHGBfG-GnaZqgGqvlOQQ0";
const API_URL = "https://ci-jshint.herokuapp.com/api";
// create a Bootstrap Modal object linked to the HTML modal.
// This lets you open/close the modal dynamically with JavaScript 
// (perfect for showing API results).
// https://getbootstrap.com/docs/5.0/components/modal/#via-javascript
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

// Event listeners
// status button
document.getElementById("status").addEventListener("click", e => getStatus(e));

// submit button
document.getElementById("submit").addEventListener("click", e => postForm(e));

// ---- GET (status button) ----
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
        // console.log(data);
        displayStatus(data);
    } else {
        // JS error handler
        throw new Error(data.error);
    }
}

// displayStatus()
// set the heading text to API key status
// set the body  text to, "your key is valid until" and the date
// show the modal
function displayStatus(data){
    // Set content to header and body of the modal
    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    
    // Show the Modal
    resultsModal.show();

}

// ---- POST (submit button) ----
// postForm()
// Get form data
// post form data to API
async function postForm(e){
    // capture all of the fields of the HTML form and return it as an object
    // then give this object to "fetch" without needing to do further processing
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const form = new FormData(document.getElementById("checksform"));

    // Check if form entries are setup correctly
    // for (let entry of form.entries()){
    //     console.log(entry);
    // }

    // Fetch response object
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
        "Authorization": API_KEY,
        },
        body: form 
    })

    // Parse response as JSON object
    const data = await response.json();

    // Display data or return error
    if(response.ok){
        // console.log(data);
        displayErrors(data);
    } else {
        // JS error handler
        throw new Error(data.error);
    }
}

function displayErrors(data){
    let heading = `JSHint results for ${data.file}`;

    // set classes in case we want to style the results later
    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
        // Loop through full error list
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}:</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }

    // Set content to modal elements
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    
    // Show the Modal
    resultsModal.show();
}