<template>
  <div class="chips">
    <div class="chips__inner">
      <ul class="chips__list">
        <li class="chips__list-item" v-for="(item, index) in items">
          <ChipButton
            :selected="selectedIndex === index"
            @click.native="selectChip(index)"
            >{{ item }}</ChipButton
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ChipButton from "~/components/Buttons/ChipButton";
export default {
  name: "Chips",
  components: {
    ChipButton,
  },
  props: {
    items: {
      type: Array,
    },
    injectedSelectedIndex: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    selectedIndex: 0,
  }),
  methods: {
    selectChip(index) {
      this.selectedIndex = index;
      this.$emit("select-chip", this.selectedIndex);
    },
  },
  watch: {
    injectedSelectedIndex(value) {
      this.selectedIndex = value;
    },
  },
  mounted() {
    this.selectedIndex = this.injectedSelectedIndex;
  },
};
</script>

<style scoped lang="scss">
.chips {
  &__inner {
    @media screen and (max-width: $brakepoint) {
      padding: 3rem 0;
    }
  }
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
