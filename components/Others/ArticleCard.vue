<template>
  <div class="article-card"
    :class="{'article-card--minified' : minified}"
  >
    <div class="article-card__top">
      <div class="article-card__top-bg"></div>
      <div class="article-card__top-content">
        <div class="article-card__cat">Программирование</div>
        <h6 class="article-card__title">
          Топ 10 самых восстребованных языков программирования
        </h6>
      </div>
    </div>
    <div class="article-card__bottom">
      <p class="article-card__description">
        Привет, друзья! Сегодня мы поговорим о том, как искусственный интеллект помогает
        нам оставаться
      </p>
      <div class="article-card__link">
        ЧИТАТЬ ПОЛНОСТЬЮ
        <svg
          width="51rem"
          height="12rem"
          viewBox="0 0 51 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50.5303 6.53033C50.8232 6.23744 50.8232 5.76257 50.5303 5.46967L45.7574 0.696703C45.4645 0.40381 44.9896 0.40381 44.6967 0.696703C44.4038 0.989596 44.4038 1.46447 44.6967 1.75736L48.9393 6L44.6967 10.2426C44.4038 10.5355 44.4038 11.0104 44.6967 11.3033C44.9896 11.5962 45.4645 11.5962 45.7574 11.3033L50.5303 6.53033ZM-6.55671e-08 6.75L50 6.75L50 5.25L6.55671e-08 5.25L-6.55671e-08 6.75Z"
            fill="#F26F6F"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    minified: {
      type: Boolean,
      default: false
    },
  }
};
</script>

<style scoped lang="scss">
.article-card {
  width: 770rem;
  border-radius: 30rem;
  border: 1rem solid $color_gray;
  cursor: pointer;
  @media screen and (max-width: $brakepoint) {
    width: 100%;
  }
  &__top {
    position: relative;
    border-radius: 30rem;
    background-color: $color_primary;
    transform: scale(1.005);
    overflow: hidden;
    &-content {
      background-image: url("/images/7.png");
      background-position: bottom right;
      background-repeat: no-repeat;
      background-size: 232rem 182rem;
      padding: 25rem 30rem;
      @media screen and (max-width: $brakepoint) {
        padding: 16rem;
        background-size: 110rem 87rem;
      }
    }
    &-bg {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0%;
      height: 0%;
      border-top-left-radius: 200%;
      background: rgba($color_white, 0.2);
      z-index: -1;
      transform-origin: right bottom;
      transition: all 0.4s ease-in-out;
    }
  }
  &__cat {
    display: inline-block;
    background: #abd2ff;
    padding: 6rem 30rem;
    border-radius: 32rem;
    @include fontStyles($font_3, 15rem, unset, 400);
    margin-bottom: 15rem;
    @media screen and (max-width: $brakepoint) {
      padding: 6rem 12rem;
      @include fontStyles($font_3, 12rem, 18rem, 400);
      margin-bottom: 10rem;
    }
  }
  &__title {
    color: $color_white;
    @include fontStyles($font_1, 26rem, 41rem, 400);
    max-width: 474rem;
    min-height: 166rem;
    @media screen and (max-width: $brakepoint) {
      max-width: 100%;
      @include fontStyles($font_1, 13rem, 20rem, 400, 2rem);
    }

  }
  &__bottom {
    padding: 20rem 30rem;
    @media screen and (max-width: $brakepoint) {
      padding: 10rem 16rem 16rem;
    }
  }
  &__description {
    @include fontStyles($font_3, 16rem, 24rem, 400);
    margin-bottom: 20rem;
    min-height: 72rem;
    @media screen and (max-width: $brakepoint) {
      margin-bottom: 12rem;
      min-height: unset;
      @include fontStyles($font_3, 13rem, 20rem, 400);
    }
  }
  &__link {
    display: inline-flex;
    align-items: center;
    gap: 10rem;
    @include fontStyles($font_3, 20rem, 24rem, 500);
    transition: all $transition_base;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_3, 14rem, 21rem, 500);
    }
    svg path {
      transition: all $transition_base;
    }
    &:hover {
      gap: 19rem;
      svg path {
        fill: $color_black;
      }
    }
  }
  &:hover {
    .article-card {
      &__top {
        &-bg {
          width: 150%;
          height: 150%;
        }
      }
    }
  }
  &--minified {
    width: 375rem;
    @media screen and (max-width: $brakepoint) {
      width: 100%;
    }
    .article-card {
      &__top {
        background: $color_black;
        &-content {
          background-image: none !important;
        }
      }
      &__title {
        @include fontStyles($font_1, 20rem, 32rem, 400, 2rem);
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_1, 13rem, 20rem, 400, 2rem);
        }
      }
    }
  }
}
</style>
