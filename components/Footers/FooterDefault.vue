<template>
  <footer class="footer">
    <div class="footer__inner sb-container">
      <div class="footer__logo-wrapper">
        <div class="footer__icon"></div>
        <NuxtLink to="/" class="footer__logo"></NuxtLink>
      </div>
      <nav class="footer__nav">
        <ul class="footer__nav-list">
          <li
            class="footer__nav-list-item"
            v-for="item in menuItems"
            :class="{
              'footer__nav-list-item--selected': selectedItemRoute === item.route,
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
      </nav>
      <div class="footer__policy">
        <ul class="footer__policy-list">
          <li class="footer__policy-list-item">
            <NuxtLink to="/privacy-policy" class="underline-light-gray"
              >Политика конфедициальности</NuxtLink
            >
          </li>
          <li class="footer__policy-list-item">
            <NuxtLink to="/terms-of-use" class="underline-light-gray"
              >Пользовательское соглашение</NuxtLink
            >
          </li>
        </ul>
        <p class="footer__imgs-links desktop-hidden">
          Все фотографии на сайте взяты с сайта:
          <a href="https://freepik.com" target="_blank" class="underline-light-gray">freepik.com</a> и <a
            href="https://unsplash.ru"
            target="_blank"
            class="underline-light-gray"
            >unsplash.ru</a
          >
        </p>
      </div>
      <div class="footer__other-links">
        <p class="footer__imgs-links mobile-hidden">
          Все фотографии на сайте взяты с сайта:
          <a href="https://freepik.com" target="_blank" class="underline-light-gray">freepik.com</a> и <a
            href="https://unsplash.ru"
            target="_blank"
            class="underline-light-gray"
            >unsplash.ru</a
          >
        </p>
        <span class="footer__year">© Skills_Booster {{ new Date().getFullYear() }}</span>
        <span class="footer__developer"
          >Разработка сайта —
          <a href="https://renlin-code.online?ru" target="_blank" class="underline-primary"
            >renlin-code.online</a
          ></span
        >
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterDefault",
  data: () => ({
    selectedItemRoute: null,
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
  created() {
    this.$nuxt.$on(
      "pagePathName",
      (pagePathName) => (this.selectedItemRoute = `/${pagePathName}`)
    );
  },
};
</script>

<style scoped lang="scss">
.footer {
  border-radius: 50rem 50rem 0 0;
  background: $color_black;
  padding-bottom: 50rem;
  @media screen and (max-width: $brakepoint) {
    border-radius: 30px 30px 0 0;
    padding-bottom: 24rem;
  }
  &__inner {
    display: grid;
    grid-template-columns: 358rem auto 1fr 416rem;
    gap: 62rem;
    @media screen and (max-width: $brakepoint) {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
  }
  &__logo-wrapper {
    padding-top: 27rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: $brakepoint) {
      flex-direction: row-reverse;
      padding-top: 15rem;
      justify-content: space-between;
    }
  }
  &__icon {
    width: 102rem;
    height: 91rem;
    transform: translateY(10rem);
    background: url("/images/others/stars.svg") center/contain no-repeat;
    @media screen and (max-width: $brakepoint) {
      width: 84rem;
      height: 75rem;
      transform: unset;
    }
  }
  &__logo {
    width: 255rem;
    height: 56rem;
    background: url("/images/logos/SkillsBooster_logo_white.svg") center/contain no-repeat;
    @media screen and (max-width: $brakepoint) {
      width: 159rem;
      height: 35rem;
    }
  }
  &__nav {
    padding-top: 40rem;
    @media screen and (max-width: $brakepoint) {
      padding-top: 0;
      padding-bottom: 16rem;
      border-bottom: 1rem solid $color_light-gray;
    }
    &-list {
      display: flex;
      flex-direction: column;
      gap: 15rem;
      @media screen and (max-width: $brakepoint) {
        gap: 12rem;
      }
      &-item {
        @include fontStyles($font_3, 20rem, 24rem, 400);
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_3, 16rem, 20rem, 400);
        }
        & :deep a {
          color: $color_white;
        }
        &--selected {
          & :deep a {
            color: $color_primary;
          }
        }
      }
    }
  }
  &__policy {
    padding-top: 40rem;
    @media screen and (max-width: $brakepoint) {
      padding-top: 16rem;
      border-bottom: 1rem solid $color_light-gray;
      padding-bottom: 16rem;
    }
    &-list {
      display: flex;
      flex-direction: column;
      gap: 15rem;
      @media screen and (max-width: $brakepoint) {
        gap: 12rem;
        margin-bottom: 12rem;
      }
      &-item {
        @include fontStyles($font_3, 18rem, 22rem, 400);
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_3, 14rem, 17rem, 500);
        }
        & :deep a {
          color: $color_light-gray;
        }
      }
    }
  }
  &__other-links {
    padding-top: 40rem;
    @media screen and (max-width: $brakepoint) {
      padding-top: 16rem;
    }
  }
  &__imgs-links {
    color: $color_white;
    @include fontStyles($font_2, 16rem, 24rem, 400);
    margin-bottom: 30rem;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_2, 13rem, 20rem, 400);
      margin-bottom: 0;
    }
    & :deep a {
      color: $color_light-gray;
    }
  }
  &__year {
    display: block;
    color: $color_white;
    @include fontStyles($font_2, 16rem, 24rem, 400);
    margin-bottom: 15rem;
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_2, 13rem, 20rem, 400);
      margin-bottom: 12rem;
    }
  }
  &__developer {
    display: block;
    color: $color_white;
    @include fontStyles($font_2, 16rem, 24rem, 400);
    @media screen and (max-width: $brakepoint) {
      @include fontStyles($font_2, 13rem, 20rem, 400);
    }
    & :deep a {
      color: $color_primary;
    }
  }

}
</style>
