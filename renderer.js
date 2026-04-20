(async () => {
  const version = await window.electronAPI.getVersion();
  document.getElementById('version').textContent = version;
  document.getElementById('platform').textContent = navigator.platform;
})();

document.getElementById('greet-btn').addEventListener('click', () => {
  window.electronAPI.showMessage('Hello from the main process!');
});
