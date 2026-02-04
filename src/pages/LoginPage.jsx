import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { REGISTRATION_FORM_URL } from '../constants';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/profile';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success(t('common.success'));
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-lg bg-brilliant-azure flex items-center justify-center mx-auto mb-6 shadow-card">
            <FiLogIn className="text-white" size={28} />
          </div>
          <h1 className="text-4xl font-bold text-cobalt-blue mb-3">{t('auth.login')}</h1>
          <p className="text-gray-600">{t('home.organizerName')}</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="card">
          <div className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="label">
                {t('auth.email')}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiMail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="example@mail.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="label">
                {t('auth.password')}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiLock size={20} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-lg py-4 mt-2"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  <span>{t('common.loading')}</span>
                </div>
              ) : (
                <>
                  <FiLogIn />
                  {t('auth.loginBtn')}
                </>
              )}
            </button>
          </div>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t('auth.noAccount')}{' '}
            <a
              href={REGISTRATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brilliant-azure hover:text-twitter-blue font-semibold"
            >
              {t('nav.register')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
