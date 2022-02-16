import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getDataFromStorage } from '../theme/utils/storage-utilts';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        'Sign Up': 'Sign Up',
        'Password mismatch': 'Password mismatch',
        Username: 'Username',
        'Display Name': 'Display Name',
        Password: 'Password',
        'Password Repeat': 'Password Repeat',
        Login: 'Login',
        Logout: "Logout",
        Unauthorized: 'Unauthorized',
        Users: 'Users',
        Previous: '< previous page ',
        Next: ' next page >',
        'Load Failure': 'Load Failure',
        'User not found': 'User not found',
        Edit: 'Edit',
        'Change Display Name': 'Change Display Name',
        Save: 'Save',
        Cancel: 'Cancel',
        'UPLOAD FILE': 'UPLOAD FILE'
      }
    },
    az: {
      translations: {
        'Sign Up': 'Giriş et',
        'Password mismatch': 'Eyni şifrəyi giriniz',
        Username: 'İstifadəçi Adı',
        'Display Name': 'Tercih Edilən Ad',
        Password: 'Şifrə',
        'Password Repeat': 'Şifrəni Tekrarla',
        Login: 'Sisteme Gir',
        Logout: "Çıxış",
        Unauthorized: 'Bele bir istifadeci yoxdur !!!',
        Users: 'İstifadeçiler',
        Next: 'sonraki >',
        Previous: '< evelki',
        'Load Failure': 'Liste yox',
        'User not found': 'Bele bir istifadeci yox',
        Edit: 'Düzenle',
        'Change Display Name': 'Görünür İsminizi Değiştirin',
        Save: 'Kaydet',
        Cancel: 'İptal Et',
        'UPLOAD FILE': 'DOSYA YÜKLƏ'
      }
    }
  },
  fallbackLng: getDataFromStorage("language") || 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ','
  },
  react: {
    wait: true
  }
});

export default i18n;