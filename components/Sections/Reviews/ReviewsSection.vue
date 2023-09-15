<template>
  <section class="reviews-section sb-noselect">
    <div class="reviews-section__inner sb-container">
      <Transition name="fade">
        <div v-show="!pendingRender">
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
              <Chips :items="sortOptions" @select-chip="switchSortOption" />
            </div>
          </div>
          <div
            class="reviews-section__body"
            :class="{ 'reviews-section__body--loading': pendingSchools }"
          >
            <ul class="reviews-section__schools" v-if="!pendingSchools">
              <li
                class="reviews-section__schools-element"
                v-for="school in templateSchools"
              >
                <SchoolCard :content="school" />
              </li>
            </ul>
            <Transition name="fade">
              <RingPreloader class="reviews-section__loading" v-if="pendingSchools" />
            </Transition>
            <NoResultsView
              class="reviews-section__no-results"
              v-if="templateSchools.length === 0"
            >
              Извините, но по вашему запросу нет школ. Попробуйте изменить запрос
            </NoResultsView>
          </div>
          <div
            class="reviews-section__load-more"
            v-if="
              (totalItems > itemsPerPage && currentPage !== totalPages) || pendingLoadMore
            "
          >
            <Transition name="fade">
              <MainButton
                type="3"
                @click.native="loadMore"
                v-if="!pendingLoadMore && !pendingSchools"
                >Показать еще</MainButton
              >
            </Transition>
            <Transition name="fade">
              <RingPreloader
                class="reviews-section__loading reviews-section__loading"
                v-if="pendingLoadMore"
              />
            </Transition>
          </div>
          <div
            class="reviews-section__pagination sb-container"
            v-show="totalItems > itemsPerPage"
          >
            <Pagination
              v-if="totalItems"
              :total-items="totalItems"
              :items-per-page="itemsPerPage"
              @page-changed="handlePageChange"
              @total-pages="setTotalPages"
            />
          </div>
        </div>
      </Transition>
      <Transition name="fade">
        <RingPreloader class="reviews-section__loading" v-show="pendingRender" />
      </Transition>
    </div>
  </section>
</template>

<script>
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
    searchQuery: "",
    sortOptions: ["Рейтинг", "Отзывы", "Название"],
    sortQuery: "",
    templateSchools: [],
    totalPending: 0,
    pendingRender: true,
    pendingSchools: false,
    pendingLoadMore: false,
    itemsPerPage: 6,
    totalItems: null,
    currentPage: 1,
    totalPages: null,
  }),
  methods: {
    async switchSortOption(index) {
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
      this.pendingSchools = true;
      await this.fetchData();
      this.pendingSchools = this.totalPending !== 0;
    },
    async fetchData() {
      this.totalPending++;
      const data = await this.$axios.$get("/wp-json/get/schools", {
        params: {
          page: this.currentPage,
          per_page: this.itemsPerPage,
          sort_by: this.sortQuery,
          search: this.searchQuery,
        },
      });
      this.totalItems = data.total_pages * this.itemsPerPage;
      this.templateSchools = data.schools;
      this.totalPending--;
    },
    async loadMore() {
      this.itemsPerPage += 6;
      this.pendingLoadMore = true;
      await this.fetchData();
      this.pendingLoadMore = false;
    },
    async handlePageChange({ curr, total }) {
      if (curr !== this.currentPage) {
        this.currentPage = curr;
        this.totalPages = total;
        this.pendingSchools = true;
        await this.fetchData();
        this.pendingSchools = this.totalPending !== 0;
      }
    },
    setTotalPages(payload) {
      this.totalPages = payload;
    },
  },
  watch: {
    async searchQuery() {
      if (this.templateSchools.length !== 0) this.pendingSchools = true;
      await this.fetchData();
      this.pendingSchools = false;
    },
  },
  async created() {
    await this.fetchData();
    this.pendingRender = false;
  },
};
</script>

<style scoped lang="scss">
.reviews-section {
  &__inner {
    min-height: 600rem;
    @media screen and (max-width: $brakepoint) {
      padding: 0;
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
    margin-bottom: 30rem;
    @media screen and (max-width: $brakepoint) {
      gap: 16rem;
      margin-bottom: 24rem;
    }
  }
  &__loading {
    width: min-content;
    position: absolute;
    margin-bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
  }
  &__no-results {
    margin-top: 150rem;
    @media screen and (max-width: $brakepoint) {
      margin-top: 70rem;
    }
  }
  &__load-more {
    margin: 0 auto;
    margin-bottom: 30rem;
    width: 240rem;
    height: 70rem;
    position: relative;
    @media screen and (max-width: $brakepoint) {
      width: 100%;
      height: 47rem;
      padding: 0 15rem;
      margin-bottom: 24rem;
    }
  }
}
</style>
