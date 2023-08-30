<template>
  <section class="schools-sales-short">
    <div class="schools-sales-short__inner sb-container">
      <div class="schools-sales-short__top">
        <h2 class="schools-sales-short__title sb-section-title">Акции школ</h2>
        <NuxtLink to="/blog" class="mobile-hidden">
          <TextArrowButton>Все статьи</TextArrowButton>
        </NuxtLink>
      </div>
      <div class="schools-sales-short__sales">
        <ul class="schools-sales-short__sales-cards">
          <li class="schools-sales-short__sales-cards-card">
            <NuxtLink to="/">
              <SaleCard />
            </NuxtLink>
          </li>
          <li class="schools-sales-short__sales-cards-card">
            <NuxtLink to="/">
              <SaleCard />
            </NuxtLink>
          </li>
          <li class="schools-sales-short__sales-cards-card">
            <NuxtLink to="/">
              <SaleCard />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import TextArrowButton from '~/components/Buttons/TextArrowButton.vue';
import SaleCard from '~/components/Others/SaleCard.vue';

export default {
    name: "SchoolsSalesShortSection",
    components: {
      TextArrowButton,
      SaleCard
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
  }
  &__sales {
    &-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20rem;
    }
  }
}
</style>
