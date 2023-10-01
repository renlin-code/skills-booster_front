export default {
  data: () => ({
    fadeInSectionObserver: null,
  }),
  methods: {
    observerStart() {
      this.fadeInSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sb-observe--active");
          }
        });
      });
      this.$nextTick(() => {
        const fadeInSectionElements = this.$el.querySelectorAll(".sb-observe");
        fadeInSectionElements.forEach((element) => {
          this.fadeInSectionObserver.observe(element);
        });
      });
    },
    observerKill() {
      if (this.fadeInSectionObserver) {
        const fadeInSectionElements = this.$el.querySelectorAll(".sb-observe");
        fadeInSectionElements.forEach((element) => {
          element.classList.remove("sb-observe--active");
        });
        this.fadeInSectionObserver.disconnect();
      }
    },
    observerReset() {
      this.observerKill();
      this.$nextTick(() => {
        this.observerStart();
      })
    }
  },
  mounted() {
    this.observerStart();
  },
  beforeDestroy() {
    this.observerKill();
  },
};
