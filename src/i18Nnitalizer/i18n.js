import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getDataFromStorage } from '../theme/utils/storage-utilts';
import { timeageAz } from '../theme/utils/timeageAzJson-utilts';
import { register } from 'timeago.js';

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
        'UPLOAD FILE': 'UPLOAD FILE',
        'My Profile': 'My Profile',
        'Submit Message': 'Submit Message',
        'There are no texts': 'There are no texts',
        'Load old texts': 'Load old texts',
        'There are new hoaxes': 'There are new hoaxes',
        'Delete Text': 'Delete Text',
        'Are you shure Delete Texts ?' : 'Are you shure Delete Texts ?',
        "Delete Account": "Delete Account",
        "Are you shure Delete Your Acount ?": "Are you shure Delete Your Acount ?",
        "Delete My Account": "Delete My Account"
        
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
        'UPLOAD FILE': 'DOSYA YÜKLƏ',
        'My Profile': 'Hesabim',
        'Submit Message': 'Messaji kayd et',
        'There are no texts': 'Text Tapilmadi',
        'Load old texts': 'Evvelki textleri getir',
        'There are new hoaxes': 'Yeni Textler Var',
        'Delete Text': `Text'i Sil`,
        'Are you shure Delete Texts ?': `Text'i silmekden Eminmisiniz ? `,
        "Delete Account": "Hesab Silinecek",
        "Are you shure Delete Your Acount ?": "Hesabinizi Silmek Isdermisiniz",
        "Delete My Account": "Hesabimi Sil"
        
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

register('az',timeageAz);

export default i18n;

