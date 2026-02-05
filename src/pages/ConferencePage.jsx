import { useTranslation } from 'react-i18next';
import { FiInfo } from 'react-icons/fi';

const ConferencePage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-20 bg-gray-50 mt-10">
      <div className="container-professional">
        <div className="text-center max-w-2xl mx-auto pt-12">
          <div className="w-16 h-16 rounded-lg bg-brilliant-azure flex items-center justify-center mx-auto mb-6 shadow-card">
            <FiInfo className="text-white" size={32} />
          </div>
          <h1 className="page-title mb-4">{t('nav.conference')}</h1>
          <p className="text-xl text-gray-600">{t('common.comingSoon')}</p>
        </div>
      </div>
    </div>
  );
};

export default ConferencePage;
