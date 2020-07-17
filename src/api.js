import axios from 'axios'
const isUseProxy = true // установить в true, если cors ошибка

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
const APP_ID = '759bf8d457d3f94fedf1c51bab9b158e'
const CITY_ID = '501175'

function getForecast () {
  let apiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${CITY_ID}&appid=${APP_ID}`

  if (isUseProxy) {
    apiUrl = PROXY_URL + apiUrl
  }

  return axios.get(apiUrl)
    .then((response) => response.data)
}

export default {
  getForecast
}
