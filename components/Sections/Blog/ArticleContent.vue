<template>
  <article class="article-content">
    <div class="article-content__inner">
      <div
        class="article-content__banner banner sb-container sb-observe sb-observe--fade"
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
      <div class="article-content__body body sb-container sb-observe sb-observe--fade-up">
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
                    <img
                      :src="isMobile ? block.content_img_mob : block.content_img"
                      alt=""
                    />
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

                  <div
                    class="section__content-table table"
                    v-if="block._type === 'table' && !block.horizontal"
                  >
                    <div
                      class="table__header mobile-hidden"
                      :style="`grid-template-columns: repeat(${block.content_table_cols.length}, 1fr)`"
                    >
                      <div
                        class="table__header-cell"
                        v-for="col in block.content_table_cols"
                      >
                        {{ col.content_table_col_name }}
                      </div>
                    </div>
                    <div class="table__body">
                      <div
                        class="table__row"
                        v-for="(row, rowIndex) in block.content_table_rows"
                        :class="{ 'table__row--bg': rowIndex % 2 !== 0 }"
                        :style="`grid-template-columns: repeat(${block.content_table_cols.length}, 1fr)`"
                      >
                        <div
                          class="table__row-cell"
                          v-for="(cell, cellIndex) in row.content_table_row_cells"
                        >
                          <div class="table__header-cell desktop-hidden">
                            {{
                              block.content_table_cols[cellIndex].content_table_col_name
                            }}
                          </div>
                          <div class="table__row-cell-inner" v-html="cell.cell"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="section__content-table table--horizontal"
                    v-if="block._type === 'table' && block.horizontal"
                  >
                    <div class="table__body">
                      <div
                        class="table__row"
                        v-for="(row, rowIndex) in block.content_table_rows"
                        :class="{ 'table__row--bg': rowIndex % 2 !== 0 }"
                        :style="`grid-template-columns: repeat(${block.content_table_cols.length}, 1fr)`"
                      >
                        <div
                          class="table__row-cell"
                          v-for="(cell, cellIndex) in row.content_table_row_cells"
                          :class="{ 'table__row--bg': cellIndex % 2 !== 0 && !isMobile }"
                        >
                          <div class="table__header-cell">
                            {{
                              block.content_table_cols[cellIndex].content_table_col_name
                            }}
                          </div>
                          <div class="table__row-cell-inner" v-html="cell.cell"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div class="body__share sb-noselect">
            <h3 class="body__share-title">Поделится статьей</h3>
            <ul class="body__share-links">
              <li class="body__share-links-item">
                <a
                  :href="`https://telegram.me/share/url?url=${urlForShare}&text=${content.title}`"
                  target="_blank"
                >
                  <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M25 0C18.3696 0 12.0107 2.63392 7.32233 7.32233C2.63392 12.0107 0 18.3696 0 25C0 31.6304 2.63392 37.9893 7.32233 42.6777C12.0107 47.3661 18.3696 50 25 50C31.6304 50 37.9893 47.3661 42.6777 42.6777C47.3661 37.9893 50 31.6304 50 25C50 18.3696 47.3661 12.0107 42.6777 7.32233C37.9893 2.63392 31.6304 0 25 0Z"
                      fill="#F26F6F"
                    />
                    <path
                      d="M37.4375 13.75L32.755 37.6575C32.755 37.6575 32.5537 38.75 31.1987 38.75C30.4788 38.75 30.1075 38.4075 30.1075 38.4075L19.965 29.9913L15.0025 27.49L8.63375 25.7963C8.63375 25.7963 7.5 25.4688 7.5 24.5313C7.5 23.75 8.66625 23.3775 8.66625 23.3775L35.3113 12.7925C35.3113 12.7925 36.125 12.4988 36.7188 12.5C37.0837 12.5 37.5 12.6563 37.5 13.125C37.5 13.4375 37.4375 13.75 37.4375 13.75Z"
                      fill="white"
                    />
                    <path
                      d="M23.75 33.1308L19.4675 37.3483C19.4675 37.3483 19.2813 37.492 19.0325 37.4983C18.9463 37.5008 18.8538 37.487 18.7588 37.4445L19.9638 29.9883L23.75 33.1308Z"
                      fill="#B0BEC5"
                    />
                    <path
                      d="M32.3713 17.7449C32.16 17.4699 31.77 17.4199 31.495 17.6286L15 27.4999C15 27.4999 17.6325 34.8649 18.0338 36.1399C18.4362 37.4161 18.7587 37.4461 18.7587 37.4461L19.9638 29.9899L32.2537 18.6199C32.5287 18.4111 32.58 18.0199 32.3713 17.7449Z"
                      fill="#EAECED"
                    />
                  </svg>
                </a>
              </li>
              <li class="body__share-links-item">
                <a
                  :href="`https://api.whatsapp.com/send?text=${content.title}%20${urlForShare}`"
                  target="_blank"
                >
                  <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="25" fill="#F26F6F" />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.0425 37.0644L14.7262 30.9175C13.6875 29.1187 13.1412 27.0775 13.1419 24.9869C13.145 18.4462 18.4675 13.125 25.0087 13.125C28.1831 13.1263 31.1619 14.3619 33.4025 16.6037C35.6425 18.8463 36.8762 21.8263 36.875 24.9963C36.8725 31.5369 31.5487 36.8587 25.0087 36.8587H25.0037C23.0181 36.8581 21.0662 36.36 19.3331 35.4144L13.0425 37.0644Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.0427 37.3769C12.9602 37.3769 12.8802 37.3444 12.8208 37.2844C12.7427 37.205 12.7121 37.0894 12.7414 36.9825L14.3908 30.96C13.3683 29.1437 12.8289 27.0812 12.8302 24.9875C12.8327 18.2737 18.2958 12.8125 25.0089 12.8125C28.2652 12.8138 31.3246 14.0819 33.6239 16.3831C35.9233 18.685 37.1889 21.7437 37.1877 24.9963C37.1852 31.7094 31.7214 37.1712 25.0089 37.1712C23.0158 37.1706 21.0439 36.6787 19.2939 35.7481L13.1221 37.3662C13.0958 37.3737 13.0696 37.3769 13.0427 37.3769Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M25.009 13.125C28.1834 13.1263 31.1621 14.3619 33.4027 16.6038C35.6427 18.8463 36.8765 21.8263 36.8752 24.9963C36.8727 31.5369 31.549 36.8587 25.009 36.8587H25.004C23.0184 36.8581 21.0665 36.36 19.3334 35.4144L13.0427 37.0644L14.7265 30.9175C13.6877 29.1187 13.1415 27.0775 13.1421 24.9869C13.1452 18.4462 18.4677 13.125 25.009 13.125ZM25.009 12.5C18.124 12.5 12.5202 18.1012 12.5171 24.9869C12.5165 27.0913 13.0477 29.165 14.0552 31.0006L12.4396 36.9C12.3809 37.1156 12.4409 37.3456 12.5984 37.5044C12.7171 37.6244 12.8777 37.69 13.0427 37.69C13.0959 37.69 13.149 37.6831 13.2015 37.6694L19.2559 36.0819C21.0234 36.9994 23.0046 37.4837 25.004 37.4844C31.894 37.4844 37.4977 31.8825 37.5009 24.9969C37.5021 21.66 36.204 18.5225 33.8459 16.1625C31.4865 13.8019 28.3484 12.5013 25.009 12.5Z"
                      fill="#CFD8DC"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M31.985 18.0202C30.1225 16.1564 27.6469 15.1295 25.0119 15.1289C19.5719 15.1289 15.1475 19.5514 15.145 24.9877C15.1444 26.8508 15.6656 28.6645 16.6531 30.2352L16.8881 30.6083L15.8913 34.2464L19.6244 33.2677L19.985 33.4814C21.4988 34.3802 23.235 34.8552 25.005 34.8558H25.0088C30.445 34.8558 34.8694 30.4327 34.8713 24.9958C34.8719 22.3614 33.8475 19.8839 31.985 18.0202Z"
                      fill="#F26F6F"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.0424 20.0282C21.8205 19.5344 21.5868 19.5244 21.3749 19.5157C21.2018 19.5082 21.0043 19.5088 20.8068 19.5088C20.6093 19.5088 20.288 19.5832 20.0162 19.8801C19.7443 20.1769 18.978 20.8938 18.978 22.3526C18.978 23.8113 20.0405 25.2213 20.1887 25.4188C20.3368 25.6163 22.2399 28.7057 25.2537 29.8944C27.758 30.8819 28.268 30.6857 28.8118 30.6363C29.3555 30.5869 30.5662 29.9194 30.813 29.2269C31.0599 28.5344 31.0599 27.9413 30.9862 27.8176C30.9118 27.6938 30.7143 27.6201 30.418 27.4713C30.1218 27.3226 28.6637 26.6057 28.3918 26.5069C28.1199 26.4082 27.9224 26.3588 27.7243 26.6557C27.5268 26.9519 26.9587 27.6201 26.7855 27.8176C26.6124 28.0157 26.4393 28.0407 26.143 27.8919C25.8468 27.7432 24.8918 27.4307 23.7587 26.4207C22.8774 25.6351 22.2824 24.6644 22.1093 24.3676C21.9362 24.0713 22.0905 23.9107 22.2393 23.7626C22.3724 23.6294 22.5355 23.4163 22.6843 23.2432C22.8324 23.0701 22.8818 22.9463 22.9805 22.7488C23.0793 22.5507 23.0299 22.3776 22.9555 22.2294C22.8824 22.0807 22.3062 20.6144 22.0424 20.0282Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a :href="`https://vk.com/share.php?url=${urlForShare}`" target="_blank">
                  <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M25 0C18.3696 0 12.0107 2.63392 7.32233 7.32233C2.63392 12.0107 0 18.3696 0 25C0 31.6304 2.63392 37.9893 7.32233 42.6777C12.0107 47.3661 18.3696 50 25 50C31.6304 50 37.9893 47.3661 42.6777 42.6777C47.3661 37.9893 50 31.6304 50 25C50 18.3696 47.3661 12.0107 42.6777 7.32233C37.9893 2.63392 31.6304 0 25 0Z"
                      fill="#F26F6F"
                    />
                    <path
                      d="M39.9212 17.5513C39.9788 17.3625 40.0063 17.1875 39.9988 17.0312C39.98 16.5788 39.6687 16.25 38.9362 16.25H35.6637C34.8375 16.25 34.4562 16.75 34.2337 17.2513C34.2337 17.2513 32.1938 21.45 29.8425 24.2188C29.08 25.02 28.6925 25 28.28 25C28.0588 25 27.5 24.7325 27.5 23.9987V17.5175C27.5 16.65 27.2837 16.25 26.585 16.25H20.7737C20.265 16.25 20 16.65 20 17.0513C20 17.885 21.1225 18.085 21.25 20.4212V24.95C21.25 26.05 21.0588 26.25 20.6462 26.25C19.5338 26.25 17.3437 22.5 15.8775 17.585C15.56 16.6175 15.2425 16.25 14.4163 16.25H11.1125C10.1588 16.25 10 16.7175 10 17.2175C10 18.1188 10.75 22.9913 14.8438 28.5938C17.8125 32.6562 21.7238 35 25.1863 35C27.2838 35 27.4988 34.4662 27.4988 33.6325V29.9175C27.5 28.9163 27.7287 28.75 28.3962 28.75C28.8725 28.75 29.8438 29.0625 31.7188 31.25C33.8813 33.7725 34.2737 35 35.5137 35H38.7862C39.5462 35 39.9825 34.6812 40 34.0625C40.0037 33.905 39.9813 33.7288 39.93 33.5325C39.6875 32.8125 38.575 31.0525 37.1875 29.375C36.4188 28.4462 35.66 27.5263 35.3113 27.0263C35.0775 26.7 34.9888 26.47 35 26.25C35.0112 26.0188 35.1313 25.7987 35.3113 25.4912C35.2788 25.4912 39.5088 19.5525 39.9212 17.5513Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <AutorCard
            class="desktop-hidden"
            title="Автор статьи"
            :autors="[content.autor]"
          />
        </div>
        <div class="body__right">
          <AutorCard
            class="mobile-hidden"
            title="Автор статьи"
            :autors="[content.autor]"
          />

          <div class="article-content__others desktop-hidden">
            <h4 class="article-content__others-title sb-container">
              Еще статьи на эту тему
            </h4>
            <Slider
              class="article-content__others-slider"
              show-arrows
              :wrapper-styles="othersWrapperStyles"
            >
              <Slide
                class="article-content__others-slider-slide"
                v-for="article in content.random_articles"
              >
                <ArticleCard minified :content="article" />
              </Slide>
            </Slider>
          </div>

          <div class="body__ads">
            <h4 class="body__ads-title desktop-hidden">Специальные предложения</h4>
            <Slider
              class="body__ads-slider"
              desktop-off
              :wrapper-styles="adsWrapperStyles"
              :show-arrows="isMobile"
            >
              <Slide class="body__ads-slider-slide">
                <TestSection :content="content.test_card" minified />
              </Slide>
              <Slide class="body__ads-slider-slide" v-for="ad in content.ads_banners">
                <AdCard :ad="ad" />
              </Slide>
            </Slider>
          </div>
        </div>
      </div>

      <div
        class="article-content__others mobile-hidden sb-noselect sb-observe sb-observe--fade-up"
      >
        <h4 class="article-content__others-title sb-container">Еще статьи на эту тему</h4>
        <Slider
          class="article-content__others-slider"
          show-arrows
          :wrapper-styles="othersWrapperStyles"
        >
          <Slide
            class="article-content__others-slider-slide"
            v-for="article in content.random_articles"
          >
            <ArticleCard minified :content="article" />
          </Slide>
        </Slider>
      </div>
    </div>
  </article>
