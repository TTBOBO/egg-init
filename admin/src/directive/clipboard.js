import Clipboard from 'clipboard'
export default {
  bind: (el, binding) => {

    const clipboard = new Clipboard(el, {
      text: () => binding.value.value
    })
    el.style.cursor = 'pointer'
    el.success = binding.value && binding.value.success;
    el.error = binding.value && binding.value.error;
    clipboard.on('success', e => {
      const callback = el.success;
      callback && callback(e)
    })
    clipboard.on('error', e => {
      const callback = el.error;
      callback && callback(e)
    })
    el.clipboard = clipboard
  },
  update: (el, binding) => {
    el.clipboard.text = () => binding.value.value
    el.success = binding.value && binding.value.success
    el.error = binding.value && binding.value.error
  },
  unbind: (el, binding) => {
    delete el.success;
    delete el.error;
    el.clipboard.destroy();
    delete el.clipboard;
  }
}