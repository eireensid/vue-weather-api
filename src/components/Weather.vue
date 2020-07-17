<template>
  <div class="main">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Погода в Ростове-на-Дону на 4 дня</h1>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h3>{{ data1.weekDay }}</h3>
          <span>{{ data1.temp }} °C</span><br>
          <img :src="data1.icon" />
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h3>{{ data2.weekDay }}</h3>
        </div>
        <div class="col-4">
          <h3>{{ data3.weekDay }}</h3>
        </div>
        <div class="col-4">
          <h3>{{ data4.weekDay }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <span>{{ data2.temp }} °C</span>
        </div>
        <div class="col-4">
          <span>{{ data3.temp }} °C</span>
        </div>
        <div class="col-4">
          <span>{{ data4.temp }} °C</span>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <img :src="data2.icon" />
        </div>
        <div class="col-4">
          <img :src="data3.icon" />
        </div>
        <div class="col-4">
          <img :src="data4.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api.js'

export default {
  name: 'Weather',
  data () {
    return {
      data1: {},
      data2: {},
      data3: {},
      data4: {}
    }
  },
  created () {
    this.data1.weekDay = this.getWeekDay(0)
    this.data2.weekDay = this.getWeekDay(1)
    this.data3.weekDay = this.getWeekDay(2)
    this.data4.weekDay = this.getWeekDay(3)

    api.getForecast()
      .then(data => {
        console.log(data)
        this.setAverageTempAndWeatherIcon(this.data1, 0, data)
        this.setAverageTempAndWeatherIcon(this.data2, 1, data)
        this.setAverageTempAndWeatherIcon(this.data3, 2, data)
        this.setAverageTempAndWeatherIcon(this.data4, 3, data)
        // this.data2.temp = this.getAverageTemp(1, data)
        // this.data3.temp = this.getAverageTemp(2, data)
        // this.data4.temp = this.getAverageTemp(3, data)
        this.$forceUpdate()
      })
      .catch(err => console.error(err))
  },
  methods: {
    getWeekDay (dayOffset) {
      let day = new Date()
      day.setDate(day.getDate() + dayOffset)
      let weekDayNumber = day.getDay()
      let res = ''
      switch (weekDayNumber) {
        case 0:
          res = 'Воскресенье'
          break
        case 1:
          res = 'Понедельник'
          break
        case 2:
          res = 'Вторник'
          break
        case 3:
          res = 'Среда'
          break
        case 4:
          res = 'Четверг'
          break
        case 5:
          res = 'Пятница'
          break
        case 6:
          res = 'Суббота'
          break
      }
      return res
    },
    setAverageTempAndWeatherIcon (weatherObj, dayOffset, data) {
      let day = new Date()
      day.setDate(day.getDate() + dayOffset)
      let year = String(day.getFullYear())
      let month = String(day.getMonth() + 1)
      let dayNumber = String(day.getDate())
      month = month.length === 1 ? '0' + month : month
      dayNumber = dayNumber.length === 1 ? '0' + dayNumber : dayNumber
      let searchDateStr = `${year}-${month}-${dayNumber}`
      let sum = 0
      let count = 0
      let hour = String(Math.trunc(day.getHours() / 3) * 3)
      hour = hour.length === 1 ? '0' + hour : hour
      let fullSearch = `${year}-${month}-${dayNumber} ${hour}:00:00`
      for (let i = 0; i < data.list.length; i++) {
        let curItem = data.list[i]
        let curTemp = curItem.main.temp
        curTemp = Math.round(curTemp - 273)
        let dateStr = curItem.dt_txt
        if (dateStr.startsWith(searchDateStr)) {
          sum += curTemp
          count += 1
        }
        if (dateStr.startsWith(fullSearch)) {
          let curIcon = curItem.weather[0].icon
          let curIconSrc = `http://openweathermap.org/img/wn/${curIcon}@2x.png`
          weatherObj.icon = curIconSrc
        }
      }
      let averageTemp = Math.round(sum / count)
      weatherObj.temp = averageTemp
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
