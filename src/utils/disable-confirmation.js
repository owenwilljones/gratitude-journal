export default (confContent, editingMessage, confList, confButton) => {
  confContent.classList.add('hidden');
  editingMessage.classList.add('hidden');
  confList.innerHTML = '';
  confButton.removeEventListener('click', confirmAddGratitude);
}