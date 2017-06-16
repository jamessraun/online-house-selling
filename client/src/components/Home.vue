<template>
  <div class="flex-container">

    <div class="flex-item block-1">
      <div class="ui vertical menu">
        <div class="item">
          <div class="ui input"><input type="text" placeholder="Search..."></div>
        </div>
        <div class="item">
          Home
          <div class="menu">
            <a class="active item">Search</a>
            <a class="item">Add</a>
            <a class="item">Remove</a>
          </div>
        </div>
        <a class="item">
          <i class="grid layout icon"></i> Browse
        </a>
        <a class="item">
          Messages
        </a>
        <div class="ui dropdown item">
          More
          <i class="dropdown icon"></i>
          <div class="menu">
            <a class="item"><i class="edit icon"></i> Edit Profile</a>
            <a class="item"><i class="globe icon"></i> Choose Language</a>
            <a class="item"><i class="settings icon"></i> Account Settings</a>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-item block-2">
      <div class="ui raised segment">
        <div class="ui items">
          <div class="item" v-for="house in houses">
            <div class="image">
              <img src="https://static.pexels.com/photos/106399/pexels-photo-106399.jpeg">
            </div>
            <div class="content">
              <a class="header">Rumah1</a>
              <div class="meta">
                <span>luas 100x100 m2 10 lantai 10 kolam renang</span>
              </div>
              <div class="description">
                <p></p>
              </div>
              <div class="extra">
                Additional Details
              </div>
            </div>
            <div class="flex-item" style="margin-left:5%">
              <gmap-map
              :center="center"
              :zoom="7"
              style="width: 400px; height: 300px"
            >
              <gmap-marker
                :position={lat:+house.lat,lng:+house.lng}
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
              ></gmap-marker>
            </gmap-map>
            </div>
          </div>
        </div>
      </div>
    </div>




  </div>

</template>

<script>

// import * as VueGoogleMaps from 'vue2-google-maps';
import * as VueGoogleMaps from 'vue2-google-maps';
  import Vue from 'vue';


  Vue.use(VueGoogleMaps, {
   load: {
     key: 'AIzaSyCJOn_Xa_rpc_AHG63wcOI5_4seVuJpXRg',
     v: '3.26',
     // libraries: 'places', //// If you need to use place input
   }
 });

export default {
  name: 'Home',
  data () {
    return {
      center: {lat: -6.121435, lng: 106.774124},
      houses:[]
    }
  },
  created(){
    let self = this
    axios.get('http://localhost:3000/houses')
    .then(response =>{
      console.log(response.data);
      self.houses=response.data;
    })
    .catch(err =>{
      console.log(err);
    })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.flex-container{
   display: flex;
   flex-wrap: wrap;
}

.flex-item {
  flex-direction: row;
  float: left;
  border-radius: 5px;
}

.block-1{
  width: 18%;
  margin-left: 2%;
}

.block-2{
  width: 76%;
  margin-right: 2%;
  margin-left: 2%;
}

.ui .item{
  margin-left: 2%;
}

</style>
