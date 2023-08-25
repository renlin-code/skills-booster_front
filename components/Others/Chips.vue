<template>
  <div class="chips">
    <div class="chips__inner">
      <ul class="chips__list">
        <li class="chips__list-item" v-for="(element, index) in elements">
          <ChipButton>{{ element.name }}</ChipButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ChipButton from '~/components/Buttons/ChipButton'
export default {
  name: "Chips",
  components: {
    ChipButton
  },
  data: () => ({
    elements: [
      {
        id: 0,
        name: "Все статьи",
      },
      {
        id: 1,
        name: "Программирование",
      },
      {
        id: 2,
        name: "Исскуственный интеллект",
      },
      {
        id: 3,
        name: "Маркетинг",
      },
      {
        id: 4,
        name: "Дизайн",
      },
    ],
  }),
};
</script>

<style scoped lang="scss">
.chips {
  &__list {
    display: flex;
    gap: 16rem;
    flex-wrap: wrap;
    @media screen and (max-width: $brakepoint) {
      flex-wrap: nowrap;
      gap: 5rem;
      width: 100vw;
      overflow-x: scroll;
      padding: 0 15rem;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
