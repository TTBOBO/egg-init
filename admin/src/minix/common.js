export default {
  methods: {
    async confirm({
      type,
      cancelButtonText,
      confirmButtonText,
      text
    }) {
      return new Promise(reslove => {
        this.$confirm(text || '', '提示', {
          confirmButtonText: confirmButtonText || '确定',
          cancelButtonText: cancelButtonText || '取消',
          type: type || 'warning'
        }).then(() => {
          reslove(true)
        }).catch(() => {
          reslove()
        });
      })
    }
  }
}
