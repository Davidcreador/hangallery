import galleryData from './gallery-data.json';

export default class GalleryService {
  getImages() {
    return galleryData;
  }

  getNewImage() {
    let { data } = galleryData;
    let randomNumber = Math.floor(Math.random() * data.length);
    return data[randomNumber];
  }
}
