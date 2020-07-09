const submitGratitude = () => {
  document.getElementById('submit-gratitude').addEventListener('click', (e) => {
    const confContent = document.getElementById('confirmation-content');
    const gratTextarea = document.getElementById('gratitudes-textarea');
    const gratitudes = gratTextarea.value.split(/\r?\n/);
    const confList = document.getElementById('confirmation-list');
    const confButton = document.getElementById('confirm-gratitude');
    
    confContent.classList.remove('hidden');

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

window.onload = () => {
  submitGratitude();
}