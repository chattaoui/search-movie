<template>
    <div class="tag-input">
      <div class="tag" v-for="(tag, index) in tags" :key="index">
        {{ tag }}
        <ion-icon
          name="close-circle-outline"
          @click="removeTag(index)"
          class="remove-tag-icon"
        ></ion-icon>
      </div>
      <input
        type="text"
        :placeholder=placeHolder
        v-model="tagInput"
        @keydown.enter="addTag"
        class="tag-input-field"
      >
    </div>
  </template>
  
  <script>
import { IonIcon } from '@ionic/vue';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
addIcons({
  'close-circle-outline': closeCircleOutline
});
  export default {
    components: {
        IonIcon
    },
    props:['placeHolder'],
    data() {
      return {
        tags: [],
        tagInput: '',
      };
    },
    methods: {
      addTag() {
        //adds new tag if it is not already in the list
        if (this.tagInput.trim() !== '' && !this.tags.includes(this.tagInput)) {
          this.tags.push(this.tagInput);
          this.tagInput = '';
          this.$emit('tags-updated', this.tags);
        }
      },
      removeTag(index) {
        this.tags.splice(index, 1);
        this.$emit('tags-updated', this.tags);
      }
    }
  };
  </script>
  
  <style scoped>
  .tag-input {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline
  }
  
  .tag {
    display: inline-flex;
    align-items: center;
    padding: 4px 8px;
    margin: 4px;
    border: 1px solid #ccc;
    border-radius: 20px;
    background-color: #f2f2f2;
    color: #333;
  }
  
  .remove-tag-icon {
    margin-left: 8px;
    cursor: pointer;
  }
  
  .tag-input-field {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin-top: 8px;
    font-size: 14px;
  }
  </style>