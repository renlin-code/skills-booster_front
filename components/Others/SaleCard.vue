<template>
  <div class="sale-card sale-card--black">
    <div class="sale-card__top">
      <div class="sale-card__top-bg"></div>
      <div class="sale-card__top-content">
        <div class="sale-card__logo-name">
          <img src="/images/skillfactory.png" alt="" />
          <span> Skillfactory </span>
        </div>
        <div class="sale-card__average-dates">
          <div class="sale-card__average">
            <span>4.3</span>
            <div class="sale-card__average-star"></div>
          </div>
          <div class="sale-card__dates">
            <span>с 01.06-31.08</span>
            <span>до 01.08-31.08</span>
          </div>
        </div>
      </div>
    </div>
    <div class="sale-card__bottom">
      <h6 class="sale-card__bottom-title">
        Распродажа в SkillFactory. На все курсы скидка 45%!
      </h6>
      <p class="sale-card__bottom-text">
        Гарантия трудоустройства — или вернут деньги! Запишитесь на программу и заберите
        бонус на 146 000 ₽
      </p>
      <div class="sale-card__bottom-button">
        <MainButton type="1" arrow>На страницу акции</MainButton>
      </div>
    </div>
  </div>
</template>

<script>
import MainButton from "../Buttons/MainButton.vue";

export default {
  name: "sale-card",
  components: { MainButton },
};
</script>

<style scoped lang="scss">
.sale-card {
  position: relative;
  padding-top: 130rem;
  height: 100%;
  &__top {
    width: 100%;
    border-radius: 40rem;
    background: $color_primary;
    padding: 30rem;
    overflow: hidden;
    position: absolute;
    top: 0;
    &-bg {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0%;
      height: 0%;
      border-top-left-radius: 200%;
      background: rgba($color_white, 0.2);
      transform-origin: right bottom;
      transition: all 0.4s ease-in-out;
    }
  }
  &__logo-name {
    display: flex;
    align-items: center;
    gap: 30rem;
    margin-bottom: 20rem;
    img {
      width: 60rem;
      height: 60rem;
      object-fit: cover;
    }
    span {
      color: $color_white;
      @include fontStyles($font_2, 22rem, 33rem, 700, 1.1rem);
    }
  }
  &__average-dates {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__average {
    display: flex;
    align-items: flex-start;
    gap: 5rem;
    span {
      color: $color_white;
      @include fontStyles($font_3, 20rem, 32rem, 600, 1.1rem);
    }
    &-star {
      width: 30rem;
      height: 30rem;
      background: url("/images/icons/star.svg") center/contain no-repeat;
    }
  }
  &__dates {
    display: flex;
    align-items: center;
    gap: 20rem;
    span {
      color: $color_white;
      @include fontStyles($font_3, 20rem, 32rem, 600, 1.1rem);
    }
  }
  &__bottom {
    padding: 60rem 40rem 20rem;
    border-radius: 30rem;
    border: 1rem solid $color_black;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    &-title {
      @include fontStyles($font_1, 20rem, 32rem, 400, 2rem);
      text-align: center;
      margin-bottom: 16rem;
    }
    &-text {
      @include fontStyles($font_3, 18rem, 29rem, 400, 1rem);
      text-align: center;
      margin-bottom: 16rem;
    }
  }
  &:hover {
    .sale-card {
      &__top {
        &-bg {
          width: 150%;
          height: 150%;
        }
      }
    }
  }
  &--black {
    .sale-card {
      &__top {
        background: $color_black;
      }
    }
  }
}
</style>
