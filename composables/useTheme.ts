// composables/useTheme.ts
import { ref, onMounted, watch } from 'vue'

export const useTheme = () => {
  const theme = ref<'light' | 'dark'>('light')

  const updateHtmlTheme = () => {
    document.documentElement.classList.toggle('dark', theme.value === 'dark')
  }

  onMounted(() => {
    theme.value = (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    updateHtmlTheme()
  })

  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    updateHtmlTheme()
  })

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,
    toggleTheme
  }
}
