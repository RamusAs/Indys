
window.onload = () => { 
  const body = document.getElementsByTagName("BODY")[0];
  console.log(body);
  const toReadMode = async () => {
    document.querySelector('body').classList.add('read')
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    console.log('here');
    await chrome.scripting.removeCSS({
      files: ["css/focus-mode.css"],
      target: { tabId: tab.id },
    });
  }
  document.getElementById('reading').onclick = toReadMode;
  
};