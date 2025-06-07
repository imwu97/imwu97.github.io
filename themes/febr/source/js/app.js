const { createApp } = Vue

createApp({
  data() {
    return {
      scrolled: false,
      showMenu: false,
    }
  },
  mounted() {
    window.addEventListener("scroll", this.updateScrolled)
    this.updateScrolled()
  },
  methods: {
    // 滚动时更新scrolled
    updateScrolled() {
      if (window.scrollY > 20) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
    },
    // 滚动到顶部
    backTop() {
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
  },
}).mount("#app")
