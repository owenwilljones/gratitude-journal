const submitGratitude = () => {
  document.getElementById('submit-gratitude').addEventListener('click', (e) => {
    const confContent = document.getElementById('confirmation-content');
    const gratTextarea = document.getElementById('gratitudes-textarea');
    const confList = document.getElementById('confirmation-list');
    const confButton = document.getElementById('confirm-gratitude');

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
  console.log('YEEEEEEEEAH');
  document.getElementById('confirmation-content').classList.add('hidden');
  document.getElementById('confirmation-list').textContent = '';

  event.target.removeEventListener(event.type, confirmAddGratitude)
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
}

window.onload = () => {
  submitGratitude();
}