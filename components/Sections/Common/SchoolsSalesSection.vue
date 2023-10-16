<template>
  <section class="schools-sales sb-noselect">
    <div class="schools-sales__inner sb-container">
      <Transition name="fade">
        <div v-if="!pending">
          <div class="schools-sales__top">
            <h2 class="schools-sales__title sb-section-title">{{ injectedTitle }}</h2>
            <NuxtLink to="/schools-sales" v-if="!isMobile && !extended">
              <TextArrowButton>Все акции</TextArrowButton>
            </NuxtLink>
          </div>
          <div class="schools-sales__sales">
            <Transition name="fade">
              <Slider
                v-show="pendingGridQueue === 0"
                :init="pendingGridQueue === 0 && !extended"
                class="schools-sales__slider"
                desktop-off
                :mobile-off="extended"
                :wrapper-styles="sliderWrapperStyles"
              >
                <Slide class="schools-sales__slider-slide" v-for="sale in templateSales">
                  <SaleCard
                    class="schools-sales__sales-card"
                    :class="{ 'schools-sales__sales-card--extended': extended }"
                    :content="sale"
                    :black="sale.black"
                  />
                </Slide>
              </Slider>
            </Transition>
            <Transition name="fade">
              <RingPreloader
                class="schools-sales__loading"
                v-if="pendingGridQueue !== 0"
              />
            </Transition>
          </div>
          <div
            class="sb-container schools-sales__link-to-all"
            v-if="!extended && isMobile"
          >
            <NuxtLink to="/schools-sales">
              <MainButton arrow type="3">Все акции</MainButton>
            </NuxtLink>
          </div>
          <div v-if="extended">
            <div
              class="schools-sales__load-more"
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
                  class="schools-sales__loading schools-sales__loading"
                  v-if="pendingLoadMore"
                />
              </Transition>
            </div>
          </div>
        </div>
      </Transition>
      <RingPreloader class="schools-sales__loading" v-show="pending" />
    </div>
  </section>
</template>

<script>
import { REQUEST_MIN_DELAY } from "~/utils/constants.js";

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
    pending: true,
    pendingLoadMore: false,
    pendingGrid: false,
    pendingGridQueue: 0,
    itemsPerPage: null,
    totalItems: null,
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
    async fetchData() {
      const data = await this.$axios.$get("/wp-json/get/schools_sales", {
        params: {
          page: this.currentPage,
          per_page: this.itemsPerPage,
        },
      });
      this.totalItems = data.total_pages * this.itemsPerPage;
      const sales = data.schools_sales;

      this.templateSales = [];
      sales.forEach((i, index) => {
        this.templateSales.push({
          ...i,
          black: index % 2 !== 0,
        });
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
  async created() {
    this.itemsPerPage = this.extended ? 6 : 3;
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
    justify-content: space-between;
    align-items: flex-end;
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
  }
  &__load-more {
    margin: 0 auto;
    width: 240rem;
    height: 70rem;
    position: relative;
    margin-top: 30rem;
    @media screen and (max-width: $brakepoint) {
      width: 100%;
      padding: 0 15rem;
      height: 47rem;
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
