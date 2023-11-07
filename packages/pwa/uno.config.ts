import { defineConfig, presetUno, presetWebFonts, presetIcons, presetAttributify } from "unocss"
import axios from 'axios'
import ProxyAgent from 'proxy-agent'

export default defineConfig({
  // GEEN THEME
  //Wel, manieren van genereren van css

  presets:[
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        poppins: 'Poppins'
      }
    })
  ],
  theme:{
    colors: {
      AccentBlue: '#20A4F3',
      MainWhite: '#EDF2F4',
      BgBlack: '#2B2D42'
    },
  }
})
