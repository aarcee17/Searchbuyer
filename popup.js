document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchTerm').value.trim();
    if (searchTerm) {
        const urls = [
            `https://www.amazon.in/s?k=${encodeURIComponent(searchTerm)}`,
            `https://www.flipkart.com/search?q=${encodeURIComponent(searchTerm)}`
        ];

        urls.forEach(url => {
            chrome.tabs.create({ url });
        });
    } else {
        alert('Please enter a search term');
    }
});

// Request the selected text from the active tab
chrome.runtime.sendMessage({ action: 'getSelectedText' }, (response) => {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
    } else {
        if (response && response.selectedText) {
            document.getElementById('searchTerm').value = response.selectedText;
        }
    }
});
