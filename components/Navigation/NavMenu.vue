<template>
  <nav class="nav-menu">
    <Burger
      class="nav-menu__burger desktop-hidden"
      @click.native="open = true"
      :open="open"
    />
    <transition name="fade">
      <div v-if="open" class="nav-menu__outside-layer" @click="open = false"></div>
    </transition>
    <div class="nav-menu__menu mobile-menu" :class="{ 'mobile-menu--open': open }">
      <div class="mobile-menu__header">
        <NuxtLink
          to="/"
          class="mobile-menu__header-logo"
          @click.native="open = false"
        ></NuxtLink>
        <button
          class="mobile-menu__header-close desktop-hidden"
          @click="open = false"
        ></button>
      </div>
      <div class="mobile-menu__body">
        <ul class="mobile-menu__list">
          <li
            class="mobile-menu__list-item"
            v-for="item in menuItems"
            :class="{
              'mobile-menu__list-item--selected': selectedItemRoute === item.route,
            }"
          >
            <NuxtLink
              class="underline-primary"
              :to="item.route"
              @click.native="open = false"
              >{{ item.name }}</NuxtLink
            >
          </li>
        </ul>
        <div class="mobile-menu__bottom desktop-hidden"></div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapMutations } from "vuex";

import Burger from "~/components/Navigation/Burger.vue";
export default {
  name: "NavMenu",
  components: {
    Burger,
  },
  data: () => ({
    selectedItemRoute: null,
    open: false,
    menuItems: [
      {
        name: "Блог",
        route: "/blog",
      },
      {
        name: "Отзывы о школах",
        route: "/schools-reviews",
      },
      {
        name: "Акции школ",
        route: "/schools-sales",
      },
      {
        name: "О проекте",
        route: "/about",
      },
    ],
  }),
  methods: {
    ...mapMutations(["setScrollFixedValue"]),
  },
  watch: {
    open(value) {
      this.setScrollFixedValue(value);
    },
  },
  created() {
    this.$nuxt.$on(
      "page-path-name",
      (pagePathName) => (this.selectedItemRoute = `/${pagePathName}`)
    );
  },
};
</script>
<style scoped lang="scss">
.nav-menu {
  &__burger {
    @media screen and (max-width: $brakepoint) {
      margin-bottom: 6rem;
    }
  }
  &__outside-layer {
    @media screen and (max-width: $brakepoint) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba($color_white, 0.4);
    }
  }
  .mobile-menu {
    @media screen and (max-width: $brakepoint) {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: 66rem;
      position: fixed;
      top: 0;
      right: -100%;
      height: 100vh;
      width: calc(100vw - 45rem);
      background: $color_bg;
      padding: 15rem;
      transition: all $transition_base;
      transition-delay: 0.3s;
    }
    &__header {
      @media screen and (max-width: $brakepoint) {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      &-logo {
        @media screen and (max-width: $brakepoint) {
          width: 136rem;
          height: 28rem;
          background: url("/images/logos/SkillsBooster_logo_black.svg") center/contain
            no-repeat;
        }
      }
      &-close {
        width: 16rem;
        height: 16rem;
        margin: 8rem;
        background: url("/images/icons/close.svg") center/contain no-repeat;
      }
    }
    &__body {
      @media screen and (max-width: $brakepoint) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    &__list {
      display: flex;
      align-items: center;
      gap: 50rem;
      @media screen and (max-width: $brakepoint) {
        flex-direction: column;
        align-items: flex-start;
        gap: 16rem;
      }
      &-item {
        @include fontStyles($font_3, 24rem, normal, 400);
        &--selected {
          & :deep a {
            color: $color_primary;
          }
        }
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_3, 22rem, normal, 500);
        }
      }
    }
    &__bottom {
      align-self: center;
      width: 190rem;
      height: 12rem;
      background: url("/images/others/arrows.svg") center/contain no-repeat;
    }
    &--open {
      right: 0;
    }
  }
}
</style>
