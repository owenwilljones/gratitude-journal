export const render = journalList => journalList.innerHTML = '<p>You have no previously entered gratitudes. Use the above text box to start entering gratitudes!</p>';

export const clear = journalList => {
  if (journalList.firstChild && journalList.firstChild.nodeName.toLowerCase() === 'p') {
    journalList.innerHTML = '';
  }
};