import Axios from 'axios';

import {
  storageService
} from "./async-storage-service";
import {
  utilService
} from "./util-service";

export const toyService = {
  query,
  save,
  remove,
  toggleFavourite,
  getById,
};

const BASE_URL = process.env.NODE_ENV === 'production' ?
  '/api/' :
  'http://localhost:3030/api/';

const axios = Axios.create({
  withCredentials: false
  // req doesn't work when this is true. 
});

const STORAGE_KEY = 'toysDB';

test()

function test() {
  axios.get(BASE_URL + 'toy').then(res => console.log('res', res.data))
}

function query(filterBy) {
  console.log('filterBy =', filterBy)
  return axios.get(BASE_URL + 'toy', {
    params: filterBy
  }).then(res => res.data);
}

function getById(id) {
  return axios.get(`${BASE_URL}toy/${id}`).then(toy => toy.data)

}

function save(entity) {
  if (entity._id) {
    // Update
    return axios.put(`${BASE_URL}toy/${entity._id}`, entity).then(savedToy => {
      return savedToy.data
    });
  } else {
    // Add
    return axios.post(BASE_URL + 'toy', entity).then(savedToy => {
      return savedToy.data
    });
  }
}

function remove(entityID) {
  return axios.delete(`${BASE_URL}toy/${entityID}`).then(toy => toy.data)
}

function toggleFavourite(toyId) {
  return axios.get(`${BASE_URL}toy/${toyId}`)
    .then(toy => toy.data)
    .then(toy => {
      toy.isFavourite = !toy.isFavourite
      return axios.put(`${BASE_URL}toy/${toy._id}`, toy)
        .then(() => toy);
    })
}