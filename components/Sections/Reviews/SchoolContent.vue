<template>
  <section class="school-content sb-noselect">
    <Transition name="fade">
      <SendReviewModal
        v-if="showModal"
        :school-id="content.id"
        @close="showModal = false"
        @success="showModalSuccess = true"
      />
    </Transition>
    <Transition name="fade">
      <SuccessModal v-if="showModalSuccess" @close="showModalSuccess = false"
        >Спасибо за оставленный отзыв. Ваш отзыв будет размещён на сайте после проверки
        модератором</SuccessModal
      >
    </Transition>
    <div class="school-content__inner">
      <div class="school-content__banner sb-container">
        <div class="school-content__banner-top">
          <div class="school-content__banner-logo">
            <img :src="content.logo" alt="" />
            <span>{{ content.title }}</span>
          </div>
          <div class="school-content__banner-words">отзывы, рейтинги</div>
          <div class="school-content__banner-link mobile-hidden">
            <a :href="content.link" target="_blank">
              <MainButton type="3">Перейти на сайт школы</MainButton>
            </a>
          </div>
        </div>
        <div class="school-content__banner-reviews">
          <div class="school-content__banner-reviews-left">
            <div class="school-content__banner-average">
              <span>{{ averageFormatted }}</span>
              <div class="school-content__banner-average-stars">
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <div
                  class="school-content__banner-average-stars-layer"
                  :style="`width: ${100 - content.reviews.average * 20}%`"
                ></div>
              </div>
            </div>
            <div class="school-content__banner-total">
              <span>{{ totalReviewsFormatted }}</span>
              <div class="school-content__banner-total-hint">
                <div
                  class="school-content__banner-total-hint-icon"
                  @mouseenter="showHint = true"
                  @mouseleave="showHint = false"
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM13 13.3551C14.4457 12.9248 15.5 11.5855 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.302 6.5 8.88637 7.70919 8.56731 9.31346L10.5288 9.70577C10.6656 9.01823 11.2723 8.5 12 8.5C12.8284 8.5 13.5 9.17157 13.5 10C13.5 10.8284 12.8284 11.5 12 11.5C11.4477 11.5 11 11.9477 11 12.5V14H13V13.3551Z"
                      fill="#393939"
                    />
                  </svg>
                </div>
                <Transition name="fade">
                  <div v-if="showHint" class="school-content__banner-total-hint-message">
                    В положительном рейтинге участвуют оценки 4 и 5, в нейтральном 3,
                    а в отрицательном 1 и 2
                  </div>
                </Transition>
              </div>
            </div>
          </div>
          <div class="school-content__banner-reviews-right">
            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 16C9.85 16.63 10.885 17 12 17C13.115 17 14.15 16.63 15 16"
                    stroke="#03A000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12Z"
                    fill="#03A000"
                  />
                  <path
                    d="M9 12C9.55228 12 10 11.3284 10 10.5C10 9.67157 9.55228 9 9 9C8.44772 9 8 9.67157 8 10.5C8 11.3284 8.44772 12 9 12Z"
                    fill="#03A000"
                  />
                  <path
                    d="M2 12C2 7.286 2 4.929 3.464 3.464C4.93 2 7.286 2 12 2C16.714 2 19.071 2 20.535 3.464C22 4.93 22 7.286 22 12C22 16.714 22 19.071 20.535 20.535C19.072 22 16.714 22 12 22C7.286 22 4.929 22 3.464 20.535C2 19.072 2 16.714 2 12Z"
                    stroke="#03A000"
                    stroke-width="1.5"
                  />
                </svg>
                <span>{{ content.reviews.amount_of_good }}</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12Z"
                    fill="#FFA23B"
                  />
                  <path
                    d="M9 12C9.55228 12 10 11.3284 10 10.5C10 9.67157 9.55228 9 9 9C8.44772 9 8 9.67157 8 10.5C8 11.3284 8.44772 12 9 12Z"
                    fill="#FFA23B"
                  />
                  <path
                    d="M2 12C2 7.286 2 4.929 3.464 3.464C4.93 2 7.286 2 12 2C16.714 2 19.071 2 20.535 3.464C22 4.93 22 7.286 22 12C22 16.714 22 19.071 20.535 20.535C19.072 22 16.714 22 12 22C7.286 22 4.929 22 3.464 20.535C2 19.072 2 16.714 2 12Z"
                    stroke="#FFA23B"
                    stroke-width="1.5"
                  />
                  <line
                    x1="9.75"
                    y1="16.25"
                    x2="14.25"
                    y2="16.25"
                    stroke="#FFA23B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <span>{{ content.reviews.amount_of_medium }}</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 17C9.85 16.37 10.885 16 12 16C13.115 16 14.15 16.37 15 17"
                    stroke="#F26F6F"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12Z"
                    fill="#F26F6F"
                  />
                  <path
                    d="M9 12C9.55228 12 10 11.3284 10 10.5C10 9.67157 9.55228 9 9 9C8.44772 9 8 9.67157 8 10.5C8 11.3284 8.44772 12 9 12Z"
                    fill="#F26F6F"
                  />
                  <path
                    d="M2 12C2 7.286 2 4.929 3.464 3.464C4.93 2 7.286 2 12 2C16.714 2 19.071 2 20.535 3.464C22 4.93 22 7.286 22 12C22 16.714 22 19.071 20.535 20.535C19.072 22 16.714 22 12 22C7.286 22 4.929 22 3.464 20.535C2 19.072 2 16.714 2 12Z"
                    stroke="#F26F6F"
                    stroke-width="1.5"
                  />
                </svg>
                <span>{{ content.reviews.amount_of_bad }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="school-content__banner-bottom">
          <div class="school-content__banner-bottom-header">О школе</div>
          <p class="school-content__banner-bottom-description">{{ shownDescription }}</p>
          <button
            v-if="showReadMoreButton"
            @click="showFullDescription = !showFullDescription"
            class="school-content__banner-bottom-open"
          >
            {{ showFullDescription ? "Скрыть" : "Читать полностью" }}
          </button>
        </div>
        <div class="school-content__banner-link desktop-hidden">
          <a :href="content.link" target="_blank">
            <MainButton type="3">Перейти на сайт школы</MainButton>
          </a>
        </div>
      </div>
      <div class="school-content__reviews sb-container">
        <Transition name="fade">
          <div v-show="!pendingRender">
            <div class="school-content__reviews-header">
              <h2 class="school-content__reviews-title">Отзывы</h2>
              <div class="school-content__reviews-accordion">
                <Accordion :items="sortOptions" @select-item="switchSortOption" />
              </div>
              <div class="school-content__reviews-appeal">
                <MainButton type="1" @click.native="showModal = true"
                  >Оставить отзыв о школе</MainButton
                >
              </div>
            </div>
            <div class="school-content__reviews-body">
              <div
                class="school-content__reviews-body-content--loading"
                :class="{ 'blog__body--loading': pendingReviews }"
              >
                <ul v-if="!pendingReviews" class="school-content__reviews-elements">
                  <li
                    class="school-content__reviews-elements-element"
                    v-for="review in templateReviews"
                  >
                    <ReviewCard :content="review" />
                  </li>
                </ul>
                <Transition name="fade">
                  <RingPreloader class="school-content__loading" v-if="pendingReviews" />
                </Transition>
              </div>
              <div
                class="school-content__load-more"
                v-if="
                  (totalItems > itemsPerPage && currentPage !== totalPages) ||
                  pendingLoadMore
                "
              >
                <Transition name="fade">
                  <MainButton
                    type="3"
                    @click.native="loadMore"
                    v-if="!pendingLoadMore && !pendingReviews"
                    >Показать еще</MainButton
                  >
                </Transition>
                <Transition name="fade">
                  <RingPreloader
                    class="school-content__loading school-content__loading"
                    v-if="pendingLoadMore"
                  />
                </Transition>
              </div>
              <div
                class="school-content__pagination sb-container"
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
          </div>
        </Transition>
        <Transition name="fade">
          <RingPreloader class="school-content__loading" v-show="pendingRender" />
        </Transition>
      </div>
    </div>
  </section>
</template>

<script>
import SendReviewModal from "~/components/Modals/ModalsInstances/SendReviewModal.vue";
import MainButton from "~/components/Buttons/MainButton.vue";
import Accordion from "~/components/Others/Accordion.vue";
import Pagination from "~/components/Others/Pagination.vue";
import ReviewCard from "~/components/Others/ReviewCard.vue";
import RingPreloader from "~/components/Preloaders/RingPreloader.vue";
import SuccessModal from "~/components/Modals/ModalsInstances/SuccessModal.vue";

export default {
  name: "SchoolContent",
  components: {
    SendReviewModal,
    MainButton,
    Accordion,
    ReviewCard,
    RingPreloader,
    Pagination,
    SuccessModal,
  },
  props: {
    content: {
      type: Object,
    },
  },
  data: () => ({
    showModal: false,
    showModalSuccess: false,
    showFullDescription: false,
    showReadMoreButton: false,
    showHint: false,
    sortOptions: ["Новые", "Старые", "Высокая оценка", "Низкая оценка"],
    sortByQuery: "date",
    sortOrderQuery: "DESC",
    templateReviews: [],
    totalPending: 0,
    pendingRender: true,
    pendingReviews: false,
    pendingLoadMore: false,
    itemsPerPage: 10,
    totalItems: null,
    currentPage: 1,
    totalPages: null,
  }),
  computed: {
    averageFormatted() {
      const number = this.content.reviews.average;
      return number
        ? Number.isInteger(number)
          ? `${number}.00`
          : number.toFixed(2)
        : "0";
    },
    totalReviewsFormatted() {
      const words = ["отзыв", "отзыва", "отзывов"];
      const number = this.content.reviews.total;
      let n = Math.abs(number);
      n %= 100;
      if (n >= 5 && n <= 20) {
        return `${number} ${words[2]}`;
      }
      n %= 10;
      if (n === 1) {
        return `${number} ${words[0]}`;
      }
      if (n >= 2 && n <= 4) {
        return `${number} ${words[1]}`;
      }
      return `${number} ${words[2]}`;
    },
    shownDescription() {
      const fullDescription = this.content.about;
      const maxLength = 270;

      if (fullDescription.length > maxLength) this.showReadMoreButton = true;
      return this.showFullDescription || !this.showReadMoreButton
        ? fullDescription
        : `${fullDescription.slice(0, maxLength)}...`;
    },
  },
  methods: {
    async switchSortOption(index) {
      switch (index) {
        case 0:
          this.sortByQuery = "date";
          this.sortOrderQuery = "DESC";
          break;
        case 1:
          this.sortByQuery = "date";
          this.sortOrderQuery = "ASC";
          break;
        case 2:
          this.sortByQuery = "rate";
          this.sortOrderQuery = "DESC";
          break;
        case 3:
          this.sortByQuery = "rate";
          this.sortOrderQuery = "ASC";
          break;
      }
      this.pendingReviews = true;
      await this.fetchData();
      this.pendingReviews = this.totalPending !== 0;
    },
    async fetchData() {
      this.totalPending++;
      const data = await this.$axios.$get(`/wp-json/get/schools/${this.content.slug}`, {
        params: {
          page: this.currentPage,
          per_page: this.itemsPerPage,
          sort_by: this.sortByQuery,
          order: this.sortOrderQuery,
        },
      });
      this.totalItems = data.reviews.total_pages * this.itemsPerPage;
      this.templateReviews = data.reviews.reviews;
      this.totalPending--;
    },
    async loadMore() {
      this.itemsPerPage += 10;
      this.pendingLoadMore = true;
      await this.fetchData();
      this.pendingLoadMore = false;
    },
    async handlePageChange({ curr, total }) {
      if (curr !== this.currentPage) {
        this.currentPage = curr;
        this.totalPages = total;
        this.pendingReviews = true;
        await this.fetchData();
        this.pendingReviews = this.totalPending !== 0;
      }
    },
    setTotalPages(payload) {
      this.totalPages = payload;
    },
  },
  async created() {
    await this.fetchData();
    this.pendingRender = false;
  },
};
</script>

<style scoped lang="scss">
.school-content {
  &__banner {
    background: $color_bg;
    padding: 50rem;
    border-radius: 50rem;
    margin-bottom: 60rem;
    @media screen and (max-width: $brakepoint) {
      padding: 30rem 15rem;
      border-radius: 30rem;
      margin-bottom: 24rem;
    }
    &-top {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 20rem;
      align-items: center;
      margin-bottom: 20rem;
      @media screen and (max-width: $brakepoint) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4rem;
      }
    }
    &-logo {
      display: flex;
      align-items: center;
      gap: 20rem;
      @media screen and (max-width: $brakepoint) {
        gap: 8rem;
      }
      img {
        width: 90rem;
        height: 90rem;
        @media screen and (max-width: $brakepoint) {
          width: 50rem;
          height: 50rem;
        }
      }
      span {
        @include fontStyles($font_2, 42rem, 67.2rem, 600);
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_2, 19rem, 30.4rem, 600);
        }
      }
    }
    &-words {
      color: $color_primary;
      @include fontStyles($font_2, 26rem, 41.6rem, 600);
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_2, 16rem, 25.6rem, 600);
      }
    }
    &-reviews {
      display: grid;
      grid-template-columns: auto 1fr;
      margin-bottom: 50rem;
      gap: 40rem;
      align-items: center;
      @media screen and (max-width: $brakepoint) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16rem;
        margin-bottom: 16rem;
      }
      &-left {
        display: flex;
        gap: 40rem;
        align-items: center;
        @media screen and (max-width: $brakepoint) {
          gap: 16rem;
        }
      }
      &-right {
        ul {
          display: flex;
          gap: 15rem;
          li {
            display: flex;
            align-items: center;
            gap: 8rem;
            svg {
              width: 24rem;
              height: 24rem;
            }
            span {
              @include fontStyles($font_2, 20rem, 24.38rem, 500);
              padding-top: 4rem;
              @media screen and (max-width: $brakepoint) {
                @include fontStyles($font_2, 16rem, 24rem, 700, 0.8rem);
                padding-top: 2rem;
              }
            }
          }
        }
      }
    }
    &-average {
      display: flex;
      align-items: center;
      gap: 17rem;
      @media screen and (max-width: $brakepoint) {
        gap: 10rem;
      }
      span {
        padding-top: 12rem;
        @include fontStyles($font_1, 28rem, 30.8rem, 400);
        @media screen and (max-width: $brakepoint) {
          padding-top: 8rem;
          @include fontStyles($font_1, 16rem, 17.6rem, 400);
        }
      }
      &-stars {
        position: relative;
        ul {
          display: flex;
          li {
            width: 33rem;
            height: 33rem;
            background: url("/images/icons/star_dark.svg") center/contain no-repeat;
            @media screen and (max-width: $brakepoint) {
              width: 20rem;
              height: 20rem;
            }
          }
        }
        &-layer {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          backdrop-filter: grayscale(1);
          width: 0%;
        }
      }
    }
    &-total {
      display: flex;
      align-items: center;
      gap: 4rem;
      @media screen and (max-width: $brakepoint) {
        padding-top: 4rem;
      }
      span {
        @include fontStyles($font_3, 20rem, 24.38rem, 500);
        padding-top: 2rem;
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_3, 14rem, 21rem, 500);
          padding-top: 0;
        }
      }
      &-hint {
        position: relative;
        &-icon {
          cursor: pointer;
          width: 24rem;
          height: 24rem;
          display: grid;
          @media screen and (max-width: $brakepoint) {
            width: 15rem;
            height: 15rem;
          }
          svg {
            width: 100%;
            height: 100%;
          }
        }
        &-message {
          position: absolute;
          padding: 15rem 20rem;
          border-radius: 15rem;
          background: $color_black;
          color: $color_white;
          width: 420rem;
          @include fontStyles($font_3, 15rem, 18.29rem, 400);
          left: -37rem;
          top: 40rem;
          @media screen and (max-width: $brakepoint) {
            width: 200rem;
            @include fontStyles($font_3, 12rem, 16rem, 400);
            left: auto;
            right: -10rem;
            top: 24rem;
            padding: 10rem;
            border-radius: 10rem;
          }
          &:before {
            position: absolute;
            content: "";
            width: 19rem;
            height: 19rem;
            background: $color_black;
            transform: rotate(45deg);
            top: -7rem;
            left: 40rem;
            @media screen and (max-width: $brakepoint) {
              width: 10rem;
              height: 10rem;
              top: -4rem;
              left: auto;
              right: 13rem;
            }
          }
        }
      }
    }
    &-bottom {
      @media screen and (max-width: $brakepoint) {
        margin-bottom: 16rem;
      }
      &-header {
        @include fontStyles($font_2, 36rem, 57.6rem, 600);
        margin-bottom: 10rem;
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_2, 16rem, 25.6rem, 600);
          margin-bottom: 16rem;
        }
      }
      &-description {
        @include fontStyles($font_3, 22rem, 35.2rem, 400);
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_3, 14rem, 21rem, 400);
        }
      }
      &-open {
        margin-top: 10rem;
        @include fontStyles($font_3, 22rem, 26.82rem, 500);
        color: $color_primary;
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_3, 14rem, 21rem, 500);
        }
      }
    }
    &-link {
      @media screen and (max-width: $brakepoint) {
        width: 100%;
      }
    }
  }
  &__reviews {
    position: relative;
    min-height: 600rem;
    &-header {
      display: grid;
      grid-template-columns: repeat(3, auto);
      justify-content: space-between;
      margin-bottom: 40rem;
      align-items: center;
      @media screen and (max-width: $brakepoint) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 24rem;
      }
    }
    &-body {
      &-content {
        position: relative;
        &--loading {
          min-height: 470rem;
          @media screen and (max-width: $brakepoint) {
            min-height: 160vh;
          }
        }
      }
    }
    &-title {
      @include fontStyles($font_2, 36rem, 57.6rem, 600);
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_2, 16rem, 25.6rem, 600);
        margin-bottom: 16rem;
      }
    }
    &-accordion {
      width: 350rem;
      @media screen and (max-width: $brakepoint) {
        width: 100%;
        margin-bottom: 12rem;
      }
    }
    &-appeal {
      @media screen and (max-width: $brakepoint) {
        width: 100%;
      }
    }
    &-elements {
      display: flex;
      flex-direction: column;
      gap: 40rem;
      min-height: 470rem;
      margin-bottom: 30rem;
      @media screen and (max-width: $brakepoint) {
        gap: 16rem;
        margin-bottom: 24rem;
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
