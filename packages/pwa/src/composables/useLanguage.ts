// const loadMessages = async ()

import { SUPPORTED_LOCALES } from "@/bootstrap/i18n"
import { useI18n } from "vue-i18n"

export default () => {
  const { locale, t, setLocaleMessage } = useI18n()

  const loadMessages = async (locale: string) => {
    if (locale in SUPPORTED_LOCALES) {
      const messages = await import(`../locales/${locale}.json`).then(
        m => m.default[locale],
      )

      return messages
    }

    throw new Error(`Locale ${locale} is not supported`)
  }

  const setLocale = async (targetlocale: string) => {
    const messages = await loadMessages(targetlocale)

    setLocaleMessage(targetlocale, messages)
    locale.value = targetlocale
  }

  return {
    locale,
    setLocale,
  }
}
