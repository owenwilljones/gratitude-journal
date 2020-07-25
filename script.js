import renderInitialJournalList from './src/rendering/initial-journal-list';
import submitGratitude from './src/form/submit-gratitude';
import editEntry from './src/entries/edit-entry';
import deleteCookie from './src/cookies/delete-cookie';
import confirmAddGratitude from './src/form/confirm-add-gratitude';

const journalList = document.getElementById('journal-list');
const gratitudesField = document.getElementById('field-gratitudes');
const confContent = document.getElementById('confirmation-content');
const editingMessage = document.getElementById('editing-message');
const confList = document.getElementById('confirmation-list');
const confButton = document.getElementById('confirm-gratitude');

//Alias events for event listeners
const editEntryAlias = event => {
  editEntry(event.target, gratitudesField, confContent, editingMessage, confList, confButton, confirmAddGratitudeAlias);
};

const deleteEntryAlias = event => {
  deleteCookie(event.target, editEntryAlias, deleteEntryAlias, journalList);
};

const confirmAddGratitudeAlias = event => {
  confirmAddGratitude(gratitudesField, journalList, editEntryAlias, deleteEntryAlias, confContent, editingMessage, confList, confButton, confirmAddGratitudeAlias);
};

window.onload = () => {
  // Hide no JS message
  document.getElementById('js-disabled').innerHTML = '';
  
  renderInitialJournalList(journalList, gratitudesField, editEntryAlias, deleteEntryAlias);
  submitGratitude(gratitudesField, confContent, editingMessage, confList, confButton, confirmAddGratitudeAlias);
};;