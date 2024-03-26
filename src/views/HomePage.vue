<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <!-- Search input -->

      <tag-input @tags-updated="updateTags" :placeHolder="`Search movies`"></tag-input>


      <!-- Table -->
      <ion-grid class="ion-padding">
        <ion-row class="table-header ion-align-items-center">
          <ion-col size="4"></ion-col>
          <ion-col size="4"><strong>Title</strong></ion-col>
          <ion-col size="4"><strong>Release date</strong></ion-col>
        </ion-row>
        <ion-row v-for="(item, index) in filteredItems" :key="index" :class="{ 'table-row-alt': index % 2 !== 0 }"
          class="ion-align-items-center" @mouseover="hoverRow = index" @mouseleave="hoverRow = -1"
          :style="{ 'background-color': hoverRow === index ? '#100a2a' : '' }" @click="openModal(item)"
          style="cursor: pointer;"
          >
          <ion-col size="4"><img class="movie-poster" :src="item.poster_path"></ion-col>
          <ion-col size="4">{{ item.original_title }}</ion-col>
          <ion-col size="4">{{ item.release_date }}</ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
  <MovieModal :isOpen="isModalOpen" :movie="selectedMovie" @dismiss="closeModal" />

</template>

<script>
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import TagInput from '../components/TagInput.vue';
import { MovieApiService } from '../services/api.service.ts'
import MovieModal from '../components/Modal.vue'

export default {
  components: {

    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    TagInput,
    MovieModal
  },
  data() {
    return {
      hoverRow: -1,
      tags: [],
      items: [],
      selectedMovie: null,
      isModalOpen: false
    };
  },
  computed: {
    filteredItems() {
      //this was originally created to filter originally fetched data (not needed anymore)
      //
      // if (this.tags.length === 0) {
      //   return this.items;
      // }
      // return this.items.filter(item =>
      //   this.tags.every(tag =>
      //     Object.values(item).some(value => value.toString().toLowerCase().includes(tag.toLowerCase()))
      //   )
      // );
      return this.items
    }
  },
  methods: {
    async updateTags(newTags) {
      //update tags (add or remove)
      this.tags = newTags;
      const movieApiService = new MovieApiService()
      if (!newTags.length) {
        return this.items = await movieApiService.getPopularMovies();
      }
      this.items = await movieApiService.searchMoviesByKeyword(this.tags)
    },
    openModal(movie) {
      this.selectedMovie = movie;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    }
  },
  async mounted() {
    const movieApiService = new MovieApiService();
    this.items = await movieApiService.getPopularMovies();
  },
};
</script>

<style scoped>
.table-header {
  font-size: 1.6em;
}

.table-row-alt {
  background-color: #f9f9f93f;
  /* Alternate row background color */
}

.movie-poster {
  height: 20dvh;
}
</style>
