import renderList from './list';
import {clear as clearNoLogMessage} from './no-log-message';

export default (data, gratTextarea, journalList, editEntry, deleteEntry) => {
  const parent = gratTextarea.dataset.editing !== "0" ? document.querySelector(`[data-id="${gratTextarea.dataset.editing}"]`) : document.createElement('div');

  parent.classList.add('journal-entry');
  parent.dataset.id = data.id;

  if (gratTextarea.dataset.editing === "0") {
    parent.innerHTML = `
      <h3>Last recorded on ${data.timestamp}</h3>
      <ul>
        ${renderList(data.gratitudes)}
      </ul>
      <button class="journal-entry__button">Edit entry</botton>
      <button class="journal-entry__button">Delete entry</botton>
    `;

    clearNoLogMessage(journalList);
    journalList.insertBefore(parent, journalList.firstChild);
    parent.getElementsByTagName('button')[0].addEventListener('click', editEntry);
    parent.getElementsByTagName('button')[1].addEventListener('click', deleteEntry); 
  } else {
    parent.getElementsByTagName('ul')[0].innerHTML = renderList(data.gratitudes);

    const editButton = parent.getElementsByTagName('button')[0];
    editButton.dataset.editing = 'false';
    editButton.innerText = 'Edit entry';
  }
}