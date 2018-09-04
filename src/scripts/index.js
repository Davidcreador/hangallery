import '../styles/index.scss';
import 'normalize.css';
import View from './components/View';
import GalleryService from '../services/gallery-service';

class App {
  constructor() {
    this.service = new GalleryService();
    this.data = this.getData();
    this.view = new View(this.data);
  }

  getData() {
    return this.service.getImages().data;
  }

  render() {
    this.view.render();
  }
}

const app = new App();

// Render app to the DOM
document.addEventListener('DOMContentLoaded', () => app.render());
