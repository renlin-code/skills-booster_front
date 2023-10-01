<template>
  <section class="blog sb-noselect">
    <div class="blog__inner sb-container">
      <Transition name="fade">
        <div v-show="!pendingRender">
          <div class="blog__header">
            <h2 class="blog__title sb-section-title">
              <span class="mobile-hidden">&nbsp &nbsp &nbsp &nbsp &nbsp</span
              >{{ injectedTitle }}
            </h2>
            <div class="blog__vector mobile-hidden"></div>
          </div>
          <div class="blog__subheader">
            <Chips :items="chipsOptions" @select-chip="switchCategory" />
            <NuxtLink v-if="!extended" to="/blog" class="mobile-hidden">
              <TextArrowButton>Все статьи</TextArrowButton>
            </NuxtLink>
            <div v-else class="blog__search">
              <SearchInput
                class="blog__search-el"
                placeholder="Поиск"
                v-model="searchQuery"
              />
            </div>
          </div>
          <div class="blog__body"
            :class="{ 'blog__body--loading': pendingArticles }"
          >
            <ul class="blog__articles" v-show="!pendingArticles">
              <li
                class="blog__articles-element sb-observe sb-observe--fade-up"
                v-for="article in templateArticles"
                :key="article.id"
              >
                <ArticleCard :minified="article.minified" :content="article" />
              </li>
            </ul>
            <Transition name="fade">
              <RingPreloader class="blog__loading" v-if="pendingArticles" />
            </Transition>
            <NoResultsView class="blog__no-results" v-if="templateArticles.length === 0">
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
                  v-if="!pendingLoadMore && !pendingArticles"
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
            <div class="blog__pagination sb-container" v-show="totalItems > itemsPerPage">
              <Pagination
                v-if="totalItems"
                :total-items="totalItems"
                :items-per-page="itemsPerPage"
                :forced-current-page="forcedCurrentPage"
                @page-changed="handlePageChange"
                @total-pages="setTotalPages"
              />
            </div>
          </div>
        </div>
      </Transition>
      <Transition name="fade">
        <RingPreloader class="blog__loading" v-show="pendingRender" />
      </Transition>
    </div>
  </section>
</template>

<script>
import animateOnScrollMixin from "~/mixins/animateOnScrollMixin";

import Chips from "~/components/Others/Chips";
import TextArrowButton from "~/components/Buttons/TextArrowButton";
import ArticleCard from "~/components/Others/ArticleCard";
import MainButton from "~/components/Buttons/MainButton.vue";
import SearchInput from "~/components/Others/SearchInput";
import Pagination from "~/components/Others/Pagination";
import RingPreloader from "~/components/Preloaders/RingPreloader";
import NoResultsView from "~/components/Others/NoResultsView.vue";

export default {
  name: "BlogSection",
  mixins: [animateOnScrollMixin],
  components: {
    Chips,
    TextArrowButton,
    ArticleCard,
    MainButton,
    SearchInput,
    Pagination,
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
    totalPending: 0,
    pendingRender: true,
    pendingArticles: false,
    pendingLoadMore: false,
    itemsPerPage: 6,
    totalItems: null,
    currentPage: 1,
    forcedCurrentPage: null,
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
      this.forcedCurrentPage = 1;
      this.selectedCatId = index > 0 ? this.allCategories[index - 1].id : "";
      this.pendingArticles = true;
      await this.$nextTick();
      await this.fetchData();
      this.pendingArticles = this.totalPending !== 0;
      this.forcedCurrentPage = null;
    },
    async fetchData() {
      this.totalPending++;
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

      this.totalPending--;
      this.observerReset();
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
        this.pendingArticles = true;
        await this.fetchData();
        this.pendingArticles = this.totalPending !== 0;
      }
    },
    setTotalPages(payload) {
      this.totalPages = payload;
    },
  },
  watch: {
    async searchQuery() {
      this.forcedCurrentPage = 1;
      if (this.templateArticles.length !== 0) this.pendingArticles = true;
      await this.$nextTick();
      await this.fetchData();
      this.pendingArticles = false;
      this.forcedCurrentPage = null;
    },
  },
  async created() {
    await this.fetchData();
    this.pendingRender = false;
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
  &__body {
    width: 100%;
    position: relative;
    &--loading {
      min-height: 470rem;
      @media screen and (max-width: $brakepoint) {
        min-height: 160vh;
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
  }
  &__articles {
    display: flex;
    flex-wrap: wrap;
    column-gap: 20rem;
    row-gap: 40rem;
    margin-bottom: 30rem;
    @media screen and (max-width: $brakepoint) {
      flex-wrap: nowrap;
      flex-direction: column;
      row-gap: 16rem;
      padding: 0 15rem;
      margin-bottom: 24rem;
    }
  }
  &__no-results {
    margin-top: 150rem;
    @media screen and (max-width: $brakepoint) {
      margin-top: 70rem;
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
