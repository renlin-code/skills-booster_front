<template>
  <article class="article-content">
    <div class="article-content__inner">
      <div class="article-content__banner banner sb-container">
        <h1 class="banner__title">
          Топ 10 самых восстребованных языков программирования
        </h1>
        <div class="banner__cat">Программирование</div>
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
                <li>
                  <span>1.&nbsp;</span>
                  <div>
                    <a href="/">Что же такое этот искусственный интеллект?</a>
                  </div>
                </li>
                <li>
                  <span>2.&nbsp;</span>
                  <div>
                    <a href="/">Как работает искусственный интеллект</a>
                  </div>
                </li>
                <li>
                  <span>3.&nbsp;</span>
                  <div>
                    <a href="/">Может ли искусственный интеллект заменить людей</a>
                  </div>
                </li>
                <li>
                  <span>4.&nbsp;</span>
                  <div>
                    <a href="/">
                      Преимущества искусственного интеллекта для повседневной жизни
                      обычного человека
                    </a>
                  </div>
                </li>
                <li>
                  <span>5.&nbsp;</span>
                  <div>
                    <a href="/">Основные виды искусственного интеллекта</a>
                  </div>
                </li>
                <li>
                  <span>6.&nbsp;</span>
                  <div>
                    <a href="/">Нужно ли бояться искусственного интеллекта</a>
                  </div>
                </li>
                <li>
                  <span>7.&nbsp;</span>
                  <div>
                    <a href="/">
                      Как стать разработчиком искусственного интеллекта: пошаговый план
                    </a>
                  </div>
                </li>
                <li>
                  <span>8.&nbsp;</span>
                  <div>
                    <a href="/">4 курса, которые можно порекомендовать новичку</a>
                  </div>
                </li>
                <li>
                  <span>9.&nbsp;</span>
                  <div>
                    <a href="/">Заключение</a>
                  </div>
                </li>
              </ol>
            </Transition>
          </div>
          <div class="body__left-content sections">
            <section class="sections__section">
              <h3 class="sections__section-title">
                Что же такое этот искусственный интеллект?
              </h3>
              <div class="sections__section-html">
                <div>
                  Все знают, что умный телефон, который может сколько угодно раз повторять
                  «привет, я Сири!» – это искусственный интеллект. Но что, собственно,
                  это значит?<br /><br />
                  ИИ — это машина, которая может обрабатывать информацию, учиться и быть
                  умнее по мере того, как она получает больше знаний. Обычно люди учатся
                  самостоятельно, но ИИ может учиться, как ребёнок, только быстрее.
                  Он может ориентироваться в разных ситуациях, обрабатывать текст,
                  изображения и звуки.
                </div>
                <img src="/images/article.png" alt="" />
                <div>
                  Например, с помощью ИИ мы можем побеждать в шахматы, играть
                  в компьютерные игры и разговаривать с Алисой от Яндекса. А в будущем
                  эти машины смогут помочь с медицинскими диагнозами, решением сложных
                  задач и тому подобное. Ну, конечно, опасаться нужно, что роботы могут
                  стать умнее нас и захватить мир! Шучу, шучу, просто следите за своей
                  кофеваркой.
                </div>
              </div>
            </section>
            <section class="sections__section">
              <h3 class="sections__section-title">
                Как работает искусственный интеллект
              </h3>
              <div class="sections__section-html">
                <div>
                  В сегодняшнем мире искусственный интеллект — это довольно обычное
                  понятие. Но как работает ИИ на самом деле?
                </div>
                <ul>
                  <li>
                    <span>Нейронные сети</span><br /><br />
                    Искусственный интеллект часто основывается на нейронных сетях, которые
                    имитируют работу мозга. Каждый нейрон в нейронной сети обрабатывает
                    информацию и передаёт её другим нейронам. Так что ИИ может учиться
                    на основе данных и алгоритмов, обработки звука, изображений и текста.
                  </li>
                  <li>
                    <span>Алгоритмы</span><br /><br />
                    Алгоритмы могут использоваться для обработки информации и определения
                    определённых закономерностей или шаблонов. Таким образом, ИИ может
                    обработать больше данных, чем могут обработать люди.
                  </li>
                  <li>
                    <span>Обучение с подкреплением</span><br /><br />
                    С помощью обучения с подкреплением ИИ может получать опыт в решении
                    определённых задач. Когда ИИ решает задачу, он получает «награду».
                    Если ИИ сделал хорошо, награда будет положительной. Таким образом,
                    искусственный интеллект знает, что делать, чтобы получить больше
                    положительных наград.
                  </li>
                  <li>
                    <span>Определение паттернов</span><br /><br />
                    ИИ также может использоваться для определения шаблонов и паттернов.
                    Например, ИИ может обработать большие объёмы финансовых данных,
                    чтобы выявить тенденции в экономике.
                  </li>
                </ul>
                <div>
                  Конечно, искусственный интеллект не является безошибочным. Но, несмотря
                  на это, ИИ имеет огромный потенциал и будет продолжать развиваться!
                </div>
              </div>
            </section>
            <section class="sections__section">
              <h3 class="sections__section-title">
                Может ли искусственный интеллект заменить людей
              </h3>
              <div class="sections__section-html">
                <div>
                  Итак, искусственный интеллект развивается и его возможности
                  увеличиваются с каждым годом. Но сможет ли он заменить людей во всех
                  областях жизни? Начнём с работы.<br /><br />
                  Многие машины уже заменили ручной труд человека, и это только начало.
                  Компьютеры могут обрабатывать информацию быстрее, точнее и без ошибок,
                  чем человек. Однако, некоторые работодатели предпочитают найти
                  сотрудников именно с человеческими качествами.<br /><br />
                  Например, такими, как творческий подход, сочувствие, эмпатия и т.п.
                  В торговле также нужны человеческие качества. Ведь продавец должен
                  внимательно слушать клиента и учитывать его пожелания.<br /><br />
                  Интересно, а может ли ИИ заменить нас в социальной сфере?
                  Уже есть приложения, которые могут напомнить, когда нужно начать кормить
                  ребёнка, но значение родительской любви ни с чем не сравнить.
                </div>
                <img src="/images/article2.png" alt="" />
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
export default {
  name: "ArticleContent",
  data: () => ({
    indexClose: false,
  }),
};
</script>

