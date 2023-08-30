<template>
  <section class="home-hero sb-noselect">
    <div class="home-hero__inner sb-container">
      <div class="home-hero__grid">
        <div class="home-hero__texts">
          <h1 class="home-hero__title">
            <span class="home-hero__title-spaceholder"
              >РАССКАЗЫВАЕМ ОБ ИНТЕРНЕТ-ПРОФЕССИЯХ И КУРСАХ</span
            >
            <span class="home-hero__title-typing">
              <span ref="typingText"></span>
            </span>
          </h1>
          <div class="home-hero__bottom">
            <p class="home-hero__text">
              Полезные статьи, советы, отзывы о школах и многое другое
            </p>
          </div>
        </div>
        <figure ref="figure" class="home-hero__fig">
          <img src="/images/Frame 91.png" alt="" />
        </figure>
        <div class="home-hero__fig-spaceholder desktop-hidden"></div>
      </div>
    </div>
  </section>
</template>

<script>
import mediaQueryMixin from '~/mixins/mediaQueryMixin';

export default {
  name: "HomeHeroSection",
  mixins: [mediaQueryMixin],
  data: () => ({
    parallaxListener: null
  }),
  methods: {
    typedInit() {
      const element = this.$refs.typingText;

      const options = {
        strings: ["РАССКАЗЫВАЕМ ОБ ИНТЕРНЕТ-ПРОФЕССИЯХ И КУРСАХ"],
        typeSpeed: 50,
      };

      const typed = new this.$typed(element, options);
    },
    parallaxInit() {
      const setParallaxLayer = (element, multiplier) => {
        multiplier = 1 - multiplier;
        const doc = document;

        this.parallaxListener = () => {
          const fromTop = doc.documentElement.scrollTop || doc.body.scrollTop;
          const translateValue = (multiplier * fromTop) + 'rem';
          element.style.transform = `translateY(${translateValue})`;
        }
        window.addEventListener("scroll", this.parallaxListener);
      };
      setParallaxLayer(this.$refs.figure, 0.75);
    },
    parallaxDestroy() {
      window.removeEventListener('scroll', this.parallaxListener);
    }
  },
  mounted() {
    this.typedInit();
    this.mediaQueryHook(() => {
      if (this.isMobile) {
        this.parallaxInit();
      } else {
        this.parallaxDestroy();
      }
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
    @media screen and (max-width: $brakepoint) {
      border-radius: 20rem 20rem 0 0;
      height: 320rem;
      position: absolute;
      top: 0;
      z-index: -1;
    }
    img {
      width: 100%;
      object-fit: cover;
    }
    &-spaceholder {
      @media screen and (max-width: $brakepoint) {
        height: 260rem;
      }
    }
  }
}
</style>
