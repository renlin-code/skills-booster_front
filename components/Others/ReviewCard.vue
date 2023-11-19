<template>
  <div class="review-card">
    <div class="review-card__inner">
      <div class="review-card__top">
        <div class="review-card__top-average">
          <span>{{ content.rate }}</span>
          <div class="review-card__top-average-stars">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div
              class="review-card__top-average-stars-layer"
              :style="`width: ${100 - content.rate * 20}%`"
            ></div>
          </div>
        </div>
        <div class="review-card__top-autor" v-if="!isMobile">
          {{ content.autor }}
        </div>
        <div class="review-card__top-date">
          {{ formattedDate }}
        </div>
      </div>
      <div class="review-card__bottom">
        <p class="review-card__bottom-text">{{ shownText }}</p>
        <button
          v-if="isLongText"
          @click="showFullText = !showFullText"
          class="review-card__bottom-open"
        >
          {{ showFullText ? "Скрыть" : "Читать полностью" }}
        </button>
        <div class="review-card__top-autor" v-if="isMobile">
          {{ content.autor }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mediaQueryMixin from "~/mixins/mediaQueryMixin";

export default {
  name: "ReviewCard",
  mixins: [mediaQueryMixin],
  props: {
    content: {
      type: Object,
    },
  },
  data: () => ({
    showFullText: false,
  }),
  computed: {
    formattedDate() {
      return this.content.date.split("-").reverse().join("-");
    },
    maxLength() {
      return this.isMobile ? 200 : 450;
    },
    isLongText() {
      const fullDescription = this.content.text;
      return fullDescription.length > this.maxLength;
    },
    shownText() {
      const fullDescription = this.content.text;
      if (this.isLongText) {
        return (this.showFullText)
        ? fullDescription
        : `${fullDescription.slice(0, this.maxLength)}...`;
      } else {
        return fullDescription;
      }
    },
  },
  watch: {
    content() {
      this.showFullText = false;
    }
  },
  mounted() {
    this.mediaQueryHook();
  },
};
</script>

<style scoped lang="scss">
.review-card {
  &__inner {
    padding: 30rem 50rem;
    background: $color_bg;
    border-radius: 30rem;
    @media screen and (max-width: $brakepoint) {
      padding: 20rem 15rem;
      border-radius: 20rem;
    }
  }
  &__top {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 15rem;
    align-items: center;
    margin-bottom: 20rem;
    @media screen and (max-width: $brakepoint) {
      margin-bottom: 12rem;
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
    &-date,
    &-autor {
      @include fontStyles($font_2, 22rem, 33rem, 700, 1.1rem);
      color: $color_gray;
    }
    &-date {
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_2, 16rem, 25.6rem, 600);
      }
    }
    &-autor {
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_2, 14rem, 21rem, 400, 0.7rem);
        margin-top: 12rem;
      }
    }
  }
  &__bottom {
    &-text {
      @include fontStyles($font_3, 20rem, 30rem, 400, 1rem);
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_3, 15rem, 22.5rem, 400, 0.75rem);
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
}
</style>
