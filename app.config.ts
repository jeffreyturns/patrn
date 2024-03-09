export default defineAppConfig({
  ui: {
    primary: 'main',
    gray: 'surface',
    card: { background: 'bg-gray-100/75 dark:bg-gray-900/75 backdrop-blur-sm' },
    slideover: {
      overlay: { background: 'bg-gray-200/75 dark:bg-gray-800/75 backdrop-blur-sm' },
      background: 'bg-gray-100/75 dark:bg-gray-900/75 backdrop-blur-lg rounded-l-xl'
    },
    button: { color: { gray: { solid: 'shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gradient-to-tr from-gray-50 to-gray-200 hover:from-gray-100 hover:to-gray-300 disabled:bg-gray-50 dark:from-gray-800 dark:to-gray-700 dark:hover:from-gray-600 dark:hover:to-gray-500 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400' } } }
  }
})
