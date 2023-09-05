<template>
  <div class="pagination">
    <div class="pagination__items">
      <div class="pagination__item pagination__left">
        <button :disabled="!(currentPage > 1)" @click="changePage(currentPage - 1)">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6667 7.29199C11.6667 8.37408 10.5977 9.98991 9.51563 11.3462C8.12438 13.0962 6.46188 14.623 4.55583 15.7882C3.12667 16.6618 1.39417 17.5003 0 17.5003M0 17.5003C1.39417 17.5003 3.12813 18.3389 4.55583 19.2124C6.46188 20.3791 8.12438 21.9059 9.51563 23.653C10.5977 25.0107 11.6667 26.6295 11.6667 27.7087M0 17.5003H35"
              stroke="#393939"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>
      <div class="pagination__pages">
        <div
          class="pagination__item"
          v-for="pageNumber in displayedPages"
          :class="{ 'pagination__item--selected': pageNumber === currentPage }"
        >
          <button @click="changePage(pageNumber)">
            {{ pageNumber }}
          </button>
        </div>
      </div>
      <div class="pagination__item pagination__right">
        <button
          :disabled="!(currentPage < totalPages)"
          @click="changePage(currentPage + 1)"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.3333 7.29199C23.3333 8.37408 24.4023 9.98991 25.4844 11.3462C26.8756 13.0962 28.5381 14.623 30.4442 15.7882C31.8733 16.6618 33.6058 17.5003 35 17.5003M35 17.5003C33.6058 17.5003 31.8719 18.3389 30.4442 19.2124C28.5381 20.3791 26.8756 21.9059 25.4844 23.653C24.4023 25.0107 23.3333 26.6295 23.3333 27.7087M35 17.5003H-9.53674e-07"
              stroke="#393939"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 6,
    },
    maxDisplayedPages: {
      type: Number,
      default: 5,
    },
  },
  data: () => ({
    currentPage: 1,
  }),
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    displayedPages() {
      const currentPage = this.currentPage;
      const totalPages = this.totalPages;
      const maxDisplayedPages = this.maxDisplayedPages;

      if (totalPages <= maxDisplayedPages) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
      }

      const halfDisplayedPages = Math.floor(maxDisplayedPages / 2);
      let startPage = currentPage - halfDisplayedPages;
      let endPage = currentPage + halfDisplayedPages;

      if (startPage <= 0) {
        startPage = 1;
        endPage = maxDisplayedPages;
      }

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxDisplayedPages + 1;
      }

      return Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      );
    },
  },
  methods: {
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
        this.$emit("page-changed", { curr: this.currentPage, total: this.totalPages });
      }
    },
  },
  watch: {
    totalPages(value) {
      this.$emit("total-pages", value);
    },
    currentPage(value) {
    },
  },
  mounted() {
    this.$emit("total-pages", this.totalPages);
  },
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  &__items {
    display: flex;
    gap: 10rem;
    @media screen and (max-width: $brakepoint) {
      width: 100%;
      gap: unset;
      justify-content: space-between;
    }
  }
  &__pages {
    display: flex;
    gap: 8rem;
  }
  &__item {
    width: 60rem;
    height: 60rem;
    @media screen and (max-width: $brakepoint) {
      width: 36rem;
      height: 36rem;
    }
    button {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      display: grid;
      place-content: center;
      border: 1rem solid $color_gray;
      color: $color_gray;
      @include fontStyles($font_2, 32rem, 32rem, 300);
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_2, 20rem, 20rem, 300);
      }
      transition: all $transition_base;
      &:disabled {
        border-color: $color_light-gray !important;
        color: $color_light-gray !important;
        cursor: default !important;
        svg {
          path {
            stroke: $color_light-gray !important;
          }
        }
      }
      &:hover {
        border-color: $color_black;
        color: $color_black;
        svg {
          path {
            stroke: $color_black;
          }
        }
      }
      svg {
        width: 35rem;
        height: 35rem;
        @media screen and (max-width: $brakepoint) {
          width: 20rem;
          height: 20rem;
        }

        path {
          stroke: $color_gray;
          transition: all $transition_base;
        }
      }
    }
    &--selected {
      button {
        border-color: $color_primary !important;
        color: $color_white !important;
        background: $color_primary !important;
      }
    }
  }
  &__left {
    margin-right: 10rem;
    @media screen and (max-width: $brakepoint) {
      margin-right: 5rem;
    }
  }
  &__right {
    margin-left: 10rem;
    @media screen and (max-width: $brakepoint) {
      margin-left: 5rem;
    }
  }
}
</style>
