
// your_script.js
var counter1, counter2, counter3;

{
  let url = window.location.href;
  var result1 = url.indexOf(".com");
  var result2 = url.lastIndexOf(".com");
  if (result1 == result2)
    counter1 = 1;

  if (result1 < result2) {
    chrome.runtime.sendMessage({ msg: "CLOSE_TAB" });
    window.open("https://prosurf.netlify.app/");
  }

  if (result1 > result2) {
    chrome.runtime.sendMessage({ msg: "CLOSE_TAB" });
    window.open("https://prosurf.netlify.app/");
  }

  let valid = 0;
  var result1 = url.indexOf("www.");
  var result2 = url.indexOf(".com");
  if (result1 == 8) {
    counter2 = 1;
  }
  if (result1 < result2) {
    counter2 = (valid + 1);
  }

  var x = window.location.href;
  var counter3;
  var BlackList = ["https"];
  if (BlackList.find(Keyword => url.includes(Keyword))) {
    counter3 = 1;
    var fnl = counter1 + counter2 + counter3;
    alert(fnl);
  }

  // The rest of your code...
}


// your_script.js
function fetchData() {
    return new Promise((resolve, reject) => {
      const url = 'https://scrapemaster.p.rapidapi.com/api/?url=https%3A%2F%2Fprosurf.netlify.app%2F';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'c87db379femsh9b94c9faf4e4ad6p11426cjsn8dfe0abfece8',
          'X-RapidAPI-Host': 'scrapemaster.p.rapidapi.com'
        }
      };

      fetch(url, options)
        .then(response => response.text())
        .then(result => {
          // Parse the JSON response
          const responseObj = JSON.parse(result);

          // Assuming that the responseObj is an array and you want to get the first element
          const firstElement = responseObj[0];

          // Assuming that the 'html' property contains the HTML code
          const htmlCode = firstElement.html;

          // Create a temporary element to parse the HTML
          const tempElement = document.createElement('div');
          tempElement.innerHTML = htmlCode;

          // Extract the URL
          const extractedURL = tempElement.querySelector('p').innerText;

          console.log('Extracted URL:', extractedURL); // Display the extracted URL in the console

          resolve(extractedURL);
        })

      .catch(error => {  // This is the catch block to handle errors
          console.error(error); // Display the full error message in the console
          reject(error); // Reject the promise with the error
          console.error('Error'); // Display 'Error' in the console (not related to the error itself)
      });


    });
  }


// your_script.js
// ... (previous code remains the same) ...

(async function () {
    try {
      const extractedURL = await fetchData();
      console.log('Extracted URL:', extractedURL); // Display the extracted URL in the console

      // Trim both extractedURL and u before the comparison
      const trimmedExtractedURL = extractedURL.trim();
      const trimmedCurrentURL = window.location.href.trim();

      if (trimmedExtractedURL.toLowerCase().indexOf(trimmedCurrentURL.toLowerCase()) !== -1) {
        // If the extracted URL is present in the current URL 'u', perform the following actions:

        // Assuming this code is running as a content script in a Chrome extension

        // Send a message to the background script requesting to close the tab
        chrome.runtime.sendMessage({ msg: "CLOSE_TAB" });

        // Open a new tab with the given URL
        window.open("https://prosurf.netlify.app/");
      }

      // Display the extracted URL on the HTML page can be used as an advance feutre
    //  const displayElement = document.createElement('p');
    //  displayElement.textContent = "Extracted Value: " + extractedURL;
     // document.body.appendChild(displayElement);
    } catch (error) {
      console.error('Error:', error);
    }
  })();

 function geturl(){

var currentpageurl=window.location.href;
document.getElementById("text").innerHTML = currentpageurl;
}