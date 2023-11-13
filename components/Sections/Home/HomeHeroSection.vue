<template>
  <section class="home-hero sb-noselect">
    <div class="home-hero__inner sb-container">
      <div class="home-hero__grid">
        <div class="home-hero__texts">
          <div class="home-hero__title">
            <h1 class="home-hero__title-spaceholder">{{ content.title }}</h1>
            <span class="home-hero__title-typing">
              <span ref="typingText"></span>
            </span>
          </div>
          <div class="home-hero__bottom">
            <p class="home-hero__text">
              {{ content.text }}
            </p>
          </div>
        </div>
        <figure ref="figure" class="home-hero__fig">
          <img
            v-for="(image, index) in content.images"
            :src="image.image"
            alt=""
            :class="{ active: currImgIndex === index }"
          />
        </figure>
        <div class="home-hero__fig-spaceholder" v-if="isMobile"></div>
      </div>
    </div>
  </section>
</template>

<script>
import mediaQueryMixin from "~/mixins/mediaQueryMixin";

export default {
  name: "HomeHeroSection",
  mixins: [mediaQueryMixin],
  props: {
    content: {
      type: Object,
    },
  },
  data: () => ({
    parallaxListener: null,
    currImgIndex: 0,
  }),
  methods: {
    typedInit() {
      const element = this.$refs.typingText;

      const options = {
        strings: [this.content.title],
        typeSpeed: 50,
      };

      const typed = new this.$typed(element, options);
    },

    galleryInit() {
      if (this.content.images.length > 0) {
        setInterval(() => {
          this.currImgIndex =
            this.currImgIndex < this.content.images.length - 1
              ? this.currImgIndex + 1
              : 0;
        }, 6000);
      }
    },

    parallaxInit() {
      const setParallaxLayer = (element, multiplier) => {
        multiplier = 1 - multiplier;
        const doc = document;

        this.parallaxListener = () => {
          const fromTop = doc.documentElement.scrollTop || doc.body.scrollTop;
          const translateValue = multiplier * fromTop + "rem";
          element.style.transform = `translateY(${translateValue})`;
        };
        window.addEventListener("scroll", this.parallaxListener);
      };
      setParallaxLayer(this.$refs.figure, 0.75);
    },
    parallaxDestroy() {
      window.removeEventListener("scroll", this.parallaxListener);
    },
  },
  mounted() {
    this.typedInit();
    this.mediaQueryHook(() => {
      if (this.isMobile) {
        this.parallaxInit();
      } else {
        this.parallaxDestroy();
      }
      this.galleryInit();
    });
  },
};
</script>

<style scoped lang="scss">
.home-hero {
  &__inner {
    @media screen and (max-width: $brakepoint) {
      padding: 0;
    }
  }
  &__grid {
    display: grid;
    grid-template-columns: 960rem 1fr;
    gap: 20rem;
    @media screen and (max-width: $brakepoint) {
      display: flex;
      flex-direction: column-reverse;
      gap: 0;
      position: relative;
    }
  }
  &__texts {
    background: $color_primary;
    padding-top: 133rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 50rem;
    justify-content: space-between;
    @media screen and (max-width: $brakepoint) {
      padding-top: 30rem;
      border-radius: 20rem;
    }
  }
  &__title {
    position: relative;
    @include fontStyles($font_1, 55rem, 88rem, 400, 1.65rem);
    margin-bottom: 89rem;
    width: 835rem;
    text-align: center;
    text-transform: uppercase;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_1, 23rem, 37rem, 400, 0.69rem);
      width: 100%;
      margin-bottom: 14rem;
      padding: 0 19rem;
    }
    &-spaceholder {
      opacity: 0;
    }
    &-typing {
      position: absolute;
      top: 0;
      left: 0;
      @media screen and (max-width: $brakepoint) {
        left: 19rem;
        width: calc(100% - 2 * 19rem);
      }
    }
    span {
      color: $color_white;
    }
    & :deep .typed-cursor {
      color: $color_white;
    }
  }
  &__bottom {
    background: $color_black;
    width: 800rem;
    border-radius: 50rem 50rem 0 0;
    padding: 48rem 118rem 32rem;
    @media screen and (max-width: $brakepoint) {
      width: 100%;
      border-radius: 20rem 20rem 0 0;
      padding: 17rem 19rem;
    }
  }
  &__text {
    color: $color_white;
    text-align: center;
    @include fontStyles($font_3, 20rem, 32rem, 600, 1rem);
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_3, 14rem, 17rem, 500);
    }
  }
  &__fig {
    display: flex;
    border-radius: 50rem;
    overflow: hidden;
    position: relative;
    @media screen and (max-width: $brakepoint) {
      width: 100%;
      border-radius: 20rem 20rem 0 0;
      height: 320rem;
      position: absolute;
      top: 0;
      z-index: -1;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 1s ease-in-out;
      &.active {
        opacity: 1;
      }
    }
    &-spaceholder {
      @media screen and (max-width: $brakepoint) {
        height: 260rem;
      }
    }
  }
}
</style>
