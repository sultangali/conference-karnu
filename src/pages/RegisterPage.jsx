import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiUser, FiPhone, FiMapPin, FiBriefcase, FiUserPlus } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    country: '',
    phone: '',
    section: '',
    participationType: 'offline'
  });
  const [loading, setLoading] = useState(false);

  const sections = [
    { value: 1, label: t('sections.section1') },
    { value: 2, label: t('sections.section2') },
    { value: 3, label: t('sections.section3') },
    { value: 4, label: t('sections.section4') },
    { value: 5, label: t('sections.section5') },
    { value: 6, label: t('sections.section6') },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      toast.success('Registration successful! Please check your email to verify your account.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-lg bg-brilliant-azure flex items-center justify-center mx-auto mb-6 shadow-card">
            <FiUserPlus className="text-white" size={28} />
          </div>
          <h1 className="text-4xl font-bold text-cobalt-blue mb-3">{t('auth.register')}</h1>
          <p className="text-gray-600">{t('home.subtitle')}</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="md:col-span-2 space-y-2">
              <label className="label">
                {t('auth.name')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiUser size={20} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="label">
                {t('auth.email')} <span className="text-red-500">*</span>
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
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="label">{t('auth.phone')}</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiPhone size={20} />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input pl-10"
                />
              </div>
            </div>

            {/* Organization */}
            <div className="space-y-2">
              <label className="label">{t('auth.organization')}</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiBriefcase size={20} />
                </div>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="input pl-10"
                />
              </div>
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="label">{t('auth.country')}</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiMapPin size={20} />
                </div>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input pl-10"
                />
              </div>
            </div>

            {/* Section */}
            <div className="space-y-2">
              <label className="label">{t('auth.section')}</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="input"
              >
                <option value="">{t('auth.selectSection')}</option>
                {sections.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.value}. {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Participation Type */}
            <div className="space-y-2">
              <label className="label">{t('auth.participationType')}</label>
              <div className="flex gap-4 h-[50px] items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="participationType"
                    value="offline"
                    checked={formData.participationType === 'offline'}
                    onChange={handleChange}
                    className="w-5 h-5 text-brilliant-azure focus:ring-brilliant-azure"
                  />
                  <span className="ml-2 text-gray-700 font-medium">
                    {t('auth.offline')}
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="participationType"
                    value="online"
                    checked={formData.participationType === 'online'}
                    onChange={handleChange}
                    className="w-5 h-5 text-brilliant-azure focus:ring-brilliant-azure"
                  />
                  <span className="ml-2 text-gray-700 font-medium">
                    {t('auth.online')}
                  </span>
                </label>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="label">
                {t('auth.password')} <span className="text-red-500">*</span>
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
                  minLength={6}
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="label">
                {t('auth.confirmPassword')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiLock size={20} />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input pl-10"
                  minLength={6}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full text-lg py-4 mt-4"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    <span>{t('common.loading')}</span>
                  </div>
                ) : (
                  <>
                    <FiUserPlus />
                    {t('auth.registerBtn')}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t('auth.hasAccount')}{' '}
            <Link 
              to="/login" 
              className="text-brilliant-azure hover:text-twitter-blue font-semibold"
            >
              {t('nav.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
