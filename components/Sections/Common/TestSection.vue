<template>
  <section
    class="test-section sb-noselect"
    :class="{
      'test-section--minified': minified,
      'test-section--onslider': onSlider,
    }"
  >
    <div class="test-section__inner sb-container">
      <div
        class="test-section__bg"
        v-show="!minified"
      ></div>
      <div class="test-section__content">
        <div class="test-section__left">
          <h2 class="test-section__title">{{ content.title }}</h2>
          <div class="test-section__button-wrapper">
            <a :href="content.link_url" target="_blank">
              <MainButton type="2">{{ content.link_text }}</MainButton>
            </a>
          </div>
        </div>
        <div class="test-section__right">
          <figure class="test-section__fig">
            <img :src="content.image" alt="" />
          </figure>
          <ul class="test-section__words">
            <li
              v-if="content.red_word"
              class="test-section__words-word test-section__words-word--red"
            >
              {{ content.red_word }}
            </li>
            <li
              v-if="content.white_words[0].word"
              class="test-section__words-word test-section__words-word--1"
            >
              {{ content.white_words[0].word }}
            </li>
            <li
              v-if="content.white_words[1].word"
              class="test-section__words-word test-section__words-word--2"
            >
              {{ content.white_words[1].word }}
            </li>
            <li
              v-if="content.white_words[2].word"
              class="test-section__words-word test-section__words-word--3"
            >
              {{ content.white_words[2].word }}
            </li>
            <li
              v-if="content.white_words[3].word"
              class="test-section__words-word test-section__words-word--4"
            >
              {{ content.white_words[3].word }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import mediaQueryMixin from "~/mixins/mediaQueryMixin";
import MainButton from "~/components/Buttons/MainButton.vue";

export default {
  name: "TestSection",
  mixins: [mediaQueryMixin],
  components: {
    MainButton,
  },
  props: {
    content: {
      type: Object,
    },
    minified: {
      type: Boolean,
      default: false,
    },
    onSlider: {
      type: Boolean,
      default: false,
    }
  },
};
</script>

<style scoped lang="scss">
.test-section {
  &__inner {
    border-radius: 50rem;
    padding: 8rem 50rem;
    background: $color_black;
    position: relative;
    z-index: 0;
    overflow: hidden;
    @media screen and (max-width: $brakepoint) {
      padding: 0 15rem;
      border-radius: 0;
    }
  }
  &__bg {
    width: 590rem;
    height: 497rem;
    background: url("/images/others/3d_shape.png") center/contain no-repeat;
    position: absolute;
    z-index: -1;
    top: -100rem;
    right: -200rem;
    animation: bg 20s ease-in-out infinite;
    @keyframes bg {
      0%,
      100% {
        transform: translate(0rem, 0rem) rotate(2deg) scale(1) skew(10deg, 2deg);
      }
      5% {
        transform: rotate(4deg) scale(1.2) skew(13deg, 12deg);
      }
      20% {
        transform: translate(1rem, 2rem) rotate(6deg) scale(1.2) skew(-2deg, 3deg);
      }
      24% {
        transform: translate(3rem, 4rem) rotate(8deg) scale(1.3) skew(-14deg, 1deg);
      }
      40% {
        transform: translate(0rem, 0rem) rotate(6deg) scale(1.1) skew(15deg, -2deg);
      }
      52% {
        transform: rotate(4deg) scale(1.2) skew(13deg, 12deg);
      }
      57% {
        transform: translate(1rem, 2rem) rotate(2deg) scale(1.2) skew(-2deg, 3deg);
      }
      63% {
        transform: translate(0rem, 0rem) rotate(4deg) scale(1) skew(10deg, 2deg);
      }
      68% {
        transform: translate(0rem, 0rem) rotate(-2deg) scale(1.1) skew(-15deg, -2deg);
      }
      92% {
        transform: translate(3rem, 4rem) rotate(-7deg) scale(1.3) skew(-14deg, 1deg);
      }
    }
    @media screen and (max-width: $brakepoint) {
      top: auto;
      bottom: -194rem;
      right: -206rem;
    }
  }
  &__content {
    display: grid;
    grid-template-columns: auto 394rem;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: $brakepoint) {
      display: flex;
      flex-direction: column;
      gap: 70rem;
    }
  }
  &__title {
    color: $color_white;
    @include fontStyles($font_1, 32rem, 51rem, 400, 3.2rem);
    margin-bottom: 14rem;
    text-transform: uppercase;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_1, 18rem, 29rem, 400, 1.8rem);
      text-align: center;
      margin-bottom: 12rem;
    }
  }
  &__words {
    position: absolute;
  }
  &__fig {
    display: flex;
    width: 204rem;
    height: 204rem;
    padding: 4rem;
    position: relative;
    @media screen and (max-width: $brakepoint) {
      width: 300rem;
      height: 300rem;
      transform: translate(46rem, 62rem);
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("/images/others/img_border.svg") center/contain no-repeat;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  &__left {
    max-width: 900rem;
    @media screen and (max-width: $brakepoint) {
      max-width: unset;
      width: 100%;
      padding-top: 30rem;
    }
  }
  &__right {
    position: relative;
  }
  &__words {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &-word {
      @include fontStyles($font_3, 16rem, 19rem, 500);
      color: $color_black;
      padding: 8rem 20rem;
      border-radius: 20rem;
      background: $color_white;
      display: inline-block;
      position: absolute;
      width: max-content;
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_3, 13rem, 19rem, 400);
        padding: 6rem 20rem 4rem;
        top: auto !important;
      }
      &--red {
        @include fontStyles($font_1, 20rem, 32rem, 400, 2rem);
        padding: 10rem 20rem 6rem;
        background: $color_primary;
        color: $color_white;
        top: 12rem;
        right: 95rem;
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_1, 13rem, 21rem, 400, 1.3rem);
          background: $color_white;
          color: $color_black;
          bottom: 17rem;
          right: 15rem;
        }
      }
      &--1 {
        top: 49rem;
        right: auto;
        left: -143rem;
        @media screen and (max-width: $brakepoint) {
          left: auto;
          right: 17rem;
          bottom: 257rem;
        }
      }
      &--2 {
        top: 78rem;
        right: 65rem;
        @media screen and (max-width: $brakepoint) {
          left: 9rem;
          bottom: 35rem;
        }
      }
      &--4 {
        top: 140rem;
        right: 107rem;
        @media screen and (max-width: $brakepoint) {
          left: 9rem;
          bottom: 137rem;
        }
      }
      &--3 {
        top: 119rem;
        right: auto;
        left: -108rem;
        @media screen and (max-width: $brakepoint) {
          left: 46rem;
          bottom: 208rem;
        }
      }
    }
  }
  &--minified {
    .test-section {
      &__inner {
        min-height: 500rem;
        border-radius: 20rem;
        padding: 30rem 20rem;
        @media screen and (max-width: $brakepoint) {
          min-height: unset;
          height: 300rem;
          padding: 20rem;
        }
      }
      &__content {
        display: flex;
        flex-direction: column;
        gap: 91rem;
        @media screen and (max-width: $brakepoint) {
          gap: 0;
        }
      }
      &__bg {
        top: auto;
        bottom: -194rem;
        right: -206rem;
        @media screen and (max-width: $brakepoint) {
          bottom: -287rem;
        }
      }
      &__left {
        padding-top: 0;
      }
      &__title {
        color: $color_white;
        @include fontStyles($font_1, 26rem, 41.6rem, 400);
        margin-bottom: 12rem;
        text-transform: uppercase;
        text-align: center;
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_1, 13rem, 20.8rem, 400, 1.3rem);
          margin-bottom: 15rem;
        }
      }
      &__fig {
        display: flex;
        width: 310rem;
        height: 310rem;
        transform: translate(76rem, 86rem);
        padding: 4rem;
        position: relative;
        @media screen and (max-width: $brakepoint) {
          width: 180rem;
          height: 180rem;
          transform: translate(0, 8rem);
        }
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("/images/others/img_border.svg") center/contain no-repeat;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      &__words {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        &-word {
          @include fontStyles($font_3, 15rem, unset, 400);
          color: $color_black;
          padding: 6rem 20rem 4rem;
          border-radius: 20rem;
          background: $color_bg;
          display: inline-block;
          position: absolute;
          width: max-content;
          top: auto !important;
          @media screen and (max-width: $brakepoint) {
            @include fontStyles($font_3, 12rem, 18rem, 400);
            padding: 6rem 12rem 4rem;
          }
          &--red {
            @include fontStyles($font_1, 13rem, 21rem, 400, 1.3rem);
            background: $color_white;
            color: $color_black;
            bottom: 0rem;
            right: 0rem;
            padding: 9rem 20rem 5rem;
            @media screen and (max-width: $brakepoint) {
              @include fontStyles($font_1, 12rem, 19.2rem, 400, 1.2rem);
              padding: 8rem 12rem 4rem;
              bottom: 15rem;
              right: -25rem;
            }
          }
          &--1 {
            left: auto;
            right: 44rem;
            bottom: 257rem;
            @media screen and (max-width: $brakepoint) {
              right: -30rem;
              bottom: 135rem;
            }
          }
          &--2 {
            left: -16rem;
            bottom: 20rem;
            @media screen and (max-width: $brakepoint) {
              left: -32rem;
              bottom: 20rem;
            }
          }
          &--4 {
            left: -15rem;
            bottom: 116rem;
            @media screen and (max-width: $brakepoint) {
              display: none;
            }
          }
          &--3 {
            left: 20rem;
            bottom: 191rem;
            @media screen and (max-width: $brakepoint) {
              left: -38rem;
              bottom: 122rem;
            }
          }
        }
      }
    }
  }
  &--onslider {
    .test-section {
      &__inner {
        @media screen and (max-width: $brakepoint) {
          width: 270rem;
        }
      }
    }
  }
}
</style>
