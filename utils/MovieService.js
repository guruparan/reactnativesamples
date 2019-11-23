import { API_KEY, API_URL } from './Constants';

let urlAppend = '';

const updateSettings = function (text) {
    urlAppend = text;
}

const getSearchResults = async function (text) {
    //http://www.omdbapi.com/?apikey=53473bbd&s=lord
    return getData(`${API_URL}${API_KEY}&s=${text}${urlAppend}`);
};

const getMovieDetails = async function (id) {
    return getData(`${API_URL}${API_KEY}&i=${id}`);
};

async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

export { getSearchResults, getMovieDetails, updateSettings }