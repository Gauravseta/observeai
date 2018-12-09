import { createAction, createReducer } from 'redux-act'
import { call, takeLatest, put } from 'redux-saga/effects';
import { loadPhotos } from '../services/dashboard'; 
import { getPhotosFromStorage, addPhotoToStorage, deletePhotoFromStorage } from '../services/storage';
import * as _ from "lodash";


/**
 * Actions
 */
export const loadPhotosAction = createAction('PHOTOS/LOAD')
export const deletePhotoAction = createAction('PHOTOS/DELETE')
export const likePhotoAction = createAction('PHOTOS/LIKE')
export const commentPhotoAction = createAction('PHOTOS/COMMENT')
export const addPhotoAction = createAction('PHOTOS/ADD')
export const setPhotosAction = createAction('PHOTOS/SET')

/**
 * Get Photos
 * @param {Object} action - Redux Action
 */
const loadPhotosSaga = function * () {
 try {
   const photosFromStorage = yield call(getPhotosFromStorage);
   const photos = yield call(loadPhotos,{});
   yield put(setPhotosAction(_.concat(photos.data, photosFromStorage || [])));

 } catch (e) {
   console.log(e)
 }
}

/**
 * Add Photo
 * @param {Object} action - Redux Action
 */
const addPhotosSaga = function * (action) {
  try {
    yield call(addPhotoToStorage, action.payload);
    yield call(loadPhotosSaga);
 
  } catch (e) {
    console.log(e)
  }
}

/**
 * Remove Photo
 * @param {Object} action - Redux Action
 */
const removePhotosSaga = function * (action) {
  try {
    yield call(deletePhotoFromStorage, action.payload);
    yield call(loadPhotosSaga);
 
  } catch (e) {
    console.log(e)
  }
}

// Root saga which is exported
export const dashboardRootSaga = function * () {
 yield takeLatest(loadPhotosAction, loadPhotosSaga)
 yield takeLatest(addPhotoAction, addPhotosSaga)
 yield takeLatest(deletePhotoAction, removePhotosSaga)
}

/**
 * Reducer
 */
const initialState = {
 comments: {

 },
 photos: [

 ],
 likes: {

 },
 likedByMe: {

 }
}


export const dashboardReducer = createReducer({
 [setPhotosAction]: (state, payload) => ({ ...state,photos: payload })
}, initialState)