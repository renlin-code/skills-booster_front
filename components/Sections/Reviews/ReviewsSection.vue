<template>
  <section class="reviews-section sb-noselect">
    <div class="reviews-section__inner sb-container">
      <Transition name="fade">
        <div v-if="!pending">
          <h1 class="reviews-section__title">{{ content.title }}</h1>
          <h2 class="reviews-section__subtitle">{{ content.subtitle }}</h2>
          <p class="reviews-section__text">{{ content.text }}</p>
          <div class="reviews-section__filters">
            <div class="reviews-section__search">
              <label class="reviews-section__search-label">Поиск по названию школы</label>
              <SearchInput
                class="reviews-section__rearch-el"
                placeholder="Введите название школы"
                v-model="searchQuery"
              />
            </div>
            <div class="reviews-section__sort">
              <label class="reviews-section__sort-label">Сортировать по:</label>
              <Chips
                :items="sortOptions"
                @select-chip="switchSortOption"
                :injectedSelectedIndex="selectedTabIndex"
              />
            </div>
          </div>
          <div
            class="reviews-section__body"
            :class="{ 'reviews-section__body--loading': pendingGrid }"
          >
            <Transition name="fade">
              <ul class="reviews-section__schools" v-show="!pendingGrid">
                <li
                  class="reviews-section__schools-element"
                  v-for="school in templateSchools"
                >
                  <SchoolCard :content="school" />
                </li>
              </ul>
            </Transition>
            <Transition name="fade">
              <RingPreloader
                class="reviews-section__loading reviews-section__loading--grid"
                v-if="pendingGrid"
              />
            </Transition>
            <NoResultsView
              class="reviews-section__no-results"
              v-if="!templateSchools.length && !pendingGrid"
            >
              Извините, но по вашему запросу нет школ. Попробуйте изменить запрос
            </NoResultsView>
          </div>
          <Transition name="fade">
            <RingPreloader
              class="reviews-section__loading reviews-section__loading--load-more"
              v-if="pendingLoadMore"
            />
          </Transition>
        </div>
      </Transition>
      <RingPreloader class="reviews-section__loading" v-if="pending" />
    </div>
  </section>
</template>

<script>
import { REQUEST_MIN_DELAY } from "~/utils/constants.js";
import { lazyLoadHandler } from "~/utils/lazyLoadHandler.js";
import _ from "lodash";

import SearchInput from "~/components/Others/SearchInput.vue";
import Chips from "~/components/Others/Chips.vue";
import SchoolCard from "~/components/Others/SchoolCard.vue";
import RingPreloader from "~/components/Preloaders/RingPreloader.vue";
import Pagination from "~/components/Others/Pagination.vue";
import MainButton from "~/components/Buttons/MainButton.vue";
import NoResultsView from "~/components/Others/NoResultsView.vue";

export default {
  name: "ReviewsSection",
  components: {
    SearchInput,
    Chips,
    SchoolCard,
    RingPreloader,
    Pagination,
    MainButton,
    NoResultsView,
  },
  props: {
    content: {
      type: Object,
    },
  },
  data: () => ({
    templateSchools: [],
    sortOptions: ["Рейтинг", "Отзывы", "Название"],
    selectedTabIndex: 0,
    sortQuery: "",
    searchQuery: "",
    pending: false,
    pendingLoadMore: false,
    pendingGrid: false,
    currentPage: 1,
    totalPages: null,
  }),
  methods: {
    switchSortOption(index) {
      switch (index) {
        case 0:
          this.sortQuery = "average";
          break;
        case 1:
          this.sortQuery = "reviews";
          break;
        case 2:
          this.sortQuery = "name";
          break;
      }

      this.selectedTabIndex = index;

      this.pendingGrid = true;
      this.debouncedFetchData(true);
    },
    async fetchData(resetData) {
      try {
        if (resetData) {
          this.currentPage = 1;
        }
        const data = await this.$axios.$get("/wp-json/get/schools", {
          params: {
            page: this.currentPage,
            per_page: 10,
            sort_by: this.sortQuery,
            search: this.searchQuery,
          },
        });
        const { schools, total_pages } = data;
        this.totalPages = total_pages;

        if (resetData) {
          this.templateSchools = [];
        }

        this.templateSchools.push(...schools);
      } catch (error) {
        console.error(error)
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
      if (this.currentPage === this.totalPages || this.pending || this.pendingLoadMore) return;
      this.currentPage++;
      this.pendingLoadMore = true;
      await this.$nextTick();
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
    lazyLoadHandler(this.loadMore);
  },
};
</script>

<style scoped lang="scss">
.reviews-section {
  &__inner {
    min-height: 600rem;
    @media screen and (max-width: $brakepoint) {
      padding: 0;
      min-height: 400rem;
    }
  }
  &__title {
    @include fontStyles($font_2, 42rem, 67.2rem, 600);
    margin-bottom: 30rem;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_2, 19rem, 30.4rem, 600);
      margin-bottom: 16rem;
      padding: 0 15rem;
    }
  }
  &__subtitle {
    @include fontStyles($font_2, 26rem, 41.6rem, 600);
    margin-bottom: 30rem;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_2, 16rem, 25.6rem, 600);
      margin-bottom: 16rem;
      padding: 0 15rem;
    }
  }
  &__text {
    @include fontStyles($font_3, 22rem, 35.2rem, 400);
    margin-bottom: 60rem;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_3, 14rem, 21rem, 400);
      margin-bottom: 24rem;
      padding: 0 15rem;
    }
  }
  &__filters {
    display: grid;
    grid-template-columns: 490rem auto;
    justify-content: space-between;
    margin-bottom: 50rem;
    @media screen and (max-width: $brakepoint) {
      display: flex;
      flex-direction: column;
      gap: 16rem;
      margin-bottom: 24rem;
    }
  }
  &__search,
  &__sort {
    &-label {
      @include fontStyles($font_3, 20rem, 24.3rem, 500);
      margin-bottom: 25rem;
      display: inline-block;
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_3, 15rem, 24rem, 600);
        margin-bottom: 16rem;
      }
    }
  }
  &__search {
    @media screen and (max-width: $brakepoint) {
      padding: 0 15rem;
    }
  }
  &__sort {
    &-label {
      @media screen and (max-width: $brakepoint) {
        padding: 0 15rem;
      }
    }
  }
  &__body {
    width: 100%;
    position: relative;
    @media screen and (max-width: $brakepoint) {
      padding: 0 15rem;
    }
    &--loading {
      min-height: 470rem;
      @media screen and (max-width: $brakepoint) {
        min-height: 160vh;
      }
    }
  }
  &__schools {
    display: flex;
    flex-direction: column;
    gap: 40rem;
    @media screen and (max-width: $brakepoint) {
      gap: 16rem;
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
      top: 0 !important;
      left: 0 !important;
      display: flex;
      justify-content: center;
      padding-top: 240rem;
      transform: unset !important;
      @media screen and (max-width: $brakepoint) {
        padding-top: 100rem;
      }
    }
    &--load-more {
      margin: 0 auto;
      position: static;
      transform: none;
      margin-top: 30rem;
      @media screen and (max-width: $brakepoint) {
        margin-top: 24rem;
      }
    }
  }
  &__no-results {
    margin: 150rem 0;
    @media screen and (max-width: $brakepoint) {
      margin: 100rem 0;
    }
  }
}
</style>
