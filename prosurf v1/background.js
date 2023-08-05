


chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
	if(request.msg == "CLOSE_TAB"){
		chrome.tabs.remove(sender.tab.id)
	}
})