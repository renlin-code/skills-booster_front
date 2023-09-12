<template>
  <section class="contacts-section sb-noselect">
    <div class="contacts-section__inner sb-container">
      <div class="contacts-section__grid">
        <div class="contacts-section__left">
          <h1 class="contacts-section__title">{{ content.title }}</h1>
          <p class="contacts-section__description">
            {{ content.description }} <a class="underline-primary" :href="`mailto:${content.email}`" target="_blank">{{ content.email }}</a>
          </p>
          <div class="contacts-section__button">
            <MainButton type="1">Написать нам</MainButton>
          </div>
        </div>
        <div class="contacts-section__right">
          <div class="contacts-section__figure">
            <img :src="content.image" alt="">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MainButton from '~/components/Buttons/MainButton.vue';

export default {
  name: "ContactsSection",
  components: {
    MainButton
  },
  props: {
    content: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
.contacts-section {
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
    margin-bottom: 40rem;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_2, 19rem, 30.4rem, 600);
      margin-bottom: 24rem;
    }
  }
  &__grid {
    display: grid;
    grid-template-columns: 770rem 592rem;
    justify-content: space-between;
    @media screen and (max-width: $brakepoint) {
      display: flex;
      flex-direction: column;
      gap: 24rem;
    }
  }
  &__description {
    @include fontStyles($font_3, 20rem, 30rem, 400, 1rem);
    margin-bottom: 30rem;
    a {
      color: $color_primary;
      font-weight: 600;
      @media screen and (max-width: $brakepoint) {
        font-weight: 400;
      }
    }
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_3, 14rem, 21rem, 400, 0.7rem);
      margin-bottom: 24rem;
    }
  }
  &__button {
    width: 242rem;
    @media screen and (max-width: $brakepoint) {
      width: 100%;
    }
  }
  &__figure {
    display: flex;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
