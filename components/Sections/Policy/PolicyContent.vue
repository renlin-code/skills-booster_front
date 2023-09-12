<template>
  <section class="policy-content">
    <div class="policy-content__inner sb-container">
      <h1 class="policy-content__title sb-noselect">{{ content.title }}</h1>
      <h2 class="policy-content__subtitle sb-noselect" v-if="content.subtitle">
        {{ content.subtitle }}
      </h2>
      <div class="policy-content__html" v-html="content.content"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PolicyContent",
  props: {
    content: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
.policy-content {
  &__inner {
    background: $color_bg;
    padding: 60rem 50rem;
    border-radius: 50rem;
    @media screen and (max-width: $brakepoint) {
      padding: 30rem 15rem;
      border-radius: 30rem;
    }
  }
  &__title {
    @include fontStyles($font_2, 42rem, 67.2rem, 600);
    margin-bottom: 40rem;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_2, 19rem, 30.4rem, 600);
      margin-bottom: 16rem;
    }
  }
  &__subtitle {
    @include fontStyles($font_2, 26rem, 41.6rem, 600);
    margin-bottom: 30rem;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_2, 16rem, 25.6rem, 600);
      margin-bottom: 24rem;
    }
  }
  &__html {
    @include fontStyles($font_3, 20rem, 30rem, 400, 1rem);
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_3, 14rem, 21rem, 400, 0.7rem);
    }
    em, a {
      color: $color_primary;
    }
    h4 {
      color: $color_primary;
      text-transform: uppercase;
      @include fontStyles($font_3, 22rem, 35.2rem, 600, 2.2rem);
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_3, 16rem, unset, 600);
        margin-top: 6rem;
      }
    }
  }
}
</style>
