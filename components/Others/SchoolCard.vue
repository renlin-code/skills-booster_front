<template>
  <div class="school-card">
    <div class="school-card__inner">
      <div class="school-card__top">
        <div class="school-card__logo-name">
          <NuxtLink to="/">
            <img :src="content.logo" alt="" />
            <span>{{ content.title }}</span>
          </NuxtLink>
        </div>
        <div class="school-card__average">
          <span>{{ averageFormatted }}</span>
          <div class="school-card__average-stars">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div
              class="school-card__average-stars-layer"
              :style="`width: ${100 - content.reviews_average * 20}%`"
            ></div>
          </div>
        </div>
        <div class="school-card__reviews-button mobile-hidden">
          <NuxtLink :to="`/schools-reviews/${content.slug}-${content.id}`">
            <MainButton type="1">{{ reviewsFormatted }}</MainButton>
          </NuxtLink>
        </div>
      </div>
      <div class="school-card__bottom">
        <p class="school-card__description">
          {{ content.description }}
        </p>
        <div class="school-card__reviews-button desktop-hidden">
          <NuxtLink :to="`/schools-reviews/${content.slug}-${content.id}`">
            <MainButton type="1">{{ reviewsFormatted }}</MainButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainButton from "../Buttons/MainButton.vue";

export default {
  name: "SchoolCard",
  components: { MainButton },
  props: {
    content: {
      type: Object,
    },
  },
  computed: {
    averageFormatted() {
      const number = this.content?.reviews_average;
      return number
        ? Number.isInteger(number)
          ? `${number}.00`
          : number.toFixed(2)
        : "0";
    },
    reviewsFormatted() {
      const words = ["отзыв", "отзыва", "отзывов"];
      const number = this.content?.reviews_total;
      let n = Math.abs(number);
      n %= 100;
      if (n >= 5 && n <= 20) {
        return `${number} ${words[2]}`;
      }
      n %= 10;
      if (n === 1) {
        return `${number} ${words[0]}`;
      }
      if (n >= 2 && n <= 4) {
        return `${number} ${words[1]}`;
      }
      return `${number} ${words[2]}`;
    },
  },
};
</script>

<style scoped lang="scss">
.school-card {
  &__inner {
    padding: 30rem 50rem;
    border-radius: 30rem;
    background: $color_bg;
    @media screen and (max-width: $brakepoint) {
      padding: 20rem 15rem;
      border-radius: 20rem;
    }
  }
  &__top {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 50rem;
    padding-bottom: 20rem;
    border-bottom: 1rem solid rgba($color_gray, 0.5);
    @media screen and (max-width: $brakepoint) {
      display: flex;
      flex-direction: column;
      gap: 12rem;
      border-bottom: none;
      padding-bottom: 16rem;
    }
  }
  &__logo-name a {
    display: inline-flex;
    align-items: center;
    gap: 30rem;
    @media screen and (max-width: $brakepoint) {
      gap: 10rem;
    }
    img {
      width: 90rem;
      height: 90rem;
      @media screen and (max-width: $brakepoint) {
        width: 40rem;
        height: 40rem;
      }
    }
    span {
      @include fontStyles($font_2, 22rem, 33rem, 700, 1.1rem);
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_2, 15rem, 22.5rem, 700, 0.75rem);
      }
    }
  }
  &__average {
    display: flex;
    align-items: center;
    gap: 17rem;
    @media screen and (max-width: $brakepoint) {
      gap: 10rem;
    }
    span {
      padding-top: 12rem;
      @include fontStyles($font_1, 28rem, 30.8rem, 400);
      @media screen and (max-width: $brakepoint) {
        padding-top: 8rem;
        @include fontStyles($font_1, 16rem, 17.6rem, 400);
      }
    }
    &-stars {
      position: relative;
      ul {
        display: flex;
        li {
          width: 33rem;
          height: 33rem;
          background: url("/images/icons/star_dark.svg") center/contain no-repeat;
          @media screen and (max-width: $brakepoint) {
            width: 20rem;
            height: 20rem;
          }
        }
      }
      &-layer {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        backdrop-filter: grayscale(1);
        width: 0%;
      }
    }
  }
  &__reviews-button {
    min-width: 200rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: $brakepoint) {
      min-width: unset;
      width: 100%;
    }
  }
  &__description {
    padding-top: 20rem;
    @include fontStyles($font_3, 20rem, 30rem, 400, 1rem);
    @media screen and (max-width: $brakepoint) {
      padding-top: 0;
      @include fontStyles($font_3, 15rem, 22.5rem, 400, 0.75rem);
      margin-bottom: 16rem;
    }
  }
}
</style>
