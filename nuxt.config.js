export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "/js/rem.js", ssr: false }],
    bodyAttrs: {
      content: "notranslate",
    },
  },

  server: {
    port: 3050,
  },

  serverMiddleware: [{ path: "/api/mailer", handler: "~/api/mailer.js" }],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/static/scss/main.scss"],
  styleResources: {
    scss: ["~/static/scss/_vars.scss", "~/static/scss/_mixins.scss"],
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/typed.js", mode: "client" },
    { src: "~/plugins/vuelidate.js" },
    { src: "~/plugins/internal-api.js" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    '@nuxtjs/yandex-metrika',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],
  robots: {
    UserAgent: "*",
    Allow: "/",
    Sitemap: (req) => `https://${req.headers.host}/sitemap.xml`
  },
  yandexMetrika: {
    id: '95617985',
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.NUXT_APP_BASE_URL,
  },

  loading: {
    color: "#F26F6F",
    height: "4rem",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
