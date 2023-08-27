<template>
  <section class="blog-short">
    <div class="blog-short__inner sb-container">
      <div class="blog-short__header">
        <h2 class="blog-short__title sb-section-title">
          <span class="mobile-hidden">&nbsp &nbsp &nbsp &nbsp &nbsp</span>Делимся опытом и советами в блоге
        </h2>
        <div class="blog-short__vector mobile-hidden"></div>
      </div>
      <div class="blog-short__chips-link">
        <Chips />
        <NuxtLink to="/blog" class="mobile-hidden">
          <TextArrowButton>Все статьи</TextArrowButton>
        </NuxtLink>
      </div>
      <ul class="blog-short__articles">
        <li class="blog-short__articles-element">
          <NuxtLink to="/">
            <ArticleCard />
          </NuxtLink>
        </li>
        <li class="blog-short__articles-element">
          <NuxtLink to="/">
            <ArticleCard minified />
          </NuxtLink>
        </li>
        <li class="blog-short__articles-element">
          <NuxtLink to="/">
            <ArticleCard minified />
          </NuxtLink>
        </li>
        <li class="blog-short__articles-element">
          <NuxtLink to="/">
            <ArticleCard minified />
          </NuxtLink>
        </li>
        <li class="blog-short__articles-element">
          <NuxtLink to="/">
            <ArticleCard minified />
          </NuxtLink>
        </li>
        <li class="blog-short__articles-element">
          <NuxtLink to="/">
            <ArticleCard />
          </NuxtLink>
        </li>
      </ul>
      <div class="blog-short__button-wrapper">
        <NuxtLink to="/blog">
          <MainButton arrow type="1">Перейти ко всем статьям</MainButton>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
import Chips from '~/components/Others/Chips';
import TextArrowButton from '~/components/Buttons/TextArrowButton';
import ArticleCard from '~/components/Others/ArticleCard';
import MainButton from '~/components/Buttons/MainButton.vue';

export default {
  name: "BlogShortSection",
  components: {
    Chips,
    TextArrowButton,
    ArticleCard,
    MainButton
}
};
</script>

<style scoped lang="scss">
.blog-short {
  &__inner {
    background: $color_bg;
    border-radius: 50rem;
    padding: 60rem 50rem;
    @media screen and (max-width: $brakepoint) {
      border-radius: 30rem;
      padding: 30rem 0;
    }
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50rem;
    @media screen and (max-width: $brakepoint) {
      margin-bottom: 16rem;
      padding: 0 15rem;
    }
  }
  &__title {
    width: 550rem;
    @media screen and (max-width: $brakepoint) {
      width: 100%;
    }
  }
  &__vector {
    width: 164rem;
    height: 146rem;
    background: url("/images/others/stars_black.svg") center/contain no-repeat;
  }
  &__chips-link {
    display: grid;
    grid-template-columns: 1200rem auto;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 30rem;
    @media screen and (max-width: $brakepoint) {
      display: block;
      margin-bottom: 24rem;
    }
  }
  &__articles {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 40rem;
    margin-bottom: 30rem;
    @media screen and (max-width: $brakepoint) {
      flex-wrap: nowrap;
      flex-direction: column;
      row-gap: 16rem;
      padding: 0 15rem;
      margin-bottom: 12rem;
    }
  }
  &__button-wrapper {
    margin: 0 auto;
    width: 405rem;
    @media screen and (max-width: $brakepoint) {
      width: 100%;
      padding: 0 15rem;
    }
  }
}
</style>
