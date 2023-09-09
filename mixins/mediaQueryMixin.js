export default {
  data: () => ({
    isMobile: false,
  }),
  methods: {
    async mediaQueryHook(callback) {
      const mq = window.matchMedia("(max-width: 650px)");
      this.isMobile = mq.matches;
      if(callback) {
        await this.$nextTick();
        callback();
      }
      mq.addEventListener("change", async (e) => {
        this.isMobile = e.matches;
        if(callback) {
          await this.$nextTick();
          callback();
        }
      });
    },
  },
};
