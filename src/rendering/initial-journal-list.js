import getCookies from '../cookies/get-cookies';
import renderJournalComponent from './journal-component';
import {render as renderNoLogMessage} from './no-log-message';

export default (journalList, gratitudesField, editEntry, deleteEntry) => {
  const gratitudeData = getCookies();

  journalList.innerHTML = '';

  if (gratitudeData.length > 0) {
    for (let i = 0; i < gratitudeData.length; i += 1) {
      renderJournalComponent(gratitudeData[i], gratitudesField, journalList, editEntry, deleteEntry);
    }
  } else {
    renderNoLogMessage(journalList);
  }

  journalList.setAttribute('aria-live', 'polite');
}