export default {
  props: {
    parentItem: {
      type: Object,
      default: () => {}
    },
    theme: String,
    iconSize: Number
  },
  computed: {
    parentName() {
      return this.parentItem.name
    },
    children() {
      return this.parentItem.children
    },
    textColor() {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  },
  methods: {
    showChildren(item) {
      return item.children && item.children.length > 1
    },
    getNameOrHref(item, children0) {
      console.log(
        item.href
          ? `href_${item.href}`
          : children0
          ? item.children[0].name
          : item.name
      )
      //判断是跳转href 锚点  跳转链接  还是跳转路由
      return item.href
        ? `href_${item.href}`
        : children0
        ? item.children[0].name
        : item.name
    }
  }
}
