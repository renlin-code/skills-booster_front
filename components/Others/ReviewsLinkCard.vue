<template>
  <div class="reviews-link-card">
    <div class="reviews-link-card__content">
      <h2 class="reviews-link-card__title">Посмотрите отзывы о школах и курсах</h2>
      <img src="/images/others/message.png" alt="">
      <NuxtLink to="/schools-reviews">
        <MainButton type="2">Подробнее</MainButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import MainButton from '../Buttons/MainButton.vue';

export default {
    name: "ReviewsLinkCard",
    components: { MainButton }
};
</script>

<style scoped lang="scss">
.reviews-link-card {
  &__content {
    padding: 20rem;
    background: $color_black;
    border-radius: 20rem;
  }
  &__title {
    color: $color_white;
    @include fontStyles($font_1, 26rem, 41.6rem, 400);
    margin-bottom: 12rem;
    text-align: center;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_1, 13rem, 20.8rem, 400, 1.3rem);
    }
  }
  img {
    width: 100%;
    object-fit: contain;
    margin-bottom: 45rem;
    @media screen and (max-width: $brakepoint) {
      display: block;
      width: 182rem;
      margin: 0 auto 19rem;
    }
  }
}
</style>
