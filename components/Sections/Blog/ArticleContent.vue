<template>
  <article class="article-content">
    <div class="article-content__inner">
      <div
        class="article-content__banner banner sb-container"
        :style="`background-image: url(${content.category.image})`"
      >
        <h1 class="banner__title">
          {{ content.title }}
        </h1>
        <div
          class="banner__cat sb-noselect"
          :style="`background: ${content.category.color}`"
        >
          {{ content.category.title }}
        </div>
      </div>
      <div class="article-content__body body sb-container">
        <div class="body__left">
          <div class="body__left-index index" :class="{ 'index--close': indexClose }">
            <button
              class="index__head"
              :class="{ index__head: indexClose }"
              @click="indexClose = !indexClose"
            >
              <span>Содержание</span>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.9325 9.92446C26.5809 9.57295 26.104 9.37549 25.6068 9.37549C25.1097 9.37549 24.6328 9.57295 24.2812 9.92446L15 19.2057L5.71872 9.92446C5.36509 9.58292 4.89146 9.39393 4.39984 9.3982C3.90822 9.40247 3.43795 9.59966 3.09031 9.9473C2.74267 10.2949 2.54548 10.7652 2.54121 11.2568C2.53694 11.7485 2.72593 12.2221 3.06747 12.5757L13.6743 23.1826C14.026 23.5341 14.5028 23.7316 15 23.7316C15.4972 23.7316 15.974 23.5341 16.3256 23.1826L26.9325 12.5757C27.284 12.2241 27.4814 11.7473 27.4814 11.2501C27.4814 10.7529 27.284 10.2761 26.9325 9.92446Z"
                  fill="#393939"
                />
              </svg>
            </button>
            <Transition name="index">
              <ol class="index__list" v-if="!indexClose">
                <li
                  v-for="(section, index) in sectionsTitles"
                  :class="{ hover: indexHover === index }"
                >
                  <span class="sb-noselect">{{ index + 1 }}.&nbsp;</span>
                  <div>
                    <a
                      :href="`#section-${index + 1}`"
                      @mouseover="indexHover = index"
                      @mouseout="indexHover = null"
                    >
                      {{ section }}
                    </a>
                  </div>
                </li>
              </ol>
            </Transition>
          </div>
          <div class="body__left-content sections">
            <section
              class="sections__section section"
              v-for="(section, index) in content.sections"
              :id="`section-${index + 1}`"
            >
              <h3 class="section__title">
                {{ section.article_section_title }}
              </h3>
              <div class="section__content">
                <div
                  class="section__content-block"
                  v-for="block in section.article_section_content"
                >
                  <div
                    class="section__content-html"
                    :class="{ 'section__content-html--backgrounded': block.backgrounded }"
                    v-if="block._type === 'content_html'"
                    v-html="block.content_html"
                  ></div>

                  <figure
                    class="section__content-img"
                    v-if="block._type === 'content_img'"
                  >
                    <img :src="isMobile ? block.content_img_mob : block.content_img" alt="" />
                  </figure>

                  <ul
                    class="section__content-list"
                    :class="{ 'section__content-list--iconified-ul': block.iconified }"
                    v-if="block._type === 'content_list' && !block.ordered"
                  >
                    <li
                      class="section__content-list-item"
                      v-for="(element, index) in block.content_list"
                    >
                      <div class="section__content-list-item-inner">
                        <div
                          class="section__content-list-title"
                          v-if="element.title"
                          v-html="element.title"
                        ></div>
                        <div
                          class="section__content-list-body"
                          v-html="element.body"
                        ></div>
                      </div>
                    </li>
                  </ul>

                  <ol
                    class="section__content-list"
                    :class="{
                      'section__content-list--iconified-ol': block.iconified,
                      'section__content-list--ordered': block.ordered,
                    }"
                    v-if="block._type === 'content_list' && block.ordered"
                  >
                    <li
                      class="section__content-list-item"
                      v-for="(element, index) in block.content_list"
                    >
                      <span
                        class="section__content-list-item-icon"
                        v-if="block.ordered && block.iconified"
                        >{{ index + 1 }}</span
                      >
                      <div class="section__content-list-item-inner">
                        <div
                          class="section__content-list-title"
                          v-if="element.title"
                          v-html="element.title"
                        ></div>
                        <div
                          class="section__content-list-body"
                          v-html="element.body"
                        ></div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="body__right">RIGHT</div>
      </div>
    </div>
  </article>
