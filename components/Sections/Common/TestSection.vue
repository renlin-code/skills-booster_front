<template>
  <section class="test-section sb-noselect">
    <div class="test-section__inner sb-container">
      <div class="test-section__bg"></div>
      <div class="test-section__content">
        <div class="test-section__left">
          <h2 class="test-section__title">Пройдите тест на профориентацию</h2>
          <div class="test-section__button-wrapper">
            <a href="#">
              <MainButton type="2">Пройти тест</MainButton>
            </a>
          </div>
        </div>
        <div class="test-section__right">
          <figure class="test-section__fig">
            <img src="/images/Picture.png" alt="" />
          </figure>
          <ul class="test-section__words">
            <li class="test-section__words-word">Кто ты?</li>
            <li class="test-section__words-word">Маркетолог?</li>
            <li class="test-section__words-word">Дизайнер?</li>
            <li class="test-section__words-word">Менеджер?</li>
            <li class="test-section__words-word">Программист?</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MainButton from "~/components/Buttons/MainButton.vue";

export default {
  name: "TestSection",
  components: {
    MainButton,
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
      0%, 100% {
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
    width: 200rem;
    height: 200rem;
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
      transform: scale(1.04);
      background: url("/images/others/img_border.svg") center/contain no-repeat;
      @media screen and (max-width: $brakepoint) {
        transform: scale(1.03);
      }
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
      &:nth-child(1) {
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
      &:nth-child(2) {
        top: 78rem;
        right: 65rem;
        @media screen and (max-width: $brakepoint) {
          left: 9rem;
          bottom: 35rem;
        }
      }
      &:nth-child(3) {
        top: 140rem;
        right: 107rem;
        @media screen and (max-width: $brakepoint) {
          left: 9rem;
          bottom: 137rem;
        }
      }
      &:nth-child(4) {
        top: 119rem;
        right: auto;
        left: -108rem;
        @media screen and (max-width: $brakepoint) {
          left: 46rem;
          bottom: 208rem;
        }
      }
      &:nth-child(5) {
        top: 49rem;
        right: auto;
        left: -143rem;
        @media screen and (max-width: $brakepoint) {
          left: auto;
          right: 17rem;
          bottom: 257rem;
        }
      }
    }
  }
}
</style>
