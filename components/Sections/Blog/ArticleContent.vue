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
                      class=""
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
              <h2 class="section__title">
                {{ section.article_section_title }}
              </h2>
              <div class="section__content">
                <div
                  class="section__content-block"
                  v-for="block in section.article_section_content"
                >
                  <div
                    class="section__content-separator section__content-block-item"
                    v-if="block._type === 'content_separator'"
                  ></div>
                  <h3
                    class="section__content-h3 section__content-block-item"
                    v-if="block._type === 'content_h3'"
                  >
                    {{ block.content_h3 }}
                  </h3>
                  <div
                    class="section__content-html section__content-block-item"
                    :class="{ 'section__content-html--backgrounded': block.backgrounded }"
                    v-if="block._type === 'content_html'"
                    v-html="block.content_html"
                  ></div>

                  <a
                    v-if="block._type === 'content_img' && block.link_url"
                    :href="block.link_url"
                    target="_blank"
                  >
                    <figure
                      class="section__content-img section__content-block-item"
                      :class="{
                        'section__content-img--mobile-contained': block.mob_contained,
                      }"
                    >
                      <img
                        :src="isMobile ? block.content_img_mob : block.content_img"
                        :alt="block.img_alt"
                      />
                    </figure>
                  </a>

                  <figure
                    class="section__content-img section__content-block-item"
                    :class="{
                      'section__content-img--mobile-contained': block.mob_contained,
                    }"
                    v-if="block._type === 'content_img' && !block.link_url"
                  >
                    <img
                      :src="isMobile ? block.content_img_mob : block.content_img"
                      :alt="block.img_alt"
                    />
                  </figure>

                  <div
                    class="section__content-videos section__content-block-item section__content-block-item"
                    :class="{'section__content-videos--single' : block.content_yt_videos.length === 1}"
                    v-if="block._type === 'content_yt_videos'"
                  >
                    <div
                      class="section__content-videos-item"
                      v-for="video in block.content_yt_videos"
                    >
                      <iframe
                        width="100%"
                        height="100%"
                        :src="video.link_url"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>

                  <ul
                    class="section__content-list section__content-block-item"
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
                    class="section__content-list section__content-block-item"
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

                  <ArticleTable
                    class="section__content-table section__content-block-item"
                    v-if="block._type === 'table'"
                    :content="block"
                  />

                  <div
                    v-if="block._type === 'content_link'"
                    class="section__content-link section__content-block-item"
                    :style="`justify-content: ${block.content_link_justify}`"
                  >
                    <a
                      :href="block.content_link_url"
                      target="_blank"
                      :style="`width: ${
                        block.content_link_full_width ? '100%' : 'fit-content'
                      }`"
                    >
                      <MainButton type="1" arrow>{{
                        block.content_link_text
                      }}</MainButton>
                    </a>
                  </div>

                  <ArticleLinkBanner
                    v-if="block._type === 'content_banner_with_link'"
                    class="section__content-block-item"
                    :content="block"
                  />
                  <ul
                    v-if="block._type === 'content_accordions'"
                    class="section__content-accordions section__content-block-item"
                  >
                    <li
                      class="content_accordions-accordion"
                      v-for="accordion in block.accordions"
                    >
                      <ArticleAccordion :content="accordion" />
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <div class="body__contains-adds"
              v-if="content.contains_external_refs"
            >
              На странице присутствует реклама. Информация о рекламодателях по ссылкам в статье.
            </div>
          </div>
          <div class="body__share sb-noselect">
            <div class="body__share-title">Поделится статьей</div>
            <ul class="body__share-links">
              <li class="body__share-links-item">
                <a
                  :href="`https://telegram.me/share/url?url=${urlForShare}&text=${content.title}`"
                  target="_blank"
                >
                  <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M25 0C18.3711 0 12.0078 2.63555 7.32422 7.32227C2.63579 12.0108 0.00129871 18.3695 0 25C0 31.6277 2.63672 37.991 7.32422 42.6777C12.0078 47.3645 18.3711 50 25 50C31.6289 50 37.9922 47.3645 42.6758 42.6777C47.3633 37.991 50 31.6277 50 25C50 18.3723 47.3633 12.009 42.6758 7.32227C37.9922 2.63555 31.6289 0 25 0Z"
                      fill="#F26F6F"
                    />
                    <path
                      d="M11.3163 24.736C18.6053 21.561 23.4647 19.4676 25.8944 18.4563C32.8397 15.5684 34.2811 15.0668 35.2225 15.0498C35.4295 15.0465 35.8905 15.0977 36.1913 15.3408C36.4413 15.5459 36.5116 15.8233 36.5467 16.018C36.578 16.2125 36.6209 16.6559 36.5858 17.002C36.2108 20.9551 34.5819 30.5481 33.7538 34.9758C33.4061 36.8492 32.7147 37.4774 32.0467 37.5387C30.5936 37.6723 29.492 36.5793 28.0858 35.6578C25.8866 34.2153 24.6444 33.3176 22.5077 31.9102C20.0389 30.2836 21.6405 29.3895 23.0467 27.9285C23.4139 27.5461 29.8124 21.7278 29.9334 21.2C29.9491 21.134 29.9647 20.8879 29.8163 20.7582C29.6717 20.6282 29.4569 20.6727 29.3006 20.7078C29.078 20.7578 25.5663 23.0813 18.7538 27.6778C17.7577 28.3629 16.8553 28.6969 16.0428 28.6793C15.1522 28.6602 13.4334 28.1746 12.1561 27.7598C10.5936 27.2508 9.34751 26.9817 9.45688 26.1172C9.51157 25.6672 10.1327 25.2067 11.3163 24.736Z"
                      fill="white"
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
                      d="M11.4482 38.6729L13.3565 31.7065C12.1792 29.6679 11.5602 27.3545 11.5609 24.9851C11.5644 17.5724 17.5966 11.5416 25.01 11.5416C28.6076 11.543 31.9835 12.9434 34.5229 15.4842C37.0616 18.0257 38.4598 21.403 38.4584 24.9957C38.4556 32.4084 32.422 38.4399 25.01 38.4399H25.0043C22.754 38.4392 20.5418 37.8746 18.5776 36.8029L11.4482 38.6729Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M25.0101 11.5416C28.6077 11.5431 31.9837 12.9434 34.523 15.4842C37.0617 18.0257 38.46 21.4031 38.4585 24.9957C38.4557 32.4084 32.4221 38.4399 25.0101 38.4399H25.0045C22.7541 38.4392 20.542 37.8746 18.5777 36.8029L11.4484 38.6729L13.3566 31.7065C12.1794 29.6679 11.5603 27.3545 11.561 24.9851C11.5645 17.5724 17.5967 11.5416 25.0101 11.5416ZM25.0101 10.8333C17.2071 10.8333 10.8562 17.1814 10.8527 24.9851C10.852 27.3701 11.454 29.7203 12.5959 31.8007L10.7648 38.4866C10.6982 38.731 10.7662 38.9917 10.9447 39.1716C11.0793 39.3076 11.2614 39.382 11.4484 39.382C11.5086 39.382 11.5688 39.3742 11.6283 39.3586L18.4899 37.5594C20.4931 38.5993 22.7385 39.1482 25.0045 39.1489C32.8131 39.1489 39.164 32.8001 39.1676 24.9964C39.169 21.2146 37.6978 17.6588 35.0252 14.9841C32.3513 12.3088 28.7947 10.8347 25.0101 10.8333Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M32.9164 17.0893C30.8056 14.9771 27.9998 13.8133 25.0135 13.8126C18.8482 13.8126 13.8339 18.8247 13.8311 24.9858C13.8303 27.0974 14.4211 29.1529 15.5403 30.933L15.8066 31.3559L14.6768 35.4791L18.9077 34.3698L19.3164 34.6121C21.032 35.6306 22.9997 36.169 25.0057 36.1697H25.01C31.1711 36.1697 36.1853 31.1568 36.1875 24.995C36.1882 22.0094 35.0272 19.2016 32.9164 17.0893Z"
                      fill="#F26F6F"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.6483 19.3652C21.3968 18.8056 21.1319 18.7943 20.8918 18.7844C20.6955 18.7759 20.4717 18.7766 20.2479 18.7766C20.024 18.7766 19.66 18.8609 19.3518 19.1973C19.0437 19.5338 18.1753 20.3462 18.1753 21.9995C18.1753 23.6527 19.3795 25.2507 19.5473 25.4746C19.7152 25.6984 21.8721 29.1997 25.2877 30.5469C28.126 31.6661 28.704 31.4437 29.3202 31.3877C29.9365 31.3318 31.3085 30.5753 31.5883 29.7904C31.8681 29.0056 31.8681 28.3334 31.7845 28.1931C31.7002 28.0529 31.4764 27.9693 31.1406 27.8007C30.8049 27.6321 29.1523 26.8197 28.8442 26.7078C28.5361 26.5959 28.3123 26.5399 28.0877 26.8764C27.8639 27.2121 27.22 27.9693 27.0238 28.1931C26.8276 28.4177 26.6314 28.446 26.2956 28.2774C25.9599 28.1089 24.8775 27.7547 23.5933 26.61C22.5946 25.7196 21.9203 24.6196 21.724 24.2831C21.5278 23.9474 21.7028 23.7654 21.8714 23.5975C22.0223 23.4466 22.2071 23.2051 22.3757 23.0089C22.5436 22.8126 22.5995 22.6724 22.7115 22.4486C22.8234 22.224 22.7674 22.0278 22.6831 21.8599C22.6003 21.6914 21.9472 20.0296 21.6483 19.3652Z"
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
          <AutorCard v-if="isMobile" title="Автор статьи" :autors="[content.autor]" />
        </div>
        <div class="body__right">
          <AutorCard v-if="!isMobile" title="Автор статьи" :autors="[content.autor]" />
          <div
            class="article-content__others"
            v-if="isMobile && content.random_articles.length"
          >
            <div class="article-content__others-title sb-container">
              Еще статьи на эту тему
            </div>
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
            <div class="body__ads-title" v-if="isMobile && content.ads_banners.length">
              Вас может заинтересовать
            </div>
            <Slider
              v-if="content.ads_banners.length"
              class="body__ads-slider"
              desktop-off
              :wrapper-styles="adsWrapperStyles"
              :show-arrows="isMobile"
            >
              <Slide class="body__ads-slider-slide">
                <TestSection :content="content.test_card" minified on-slider />
              </Slide>
              <ReviewsLinkCard v-if="!isMobile" />
              <Slide class="body__ads-slider-slide" v-for="ad in content.ads_banners">
                <AdCard :ad="ad" />
              </Slide>
            </Slider>
            <TestSection
              class="body__ads-test"
              minified
              :content="content.test_card"
              v-if="!content.ads_banners.length"
            />
            <ReviewsLinkCard
              class="body__ads-reviews"
              v-if="!isMobile && !content.ads_banners.length"
            />
            <ReviewsLinkCard
              class="body__ads-reviews"
              v-if="isMobile"
            />
          </div>
        </div>
      </div>

      <div
        class="article-content__others sb-noselect sb-observe sb-observe--fade-up"
        v-if="!isMobile && content.random_articles.length"
      >
        <div class="article-content__others-title sb-container">
          Еще статьи на эту тему
        </div>
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
import TestSection from "~/components/Sections/Common/TestSection.vue";
import ReviewsLinkCard from "~/components/Others/ReviewsLinkCard.vue";
import AdCard from "~/components/Others/AdCard.vue";
import Slider from "~/components/Slider/Slider.vue";
import Slide from "~/components/Slider/Slide.vue";
import ArticleTable from "~/components/Articles/ArticleTable.vue";
import ArticleCard from "~/components/Others/ArticleCard.vue";
import MainButton from "~/components/Buttons/MainButton.vue";
import ArticleLinkBanner from "~/components/Articles/ArticleLinkBanner.vue";
import ArticleAccordion from "~/components/Articles/ArticleAccordion.vue";

