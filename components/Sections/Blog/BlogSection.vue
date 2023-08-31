<template>
  <section class="blog sb-noselect">
    <div class="blog__inner sb-container">
      <div class="blog__header">
        <h2 class="blog__title sb-section-title">
          <span class="mobile-hidden">&nbsp &nbsp &nbsp &nbsp &nbsp</span>Делимся опытом
          и советами в блоге
        </h2>
        <div class="blog__vector mobile-hidden"></div>
      </div>
      <div class="blog__subheader">
        <Chips />
        <NuxtLink v-if="!extended" to="/blog" class="mobile-hidden">
          <TextArrowButton>Все статьи</TextArrowButton>
        </NuxtLink>
        <div v-else class="blog__search">
          <SearchInput class="blog__search-el" placeholder="Поиск" />
        </div>
      </div>
      <ul class="blog__articles">
        <li class="blog__articles-element">
          <ArticleCard link-to="/" />
        </li>
        <li class="blog__articles-element">
          <ArticleCard link-to="/" minified />
        </li>
        <li class="blog__articles-element">
          <ArticleCard link-to="/" minified />
        </li>
        <li class="blog__articles-element">
          <ArticleCard link-to="/" minified />
        </li>
        <li class="blog__articles-element">
          <ArticleCard link-to="/" minified />
        </li>
        <li class="blog__articles-element">
          <ArticleCard link-to="/" />
        </li>
      </ul>
      <div v-if="!extended" class="blog__link-to-all">
        <NuxtLink to="/blog">
          <MainButton arrow type="1">Перейти ко всем статьям</MainButton>
        </NuxtLink>
      </div>
      <div v-else>
        <div class="blog__load-more">
          <MainButton type="3">Показать еще</MainButton>
        </div>
        <div class="blog__pagination sb-container">
          <Pagination :total-items="totalItems" :items-per-page="itemsPerPage" @page-changed="handlePageChange" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Chips from "~/components/Others/Chips";
import TextArrowButton from "~/components/Buttons/TextArrowButton";
import ArticleCard from "~/components/Others/ArticleCard";
import MainButton from "~/components/Buttons/MainButton.vue";
import SearchInput from "~/components/Others/SearchInput";
import Pagination from "~/components/Others/Pagination";

export default {
  name: "BlogSection",
  components: {
    Chips,
    TextArrowButton,
    ArticleCard,
    MainButton,
    SearchInput,
    Pagination,
  },
  props: {
    extended: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      totalItems: 120, // Número total de elementos
      itemsPerPage: 6, // Número de elementos por página
      currentPage: 1, // Página actual
      items: [] // Aquí se almacenarían los elementos que se mostrarán en cada página
    };
  },
  computed: {
    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.items.slice(startIndex, endIndex);
    }
  },
  methods: {
    handlePageChange(pageNumber) {
      this.currentPage = pageNumber;
      // Aquí puedes cargar los elementos correspondientes a la página actual
    }
  },
  created() {
    // Aquí puedes cargar los elementos iniciales o realizar una llamada a una API para obtener los datos
    // En este ejemplo, simplemente generamos elementos de ejemplo
    for (let i = 1; i <= this.totalItems; i++) {
      this.items.push({ id: i, name: `Elemento ${i}` });
    }
  }
};
</script>

<style scoped lang="scss">
.blog {
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
  &__subheader {
    display: grid;
    grid-template-columns: 1200rem auto;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 30rem;
    @media screen and (max-width: $brakepoint) {
      display: flex;
      flex-direction: column-reverse;
      margin-bottom: 24rem;
    }
  }
  &__search {
    height: 100%;
    width: 296rem;
    @media screen and (max-width: $brakepoint) {
      width: 100%;
      height: auto;
      padding: 0 15rem;
      margin-bottom: 16rem;
    }
    &-el {
      height: 100%;
      @media screen and (max-width: $brakepoint) {
        height: auto;
      }
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
  &__link-to-all {
    margin: 0 auto;
    width: 405rem;
    @media screen and (max-width: $brakepoint) {
      width: 100%;
      padding: 0 15rem;
    }
  }
  &__load-more {
    margin: 0 auto;
    width: 240rem;
    margin-bottom: 30rem;
    @media screen and (max-width: $brakepoint) {
      width: 100%;
      padding: 0 15rem;
      margin-bottom: 24rem;
    }
  }
}
</style>
