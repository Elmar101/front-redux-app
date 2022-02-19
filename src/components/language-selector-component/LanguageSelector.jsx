import React from 'react'
import { useTranslation } from 'react-i18next';
import { changeLanguage} from "../../api/apiCalls";
import { setDataToStorage } from '../../theme/utils/storage-utilts';
const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const onChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        changeLanguage(language);
        setDataToStorage("language",`${language}`);
    }
    
    return (
        <div  style={{margin: "16px auto"}}>
            <img 
                src="http://www.geognos.com/api/en/countries/flag/AZ.png" 
                alt="Azerbaijan" 
                style={{width: "44px", marginRight: "16px", cursor: "progress"}}
                onClick={() => onChangeLanguage('az') }
                />
            <img 
                src="http://www.geognos.com/api/en/countries/flag/GB.png" 
                alt="English" 
                style={{width: "44px", cursor: "progress"}}
                onClick={() => onChangeLanguage('en') }
                />
        </div>
    )
}

export default LanguageSelector;
