import { ref, type Ref, watch, type UnwrapRef } from 'vue'

function useDebounce<T> (value: Ref<T>, delay = 500): Ref<UnwrapRef<T>> {
  const debouncedValue = ref(value.value) as Ref<UnwrapRef<T>>

  let timer: ReturnType<typeof setTimeout>

  function debounceFunc (newValue: T): void {
    clearTimeout(timer)
    timer = setTimeout(() => {
      debouncedValue.value = newValue as UnwrapRef<T>
    }, delay)
  }

  watch(value, debounceFunc)

  return debouncedValue
}

export default useDebounce
