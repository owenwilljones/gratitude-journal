const confContent = document.getElementById('confirmation-content');
const gratTextarea = document.getElementById('gratitudes-textarea');
const confList = document.getElementById('confirmation-list');
const confButton = document.getElementById('confirm-gratitude');
const subComplete = document.getElementById('submission-complete');

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
    confList.innerText = '';

    for (let i = 0; i < gratitudes.length; i += 1) {
      const li = document.createElement('li');
      li.innerText = gratitudes[i]
      confList.appendChild(li);
    }

    confButton.addEventListener('click', confirmAddGratitude);
  });
};

const confirmAddGratitude = (event) => {
  setCookie(gratTextarea.value.split(/\r?\n/));

  confContent.classList.add('hidden');
  confList.textContent = '';
  gratTextarea.value = '';
  subComplete.classList.remove('hidden');

  confButton.removeEventListener(event.type, confirmAddGratitude)
};

const setCookie = (gratitudes) => {
  const expiration = new Date();
  const existingData = getGratitudeCookie();
  const gratitudeData = existingData === undefined ? [] : JSON.parse(existingData);

  gratitudeData.push({
    timestamp: getTimestamp(),
    gratitudes
  });

  expiration.setDate(expiration.getDate() + 7);
  document.cookie = `gratitudes=${JSON.stringify(gratitudeData)}; expires=${expiration}`;
};

const getGratitudeCookie = () => {
  const cookie = document.cookie.split('; ').find(cookie => cookie.indexOf('gratitudes') !== -1);
  return cookie !== undefined ? cookie.split('=')[1] : cookie;
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
  submitGratitude();
};