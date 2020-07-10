const jsDisabled = document.getElementById('js-disabled');
const journalList = document.getElementById('gratitudes-list');
const gratTextarea = document.getElementById('gratitudes-textarea');
const confContent = document.getElementById('confirmation-content');
const confList = document.getElementById('confirmation-list');
const confButton = document.getElementById('confirm-gratitude');
const subComplete = document.getElementById('submission-complete');

const init = () => {
  hideNoJs();
  renderInitialJournalList();
  submitGratitude();
};

const hideNoJs = () => {
  jsDisabled.classList.add('hidden');
};

const renderInitialJournalList = () => {
  journalList.innerHTML = '';

  const gratitudeData = getGratitudeCookie();

  console.log(gratitudeData);

  if (gratitudeData.length > 0) {
    for (let i = 0; i < gratitudeData.length; i += 1) {
      renderJournalComponent(gratitudeData[i]);
    }
  } else {
    journalList.innerHTML = '<p>You have no previously entered gratitudes. Use the above text box to start entering gratitudes!</p>'
  }

  journalList.setAttribute('aria-live', 'polite');
};

const renderJournalComponent = (data) => {
  const parent = document.createElement('div');

  parent.innerHTML = `
    <h3>Recorded on ${data.timestamp}</h3>
    <ul>
      ${renderList(data.gratitudes)}
    </ul>
  `;

  if (journalList. firstChild && journalList.firstChild.nodeName === 'p') {
    journalList.innerHTML = '';
  }

  journalList.insertBefore(parent, journalList.firstChild);
};

const renderList = (data) => {
  console.log(`${data.map(datum => `<li>${datum}</li>`)}`);
  return data.map(datum => `<li>${datum}</li>`).join('');
};

const submitGratitude = () => {
  document.getElementById('submit-gratitude').addEventListener('click', () => {
    subComplete.classList.add('hidden');

    if (gratTextarea.value === '') {
      setErrorMessage('Please enter content into the textbox below');
      return;
    } else {
      setErrorMessage(false);
    }

    const gratitudes = gratTextarea.value.split(/\r?\n/);
    
    confContent.classList.remove('hidden');
    confList.innerHTML = renderList(gratitudes);

    confButton.addEventListener('click', confirmAddGratitude);
  });
};

const confirmAddGratitude = (event) => {
  const latest = setCookie(gratTextarea.value.split(/\r?\n/));
  renderJournalComponent(latest);

  confContent.classList.add('hidden');
  confList.innerHTML = '';
  gratTextarea.value = '';
  subComplete.classList.remove('hidden');

  confButton.removeEventListener(event.type, confirmAddGratitude)
};

const setCookie = (gratitudes) => {
  const expiration = new Date();
  const newGratitude = {
    timestamp: getTimestamp(),
    gratitudes
  };

  expiration.setDate(expiration.getDate() + 7);
  document.cookie = `gratitude ${newGratitude.timestamp}=${JSON.stringify(newGratitude)}; expires=${expiration}`;

  return newGratitude;
};

const getGratitudeCookie = () => {
  const cookies =  document.cookie.split('; ').filter(cookie => cookie.indexOf('gratitude') !== -1);
  return cookies.map(cookie => JSON.parse(cookie.split('=')[1]));
};

const setErrorMessage = (message) => {
  const errorMessage = document.getElementById('error-message');

  if (message !== false) {
    errorMessage.classList.remove('hidden');
    errorMessage.innerText = message;
  } else {
    errorMessage.classList.add('hidden');
    errorMessage.innerText = '';
  }
};

const getTimestamp = () => {
  const now = new Date();
  return `${now.getDate()}/${timeFormatting(now.getMonth() + 1)}/${now.getFullYear()}, ${now.getHours()}:${timeFormatting(now.getMinutes())}`;
};

const timeFormatting = (num) => {
  return num > 10 ? num.toString() : `0${num.toString()}`;
};

window.onload = () => {
  init();
};