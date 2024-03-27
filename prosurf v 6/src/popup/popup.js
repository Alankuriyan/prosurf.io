

// popup.js

function checkIsValidURL(url) {
  // Regular expression for a valid URL with protocol (http or https)
  const urlRegex = /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+([^\s]*)$/;

  // Check if the provided URL matches the regular expression
  return urlRegex.test(url);
}

function isObjectEmpty(myEmptyObj) {
  return Object.keys(myEmptyObj).length === 0 && myEmptyObj.constructor === Object
}




let i = 0;
let txt = '';
let speed = 20;

let isStartTypeWriterAlereadyRan = false


document.addEventListener('DOMContentLoaded', function () {


  const tagLine = document.getElementById("tagLine")

  function typeWriter() {
    if (i < txt.length) {
      tagLine.innerHTML += txt.charAt(i);
      i++;
      tagLineTimeout = setTimeout(typeWriter, speed);
    }
    else {

        clearTagLine()


    }

  }






  //PopUpMain

  const blockUrlInput = document.getElementById('blockUrlInput');
  const addUrlToBlockListButton = document.getElementById('addUrlToBlockList');

  const goToDashboardButton = document.getElementById('goToDashboard');
















  addUrlToBlockListButton.addEventListener('click', function () {
    const blockUrl = blockUrlInput.value.trim();

    if (!checkIsValidURL(blockUrl)) {

      // alert("Enter Valid URl !")

      const element = document.getElementById('urlHintBlock');
      element.classList.replace('urlHintColorWhite', 'urlHintColorRed')
      element.classList.add('urlHintShake');

      // Remove the 'shake' class after the animation is complete
      setTimeout(function () {
        element.classList.replace('urlHintColorRed', 'urlHintColorWhite')
        element.classList.remove('urlHintShake');
      }, 500);

      return

    }

    if (blockUrl) {
      // Save the exception URL to local storage
      chrome.storage.local.get({ blockUrlList: [] }, function (data) {
        const blockUrlList = data.blockUrlList;
        blockUrlList.push(blockUrl);

        /*Save updated exceptions to local storage*/
        chrome.storage.local.set({ blockUrlList }, function () {
          console.log('blockUrl added:', blockUrl);
          // alert('blockUrl added: ' + blockUrl);
          chrome.runtime.sendMessage({ type: 'blockUrlAdded', url: blockUrl });

        });

      });

      // Clear the input field
      blockUrlInput.value = '';
    } else {
      // alert('Please enter a valid website URL.');
    }
  });



  goToDashboardButton.addEventListener('click', function () {
    // Open a new tab with the dashboard.html page
    chrome.tabs.create({ url: 'src/dashboard/dashboard.html' });
  });







});