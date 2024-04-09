<template>
  <section class="schools-sales sb-noselect">
    <div class="schools-sales__inner sb-container">
      <Transition name="fade">
        <div v-if="!pending">
          <div class="schools-sales__top">
            <h1 v-if="extended" class="schools-sales__title sb-section-title">
              {{ injectedTitle }}
            </h1>
            <h2 v-else class="schools-sales__title sb-section-title">
              {{ injectedTitle }}
            </h2>
            <NuxtLink to="/schools-sales" v-if="!isMobile && !extended">
              <TextArrowButton>Все акции</TextArrowButton>
            </NuxtLink>
          </div>
          <div class="schools-sales__sales">
            <Transition name="fade">
              <Slider
                :init="!extended"
                class="schools-sales__slider"
                desktop-off
                :mobile-off="extended"
                :wrapper-styles="sliderWrapperStyles"
              >
                <Slide class="schools-sales__slider-slide" v-for="(sale, index) in templateSales">
                  <SaleCard
                    class="schools-sales__sales-card"
                    :class="{ 'schools-sales__sales-card--extended': extended }"
                    :content="sale"
                    :black="index % 2 !== 0"
                  />
                </Slide>
              </Slider>
            </Transition>
          </div>
          <div class="sb-container schools-sales__bottom"
          v-if="!extended && isMobile || pendingLoadMore"
          >
            <NuxtLink
              v-if="!extended && isMobile"
              to="/schools-sales"
              class="schools-sales__link-to-all"
            >
              <MainButton arrow type="3">Все акции</MainButton>
            </NuxtLink>
            <Transition name="fade">
              <RingPreloader
                class="schools-sales__loading schools-sales__loading--load-more"
                v-if="pendingLoadMore"
              />
            </Transition>
          </div>
        </div>
      </Transition>
      <RingPreloader class="schools-sales__loading" v-show="pending" />
    </div>
  </section>
</template>

<script>
import { REQUEST_MIN_DELAY } from "~/utils/constants.js";
import { lazyLoadHandler } from "~/utils/lazyLoadHandler.js";
import _ from "lodash";

import mediaQueryMixin from "~/mixins/mediaQueryMixin";
import TextArrowButton from "~/components/Buttons/TextArrowButton.vue";
import SaleCard from "~/components/Others/SaleCard.vue";
import Slider from "~/components/Slider/Slider.vue";
import Slide from "~/components/Slider/Slide.vue";
import MainButton from "~/components/Buttons/MainButton.vue";
import RingPreloader from "~/components/Preloaders/RingPreloader";
import Pagination from "~/components/Others/Pagination";

export default {
  name: "SchoolsSalesSection",
  mixins: [mediaQueryMixin],
  components: {
    TextArrowButton,
    SaleCard,
    Slider,
    Slide,
    MainButton,
    RingPreloader,
    Pagination,
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
    templateSales: [],
    pending: false,
    pendingLoadMore: false,
    itemsPerPage: null,
    currentPage: 1,
    totalPages: null,
  }),
  computed: {
    sliderWrapperStyles() {
      if (this.extended) {
        return !this.isMobile
          ? "display:grid; grid-template-columns: repeat(3, 1fr); column-gap: 20rem; row-gap: 40rem;"
          : "display: flex; flex-direction: column; gap: 16rem;";
      } else {
        return !this.isMobile
          ? "display:grid; grid-template-columns: repeat(3, 1fr); column-gap: 20rem; row-gap: 40rem;"
          : "";
      }
    },
  },
  methods: {
    async fetchData(resetData) {
      try {
        if (resetData) {
          this.currentPage = 1;
        }
        const data = await this.$axios.$get("/wp-json/get/schools_sales", {
          params: {
            page: this.currentPage,
            per_page: this.extended ? 6 : 3,
          },
        });
        const { schools_sales: sales, total_pages } = data;
        this.totalPages = total_pages;

        if (resetData) {
          this.templateSales = [];
        }
        this.templateSales.push(...sales);
      } catch (error) {
        console.error(error);
      } finally {
        this.pending = false;
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
.schools-sales {
  &__inner {
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
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50rem;
    @media screen and (max-width: $brakepoint) {
      padding: 0 15rem;
      margin-bottom: 24rem;
    }
  }
  &__sales {
    min-height: 300rem;
    &-card {
      height: 100%;
      &--extended {
        width: 100% !important;
      }
    }
  }
  &__slider {
    &-slide {
      width: 100%;
      @media screen and (max-width: $brakepoint) {
        margin-right: 15rem;
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
    &--load-more {
      position: static;
      transform: none;
      margin: 0 auto;
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
