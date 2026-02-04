import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { REGISTRATION_FORM_URL } from '../constants';
import { FiCheck, FiX, FiMail } from 'react-icons/fi';
import api from '../services/api';

const VerifyEmailPage = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.get(`/api/users/verify-email/${token}`);
        setStatus('success');
        setMessage(response.data.message);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Verification failed');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-md w-full">
        {status === 'loading' && (
          <div className="text-center">
            <div className="card p-12">
              <div className="w-20 h-20 mx-auto mb-6">
                <div className="w-20 h-20 border-4 border-brilliant-azure border-t-transparent rounded-full animate-spin"></div>
              </div>
              <FiMail className="w-16 h-16 text-brilliant-azure mx-auto mb-4" />
              <p className="text-lg text-gray-600">{t('common.loading')}</p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="card p-12 text-center shadow-elevated">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-8 shadow-card">
              <FiCheck className="text-white" size={40} />
            </div>
            
            <h1 className="text-3xl font-bold text-cobalt-blue mb-3">
              Email Verified!
            </h1>
            <p className="text-gray-600 mb-8 text-lg">{message}</p>
            
            <Link to="/login" className="btn btn-primary text-lg px-8 py-4">
              <FiCheck />
              {t('nav.login')}
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="card p-12 text-center shadow-elevated">
            <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-8 shadow-card">
              <FiX className="text-white" size={40} />
            </div>
            
            <h1 className="text-3xl font-bold text-cobalt-blue mb-3">
              Verification Failed
            </h1>
            <p className="text-gray-600 mb-8 text-lg">{message}</p>
            
            <a
              href={REGISTRATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              {t('nav.register')}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
