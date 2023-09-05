<template>
  <section class="schools-sales-short sb-noselect">
    <div class="schools-sales-short__inner sb-container">
      <div class="schools-sales-short__top">
        <h2 class="schools-sales-short__title sb-section-title">{{ injectedTitle }}</h2>
        <NuxtLink to="/schools-sales" class="mobile-hidden">
          <TextArrowButton>Все акции</TextArrowButton>
        </NuxtLink>
      </div>
      <div class="schools-sales-short__sales">
        <Slider desktop-off>
          <Slide>
            <div class="schools-sales-short__sales-card">
              <SaleCard link-to="/" />
            </div>
          </Slide>
          <Slide>
            <div class="schools-sales-short__sales-card">
              <SaleCard link-to="/" black />
            </div>
          </Slide>
          <Slide>
            <div class="schools-sales-short__sales-card">
              <SaleCard link-to="/" />
            </div>
          </Slide>
        </Slider>
      </div>
      <div class="sb-container desktop-hidden">
        <NuxtLink to="/blog">
          <MainButton arrow type="3">Все акции</MainButton>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
import TextArrowButton from "~/components/Buttons/TextArrowButton.vue";
import SaleCard from "~/components/Others/SaleCard.vue";
import Slider from "~/components/Slider/Slider.vue";
import Slide from "~/components/Slider/Slide.vue";
import MainButton from "~/components/Buttons/MainButton.vue";

export default {
  name: "SchoolsSalesShortSection",
  components: {
    TextArrowButton,
    SaleCard,
    Slider,
    Slide,
    MainButton,
  },
  props: {
    injectedTitle: {
      type: String
    }
  }
};
</script>

<style scoped lang="scss">
.schools-sales-short {
  &__inner {
    background: $color_bg;
    border-radius: 50rem;
    padding: 60rem 50rem;
    @media screen and (max-width: $brakepoint) {
      border-radius: 30rem;
      padding: 30rem 0;
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
    &-card {
      height: 100%;
    }
    @media screen and (max-width: $brakepoint) {
      margin-bottom: 12rem;
    }
  }
}
</style>
