import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe, FiCheck } from 'react-icons/fi';

const languages = [
  { code: 'kz', name: 'Қазақша', flag: '🇰🇿' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === i18n.language) || languages[1];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-brilliant-azure hover:bg-alice-blue transition-all"
      >
        <FiGlobe size={20} />
        <span className="text-sm font-semibold">{currentLang.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-elevated py-2 border border-gray-100 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center justify-between w-full px-4 py-3 text-sm hover:bg-alice-blue transition-colors ${
                i18n.language === lang.code ? 'text-brilliant-azure font-semibold' : 'text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3 text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
              {i18n.language === lang.code && (
                <FiCheck className="text-brilliant-azure" size={16} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
