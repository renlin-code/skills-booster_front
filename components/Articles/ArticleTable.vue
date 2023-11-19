<template>
  <div>
    <div class="table" :class="{ 'table--horizontal': content.horizontal }">
      <div
        class="table__header"
        v-if="!content.horizontal"
        :style="`grid-template-columns: repeat(${content.content_table_cols.length}, 1fr)`"
      >
        <div class="table__header-cell" v-for="col in content.content_table_cols">
          {{ col.content_table_col_name }}
        </div>
      </div>
      <div class="table__body">
        <div
          class="table__row"
          v-for="(row, rowIndex) in content.content_table_rows"
          :class="{ 'table__row--bg': rowIndex % 2 !== 0 }"
          :style="`grid-template-columns: repeat(${content.content_table_cols.length}, 1fr)`"
        >
          <div
            class="table__row-cell"
            :class="{
              'table__row--bg': cellIndex % 2 !== 0 && content.horizontal,
            }"
            v-for="(cell, cellIndex) in row.content_table_row_cells"
          >
            <div class="table__header-cell" v-if="content.horizontal">
              {{ content.content_table_cols[cellIndex].content_table_col_name }}
            </div>
            <div class="table__row-cell-inner" v-html="setFirstLinkMarginInCell(cell.cell)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mediaQueryMixin from "~/mixins/mediaQueryMixin";

export default {
  name: "ArticleTable",
  mixins: [mediaQueryMixin],
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    setFirstLinkMarginInCell(cellContent) {
      if (cellContent.slice(0, 2) === "<a") {
        const slicedCont = cellContent.slice(2, cellContent.length);
        return `<a style="margin-top: 0;" ${slicedCont}`;
      } else {
        return cellContent;
      }
    },
  },
  mounted() {
    this.mediaQueryHook();
  },
};
</script>

<style lang="scss">
.table {
  @media screen and (max-width: $brakepoint) {
    border-radius: unset;
    border: none;
    overflow: visible;
    padding: 0 15rem;
  }
  &__header {
    display: grid;
    border-radius: 20rem 20rem 0 0;
    overflow: hidden;
    &-cell {
      width: 100%;
      padding: 20rem;
      @include fontStyles($font_3, 21rem, 32rem, 700, 2rem);
      color: $color_white;
      background: $color_primary;
      text-transform: uppercase;
      text-align: center;
      border-right: 1rem solid $color_white;
      @media screen and (max-width: $brakepoint) {
        padding: 12rem;
        @include fontStyles($font_3, 10rem, 13rem, 600, 0.6rem);
      }
      &:last-child {
        border-right: none;
      }
    }
  }
  &__body {
    display: flex;
    flex-direction: column;
  }
  &__row {
    display: grid;
    border-left: 1rem solid $color_gray;
    border-right: 1rem solid $color_gray;
    border-bottom: 1rem solid $color_gray;
    &:last-child {
      border-radius: 0 0 15rem 15rem;
      overflow: hidden;
    }
    &--bg {
      background: $color_bg;
      @media screen and (max-width: $brakepoint) {
        background: transparent;
        .table__row-cell-inner {
          background: $color_bg;
        }
      }
    }
    &-cell {
      border-right: 1rem solid $color_gray;
      &:last-child {
        border-right: none;
      }
      &-inner {
        padding: 20rem;
        @include fontStyles($font_3, 18rem, 28rem, 400);
        color: $color_dark-black;
        @media screen and (max-width: $brakepoint) {
          padding: 10rem;
          @include fontStyles($font_3, 10rem, 17rem, 400);
          height: 100%;
          word-break: break-word;
        }
        em {
          display: inline;
          color: $color_primary;
        }
        strong {
          display: inline;
          color: $color_dark-black;
          font-weight: 500;
        }
        a {
          position: relative;
          display: block;
          text-align: center;
          color: $color_white;
          background: $color_black;
          border: 1rem solid $color_black;
          padding: 15rem;
          border-radius: 30rem;
          margin-top: 20rem;
          @include fontStyles($font_3, 21rem, 26rem, 500);
          transition: all $transition_base;
          @media screen and (max-width: $brakepoint) {
            @include fontStyles($font_3, 12rem, 18rem, 400);
            padding: 8rem;
          }
          &:hover {
            background: rgba($color_black, 0.8);
          }
        }
        ul {
          display: flex;
          flex-direction: column;
          gap: 10rem;
          @media screen and (max-width: $brakepoint) {
            gap: 6rem;
          }
          li {
            color: $color_dark-black;
            @include fontStyles($font_3, 18rem, 28rem, 400);
            @media screen and (max-width: $brakepoint) {
              @include fontStyles($font_3, 10rem, 17rem, 400);
              text-align: start;
            }
            em {
              display: inline;
              color: $color_primary;
            }
            strong {
              display: inline;
              color: $color_dark-black;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
  &--horizontal {
    display: flex;
    .table {
      &__header {
        &-cell {
          @include fontStyles($font_3, 18rem, 28.8rem, 500);
          padding: 20rem;
          text-transform: unset;
          text-align: start;
          border-bottom: 1rem solid $color_white;
          border-right: none;
          @media screen and (max-width: $brakepoint) {
            width: 100%;
            padding: 12rem 15rem;
            @include fontStyles($font_3, 10rem, 13rem, 600, 0.6rem);
            color: $color_white;
            background: $color_primary;
            text-transform: uppercase;
            text-align: center;
            border-bottom: none;
          }
        }
      }
      &__body {
        width: 100%;
      }
      &__row {
        width: 100%;
        display: flex;
        flex-direction: column;
        border: none;
        @media screen and (max-width: $brakepoint) {
          min-width: 100%;
          max-width: 100%;
        }
        &-cell {
          display: grid;
          grid-template-columns: 1fr 2fr;
          border-right: none;
          @media screen and (max-width: $brakepoint) {
            display: flex;
            flex-direction: column;
          }
          &:first-child {
            @media screen and (max-width: $brakepoint) {
              border-radius: 15rem 15rem 0 0;
              overflow: hidden;
            }

            .table__header-cell {
              border-radius: 20rem 0 0 0;
            }
            .table__row-cell-inner {
              border-top: 1rem solid $color_gray;
              border-radius: 0 20rem 0 0;
              @media screen and (max-width: $brakepoint) {
                border-radius: unset;
                border-top: none;
              }
            }
          }
          &:last-child {
            .table__header-cell {
              border-radius: 0 0 0 20rem;
              border-bottom: none;
              @media screen and (max-width: $brakepoint) {
                border-radius: unset;
              }
            }
            .table__row-cell-inner {
              border-radius: 0 0 20rem 0;
              @media screen and (max-width: $brakepoint) {
                border-radius: 0 0 20rem 20rem;
                border-bottom: 1rem solid $color_gray;
              }
            }
          }
          &-inner {
            border-bottom: 1rem solid $color_gray;
            border-right: 1rem solid $color_gray;
            @media screen and (max-width: $brakepoint) {
              border-bottom: none;
              border-top: none;
              border-left: 1rem solid $color_gray;
            }
          }
        }
        &--bg {
          background: transparent;
          .table__row-cell-inner {
            background: $color_bg;
          }
        }
      }
    }
  }
}
</style>
