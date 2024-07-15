chrome.webNavigation.onBeforeNavigate.addListener(
  function(details) {
    const url = new URL(details.url);

    if (url.hostname === 'x.com' || url.hostname === 'www.x.com') {
      url.hostname = 'twitter.com';
      url.searchParams.set('mx', '1');

      if (url.pathname === '/') {
        url.pathname = '';
      }

      chrome.tabs.update(details.tabId, {url: url.toString()});
    } else if (url.hostname === 'twitter.com' && !url.searchParams.has('mx')) {
      url.searchParams.set('mx', '1');
      chrome.tabs.update(details.tabId, {url: url.toString()});
    }
  },
  {
    url: [
      {hostSuffix: 'x.com'},
      {hostSuffix: 'twitter.com'}
    ]
  }
);

console.log('Background script is running');

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  console.log('Navigating to:', details.url);
});
