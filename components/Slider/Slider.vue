<template>
  <div class="slider sb-container">
    <div class="slider__arrows" v-if="showArrows && !forceHideArrows && init">
      <button ref="prevElButton" class="slider__arrows-left"
        @click="prev"
        :disabled="disablePrev"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6667 7.29199C11.6667 8.37408 10.5977 9.98991 9.51563 11.3462C8.12438 13.0962 6.46188 14.623 4.55583 15.7882C3.12667 16.6618 1.39417 17.5003 0 17.5003M0 17.5003C1.39417 17.5003 3.12813 18.3389 4.55583 19.2124C6.46188 20.3791 8.12438 21.9059 9.51563 23.653C10.5977 25.0107 11.6667 26.6295 11.6667 27.7087M0 17.5003H35"
            stroke="#393939"
            stroke-width="2"
          />
        </svg>
      </button>
      <button ref="nextElButton" class="slider__arrows-right"
        @click="next"
        :disabled="disableNext"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.3333 7.29199C23.3333 8.37408 24.4023 9.98991 25.4844 11.3462C26.8756 13.0962 28.5381 14.623 30.4442 15.7882C31.8733 16.6618 33.6058 17.5003 35 17.5003M35 17.5003C33.6058 17.5003 31.8719 18.3389 30.4442 19.2124C28.5381 20.3791 26.8756 21.9059 25.4844 23.653C24.4023 25.0107 23.3333 26.6295 23.3333 27.7087M35 17.5003H-9.53674e-07"
            stroke="#393939"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>
    <div ref="swiperContainer" class="slider__inner swiper-container">
      <div
        class="slider__wrapper swiper-wrapper"
        :style="wrapperStyles ? wrapperStyles : ''"
      >
        <slot />
      </div>
      <div ref="swiperPagination" class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import mediaQueryMixin from "~/mixins/mediaQueryMixin";
import Swiper from "swiper";

export default {
  name: "Slider",
  mixins: [mediaQueryMixin],
  props: {
    desktopOff: {
      type: Boolean,
      default: false,
    },
    mobileOff: {
      type: Boolean,
      default: false,
    },
    wrapperStyles: {
      type: String,
    },
    showArrows: {
      type: Boolean,
      default: false,
    },
    init: {
      type: Boolean,
      default: true,
    }
  },
  data: () => ({
    slider: null,
    disablePrev: false,
    disableNext: false,
    forceHideArrows: false,
  }),
  methods: {
    async sliderInit() {
      this.slider = new Swiper(this.$refs.swiperContainer, {
        slidesPerView: "auto",
        slidesPerGroup: 1,
      });
      await this.$nextTick();
      this.disablePrev = this.slider.isBeginning;
      this.disableNext = this.slider.isEnd;
      this.forceHideArrows = this.disablePrev && this.disableNext;

      this.slider.on("slideChange", () => {
        this.disablePrev = this.slider.isBeginning;
        this.disableNext = this.slider.isEnd;
      });
    },
    sliderDestroy() {
      this.slider?.destroy(true, true);
    },
    prev() {
      this.slider?.slidePrev();
    },
    next() {
      this.slider?.slideNext();
    },
  },
  watch: {
    init(value) {
      if (value) {
        this.sliderInit();
      }
    }
  },
  mounted() {
    this.mediaQueryHook(() => {
      if ((this.mobileOff && this.isMobile) || (this.desktopOff && !this.isMobile)) {
        this.sliderDestroy();
      } else {
        if (this.init) {
          this.sliderInit();
        }
      }
    });
  },
};
</script>

<style scoped lang="scss">
.slider {
  @media screen and (max-width: $brakepoint) {
    overflow: hidden;
    display: flex;
    flex-direction: column-reverse;
  }
  &__wrapper {
    display: flex;
  }
  &__arrows {
    display: flex;
    gap: 30rem;
    margin-bottom: 35rem;
    @media screen and (max-width: $brakepoint) {
      margin-top: 12rem;
      justify-content: flex-end;
      gap: 12rem;
      margin-bottom: 0;
    }
    &-left,
    &-right {
      width: 35rem;
      height: 35rem;
      display: grid;
      place-content: center;
      svg path {
        stroke: $color_dark-black;
        transition: all $transition_base;
      }
      @media screen and (max-width: $brakepoint) {
        width: 25rem;
        height: 25rem;
      }
      &:hover {
        svg path {
          stroke: $color_black;
        }
      }
      &:focus {
        svg path {
          stroke: $color_primary;
        }
      }
      &:disabled {
        cursor: default;
        svg path {
          stroke: $color_light-gray;
        }
      }
    }
  }
}
</style>
