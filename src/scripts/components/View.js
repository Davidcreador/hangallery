import GalleryService from '../../services/gallery-service';
import { html } from '../../utils/html';

export default class View {
  constructor(data) {
    this.service = new GalleryService();
    this.element = document.getElementById('app');
    this.data = data;
  }

  addEventListeners() {
    // hacky wait until DOM resources are loaded
    setTimeout(() => {
      let imagesNodeList = document.querySelectorAll('img[data-src]');
      let selectedImagePlaceholder = document.querySelector('.showcase-image');
      let gallery = document.querySelector('.gallery');

      // Call lazyload images to better performance
      this.lazyLoadImages(imagesNodeList);

      // Attach eventListener to the images
      Array.from(imagesNodeList).forEach(elem =>
        elem.addEventListener('click', e => {
          // It triggers the customEvent and passed in selected click item
          this.selectImage(e.target);
        })
      );

      // Listen to customEvent
      gallery.addEventListener(
        'imagechanged',
        e => {
          // Change the src to the one clicked
          selectedImagePlaceholder.src = e.detail.image();
        },
        false
      );
    }, 0);
  }

  lazyLoadImages(nodeList) {
    // Simple implementation to lazyLoad images
    [].forEach.call(nodeList, img => {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = function() {
        img.removeAttribute('data-src');
      };
    });
  }

  renderThumbnails() {
    return html`
      ${this.data.map((dt, i) => {
        return html`
          <img data-src="${dt.uri}" class="gallery-image thumbnail-${i}" alt="${dt.name}">
        `;
      })}
    `;
  }

  selectImage(imgNode) {
    // Dispatch CustomEvent to all subs listen to it
    imgNode.dispatchEvent(
      new CustomEvent('imagechanged', {
        bubbles: true,
        detail: { image: () => imgNode.src }
      })
    );
  }

  render(data) {
    this.addEventListeners();

    return (this.element.innerHTML = html`
      <div class="container">
        <div class="header">
          <h1 class="title">Welcome to Hangallery</h1>
          </div>
        <div class="gallery">
          <div class="showcase-gallery-image">
            <img class="showcase-image" src="${this.data[0].uri}" />
          </div>
          <div class="gallery-row">
            ${this.renderThumbnails()}
          </div>
        </div>
      </div>
    `);
  }
}
