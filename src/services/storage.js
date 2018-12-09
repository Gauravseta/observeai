import {reactLocalStorage} from 'reactjs-localstorage';
import * as _ from "lodash";

export const getPhotosFromStorage = () => {
 let photos  = reactLocalStorage.getObject('PHOTOS');
 if(photos) {
  return photos.items;
 }

 // if not present then return blank
 return [];
}

export const addPhotoToStorage = (photo) => {
 let photos  = reactLocalStorage.getObject('PHOTOS');
 if(photos && photos.items) {
   photos.items.push(photo);
   return reactLocalStorage.setObject('PHOTOS',{...photos});
 }
 reactLocalStorage.setObject('PHOTOS',{ items: [photo]});
}

export const deletePhotoFromStorage = (id) => {
  let photos  = reactLocalStorage.getObject('PHOTOS');
  // delete only if photo present,
  // else no need to check, because user cannot delete photos fetched from api 
  if(photos && photos.items) {
    let remainingPhotos = _.filter(photos.items,(item) => {
      return item.id !== id;
    })
    return reactLocalStorage.setObject('PHOTOS',{items: remainingPhotos});
  }
 }