export default {
  name: "ArticleContent",
  mixins: [mediaQueryMixin, animateOnScrollMixin],
  components: {
    AutorCard,
    ReviewsLinkCard,
    TestSection,
    AdCard,
    Slider,
    Slide,
    ArticleTable,
    ArticleCard,
    MainButton,
    ArticleLinkBanner,
    ArticleAccordion,
  },
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
      return !this.isMobile ? "flex-direction: column; gap: 16rem; margin: 0;" : "";
    },
    othersWrapperStyles() {
      return !this.isMobile ? "width: 1660rem; margin: 0 auto;" : "";
    },
  },
  methods: {
    addTargetBlankToLinks() {
      const allLinksEL = this.$el.querySelectorAll("a");
      allLinksEL.forEach((linkEl) => {
        const targetAtt = linkEl.getAttribute("target");
        const hrefAtt = linkEl.getAttribute("href");
        if (!targetAtt && !hrefAtt.includes("#section-") && !hrefAtt.includes("/schools-reviews")) {
          linkEl.setAttribute("target", "_blank");
        }
      });
    },
  },
  mounted() {
    this.mediaQueryHook();
    this.urlForShare = window.location.href;
    this.addTargetBlankToLinks();
  },
};
</script>

<style lang="scss">
.article-content {
  .banner {
    border-radius: 20rem;
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
      min-height: 356rem;
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
      gap: 16rem;
      @media screen and (max-width: $brakepoint) {
        gap: 0;
      }
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
      &-test {
        @media screen and (max-width: $brakepoint) {
          padding: 0 10rem;
        }
      }
      &-reviews {
        margin-top: 16rem;
        @media screen and (max-width: $brakepoint) {
          padding: 0 10rem;
        }
      }
    }
    &__contains-adds {
      @include fontStyles($font_3, 19rem, 21rem, 400);
      font-style: italic;
      padding-top: 60rem;
      @media screen and (max-width: $brakepoint) {
        @include fontStyles($font_3, 12rem, 16rem, 400);
        padding: 20rem 10rem 0;
      }
    }
  }
  .index {
    border-radius: 20rem;
    padding: 50rem;
    background: $color_bg;
    margin-bottom: 10rem;
    @media screen and (max-width: $brakepoint) {
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
      padding-top: 50rem;
      @media screen and (max-width: $brakepoint) {
        padding-top: 30rem;
      }
      &__title {
        @include fontStyles($font_3, 22rem, 35.2rem, 600, 1.2rem);
        color: $color_dark-black;
        text-transform: uppercase;
        margin-bottom: 30rem;
        @media screen and (max-width: $brakepoint) {
          @include fontStyles($font_3, 16rem, 25.6rem, 600, 0.6rem);
          margin-bottom: 16rem;
          padding: 0 15rem;
        }
      }
      &__content {
        display: flex;
        flex-direction: column;

        &-block {
          &-item {
            margin-bottom: 20rem;
            @media screen and (max-width: $brakepoint) {
              margin-bottom: 16rem;
            }
          }
          &:last-child {
            .section__content-block-item {
              margin-bottom: 0;
            }
          }
        }
        &-separator {
          margin-bottom: 10rem;
          @media screen and (max-width: $brakepoint) {
            margin-bottom: 8rem;
          }
        }
        &-h3 {
          margin-top: 14rem;
          @include fontStyles($font_3, 22rem, 35.2rem, 600, 1rem);
          color: $color_dark-black;
          @media screen and (max-width: $brakepoint) {
            margin-top: 6rem;
            @include fontStyles($font_3, 16rem, 25.6rem, 600, 0.5rem);
            padding: 0 15rem;
          }
        }
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
              margin-left: 15rem;
              margin-right: 15rem;
            }
          }
        }
        &-videos {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16rem;
          @media screen and (max-width: $brakepoint) {
            display: flex;
            flex-direction: column;
            padding: 0 12rem;
            gap: 10rem;
          }
          &-item {
            width: 100%;
            height: 400rem;
            overflow: hidden;
            border-radius: 20rem;
            @media screen and (max-width: $brakepoint) {
              height: 160rem !important;
            }
          }
          &--single {
            grid-template-columns: repeat(1, 1fr);
            .section__content-videos-item {
              height: 600rem;
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
          &--mobile-contained {
            @media screen and (max-width: $brakepoint) {
              padding: 0 12rem;
              img {
                border-radius: 20rem;
              }
            }
          }
        }
        &-list {
          display: flex;
          flex-direction: column;
          gap: 16rem;
          @media screen and (max-width: $brakepoint) {
            gap: 10rem;
            padding: 0 15rem;
          }
          &-title {
            color: $color_dark-black;
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

        &-link {
          display: flex;
          a {
            display: inline-block;
            @media screen and (max-width: $brakepoint) {
              width: 100% !important;
              display: block;
              margin: 0 10rem;
            }
          }
        }
        &-accordions {
          display: flex;
          flex-direction: column;
          gap: 16rem;
          @media screen and (max-width: $brakepoint) {
            padding: 0 10rem;
            gap: 8rem;
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
      width: 684rem !important;
      @media screen and (max-width: $brakepoint) {
        width: 270rem !important;
        height: 100% !important;
        display: grid !important;
        grid-template-rows: auto 1fr !important;
      }
      &__title {
        min-height: 124rem !important;
        @media screen and (max-width: $brakepoint) {
          min-height: 138rem !important;
        }
      }
      &__bottom {
        @media screen and (max-width: $brakepoint) {
          display: grid !important;
          grid-template-rows: 1fr auto !important;
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
