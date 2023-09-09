<template>
  <div class="autor-card">
    <div class="autor-card__inner">
      <span class="autor-card__title sb-noselect">{{ title }}</span>
      <figure class="autor-card__figure">
        <img :src="autor.img" alt="" />
      </figure>
      <span class="autor-card__name">{{ autor.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AutorCard",
  props: {
    title: {
      type: String
    },
    autor: {
      type: Object
    }
  }
};
</script>

<style scoped lang="scss">
.autor-card {
  &__inner {
    border-radius: 20rem;
    background: $color_black;
    padding: 40rem;
    min-height: 500rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 26rem;
    @media screen and (max-width: $brakepoint) {
      padding: 20rem;
      gap: 15rem;
      min-height: unset;
      margin: 0 15rem;
    }
  }
  &__title {
    color: $color_white;
    @include fontStyles($font_1, 28rem, 44.8rem, 400);
    text-align: center;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_1, 18rem, 28.8rem, 400, 1.8rem);
    }
  }
  &__figure {
    display: flex;
    width: 243rem;
    height: 243rem;
    padding: 10rem;
    position: relative;
    @media screen and (max-width: $brakepoint) {
      width: 87rem;
      height: 87rem;
      padding: 4rem;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("/images/others/img_border2.svg") center/contain no-repeat;
      @media screen and (max-width: $brakepoint) {
      }
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  &__name {
    color: $color_white;
    @include fontStyles($font_2, 26rem, 41.6rem, 600);
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_2, 16rem, 24rem, 700, 0.8rem);
    }
  }
}
</style>
