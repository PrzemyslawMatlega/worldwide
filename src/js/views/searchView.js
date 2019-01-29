import { elements } from './base';

const renderImg = (photos, i) => {
  const markup = `
                <div class="photos__item photos__item--${i} ">
                <img src="${photos}" alt="" class="photos__img" data-counter="${i}"></div>`;
  elements.photos.insertAdjacentHTML('beforeend', markup);
};

export const clean = () => {
  elements.photos.innerHTML = '';
  elements.cityInfo.innerHTML = '';
  elements.places.style.display='none';
};

const renderInfo = (wiki) => {
  const cityIndex = wiki.indexOf('(');
  const cityName = wiki.slice(0, cityIndex);
  const wikiText = wiki.replace(cityName, '');
  const markup = `
    <p class="cityInfo__name">${cityName}</p>
    <p class="cityInfo__text">${wikiText}</p>
    `;
  elements.cityInfo.insertAdjacentHTML('beforeend', markup);
};

export const renderPhoto = (photo) => {
  for (let i = 0; i < 9; i += 1) {
    renderImg(photo[i], i);
  }
};

export const renderWiki = (wiki) => {
  let lastDot = 0;
  for (let i = 0; i < 4; i += 1) {
    const dot = wiki.indexOf('. ', lastDot);
    lastDot = dot + 1;
  }
  renderInfo(wiki.slice(0, lastDot));
};

export const rmvStatus= () =>{
  let cards = document.querySelectorAll('.card__element');
  cards.forEach((el) =>{
     const rmvClass=  el.classList[2];
     el.classList.remove(`${rmvClass}`);

  } )

}

export const showSearch =() =>{
  elements.photos.style.display = 'grid';
  elements.info.style.display = 'grid';
  elements.types.style.display='block';
}