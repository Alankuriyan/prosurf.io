let blockUrlList = [];
    let lastUpdatedUrl = ''; // Variable to store the last updated URL

    function updateDashboard() {
        console.log("Updating Dashboard...");
        // Retrieve blockUrlList
        chrome.storage.local.get({ blockUrlList: [] }, function (data) {
            blockUrlList = data.blockUrlList;
            // Set the last updated URL
            if (blockUrlList.length > 0) {
                lastUpdatedUrl = blockUrlList[blockUrlList.length - 1];
            } else {
                lastUpdatedUrl = '';
            }
            // Now update list to dashboard.html
            updateElementsToDOM();
            console.log("blockUrlList", blockUrlList);
            console.log("Last Updated URL", lastUpdatedUrl);
            alert(lastUpdatedUrl); // Alert the last updated URL
        });
    }

    function updateElementsToDOM() {
        const blockUrlListArea = document.getElementById("blockUrlListArea");
        blockUrlListArea.innerHTML = blockUrlList.join("<br>");
    }

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.type === 'addException' || message.type === 'blockUrlAdded') {
            console.log("Update triggered by message type: " + message.type);
            updateDashboard();
        }
    });

    updateDashboard();

    const blockUrlInput = document.getElementById('blockUrlInput');
    const addUrlToBlockListButton = document.getElementById('addUrlToBlockList');
    addUrlToBlockListButton.addEventListener('click', function () {
        const blockUrl = blockUrlInput.value.trim();
        if (blockUrl) {
            // Clear existing blockUrlList before adding new URL
            blockUrlList = [];
            blockUrlList.push(blockUrl);
            chrome.storage.local.set({ blockUrlList: blockUrlList }, function () {
                chrome.runtime.sendMessage({ type: 'blockUrlAdded', url: blockUrl });
            });
            updateDashboard(); // Update the dashboard after adding the new URL
            blockUrlInput.value = ''; // Clear input after adding
        } else {
            console.log("Empty URL detected.");
        }
    });
