import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiFileText } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import { REGISTRATION_FORM_URL } from '../constants';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout, isAdmin, isModerator } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/#sections', label: t('nav.sections'), isHash: true },
    { path: '/#committee', label: t('nav.committee'), isHash: true },
    { path: '/documents', label: t('nav.documents') },
    { path: '/program', label: t('nav.program') },
    { path: '/conference', label: t('nav.conference') },
    { path: '/#contacts', label: t('nav.contacts'), isHash: true },
  ];

  const scrollToSection = (hash) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(hash);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled 
        ? 'bg-white shadow-card' 
        : 'bg-white border-b border-gray-100'
    }`}>
      <div className="container-professional">
        <div className="flex justify-between items-center h-32">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group max-w-xs"
            style={{ maxWidth: "360px" }} // указываем максимум размер ширины кнопки логотипа
          >
            <div  className="w-32  rounded-lg flex items-center justify-center shadow-card group-hover:shadow-elevated transition-shadow overflow-hidden bg-cobalt-blue p-2">
              <img src="/assets/logo.png" alt="КарНИУ" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xs text-cobalt-blue block leading-tight">
                {(() => {
                  switch (i18n.language) {
                    case 'en':
                      return 'Karaganda National Research University named after academician Ye.A. Buketov';
                    case 'kz':
                      return 'Академик Е.А. Бөкетов атындағы Қарағанды ұлттық зерттеу университеті';
                    case 'ru':
                    default:
                      return 'Карагандинский национальный исследовательский университет имени академика Е.А. Букетова';
                  }
                })()}
              </span>
              <span className="text-xs text-brilliant-azure font-semibold">
                Конференция 2026
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              link.isHash ? (
                <button
                  key={link.path}
                  onClick={() => scrollToSection(link.path.replace('/', ''))}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:text-brilliant-azure hover:bg-alice-blue transition-colors font-medium"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:text-brilliant-azure hover:bg-alice-blue transition-colors font-medium"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-alice-blue transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-brilliant-azure flex items-center justify-center shadow-card">
                    <FiUser className="text-white" size={18} />
                  </div>
                  <span className="hidden lg:block font-medium text-gray-700">{user.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-elevated py-2 border border-gray-100">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-alice-blue hover:text-brilliant-azure transition-colors"
                    >
                      <FiUser className="mr-3" size={18} />
                      <span className="font-medium">{t('nav.profile')}</span>
                    </Link>
                    
                    {isModerator && (
                      <Link
                        to="/moderator"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-alice-blue hover:text-brilliant-azure transition-colors"
                      >
                        <FiFileText className="mr-3" size={18} />
                        <span className="font-medium">{t('nav.moderator')}</span>
                      </Link>
                    )}
                    
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-alice-blue hover:text-brilliant-azure transition-colors"
                      >
                        <FiSettings className="mr-3" size={18} />
                        <span className="font-medium">{t('nav.admin')}</span>
                      </Link>
                    )}
                    
                    <div className="h-px bg-gray-200 my-2"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="mr-3" size={18} />
                      <span className="font-medium">{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center">
                <a
                  href={REGISTRATION_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-sm py-2 px-5"
                >
                  {t('nav.register')}
                </a>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-alice-blue"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-4">
            <div className="space-y-1 pt-4">
              {navLinks.map((link) => (
                link.isHash ? (
                  <button
                    key={link.path}
                    onClick={() => scrollToSection(link.path.replace('/', ''))}
                    className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-alice-blue hover:text-brilliant-azure font-medium"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-alice-blue hover:text-brilliant-azure font-medium"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
            
            {!user && (
              <div className="mt-4">
                <a
                  href={REGISTRATION_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block w-full btn btn-primary text-center"
                >
                  {t('nav.register')}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
