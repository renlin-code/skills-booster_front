<template>
  <div class="breadcrumbs sb-noselect">
    <ul class="breadcrumbs__items">
      <li class="breadcrumbs__item"
        v-for="route in routes"
      >
        <div class="breadcrumbs__item-icon">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 0L8.08156 3.6713L11.1145 1.33688L9.83156 4.94275L13.6574 4.83688L10.5 7L13.6574 9.16312L9.83156 9.05725L11.1145 12.6631L8.08156 10.3287L7 14L5.91844 10.3287L2.8855 12.6631L4.16844 9.05725L0.342604 9.16312L3.5 7L0.342604 4.83688L4.16844 4.94275L2.8855 1.33688L5.91844 3.6713L7 0Z"
              fill="#F26F6F"
            />
          </svg>
        </div>
        <NuxtLink class="breadcrumbs__item-link" :to="route.path">{{ route.name }}</NuxtLink>
      </li>
      <li class="breadcrumbs__item">
        <div class="breadcrumbs__item-icon">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 0L8.08156 3.6713L11.1145 1.33688L9.83156 4.94275L13.6574 4.83688L10.5 7L13.6574 9.16312L9.83156 9.05725L11.1145 12.6631L8.08156 10.3287L7 14L5.91844 10.3287L2.8855 12.6631L4.16844 9.05725L0.342604 9.16312L3.5 7L0.342604 4.83688L4.16844 4.94275L2.8855 1.33688L5.91844 3.6713L7 0Z"
              fill="#F26F6F"
            />
          </svg>
        </div>
        <span>{{ scrumbsPageName }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import mediaQueryMixin from "~/mixins/mediaQueryMixin";

export default {
  name: "BreadCrumbs",
  mixins: [mediaQueryMixin],
  props: {
    routes: {
      type: Array,
      default: [
        {
          name: "",
          path: "",
        },
      ],
    },
    pageName: {
      type: String
    },
    sliced: {
      type: Boolean
    }
  },
  data: () => ({
    // pageName: "Топ 10 самых восстребованных языков программирования",
    scrumbsPageName: "",
  }),
  mounted() {
    this.mediaQueryHook(() => {
      this.scrumbsPageName = this.isMobile && this.sliced
        ? this.pageName.slice(0, 30).concat("...")
        : this.pageName;
    });
  },
};
</script>

<style scoped lang="scss">
.breadcrumbs {
  &__items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10rem;
    @media screen and (max-width: $brakepoint) {
      gap: 4rem;
    }
  }
  &__item {
    display: flex;
    align-items: center;
    gap: 5rem;
    @media screen and (max-width: $brakepoint) {
      gap: 4rem;
    }
    & span,
    &:deep a {
      @include fontStyles($font_3, 15rem, 18.2rem, 400);
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_3, 13rem, 19.5rem, 400);
      }
    }
    &:deep a {
      transition: all $transition_base;
      &:hover {
        color: $color_primary;
      }
    }
    &-icon {
      display: grid;
      width: 14rem;
      height: 14rem;
      @media screen and (max-width: $brakepoint) {
        width: 8rem;
        height: 8rem;
      }
      svg {
        width: 14rem;
        height: 14rem;
        @media screen and (max-width: $brakepoint) {
          width: 8rem;
          height: 8rem;
        }
      }
    }
    &:first-child {
      .breadcrumbs__item-icon {
        display: none;
      }
    }
  }
}
</style>