</template>

<script>
import mediaQueryMixin from "~/mixins/mediaQueryMixin";
import animateOnScrollMixin from "~/mixins/animateOnScrollMixin";

import AutorCard from "~/components/Others/AutorCard.vue";
import TestSection from "../Common/TestSection.vue";
import AdCard from "~/components/Others/AdCard.vue";
import Slider from "~/components/Slider/Slider.vue";
import Slide from "~/components/Slider/Slide.vue";
import ArticleCard from "~/components/Others/ArticleCard.vue";
export default {
  name: "ArticleContent",
  mixins: [mediaQueryMixin, animateOnScrollMixin],
  props: {
    content: {
      type: Object,
    },
  },
  data: () => ({
    indexHover: null,
    indexClose: false,
    urlForShare: "",
  }),
  computed: {
    sectionsTitles() {
      return this.content.sections.map((i) => i.article_section_title);
    },
    adsWrapperStyles() {
      return !this.isMobile ? "flex-direction: column; gap: 40rem; margin: 0;" : "";
    },
    othersWrapperStyles() {
      return !this.isMobile ? "width: 1660rem; margin: 0 auto;" : "";
    },
  },
  mounted() {
    this.mediaQueryHook();
    this.urlForShare = window.location.href;
  },
  components: { AutorCard, TestSection, AdCard, Slider, Slide, ArticleCard },
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
        @include fontStyles($font_3, 14rem, 21rem, 400);
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
    &__right {
      display: flex;
      flex-direction: column;
      gap: 40rem;
    }
    &__share {
      margin-bottom: 40rem;
      @media screen and (max-width: $brakepoint) {
        padding: 0 15rem;
        margin-bottom: 24rem;
      }
      &-title {
        color: $color_dark-black;
        @include fontStyles($font_3, 21rem, 35.2rem, 600, 2.2rem);
        text-transform: uppercase;
        margin-bottom: 30rem;
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_3, 16rem, 25.6rem, 600, 0.8rem);
          margin-bottom: 16rem;
        }
      }
      &-links {
        display: flex;
        gap: 25rem;
        @media screen and (max-width: $brakepoint) {
          gap: 8rem;
        }
        li {
          width: 50rem;
          height: 50rem;
          transition: all $transition_base;
          @media screen and (max-width: $brakepoint) {
            width: 35rem;
            height: 35rem;
          }
          a {
            width: 100%;
            height: 100%;
            display: grid;
            place-content: center;
            svg {
              width: 100%;
              height: 100%;
            }
          }
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
    &__ads {
      &-title {
        @include fontStyles($font_2, 18rem, 28.8rem, 600);
        padding: 0 15rem;
        margin-bottom: 16rem;
      }
      &-slider {
        &-slide {
          @media screen and (max-width: $brakepoint) {
            margin-right: 15rem;
          }
        }
      }
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
        color: $color_dark-black;
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
        span,
        a {
          @include fontStyles($font_2, 21rem, 35.2rem, 400, 1.1rem);
          color: $color_dark-black;
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
    margin-bottom: 50rem;
    @media screen and (max-width: $brakepoint) {
      margin-bottom: 40rem;
    }
    .section {
      padding-top: 40rem;
      @media screen and (max-width: $brakepoint) {
        padding-top: 24rem;
      }
      &__title {
        @include fontStyles($font_3, 22rem, 35.2rem, 600, 2.2rem);
        color: $color_dark-black;
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
          color: $color_dark-black;
          @include fontStyles($font_3, 21rem, 30rem, 400, 1rem);
          @media screen and (max-width: $brakepoint) {
            @include fontStyles($font_3, 14rem, 21rem, 400);
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
            color: $color_dark-black;
            font-weight: 500;
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
            @include fontStyles($font_3, 22rem, 32rem, 600, 1rem);
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
              font-weight: 600;
            }
          }
          &-body {
            @include fontStyles($font_3, 21rem, 30rem, 400, 1rem);
            color: $color_dark-black;
            @media screen and (max-width: $brakepoint) {
              @include fontStyles($font_3, 14rem, 21rem, 400);
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
              color: $color_dark-black;
              font-weight: 500;
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
              @include fontStyles($font_2, 21rem, 30rem, 700, 1rem);
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

        .table {
          // border-radius: 20rem;
          // overflow: hidden;
          // border: 1rem solid $color_gray;
          @media screen and (max-width: $brakepoint) {
            border-radius: unset;
            border: none;
            overflow: visible;
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
                padding: 12rem 15rem;
                @include fontStyles($font_3, 13rem, 13rem, 600, 0.6rem);
                border-right: none;
              }
              &:last-child {
                border-right: none;
              }
            }
          }
          &__body {
            display: flex;
            flex-direction: column;
            @media screen and (max-width: $brakepoint) {
              flex-direction: row;
              gap: 12rem;
              overflow-x: scroll;
              padding: 0 15rem;
              &::-webkit-scrollbar {
                display: none;
              }
            }
          }
          &__row {
            display: grid;
            border-left: 1rem solid $color_gray;
            border-right: 1rem solid $color_gray;
            border-bottom: 1rem solid $color_gray;
            @media screen and (max-width: $brakepoint) {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              min-width: 270rem;
              max-width: 270rem;
              border: none;
            }
            &:last-child {
              border-radius: 0 0 20rem 20rem;
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
              @media screen and (max-width: $brakepoint) {
                border-right: none;
              }
              &:first-child {
                @media screen and (max-width: $brakepoint) {
                  border-radius: 15rem 15rem 0 0;
                  overflow: hidden;
                }
              }
              &:last-child {
                border-right: none;
                @media screen and (max-width: $brakepoint) {
                  .table__row-cell-inner {
                    border-bottom: 1rem solid $color_gray;
                    border-radius: 0 0 15rem 15rem;
                  }
                }
              }
              &-inner {
                padding: 20rem;
                @include fontStyles($font_3, 18rem, 28rem, 400);
                color: $color_dark-black;
                @media screen and (max-width: $brakepoint) {
                  padding: 10rem;
                  @include fontStyles($font_3, 14rem, 22rem, 400);
                  text-align: center;
                  border-left: 1rem solid $color_gray;
                  border-right: 1rem solid $color_gray;
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
                    @include fontStyles($font_3, 16rem, 16rem, 500);
                  }
                  &:hover {
                    background: transparent;
                    border-color: $color_primary;
                    color: $color_black;
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
                    position: relative;
                    padding-left: 28rem;
                    color: $color_dark-black;
                    @include fontStyles($font_3, 18rem, 28rem, 400);
                    @media screen and (max-width: $brakepoint) {
                      padding-left: 16rem;
                      @include fontStyles($font_3, 14rem, 22rem, 400);
                      text-align: start;
                    }
                    &::before {
                      position: absolute;
                      left: 0;
                      top: 3rem;
                      content: "";
                      width: 20rem;
                      height: 20rem;
                      background: url("/images/icons/breadcrumbs_icon.svg") center/contain
                        no-repeat;
                      @media screen and (max-width: $brakepoint) {
                        width: 12rem;
                        height: 12rem;
                      }
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
                    @include fontStyles($font_3, 13rem, 13rem, 600, 0.6rem);
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
                      }
                    }
                  }
                  &-inner {
                    border-bottom: 1rem solid $color_gray;
                    border-right: 1rem solid $color_gray;
                    @media screen and (max-width: $brakepoint) {
                      border-bottom: none;
                      border-top: none;
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
      }
    }
  }
  &__others {
    overflow: hidden;
    @media screen and (max-width: $brakepoint) {
      margin-bottom: 16rem;
    }
    &-title {
      color: $color_dark-black;
      @include fontStyles($font_2, 36rem, 57.6rem, 600);
      margin-bottom: 30rem;
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_2, 18rem, 28.8rem, 600);
        margin-bottom: 16rem;
      }
    }
    .article-card {
      width: 684rem;
      @media screen and (max-width: $brakepoint) {
        width: 270rem;
        height: 100%;
        display: grid;
        grid-template-rows: auto 1fr;
      }
      &__title {
        min-height: 124rem;
        @media screen and (max-width: $brakepoint) {
          min-height: 138rem;
        }
      }
      &__bottom {
        @media screen and (max-width: $brakepoint) {
          display: grid;
          grid-template-rows: 1fr auto;
        }
      }
    }
    &-slider {
      &-slide {
        margin-right: 25rem;
        @media screen and (max-width: $brakepoint) {
          margin-right: 15rem;
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
