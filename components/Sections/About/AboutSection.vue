<template>
  <section class="about-section sb-noselect">
    <div class="about-section__inner sb-container">
      <h1 class="about-section__title">{{ content.title }}</h1>
      <div class="about-section__grid">
        <div class="about-section__description" v-html="content.description"></div>
        <AutorCard title="Авторы проекта" :autors="content.autors" />
      </div>
    </div>
  </section>
</template>

<script>
import AutorCard from '~/components/Others/AutorCard.vue';

export default {
    name: "AboutSection",
    components: { AutorCard },
    props: {
      content: {
        type: Object
      }
    }
}
</script>

<style scoped lang="scss">
.about-section {
  &__inner {
    padding: 60rem 50rem;
    background: $color_bg;
    border-radius: 50rem;
    @media screen and (max-width: $brakepoint) {
      padding: 30rem 15rem;
      border-radius: 30rem;
    }
  }
  &__title {
    @include fontStyles($font_2, 42rem, 67.2rem, 600);
    margin-bottom: 50rem;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_2, 19rem, 30.4rem, 600);
      margin-bottom: 24rem;
    }
  }
  &__grid {
    display: grid;
    grid-template-columns: 1050rem 400rem;
    justify-content: space-between;
    @media screen and (max-width: $brakepoint) {
      display: flex;
      flex-direction: column-reverse;
      gap: 24rem;
    }
  }
  &__description {
    @include fontStyles($font_3, 20rem, 30rem, 400);
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_3, 14rem, 21rem, 400, 0.7rem);
    }
  }
}
</style>
