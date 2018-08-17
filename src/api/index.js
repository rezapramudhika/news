import {
    ARTICLE,
    API_KEY,
    BOOK
} from './constant';
import axios from 'axios';

export const getArticle = (payload) => {
    return new Promise(function (resolve, reject) {
        axios.get(`${ARTICLE}?api_key=${API_KEY}&sort=${payload.sort}&page=${payload.page}&q=${payload.q}`)
            .then(data => {
                resolve(data.data.response.docs)
            })
            .catch(err => {
                reject(err)
            })
    });
}

export const getBook = (payload) => {
    return new Promise(function (resolve, reject) {
        axios.get(`${BOOK}?api_key=${API_KEY}&list=${payload.list}`)
            .then(data => {
                resolve(data.data.results)
            })
            .catch(err => {
                reject(err)
            })
    });
}