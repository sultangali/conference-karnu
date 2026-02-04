import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiHome, FiAlertCircle } from 'react-icons/fi';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="text-center max-w-2xl">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[160px] md:text-[200px] font-bold leading-none text-brilliant-azure">
            404
          </h1>
        </div>

        {/* Card with Info */}
        <div className="card shadow-elevated p-8 md:p-12">
          <div className="w-16 h-16 rounded-lg bg-brilliant-azure flex items-center justify-center mx-auto mb-6 shadow-card">
            <FiAlertCircle className="text-white" size={32} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-cobalt-blue mb-4">
            Page Not Found
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link to="/" className="btn btn-primary text-lg px-8 py-4">
            <FiHome size={20} />
            {t('nav.home')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
