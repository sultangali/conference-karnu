import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiMapPin, FiUpload, FiFile, FiTrash2, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { submissionService } from '../services/submissionService';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    coAuthors: '',
    section: '',
    abstract: '',
    keywords: '',
    file: null
  });

  const sections = [
    { value: 1, label: t('sections.section1') },
    { value: 2, label: t('sections.section2') },
    { value: 3, label: t('sections.section3') },
    { value: 4, label: t('sections.section4') },
    { value: 5, label: t('sections.section5') },
    { value: 6, label: t('sections.section6') },
  ];

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const data = await submissionService.getMySubmissions();
      setSubmissions(data.submissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      });

      await submissionService.createSubmission(data);
      toast.success(t('common.success'));
      setShowUploadForm(false);
      setFormData({
        title: '',
        coAuthors: '',
        section: '',
        abstract: '',
        keywords: '',
        file: null
      });
      fetchSubmissions();
    } catch (error) {
      toast.error(error.response?.data?.message || t('common.error'));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('common.confirmDelete'))) return;

    try {
      await submissionService.deleteSubmission(id);
      toast.success(t('common.success'));
      fetchSubmissions();
    } catch (error) {
      toast.error(error.response?.data?.message || t('common.error'));
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'status-pending',
      approved: 'status-approved',
      revision: 'status-revision',
      rejected: 'status-rejected'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {t(`submission.${status}`)}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-deep-twilight mb-8">{t('profile.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Card */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                <FiUser className="text-white" size={32} />
              </div>
              <h2 className="text-xl font-semibold text-deep-twilight">{user?.name}</h2>
              <div className="flex items-center justify-center mt-2">
                {user?.isVerified ? (
                  <span className="flex items-center text-green-600 text-sm">
                    <FiCheckCircle className="mr-1" />
                    {t('profile.verified')}
                  </span>
                ) : (
                  <span className="flex items-center text-orange-600 text-sm">
                    <FiAlertCircle className="mr-1" />
                    {t('profile.notVerified')}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <FiMail className="mr-3 text-bright-teal" />
                <span className="text-sm">{user?.email}</span>
              </div>
              {user?.phone && (
                <div className="flex items-center text-gray-600">
                  <FiPhone className="mr-3 text-bright-teal" />
                  <span className="text-sm">{user?.phone}</span>
                </div>
              )}
              {user?.organization && (
                <div className="flex items-center text-gray-600">
                  <FiBriefcase className="mr-3 text-bright-teal" />
                  <span className="text-sm">{user?.organization}</span>
                </div>
              )}
              {user?.country && (
                <div className="flex items-center text-gray-600">
                  <FiMapPin className="mr-3 text-bright-teal" />
                  <span className="text-sm">{user?.country}</span>
                </div>
              )}
            </div>

            {!user?.isVerified && (
              <div className="mt-6 p-4 bg-orange-50 rounded-lg text-sm text-orange-800">
                {t('auth.verifyEmail')}
              </div>
            )}
          </div>
        </div>

        {/* Submissions */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-deep-twilight">{t('profile.submissions')}</h2>
            <button 
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="btn btn-primary"
            >
              <FiUpload />
              {t('profile.newSubmission')}
            </button>
          </div>

          {/* Upload Form */}
          {showUploadForm && (
            <form onSubmit={handleSubmit} className="card mb-6">
              <h3 className="text-lg font-semibold text-deep-twilight mb-4">{t('profile.newSubmission')}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="label">{t('submission.title')} *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="label">{t('submission.coAuthors')}</label>
                  <input
                    type="text"
                    name="coAuthors"
                    value={formData.coAuthors}
                    onChange={handleChange}
                    className="input"
                    placeholder="Name 1, Name 2, ..."
                  />
                </div>

                <div>
                  <label className="label">{t('submission.section')} *</label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="">{t('auth.selectSection')}</option>
                    {sections.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.value}. {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">{t('submission.abstract')}</label>
                  <textarea
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleChange}
                    className="input"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="label">{t('submission.keywords')}</label>
                  <input
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    className="input"
                    placeholder="keyword1, keyword2, ..."
                  />
                </div>

                <div>
                  <label className="label">{t('submission.file')} *</label>
                  <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx,.tex"
                    className="input"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">{t('submission.uploadHint')}</p>
                </div>

                <div className="flex gap-4">
                  <button type="submit" disabled={uploading} className="btn btn-primary">
                    {uploading ? t('common.loading') : t('submission.submit')}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowUploadForm(false)}
                    className="btn btn-secondary"
                  >
                    {t('common.cancel')}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Submissions List */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bright-teal mx-auto"></div>
            </div>
          ) : submissions.length === 0 ? (
            <div className="card text-center py-12">
              <FiFile className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">{t('profile.noSubmissions')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission._id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-deep-twilight">{submission.title}</h3>
                        {getStatusBadge(submission.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {t('submission.section')}: {submission.section}
                      </p>
                      {submission.coAuthors && (
                        <p className="text-sm text-gray-600 mb-2">
                          {t('submission.coAuthors')}: {submission.coAuthors}
                        </p>
                      )}
                      {submission.feedback && (
                        <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                          <p className="text-sm font-medium text-orange-800">{t('submission.feedback')}:</p>
                          <p className="text-sm text-orange-700">{submission.feedback}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`/uploads/${submission.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary text-sm py-2 px-3"
                      >
                        <FiFile />
                      </a>
                      {(submission.status === 'pending' || submission.status === 'revision') && (
                        <button
                          onClick={() => handleDelete(submission._id)}
                          className="btn bg-red-100 text-red-600 hover:bg-red-200 text-sm py-2 px-3"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
