<template>
  <div ref="swiperContainer" class="slider swiper-container">
    <div class="slider__wrapper swiper-wrapper">
      <slot />
    </div>
    <div ref="swiperPagination" class="swiper-pagination"></div>
  </div>
</template>

<script>
import mediaQueryMixin from '~/mixins/mediaQueryMixin';
import Swiper from 'swiper';

export default {
  name: "Slider",
  mixins: [mediaQueryMixin],
  props: {
    desktopOff: {
      type: Boolean,
      default: false
    },
    mobileOff: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    slider: null,
  }),
  methods: {
    sliderInit() {
      this.slider = new Swiper(this.$refs.swiperContainer, {
      })
    },
    sliderDestroy() {
      this.slider?.destroy(true, true);
    }
  },
  mounted() {
    this.mediaQueryHook(() => {
      console.log(this.mobileOff, this.desktopOff, this.isMobile);
      if ((this.mobileOff && this.isMobile) || (this.desktopOff && !this.isMobile)) {
        this.sliderDestroy();
      } else {
        this.sliderInit();
      }
    });
  },
}
</script>

<style scoped lang="scss">
.slider {
  @media screen and (max-width: $brakepoint) {
    width: 100vw;
    overflow: hidden;
    padding: 0 15rem;
  }
  &__wrapper {
    display: flex;
    gap: 20rem;
    // @media screen and (max-width: $brakepoint) {
    //   gap: 16rem;
    // }
  }
}
</style>
