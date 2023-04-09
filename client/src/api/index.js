import axios from 'axios';
import { serverURL } from '../constants/constants';

const API = axios.create({ baseURL: serverURL })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  return req;
});

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)
export const getVideos = () => API.get('/video')
export const getRecentVideos = () => API.get('/video/recent')
export const fetchVideoById = (id) => API.get('/video/watch/' + id)
export const getVideoById = (id) => API.get('/video/' + id)
export const uploadVideo = (data, setProgress) => API.post('/video', data, {headers: {'Content-Type': 'multipart/form-data'}, onUploadProgress: d => {setProgress(Math.round(100*d.loaded)/d.total);}})
export const likeVideo = (id) => API.post(`/video/${id}/like`)
export const unlikeVideo = (id) => API.post(`/video/${id}/unlike`)
export const getLikedVideos = () => API.get('/video/liked')
export const getMyVideos = () => API.get('/video/uploaded')
export const deleteVideo = (id) => API.post(`/video/${id}/delete`)
export const addComment = (data) => API.post('/comment', data)
export const getComments = (id) => API.get(`/video/${id}/comments`)
export const addReply = (data) => API.post('/reply', data)
export const getReplies = (id) => API.get(`/comment/${id}/replies`)
export const getNotifcations = () => API.get('/profile/notification')
export const clearNotifications = () => API.post('/profile/notification')
