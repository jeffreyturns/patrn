import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        main: {
            10: '#efffb2',
            50: '#e2fda5',
            100: '#d5f099',
            200: '#b9d37f',
            300: '#9db765',
            400: '#829d4c',
            500: '#688233',
            600: '#4f691a',
            700: '#365100',
            800: '#203a00',
            900: '#152300',
            950: '#001000'
        },
        surface: {
            10: '#fefff9',
            50: '#f1f3ec',
            100: '#e4e6df',
            200: '#c8cac3',
            300: '#adafa8',
            400: '#92948e',
            500: '#797a74',
            600: '#60615c',
            700: '#484a44',
            800: '#32332e',
            900: '#1d1e19',
            950: '#030500'
        },           
      }
    }
  }
}
