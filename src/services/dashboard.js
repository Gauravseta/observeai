import axios from 'axios';


/**
 * Get Photos
 */
export const loadPhotos = () => {
 return axios.get('http://starlord.hackerearth.com/insta');
}