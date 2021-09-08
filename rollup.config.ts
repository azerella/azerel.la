import { defineConfig } from 'rollup'
import autoprefixer from 'autoprefixer'
import htmlTemplate from 'rollup-plugin-generate-html-template'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  input: 'src/styles.scss',
  plugins: [
    postcss({
      extract: true,
      sourceMap: !isProduction,
      extensions: ['.scss'],
      use: ['sass'],
      minimize: isProduction,
      plugins: [autoprefixer()],
    }),
    htmlTemplate({
      template: 'public/index.html',
      target: 'dist/index.html',
    }),
    copy({
      targets: [
        {
          src: 'public/*',
          dest: 'dist/',
        },
      ],
    }),
  ],
  output: {
    file: `dist/bundle.${isProduction ? 'min.css' : 'css'}`,
  },
})
