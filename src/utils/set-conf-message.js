export default message => {
  const confMessage = document.getElementById('conf-message');
  
  if (message === false) {
    confMessage.classList.add('hidden');
    confMessage.innerText = '';
  } else {
    confMessage.classList.remove('hidden');
    confMessage.innerText = message;

    setTimeout(() => {
      confMessage.classList.add('hidden');
      confMessage.innerText = '';
    }, 3000);
  }
}