<style scoped lang="scss">
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
    background-image: url("/images/7.png");
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
      background: #abd2ff;
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
  }
  .index {
    border-radius: 50rem;
    padding: 50rem;
    background: $color_bg;
    margin-bottom: 50rem;
    &__head {
      display: inline-flex;
      gap: 12rem;
      align-items: center;
      transition: all $transition_base;
      span {
        @include fontStyles($font_2, 36rem, 57.6rem, 600);
      }
      svg {
        width: 30rem;
        height: 30rem;
        transform: rotate(-180deg);
        transition: all $transition_base;
      }
    }
    &__list {
      display: flex;
      flex-direction: column;
      gap: 16rem;
      margin-top: 30rem;
      transform-origin: top;
      transition: all $transition_base;
      li {
        display: grid;
        grid-template-columns: auto 1fr;
        a {
          text-decoration: underline;
          @include fontStyles($font_2, 22rem, 35.2rem, 400, 1.1rem);
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
    gap: 40rem;
    &__section {
      &-title {
        @include fontStyles($font_3, 22rem, 35.2rem, 600, 2.2rem);
        text-transform: uppercase;
        margin-bottom: 30rem;
      }
      &-html {
        display: flex;
        flex-direction: column;
        gap: 30rem;
        p,
        div {
          @include fontStyles($font_3, 20rem, 30rem, 400, 1rem);
        }
        img {
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 20rem;
        }
        ul {
          display: flex;
          flex-direction: column;
          gap: 20rem;
          li {
            position: relative;
            padding-left: 33rem;
            &::before {
              content: "";
              position: absolute;
              left: 0;
              width: 18rem;
              height: 18rem;
              border-radius: 50%;
              background: $color_primary;
              top: 5rem;
            }
            span {
              display: inline-block;
              color: $color_primary;
              @include fontStyles($font_3, 20rem, 20rem, 600, 1rem);
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
