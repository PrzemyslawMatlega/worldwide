export default class Slider {
  constructor(counter = 0) {
    this.counter = counter;
  }

  prevSlide() {
    if (this.counter == 0) {
      this.counter = 8;
    } else {
      this.counter--;
    }
  }

  nextSlide() {
    if (this.counter == 8) {
      this.counter = 0;
    } else {
      this.counter++;
    }
  }
}
