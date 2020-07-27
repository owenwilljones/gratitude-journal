export default (confContent, editingMessage, confList, confButton, dateField, timeField, confirmAddGratitude) => {
  confContent.classList.add('hidden');
  editingMessage.classList.add('hidden');
  confList.innerHTML = '';
  dateField.value = '';
  timeField.value = '';
  confButton.removeEventListener('click', confirmAddGratitude);
}