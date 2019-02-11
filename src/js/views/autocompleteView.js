import { elements } from './base';

export const moveCursor = (pos) => {
  
  for (const el of elements.results.children) {
    el.classList.remove('highlighted');
  }
  elements.results.children[pos].classList.add('highlighted');
};

export const toggleResults = (action) => {
  if (action === 'show') {
    elements.results.classList.add('visible');
  } else if (action === 'hide') {
    elements.results.classList.remove('visible');
  }
};

export const displayMatches = (matches, resultCursor) => {
  matches.forEach((el) => {
    elements.results.innerHTML += `<li class ='search-results__element'>${el}</li>`;
  });

  moveCursor(resultCursor);
  toggleResults('show');
};
