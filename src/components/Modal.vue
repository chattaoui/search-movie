<template>
    <ion-modal :is-open="isOpen" @willDismiss="dismissModal" :ionBackdropDismiss="true">
        <ion-content>
            <ion-header>
                <ion-toolbar>
                    <ion-title>{{ movie.original_title }}</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="dismissModal">
                            <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>

            <ion-card>
                <div class="modal-card">
                    <img :src="movie.poster_path.replace('w300', 'w500')" alt="Movie Poster" style="height: 90dvh;">
                    
                    <ion-card>
                        <ion-card-header>
                        <ion-card-title>{{ `${movie.original_title}  ${movie.release_date} ` }}</ion-card-title>
                    </ion-card-header>

                    <ion-card-content>
                        <p><strong>Overview:</strong> {{ movie.overview }}</p>
                        <p><strong>Popularity:</strong> {{ movie.popularity }}</p>
                        <p><strong>Voted:</strong> {{ `${movie.vote_average} /10` }}</p>
                        <p><strong>Vote Count:</strong> {{ movie.vote_count }}</p>
                    </ion-card-content>
                    </ion-card>

                    
                </div>

            </ion-card>
        </ion-content>
    </ion-modal>
</template>

<script>
import { IonModal, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';

export default {
    components: {
        IonModal,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonIcon,
        IonCard,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonCardContent
    },
    props: {
        isOpen: Boolean,
        movie: Object
    },
    data() {
        return {
            closeOutline: closeOutline
        };
    },
    methods: {
        dismissModal() {
            this.$emit('dismiss');
        }
    }
};
</script>

<style scoped>
ion-modal {
    --height: 100vh;
    --width: 100dvw !important;
    --max-width: 100dvw !important;
    --ion-padding: 20px;
}

ion-card-content p {
    margin: 2rem;
}

@media (min-width: 950px) {
    .modal-card{
        display: flex
    }
}
</style>