<template>
  <div class="flex-container">

    <div class="flex-item block-1">
      <div class="ui raised segment">
        <form class="ui form" @submit.prevent="addHouse">
          <div class="field">
            <label>Title</label>
            <input v-model="new_post.title" type="text">
          </div>
          <div class="field">
            <label>price</label>
            <input v-model="new_post.price" type="text">
          </div>
          <div class="field">
            <label>location</label>
            <input v-model="new_post.location" type="text" placeholder="Enter a location">
          </div>
          <div class="field">
            <label>Latitude</label>
            <input v-model="new_post.coor.lat" type="text" placeholder="Enter a location">
            <label>Longitude</label>
            <input v-model="new_post.coor.lng" type="text" placeholder="Enter a location">
          </div>
          <div class="field">
            <div class="container">

              <div class="alert alert-success" style="margin-top:18px;" v-if="success">
                  {{ message }}
              </div>

              <div class="alert alert-danger" style="margin-top:18px;" v-if="success === false">
                  {{ message }}
              </div>

              <div style="display:flex; flex-direction: column;">
                  <img :src="imageSrc" class="image">
                  <span v-model="new_post.img" class="btn btn-default btn-file">
                      Browse <input @change="uploadImage" type="file" name="image" accept="image/*">
                  </span>
              </div>

            </div>
          </div>
          <div class="field">
            <label>description</label>
            <textarea name="name"></textarea>
          </div>
          <button class="ui button" type="submit">Submit</button>
        </form>
      </div>
    </div>

    <div class="flex-item block-2">
      <div class="ui raised segment">
        <gmap-map
        :center="center"
        :zoom="10"
        style="width: 500px; height: 200px"
        >
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>
      </div>
    </div>




  </div>

</template>
<script src="https://maps.googleapis.com/maps/api/js?sensor=false&libraries=places"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.16.4/lodash.js"></script>
<script src="vue-google-maps.js"></script>
<script>

// import * as VueGoogleMaps from 'vue2-google-maps';
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';


  Vue.use(VueGoogleMaps, {
   load: {
     key: 'AIzaSyAhSdPvd-6tb7Kgv1re6BSrmUB9IOVf1Aw',
     v:'3.exp',
     libraries: 'places', //// If you need to use place input
   }
 });

export default {
  name: 'Sell',
  data () {
    return {
      new_post:{
        title:'',
        price:'',
        location:'',
        coor:{lat:'', lng:''},
        img:{},
        spec:''

      },
      center: {lat: -6.121435, lng: 106.774124},
      markers: [{
        position: {lat: -6.121435, lng: 106.774124}
      }],
      place: 'Singapore',
      latLng: {},
      imageSrc: 'http://nahmdong.com/vitalhill/img/default.png',
      success: null,
      message: '',
      img:''
    }
  },
  methods: {
     setDescription(place) {
       this.place = place;
     },
     setPlace(place) {
       this.latLng = {
         lat: place.geometry.location.lat(),
         lng: place.geometry.location.lng(),
       };
     },
     addHouse(){
       let self = this
       let data =this.img
       console.log(this.new_post);
       axios.post('http://localhost:3000/houses',{
          title : self.new_post.title,
          price : +self.new_post.price,
          location : self.new_post.location,
          coor : self.new_post.coor,
          spec : self.new_post.spesifikasi
       }).then(response =>{
         console.log(response.data);
       })
       .catch(err =>{
         console.log(err);
       })
      console.log('data-----------',data);
      axios.post('http://localhost:3000/uploads', data, {headers: { 'Content-Type': 'multipart/form-data' } })
      .then(function (response) {
        if(!response.data.error) {
          reader.readAsDataURL(files[0]);
          _this.success = true;
        } else {
          console.log('err----',response.data);
          _this.imageSrc = 'http://nahmdong.com/vitalhill/img/default.png';
          _this.success = false;
        }
        _this.message = response.data.message;
      })
      .catch(function (error) {
        console.log(error) // catch your error
      });
     },
     uploadImage: function(e) {
      var files = e.target.files;
      console.log('files======',files);
      if(!files[0]) {
        return;
      }
      var data = new FormData();
      data.append('image', files[0])
      var reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(files[0]);
      this.img=data

    }
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
  width: 52%;
  margin-left: 2%;
}

.block-2{
  width: 39%;
  margin-right: 2%;
  margin-left: 5%;
}

.ui .item{
  margin-left: 2%;
}

</style>
