chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSelectedText') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.scripting.executeScript(
                    {
                        target: { tabId: tabs[0].id },
                        func: () => window.getSelection().toString(),
                    },
                    (results) => {
                        if (results && results[0] && results[0].result) {
                            sendResponse({ selectedText: results[0].result });
                        } else {
                            sendResponse({ selectedText: '' });
                        }
                    }
                );
            } else {
                sendResponse({ selectedText: '' });
            }
        });
        return true; // Indicates that we will respond asynchronously
    }
});
