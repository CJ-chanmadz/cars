<template>
    <carousel
        :per-page="1"
        :mouse-drag="true"
        :paginationEnabled="false"
    >

        <slide v-for="(slide,index) in slides" :key="index">
            <div 
                class="slider_bck"
                :style="{'background': `url(${slide.bck})`}"
            >
                <div class="gradient">
                    <div class="container">
                        <div class="content">

                            <!-- <app-button
                                type="link"
                                linkTo="/vuevue"
                            >
                                Review
                            </app-button> -->
                            
                            <!-- <div class="item">
                                {{ slide.title }}
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </slide>

    </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

import slideOne from '../../assets/images/featured/1.jpg';
import slideTwo from '../../assets/images/featured/2.jpg';
import slideThree from '../../assets/images/featured/3.jpg';
import slideFour from '../../assets/images/featured/4.jpg';

export default {
    data(){
        return {
            slides:[
                {
                    title: 'Shot Gun',
                    bck: slideOne
                },
                {
                    title: 'Ninja Assasin',
                    bck: slideTwo
                },
                {
                    title: 'Girl With Arrow',
                    bck: slideThree
                },
                {
                    title: 'Spider Man',
                    bck: slideFour
                },
            ]
        }
        
    },
    components: {
        Carousel,
        Slide
  }
}
</script>

<style scoped>
    .VueCarousel {
        display: flex;
        flex-direction: column;
        position: relative;
        background: black;
    }
</style>