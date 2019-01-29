export const elements = {
    targetInput: document.querySelector('#address'),
    results: document.querySelector('.search-results'),
    searchForm: document.querySelector('.search-form'),
    
    tours: document.querySelector('.tours'),
    photos: document.querySelector('.photos'),
    sliderPopup: document.querySelector('.popup'),
    slider: document.querySelector('.slider'),
    sliderPhotos: document.querySelector('.slider__photos'),
    info: document.querySelector('.info'),
    cityInfo: document.querySelector('.cityInfo'),

    types: document.querySelector('.types'),
    card:document.querySelector('.card'),
    places:document.querySelector('.places'),
    placesList:document.querySelector('.mapInfo__places'),
    events:document.querySelector('.events'),
    eventsMain:document.querySelector('.events__main'),
}


export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use xlink:href="img/sprite2.svg#loading"></use>
            </svg>
        </div>
    `;
    window.scrollBy(0,500);
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};
