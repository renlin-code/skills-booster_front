<template>
  <section class="blog sb-noselect">
    <div class="blog__inner sb-container">
      <Transition name="fade">
        <div v-if="!pending">
          <div class="blog__header">
            <h1 v-if="extended" class="blog__title sb-section-title">
              <span v-if="!isMobile">&nbsp &nbsp &nbsp &nbsp &nbsp</span
              >{{ injectedTitle }}
            </h1>
            <h2 v-else class="blog__title sb-section-title">
              <span v-if="!isMobile">&nbsp &nbsp &nbsp &nbsp &nbsp</span
              >{{ injectedTitle }}
            </h2>
            <div class="blog__vector" v-if="!isMobile"></div>
          </div>
          <div class="blog__subheader">
            <Chips :items="chipsOptions" @select-chip="switchCategory" />
            <NuxtLink class="blog__subheader-link" v-if="!extended && !isMobile" to="/blog">
              <TextArrowButton>Все статьи</TextArrowButton>
            </NuxtLink>
            <div v-if="extended" class="blog__search">
              <SearchInput
                class="blog__search-el"
                placeholder="Поиск"
                v-model="searchQuery"
              />
            </div>
          </div>
          <div
            class="blog__body"
            :class="{ 'blog__body--loading': pendingGridQueue !== 0 }"
          >
            <Transition name="fade">
              <ul class="blog__articles" v-show="pendingGridQueue === 0">
                <li
                  class="blog__articles-element"
                  v-for="article in templateArticles"
                  :key="article.id"
                >
                  <ArticleCard :minified="article.minified" :content="article" />
                </li>
              </ul>
            </Transition>
            <Transition name="fade">
              <RingPreloader
                class="blog__loading blog__loading--grid"
                v-if="pendingGridQueue !== 0"
              />
            </Transition>
            <NoResultsView
              class="blog__no-results"
              v-if="!templateArticles.length && pendingGridQueue === 0"
            >
              Извините, но по вашему запросу нет статей. Попробуйте изменить запрос
            </NoResultsView>
          </div>
          <div v-if="!extended" class="blog__link-to-all">
            <NuxtLink to="/blog">
              <MainButton arrow type="1">Перейти ко всем статьям</MainButton>
            </NuxtLink>
          </div>
          <div v-else>
            <div
              class="blog__load-more"
              v-if="
                (totalItems > itemsPerPage && currentPage !== totalPages) ||
                pendingLoadMore
              "
            >
              <Transition name="fade">
                <MainButton
                  type="3"
                  @click.native="loadMore"
                  v-if="!pendingLoadMore && pendingGridQueue === 0"
                  >Показать еще</MainButton
                >
              </Transition>
              <Transition name="fade">
                <RingPreloader
                  class="blog__loading blog__loading"
                  v-if="pendingLoadMore"
                />
              </Transition>
            </div>
          </div>
        </div>
      </Transition>
      <RingPreloader class="blog__loading" v-if="pending" />
    </div>
  </section>
</template>

<script>
import { REQUEST_MIN_DELAY } from "~/utils/constants.js";
import mediaQueryMixin from "~/mixins/mediaQueryMixin";

import Chips from "~/components/Others/Chips";
import TextArrowButton from "~/components/Buttons/TextArrowButton";
import ArticleCard from "~/components/Others/ArticleCard";
import MainButton from "~/components/Buttons/MainButton.vue";
import SearchInput from "~/components/Others/SearchInput";
import RingPreloader from "~/components/Preloaders/RingPreloader";
import NoResultsView from "~/components/Others/NoResultsView.vue";

