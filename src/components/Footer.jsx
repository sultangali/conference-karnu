import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiExternalLink, FiCalendar } from 'react-icons/fi';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cobalt-blue text-white">
      <div className="container-professional py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center shadow-card group-hover:shadow-elevated transition-shadow overflow-hidden bg-cobalt-blue p-2">
              <img src="/assets/logo.png" alt="КарНИУ" className="w-full h-full object-contain" />
            </div>
              <div>
                <span className="font-bold text-xl block leading-tight">КарНИУ</span>
                <span className="text-alice-blue text-sm">Конференция 2026</span>
              </div>
            </div>
            <p className="text-alice-blue leading-relaxed">
              {t('home.subtitle')}
            </p>
          </div>

          {/* Contacts */}
          <div id="contacts">
            <h3 className="font-bold text-xl mb-6">
              {t('contacts.title')}
            </h3>
            <div className="space-y-4">
              <a 
                href="mailto:conf.karaganda.2026@mail.ru" 
                className="flex items-center text-alice-blue hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                  <FiMail size={18} />
                </div>
                <span className="text-sm">conf.karaganda.2026@mail.ru</span>
              </a>
              <a 
                href="tel:+77751510336" 
                className="flex items-center text-alice-blue hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                  <FiPhone size={18} />
                </div>
                <span className="text-sm">+7 775 151 03 36 (Мусина Н.М.)</span>
              </a>
              <div className="flex items-start text-alice-blue">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <FiMapPin size={18} />
                </div>
                <span className="text-sm leading-relaxed">{t('contacts.addressText')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-6">
              {t('nav.documents')}
            </h3>
            <div className="space-y-3">
              <Link
                to="/documents"
                className="flex items-center text-alice-blue hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                  <FiExternalLink size={18} />
                </div>
                <span className="text-sm">{t('nav.documents')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-alice-blue text-sm text-center md:text-left">
              © {currentYear} {t('footer.university')}. {t('footer.rights')}.
            </p>
            <div className="flex items-center space-x-3 text-alice-blue text-sm">
              <FiCalendar size={16} />
              <span>3-4 {currentYear === 2026 ? 'июня 2026' : 'June 2026'}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
