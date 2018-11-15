<template>
  <div class="information">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">Information</span>
      </div>
      <div class="text-container">
        <div class="wrapper location">
          <div class="subtitle">Location : </div>
          <div class="item">{{ weaverLocation }}</div>
        </div>
        <div class="wrapper coordinate">
          <div class="subtitle">Coordinate : </div>
          <div class="item">{{ weaverCoordinates }}</div>
        </div>
        <div class="wrapper compass">
          <div class="subtitle">Compass : </div>
          <div class="item">{{ weaverCompass }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { db } from '@/api/firebase.js'

export default {
  name: 'information',
  data () {
    return {
      weaverKey: '',
      weaverCompass: '',
      weaverCoordinates: '',
      weaverLocation: '',
    }
  },
  created () {
    this.$eventBus.$on('nowWeaver', this.onReceive)
  },
  methods: {
    onReceive (input) {
      this.weaverKey = input
      let weaverRef = db.ref('weavers/' + this.weaverKey)
      setInterval(() => {
        weaverRef.on('value', (snapshot) => {
          this.weaverCompass = snapshot.val().compass
          this.weaverCoordinates = snapshot.val().coordinates
          this.getLocation(this.weaverCoordinates)
        })
      }, 1000)
    },
    getLocation(coordinate) {
      let latlngStr = coordinate.split(',', 2)
      let latlng = new google.maps.LatLng(parseFloat(latlngStr[0]), parseFloat(latlngStr[1]))

      new google.maps.Geocoder().geocode({'latLng' : latlng}, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                  var country = null, city = null, cityAlt = null
                  var c, lc, component
                  for (var r = 0, rl = results.length; r < rl; r += 1) {
                      var result = results[r]

                      if (!city && result.types[0] === 'locality') {
                          for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                              component = result.address_components[c]

                              if (component.types[0] === 'locality') {
                                  city = component.long_name
                                  break
                              }
                          }
                      } else if (!city && !cityAlt && result.types[0] === 'administrative_area_level_1') {
                          for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                              component = result.address_components[c]

                              if (component.types[0] === 'administrative_area_level_1') {
                                  cityAlt = component.long_name
                                  break
                              }
                          }
                      } else if (!country && result.types[0] === 'country')
                          country = result.address_components[0].long_name

                      if (city && country)
                          break
                  }

                  if (city && cityAlt && country)
                    this.weaverLocation = city + ', ' + cityAlt + ', ' + country
                  else if (city && !cityAlt && country)
                    this.weaverLocation = city + ', ' + country
              }
          }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/card.scss';

.box-card {
  width: 760px;
  margin-right: 18px;

  .text-container {
    display: flex;

    .wrapper {
      width: 70%;
      margin-right: 50px;
    }

    .item {
      margin-top: 0.5em;
      font-size: 1.3rem;
      font-weight: 700;
    }
  }
}
</style>