export default {
  name: "BlogSection",
  mixins: [mediaQueryMixin],
  components: {
    Chips,
    TextArrowButton,
    ArticleCard,
    MainButton,
    SearchInput,
    RingPreloader,
    NoResultsView,
  },
  props: {
    extended: {
      type: Boolean,
      default: false,
    },
    injectedTitle: {
      type: String,
    },
  },
  data: () => ({
    templateArticles: [],
    allCategories: [],
    selectedCatId: "",
    searchQuery: "",
    pending: true,
    pendingLoadMore: false,
    pendingGrid: false,
    pendingGridQueue: 0,
    itemsPerPage: 6,
    totalItems: null,
    currentPage: 1,
    totalPages: null,
  }),
  computed: {
    chipsOptions() {
      return ["Все категории", ...this.allCategories.map((cat) => cat.title)];
    },
    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.items.slice(startIndex, endIndex);
    },
  },
  methods: {
    async switchCategory(index) {
      this.selectedCatId = index > 0 ? this.allCategories[index - 1].id : "";
      this.pendingGridQueue++;
      setTimeout(async () => {
        this.itemsPerPage = 6;
        await this.fetchData();
        this.pendingGridQueue--;
      }, REQUEST_MIN_DELAY);
    },
    async fetchData() {
      const data = await this.$axios.$get("/wp-json/get/articles/", {
        params: {
          category_id: this.selectedCatId,
          search: this.searchQuery,
          page: this.currentPage,
          per_page: this.itemsPerPage,
        },
      });
      this.allCategories = data.all_categories;
      this.totalItems = data.total_pages * this.itemsPerPage;
      const { articles } = data;

      this.templateArticles = [];
      let minifiedCounter = 0;
      articles.forEach((i) => {
        this.templateArticles.push({
          ...i,
          minified: minifiedCounter > 0 && minifiedCounter < 5,
        });
        minifiedCounter = minifiedCounter < 5 ? minifiedCounter + 1 : 0;
      });
    },
    async loadMore() {
      this.itemsPerPage += 6;
      this.pendingLoadMore = true;
      setTimeout(async () => {
        await this.fetchData();
        this.pendingLoadMore = false;
      }, REQUEST_MIN_DELAY);
    },
  },
  watch: {
    async searchQuery() {
      this.pendingGrid = true;
      this.pendingGridQueue++;
      setTimeout(async () => {
        await this.fetchData();
        this.pendingGrid = false;
        this.pendingGridQueue--;
      }, REQUEST_MIN_DELAY);
    },
  },
  async created() {
    setTimeout(async () => {
      await this.fetchData();
      this.pending = false;
    }, REQUEST_MIN_DELAY);
  },
  mounted() {
    this.mediaQueryHook();
  },
};
</script>

<style scoped lang="scss">
.blog {
  &__inner {
    width: 100%;
    position: relative;
    background: $color_bg;
    border-radius: 50rem;
    padding: 60rem 50rem;
    min-height: 600rem;
    @media screen and (max-width: $brakepoint) {
      border-radius: 30rem;
      padding: 30rem 0;
      min-height: 400rem;
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
    align-items: flex-start;
    margin-bottom: 30rem;
    @media screen and (max-width: $brakepoint) {
      display: flex;
      flex-direction: column-reverse;
      margin-bottom: 24rem;
    }
    &-link {
      margin-top: 10rem;
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
  }
  &__body {
    width: 100%;
    position: relative;
    &--loading {
      min-height: 470rem;
      @media screen and (max-width: $brakepoint) {
        min-height: 40vh;
      }
    }
  }
  &__loading {
    width: min-content;
    position: absolute;
    margin-bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    &--grid {
      width: 100% !important;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      padding-top: 240rem;
      background: rgba($color-bg, 0.6);
      transform: unset;
      @media screen and (max-width: $brakepoint) {
        padding-top: 100rem;
      }
    }
  }
  &__articles {
    display: flex;
    flex-wrap: wrap;
    column-gap: 20rem;
    row-gap: 40rem;
    @media screen and (max-width: $brakepoint) {
      flex-wrap: nowrap;
      flex-direction: column;
      row-gap: 16rem;
      padding: 0 15rem;
    }
  }
  &__no-results {
    margin: 150rem 0;
    @media screen and (max-width: $brakepoint) {
      margin: 100rem 0;
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
    height: 70rem;
    position: relative;
    margin-top: 30rem;
    @media screen and (max-width: $brakepoint) {
      width: 100%;
      height: 47rem;
      padding: 0 15rem;
      margin-top: 24rem;
    }
  }
  &__link-to-all {
    margin-top: 30rem;
    @media screen and (max-width: $brakepoint) {
      margin-top: 24rem;
    }
  }
}
</style>
