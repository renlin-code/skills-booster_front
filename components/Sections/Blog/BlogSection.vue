<template>
  <section class="blog sb-noselect">
    <div class="blog__inner sb-container">
      <Transition name="fade">
        <div v-if="!pending">
          <div class="blog__header">
            <h1 v-if="extended" class="blog__title sb-section-title">
              {{ injectedTitle }}
            </h1>
            <h2 v-else class="blog__title sb-section-title">
              {{ injectedTitle }}
            </h2>
            <NuxtLink
              v-if="!extended && !isMobile"
              class="blog__subheader-link"
              to="/blog"
            >
              <TextArrowButton>Все статьи</TextArrowButton>
            </NuxtLink>
          </div>
          <div v-if="extended" class="blog__subheader">
            <Chips
              :items="chipsOptions"
              @select-chip="switchCategory"
              :injectedSelectedIndex="selectedTabIndex"
            />
            <div class="blog__search">
              <SearchInput
                class="blog__search-el"
                placeholder="Поиск"
                v-model="searchQuery"
              />
            </div>
          </div>
          <div class="blog__body" :class="{ 'blog__body--loading': pendingGrid }">
            <Transition name="fade">
              <ul class="blog__articles" v-show="!pendingGrid">
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
                v-if="pendingGrid"
              />
            </Transition>
            <NoResultsView
              class="blog__no-results"
              v-if="!templateArticles.length && !pendingGrid"
            >
              Извините, но по вашему запросу нет статей. Попробуйте изменить запрос
            </NoResultsView>
          </div>
          <div class="blog__bottom">
            <NuxtLink v-if="!extended" to="/blog" class="blog__link-to-all">
              <MainButton arrow type="1">Перейти ко всем статьям</MainButton>
            </NuxtLink>
            <Transition name="fade">
              <RingPreloader
                class="blog__loading blog__loading--load-more"
                v-if="pendingLoadMore"
              />
            </Transition>
          </div>
        </div>
      </Transition>
      <RingPreloader class="blog__loading" v-if="pending" />
    </div>
  </section>
</template>

<script>
import { REQUEST_MIN_DELAY } from "~/utils/constants.js";
import { lazyLoadHandler } from "~/utils/lazyLoadHandler.js";
import _ from "lodash";
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
    selectedTabIndex: 0,
    searchQuery: "",
    pending: false,
    pendingLoadMore: false,
    pendingGrid: false,
    currentPage: 1,
    totalPages: null,
  }),
  computed: {
    chipsOptions() {
      return ["Все категории", ...this.allCategories.map((cat) => cat.title)];
    },
  },
  methods: {
    switchCategory(index) {
      this.selectedCatId = index > 0 ? this.allCategories[index - 1].id : "";
      this.selectedTabIndex = index;

      this.pendingGrid = true;
      this.debouncedFetchData(true);
    },
    async fetchData(resetData) {
      try {
        if (resetData) {
          this.currentPage = 1;
        }
        const data = await this.$axios.$get("/wp-json/get/articles/", {
          params: {
            category_id: this.selectedCatId,
            search: this.searchQuery,
            page: this.currentPage,
            per_page: this.extended ? 12 : 6,
          },
        });
        const { articles, all_categories, total_pages } = data;
        this.allCategories = all_categories;
        this.totalPages = total_pages;

        if (resetData) {
          this.templateArticles = [];
        }
        let minifiedCounter = 0;
        articles.forEach((i) => {
          this.templateArticles.push({
            ...i,
            minified: this.isMobile
              ? minifiedCounter % 2 !== 0
              : minifiedCounter > 0 && minifiedCounter < 5,
          });
          if (this.isMobile) {
            minifiedCounter++;
          } else {
            minifiedCounter = minifiedCounter < 5 ? minifiedCounter + 1 : 0;
          }
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.pending = false;
        this.pendingGrid = false;
        this.pendingLoadMore = false;
      }
    },
    debouncedFetchData: _.debounce(function (resetData) {
      this.fetchData(resetData);
    }, REQUEST_MIN_DELAY),
    async loadMore() {
      if (this.currentPage === this.totalPages || this.pending) return;
      this.currentPage++;
      this.pendingLoadMore = true;
      await this.fetchData(false);
    },
  },
  watch: {
    searchQuery() {
      this.pendingGrid = true;
      this.debouncedFetchData(true);
    },
  },
  created() {
    this.pending = true;
    this.debouncedFetchData(true);
  },
  mounted() {
    this.mediaQueryHook();
    if (this.extended) {
      lazyLoadHandler(this.loadMore);
    }
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
      padding: 0 15rem;
      margin-bottom: 24rem;
    }
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
      transform: unset;
      @media screen and (max-width: $brakepoint) {
        padding-top: 100rem;
      }
    }
    &--load-more {
      position: static;
      transform: none;
      margin: 0 auto;
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
    display: block;
    @media screen and (max-width: $brakepoint) {
      width: 100%;
      padding: 0 15rem;
    }
  }
  &__bottom {
    margin-top: 30rem;
    @media screen and (max-width: $brakepoint) {
      margin-top: 24rem;
    }
  }
}
</style>
