export default (confContent, editingMessage, confList, confTimestamps, confButton, confirmAddGratitude) => {
  confContent.classList.add('hidden');
  editingMessage.classList.add('hidden');
  confList.innerHTML = '';
  confTimestamps.innerHTML = '';
  confButton.removeEventListener('click', confirmAddGratitude);
}