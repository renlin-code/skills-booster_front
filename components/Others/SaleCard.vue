<template>
  <div class="sale-card" :class="{ 'sale-card--black': black }">
    <div class="sale-card__top">
      <a
        class="sale-card__top-link-layer mobile-hidden"
        target="_blank"
        :href="content.sale_link"
      ></a>
      <div class="sale-card__top-bg mobile-hidden"></div>
      <div class="sale-card__top-content">
        <div class="sale-card__logo-name">
          <img :src="content.school_logo" alt="" />
          <span> {{ content.school_title }} </span>
        </div>
        <div class="sale-card__average-dates">
          <div class="sale-card__average" :style="`opacity: ${averageFormatted ? 1 : 0}`">
            <span>{{ averageFormatted }}</span>
            <div class="sale-card__average-star"></div>
          </div>
          <div class="sale-card__dates">
            <span v-if="content.sale_start">с {{ content.sale_start }}</span>
            <span>до {{ content.sale_end }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="sale-card__bottom">
      <h6 class="sale-card__bottom-title">
        {{ content.sale_title }}
      </h6>
      <p class="sale-card__bottom-text">
        {{ content.sale_description }}
      </p>
      <a class="sale-card__bottom-button" target="_blank" :href="content.sale_link">
        <MainButton type="1" arrow>На страницу акции</MainButton>
      </a>
    </div>
  </div>
</template>

<script>
import MainButton from "../Buttons/MainButton.vue";

export default {
  name: "sale-card",
  components: { MainButton },
  props: {
    black: {
      type: Boolean,
      default: false,
    },
    content: {
      type: Object,
    },
  },
  computed: {
    averageFormatted() {
      const number = this.content?.school_average;
      return number
        ? Number.isInteger(number)
          ? `${number}.00`
          : number.toFixed(2)
        : "";
    },
  },
};
</script>

<style scoped lang="scss">
.sale-card {
  position: relative;
  padding-top: 130rem;
  height: 100%;
  @media screen and (max-width: $brakepoint) {
    width: 270rem;
    padding-top: 80rem;
  }
  &__top {
    width: 100%;
    border-radius: 40rem;
    background: $color_primary;
    padding: 30rem;
    overflow: hidden;
    position: absolute;
    top: 0;
    @media screen and (max-width: $brakepoint) {
      border-radius: 16rem;
      padding: 12rem 16rem;
    }
    &-link-layer {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    &-bg {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0%;
      height: 0%;
      border-top-left-radius: 200%;
      background: rgba($color_white, 0.2);
      transform-origin: right bottom;
      transition: all 0.4s ease-in-out;
    }
    &:hover {
      .sale-card__top {
        &-bg {
          width: 150%;
          height: 150%;
        }
      }
    }
  }
  &__logo-name {
    display: flex;
    align-items: center;
    gap: 30rem;
    margin-bottom: 20rem;
    @media screen and (max-width: $brakepoint) {
      gap: 16rem;
      margin-bottom: 16rem;
    }
    img {
      width: 60rem;
      height: 60rem;
      object-fit: cover;
      background-color: $color_white;
      @media screen and (max-width: $brakepoint) {
        width: 40rem;
        height: 40rem;
      }
    }
    span {
      color: $color_white;
      @include fontStyles($font_2, 22rem, 33rem, 700, 1.1rem);
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_2, 14rem, 21rem, 400);
      }
    }
  }
  &__average-dates {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__average {
    display: flex;
    align-items: center;
    gap: 5rem;
    span {
      color: $color_white;
      @include fontStyles($font_3, 20rem, 32rem, 600, 1.1rem);
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_3, 13rem, 19.5rem, 400);
      }
    }
    &-star {
      width: 30rem;
      height: 30rem;
      background: url("/images/icons/star.svg") center/contain no-repeat;
      @media screen and (max-width: $brakepoint) {
        width: 20rem;
        height: 20rem;
      }
    }
  }
  &__dates {
    display: flex;
    align-items: center;
    gap: 20rem;
    @media screen and (max-width: $brakepoint) {
      gap: 13rem;
    }
    span {
      color: $color_white;
      @include fontStyles($font_3, 20rem, 32rem, 600, 1.1rem);
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_3, 11rem, 19.5rem, 400);
      }
    }
  }
  &__bottom {
    padding: 60rem 40rem 20rem;
    border-radius: 30rem;
    border: 1rem solid $color_black;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    @media screen and (max-width: $brakepoint) {
      padding: 32rem 16rem 12rem;
      border-radius: 16rem;
    }
    &-title {
      @include fontStyles($font_1, 20rem, 32rem, 400, 2rem);
      text-align: center;
      margin-bottom: 16rem;
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_1, 13rem, 20.8rem, 400, 1.3rem);
        margin-bottom: 6rem;
      }
    }
    &-text {
      @include fontStyles($font_3, 18rem, 29rem, 400, 1rem);
      text-align: center;
      margin-bottom: 16rem;
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_3, 13rem, 19.5rem, 400);
        margin-bottom: 6rem;
      }
    }
  }
  &--black {
    .sale-card {
      &__top {
        background: $color_black;
      }
    }
  }
}
</style>