</template>

<script>
import mediaQueryMixin from '~/mixins/mediaQueryMixin';
export default {
  name: "ArticleContent",
  mixins: [mediaQueryMixin],
  props: {
    content: {
      type: Object,
    },
  },
  data: () => ({
    indexHover: null,
    indexClose: false,
  }),
  computed: {
    sectionsTitles() {
      return this.content.sections.map((i) => i.article_section_title);
    },
  },
  mounted() {
    this.mediaQueryHook();
  },
};
</script>

<style lang="scss">
.article-content {
  .banner {
    border-radius: 30rem;
    background-color: $color_primary;
    min-height: 470rem;
    display: grid;
    grid-template-rows: 1fr auto;
    align-items: center;
    padding: 42rem 116rem;
    margin-bottom: 50rem;
    background-position: bottom right;
    background-repeat: no-repeat;
    background-size: 401rem auto;
    @media screen and (max-width: $brakepoint) {
      border-radius: 0;
      min-height: 320rem;
      display: block;
      padding: 30rem 15rem;
      margin-bottom: 24rem;
      background-size: 174rem auto;
    }
    &__title {
      width: 1056rem;
      margin: 0 auto;
      color: $color_white;
      text-align: center;
      @include fontStyles($font_1, 36rem, 57.5rem, 400, 3.6rem);
      @media screen and (max-width: $brakepoint) {
        width: 100%;
        @include fontStyles($font_1, 18rem, 28.8rem, 400, 1.8rem);
        text-align: start;
        margin-bottom: 16rem;
      }
    }
    &__cat {
      width: min-content;
      @include fontStyles($font_3, 16rem, 19.5rem, 400);
      padding: 12rem 30rem;
      border-radius: 20rem;
      @media screen and (max-width: $brakepoint) {
        padding: 8rem 20rem;
        @include fontStyles($font_3, 14rem, 21rem, 500);
      }
    }
  }
  .body {
    display: grid;
    grid-template-columns: 1fr 400rem;
    gap: 20rem;
    @media screen and (max-width: $brakepoint) {
      display: flex;
      flex-direction: column;
      padding: 0;
    }
  }
  .index {
    border-radius: 50rem;
    padding: 50rem;
    background: $color_bg;
    margin-bottom: 10rem;
    @media screen and (max-width: $brakepoint) {
      border-radius: 30rem;
      padding: 30rem 15rem;
      margin-bottom: 0;
    }
    &__head {
      display: inline-flex;
      gap: 12rem;
      align-items: center;
      transition: all $transition_base;
      @media screen and (max-width: $brakepoint) {
        gap: 4rem;
      }
      span {
        @include fontStyles($font_2, 36rem, 57.6rem, 600);
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_2, 18rem, 28.8rem, 600);
        }
      }
      svg {
        width: 30rem;
        height: 30rem;
        transform: rotate(-180deg);
        transition: all $transition_base;
        path {
          transition: fill $transition_base;
        }
        @media screen and (max-width: $brakepoint) {
          width: 14rem;
          height: 14rem;
        }
      }
      &:hover {
        svg {
          path {
            fill: $color_primary;
          }
        }
      }
    }
    &__list {
      display: flex;
      flex-direction: column;
      gap: 16rem;
      margin-top: 30rem;
      transform-origin: top;
      transition: all $transition_base;
      @media screen and (max-width: $brakepoint) {
        gap: 8rem;
        margin-top: 16rem;
      }
      li {
        display: grid;
        grid-template-columns: auto 1fr;
        div {
          display: inline-flex;
        }
        &.hover {
          span,
          div a {
            color: $color_primary;
          }
        }
        span, a {
          @include fontStyles($font_2, 22rem, 35.2rem, 400, 1.1rem);
          transition: all $transition_base;
          @media screen and (max-width: $brakepoint) {
            @include fontStyles($font_2, 14rem, 21rem, 400, 0.7rem);
          }
        }
        a {
          text-decoration: underline;
        }
      }
    }
    &--close {
      .index {
        &__head {
          svg {
            transform: rotate(0);
          }
        }
      }
    }
  }
  .sections {
    display: flex;
    flex-direction: column;
    .section {
      padding-top: 40rem;
      @media screen and (max-width: $brakepoint) {
        padding-top: 24rem;
      }
      &__title {
        @include fontStyles($font_3, 22rem, 35.2rem, 600, 2.2rem);
        text-transform: uppercase;
        margin-bottom: 30rem;
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_3, 16rem, 25.6rem, 600, 0.8rem);
          margin-bottom: 16rem;
          padding: 0 15rem;
        }
      }
      &__content {
        display: flex;
        flex-direction: column;
        gap: 20rem;
        &-html {
          @include fontStyles($font_3, 20rem, 30rem, 400, 1rem);
          @media screen and (max-width: $brakepoint) {
            @include fontStyles($font_3, 14rem, 21rem, 500);
            padding: 0 15rem;
          }
          em {
            display: inline;
            color: $color_primary;
          }
          a {
            display: inline;
            color: $color_primary;
            transition: all $transition_base;
            &:hover {
              opacity: 0.8;
            }
          }
          strong {
            display: inline;
            color: $color_black;
            font-weight: 600;
          }
          &--backgrounded {
            padding: 20rem;
            border-radius: 20rem;
            background: $color_bg;
            @media screen and (max-width: $brakepoint) {
              padding: 20rem 10rem;
              margin: 0 15rem;
            }
          }
        }
        &-img {
          display: flex;
          border-radius: 20rem;
          overflow: hidden;
          @media screen and (max-width: $brakepoint) {
            border-radius: 0;
          }
          img {
            width: 100%;
            object-fit: contain;
          }
        }
        &-list {
          display: flex;
          flex-direction: column;
          gap: 20rem;
          @media screen and (max-width: $brakepoint) {
            gap: 12rem;
            padding: 0 15rem;
          }
          &-title {
            @include fontStyles($font_3, 20rem, 32rem, 600, 1rem);
            @media screen and (max-width: $brakepoint) {
              @include fontStyles($font_3, 15rem, 24rem, 600);
            }
            em {
              display: inline;
              color: $color_primary;
            }
            a {
              display: inline;
              color: $color_primary;
              transition: all $transition_base;
              &:hover {
                opacity: 0.8;
              }
            }
            strong {
              display: inline;
              color: $color_black;
              font-weight: 600;
            }
          }
          &-body {
            @include fontStyles($font_3, 20rem, 30rem, 400, 1rem);
            @media screen and (max-width: $brakepoint) {
              @include fontStyles($font_3, 14rem, 21rem, 500);
            }
            em {
              display: inline;
              color: $color_primary;
            }
            a {
              display: inline;
              color: $color_primary;
              transition: all $transition_base;
              &:hover {
                opacity: 0.8;
              }
            }
            strong {
              display: inline;
              color: $color_black;
              font-weight: 600;
            }
          }
          &-item {
            &-inner {
              display: flex;
              flex-direction: column;
              gap: 10rem;
              @media screen and (max-width: $brakepoint) {
                gap: 8rem;
              }
            }
            &-icon {
              display: grid;
              width: 50rem;
              height: 50rem;
              place-content: center;
              border-radius: 50%;
              background: $color_primary;
              color: $color_white;
              @include fontStyles($font_2, 20rem, 30rem, 700, 1rem);
              @media screen and (max-width: $brakepoint) {
                width: 25rem;
                height: 25rem;
                @include fontStyles($font_2, 12rem, 18rem, 700, 0.6rem);
              }
            }
          }
          &--iconified-ul {
            li {
              position: relative;
              padding-left: 33rem;
              @media screen and (max-width: $brakepoint) {
                padding-left: 18rem;
              }
              &::before {
                content: "";
                position: absolute;
                top: 6rem;
                left: 0;
                width: 18rem;
                height: 18rem;
                border-radius: 50%;
                background: $color_primary;
                @media screen and (max-width: $brakepoint) {
                  width: 14rem;
                  height: 14rem;
                }
              }
            }
          }
          &--iconified-ol {
            li {
              display: grid;
              grid-template-columns: 50rem 1fr;
              gap: 15rem;
              @media screen and (max-width: $brakepoint) {
                grid-template-columns: 25rem 1fr;
                gap: 8rem;
              }
            }
          }
        }
      }
    }
  }
}
//TRANSITIONS
.index-enter-active,
.index-leave-active {
  transition: all $transition_base;
}
.index-enter, .index-leave-to /* .index-leave-active до версии 2.1.8 */ {
  transform: scaleY(0);
}
</style>
