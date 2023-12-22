import { createI18n, type I18nOptions } from "vue-i18n"

export const SUPPORTED_LOCALES: Record<string, string> = {
  en: "English",
  nl: "Nederlands",
}

export const DEFAULT_LOCALE = "nl"

export const i18nOptions: I18nOptions = {
  locale: DEFAULT_LOCALE,
  fallbackLocale: 'en',
  legacy: false,
}

export const i18n = createI18n(i18nOptions)
