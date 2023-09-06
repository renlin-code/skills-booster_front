export default {
  data: () => ({
    isMobile: false,
  }),
  methods: {
    mediaQueryHook(callback) {
      const mq = window.matchMedia("(max-width: 650px)");
      this.isMobile = mq.matches;
      if(callback) {
        callback();
      }
      mq.addEventListener("change", (e) => {
        this.isMobile = e.matches;
        if(callback) {
          callback();
        }
      });
    },
  },
};
