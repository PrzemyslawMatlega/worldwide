import { state } from '../index';
import { elements } from './base'
;
export function renderSlider() {
  state.search.photos.forEach((el) => {
    const markup = `
  <div class="slider__element" id="slider__element-${state.search.photos.indexOf(el)}"> 
  <img src="${el}" class="slider__img" alt="sliderimg">
  </div>`;

    elements.sliderPhotos.insertAdjacentHTML('beforeend', markup);
  });
}

export function showSlider(counter) {
  const show = document.getElementById(`slider__element-${counter}`);
  show.classList.add('fade');
  show.classList.add('slider__element-active');
}

export function hideAll() {
  state.search.photos.forEach((el) => {
    const hide = document.getElementById(`slider__element-${state.search.photos.indexOf(el)}`);
    hide.classList.remove('slider__element-active');
    hide.classList.remove('fade');
  });
}

export function hideSlide() {
  const hide = document.getElementById(`slider__element-${state.slider.counter}`);
  hide.classList.remove('slider__element-active');
  hide.classList.remove('fade');
}

export function clean() {
  elements.sliderPhotos.innerHTML = '';
}
