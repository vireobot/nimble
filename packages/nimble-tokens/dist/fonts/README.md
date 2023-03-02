# Google Web Fonts

Original font sources:

* [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro)
* [Noto Serif](https://fonts.google.com/noto/specimen/Noto+Serif)

Converted to WOFF2 format using [a tff to woff2](https://everythingfonts.com/ttf-to-woff2) recommended by [google-webfonts-helper](https://github.com/majodev/google-webfonts-helper)

# Adding new fonts

New font assets should be added to the `nimble-tokens/dist/fonts/assets` directory and referenced in from `nimble-tokens/dist/fonts/css/fonts.css` so that they will be loaded by applications using nimble.

## Fallback fonts

When adding new fonts, you should also create size-adjusted fallback fonts to use with them. Follow the pattern being used in `nimble-tokens/dist/fonts/css/fonts.css` to define new `@font-face`s that utilize the `size-adjust` descriptor. There is an [online tool](https://www.industrialempathy.com/perfect-ish-font-fallback/) you can use to automatically select a value for `size-adjust` which the tool's author says is sufficient to avoid cumulative layout shift. (There are also `ascent-override`, `descent-override`, and `line-gap-override` descriptors, but we don't need to use those.) For different `font-weight` versions of the fallback font, you can use the same `size-adjust` value.
