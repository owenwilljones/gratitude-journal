export default (confContent, editingMessage, confList, confButton, confirmAddGratitude) => {
  confContent.classList.add('hidden');
  editingMessage.classList.add('hidden');
  confList.innerHTML = '';
  confButton.removeEventListener('click', confirmAddGratitude);
}