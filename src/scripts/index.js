import '../styles/index.scss';
import 'normalize.css';

const dogs = [{ name: 'Snickers', age: 2 }, { name: 'Hugo', age: 8 }, { name: 'Sunny', age: 1 }];

class App {
  addEventListeners() {
    // wait until DOM is loaded
    setTimeout(() => {
      Array.from(document.querySelectorAll('.gallery-image')).forEach(elem =>
        elem.addEventListener('click', e => console.log('hhhh', e.target))
      );
    }, 0);
  }

  render() {
    this.addEventListeners();
    return `
      <div id="markup">
        <div class="header">
          <h1 class="title">Welcome to Hangallery</h1>
        </div>
        <div class="gallery">
          <div class="gallery-row">
            ${dogs.map(dog => {
              return `
                <div class="gallery-image-holder">
                  <img class="gallery-image 1" src="https://placehold.it/300/300" alt="">
                  <span>${dog.name}</span>
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }
}

const app = new App();

// Render app to the DOM
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('app').innerHTML = app.render();
});
