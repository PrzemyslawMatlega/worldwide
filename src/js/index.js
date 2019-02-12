import { initMap } from './views/googleMaps';
import {initPlaces} from'./views/googlePlaces';
import {elements,renderLoader,clearLoader} from './views/base';
import Search from './models/Search';
import Slider from './models/Slider';
import Autocomplete from './models/Autocomplete';
import * as searchView from './views/searchView';
import * as autocompleteView from './views/autocompleteView';
import * as sliderView from './views/sliderView';
import * as eventsView from './views/eventsView';
import Events from './models/Events';



export const state = {};

// ------------------ Slider/Api/Gallery ctrl ------------ 

const ctrlSearch = async (city) => {
  searchView.clean();
  sliderView.clean();
  searchView.rmvStatus();

  if(!state.autoC)state.autoC = new Autocomplete();
  state.search = new Search(city);
  state.slider = new Slider();

  try {
    searchView.showSearch();
    eventsView.eventsCleanSearch(); 
    renderLoader(elements.info);
    await state.search.searchImgCity();
    await state.search.searchWiki();
    searchView.renderPhoto(state.search.photos);
    searchView.renderWiki(state.search.wiki);
    clearLoader();

    sliderView.renderSlider();
    initMap(city);

    
  } catch (err) { 
    console.log(err);
  }
  
  
};

/*  
      Top picked 
*/ 

elements.tours.addEventListener('click', (e) => {
  if (e.target.matches('.tours__box-picked--1')) {
    ctrlSearch('Paris');
  }
  if (e.target.matches('.tours__box-picked--2')) {
    ctrlSearch('Dubai');
  }
  if (e.target.matches('.tours__box-picked--3')) {
    ctrlSearch('Tokyo');
  }
  if (e.target.matches('.tours__box-picked--4')) {
    ctrlSearch('Barcelona');
}
});

// ------------ Autocomplete and search ctrl --------

elements.targetInput.addEventListener('keyup', function (e) {
  if(!state.autoC)state.autoC = new Autocomplete();
  elements.results.innerHTML = '';
  autocompleteView.toggleResults('hide');
  
  if (this.value.length > 0) {
    state.autoC.getMatches(this.value);

    if (state.autoC.matches.length > 0) {
      autocompleteView.displayMatches(state.autoC.matches, state.autoC.resultCursor);
    }
  }

  if (elements.results.classList.contains('visible')) {
    switch (e.keyCode) {
      case 13:
      e.preventDefault();
        elements.targetInput.value = elements.results.children[state.autoC.resultCursor].innerHTML;
        autocompleteView.toggleResults('hide');
        state.autoC.resultCursor = 0;
        break;

      case 38:
       
        if (state.autoC.resultCursor > 0) {
          state.autoC.resultCursor--;
          moveCursor(state.autoC.resultCursor);
        }
        break;

      case 40:
     
        if (state.autoC.resultCursor < (state.autoC.matches.length - 1)) { 
          state.autoC.resultCursor++;
          autocompleteView.moveCursor(state.autoC.resultCursor);
        }
        break;

    }

  }
});

//--------------------------- 


elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = state.autoC.matches.find(el => el == elements.targetInput.value);
  if (state.autoC.cityList.has(city)) {
    autocompleteView.toggleResults('hide');
    ctrlSearch(city);
    elements.targetInput.value = '';
  }


});



// --------- Galery /slider  events 


elements.photos.addEventListener('click', (e) => {
  if (e.target.matches('.photos__img')) {
    
    elements.sliderPopup.style.display = 'flex';
  }

});

elements.photos.addEventListener('click', (e) => {
  const photoID = e.target.closest('.photos__img');
    state.slider.counter= photoID.dataset.counter;

  if (photoID) {
    sliderView.showSlider(state.slider.counter);
    elements.sliderPopup.style.display = 'flex';
  }

});

window.addEventListener('click', (e) => {
  
  if (e.target.matches('.slider__close')) {
    elements.sliderPopup.style.display = 'none';
    sliderView.hideAll();
  }

});

elements.slider.addEventListener('click', (e) => {
  if (e.target.matches('.slider__prev')) {
    sliderView.hideSlide();
    state.slider.prevSlide();
  
    sliderView.showSlider(state.slider.counter);
  }
  if (e.target.matches('.slider__next')) {
    sliderView.hideSlide();
    state.slider.nextSlide()
    sliderView.showSlider(state.slider.counter)
  }

});
// --------------------------------- CTRL PLACES --------------------------

const eventsTypes = (status)=>{
  switch(status){
    case "night_club":
    return 'concerts, festivals'

    case "shopping_mall":
    return 'performing-arts'
    
    case "museum":
    return "expos";

  }
}

const ctrlPlaces = async () => {
    eventsView.eventsClean();
    const location = state.autoC.cityList.get(state.search.city);
    initPlaces(location,state.status);
    state.events = new Events(location);
  try{
    eventsView.eventsShow();
    renderLoader(elements.eventsMain);
    await state.events.eventSearch(eventsTypes(state.status))
    clearLoader();
    eventsView.renderEvents(state.events.events)
    
  }
  catch(err){

  }  
  
};



// -- ---------------------

elements.card.addEventListener('click', e =>{
  searchView.rmvStatus();

  let type = e.target.closest('.card__element');
  switch(type.dataset.type){
    case "party":
    state.status ="night_club"
    type.classList.add('active--party')
    ctrlPlaces();
    break;
    case "shopping":
    state.status ="shopping_mall"
    type.classList.add('active--shopping')
    ctrlPlaces();
    break;
    case "culture":
    state.status ="museum"
    type.classList.add('active--culture')
    ctrlPlaces();
    break;

  }
})
