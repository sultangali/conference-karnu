import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FiFileText, FiCheck, FiRefreshCw, FiX, FiEye, FiMessageSquare } from 'react-icons/fi';
import { moderatorService } from '../services/moderatorService';

const ModeratorPage = () => {
  const { t } = useTranslation();
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [feedbackModal, setFeedbackModal] = useState({ open: false, submission: null, action: '' });
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchData();
  }, [filter, sectionFilter]);

  const fetchData = async () => {
    try {
      const params = {};
      if (filter) params.status = filter;
      if (sectionFilter) params.section = sectionFilter;

      const [submissionsData, statsData] = await Promise.all([
        moderatorService.getAllSubmissions(params),
        moderatorService.getStats()
      ]);
      setSubmissions(submissionsData.submissions);
      setStats(statsData.stats);
    } catch (error) {
      toast.error(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (submissionId, status, feedbackText = '') => {
    try {
      await moderatorService.updateStatus(submissionId, { status, feedback: feedbackText });
      toast.success(t('common.success'));
      setFeedbackModal({ open: false, submission: null, action: '' });
      setFeedback('');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || t('common.error'));
    }
  };

  const openFeedbackModal = (submission, action) => {
    setFeedbackModal({ open: true, submission, action });
    setFeedback(submission.feedback || '');
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bright-teal"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-deep-twilight mb-8">{t('moderator.title')}</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="card text-center">
          <p className="text-2xl font-bold text-deep-twilight">{stats?.total || 0}</p>
          <p className="text-sm text-gray-600">{t('moderator.all')}</p>
        </div>
        <div className="card text-center bg-yellow-50">
          <p className="text-2xl font-bold text-yellow-700">{stats?.pending || 0}</p>
          <p className="text-sm text-yellow-600">{t('submission.pending')}</p>
        </div>
        <div className="card text-center bg-green-50">
          <p className="text-2xl font-bold text-green-700">{stats?.approved || 0}</p>
          <p className="text-sm text-green-600">{t('submission.approved')}</p>
        </div>
        <div className="card text-center bg-orange-50">
          <p className="text-2xl font-bold text-orange-700">{stats?.revision || 0}</p>
          <p className="text-sm text-orange-600">{t('submission.revision')}</p>
        </div>
        <div className="card text-center bg-red-50">
          <p className="text-2xl font-bold text-red-700">{stats?.rejected || 0}</p>
          <p className="text-sm text-red-600">{t('submission.rejected')}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="label">{t('submission.status')}</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input w-auto"
            >
              <option value="">{t('moderator.all')}</option>
              <option value="pending">{t('submission.pending')}</option>
              <option value="approved">{t('submission.approved')}</option>
              <option value="revision">{t('submission.revision')}</option>
              <option value="rejected">{t('submission.rejected')}</option>
            </select>
          </div>
          <div>
            <label className="label">{t('submission.section')}</label>
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="input w-auto"
            >
              <option value="">{t('moderator.all')}</option>
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <option key={s} value={s}>Section {s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="card text-center py-12">
            <FiFileText className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">No submissions found</p>
          </div>
        ) : (
          submissions.map((submission) => (
            <div key={submission._id} className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-semibold text-deep-twilight">{submission.title}</h3>
                    {getStatusBadge(submission.status)}
                    <span className="text-sm text-gray-500">Section {submission.section}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Author:</strong> {submission.author?.name} ({submission.author?.email})
                  </p>
                  {submission.coAuthors && (
                    <p className="text-sm text-gray-600">
                      <strong>{t('submission.coAuthors')}:</strong> {submission.coAuthors}
                    </p>
                  )}
                  {submission.abstract && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{submission.abstract}</p>
                  )}
                  {submission.feedback && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                      <strong>{t('submission.feedback')}:</strong> {submission.feedback}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={`/uploads/${submission.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary text-sm py-2 px-3"
                  >
                    <FiEye />
                    {t('moderator.viewFile')}
                  </a>
                  
                  {submission.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(submission._id, 'approved')}
                        className="btn bg-green-100 text-green-700 hover:bg-green-200 text-sm py-2 px-3"
                      >
                        <FiCheck />
                        {t('moderator.approve')}
                      </button>
                      <button
                        onClick={() => openFeedbackModal(submission, 'revision')}
                        className="btn bg-orange-100 text-orange-700 hover:bg-orange-200 text-sm py-2 px-3"
                      >
                        <FiRefreshCw />
                        {t('moderator.requestRevision')}
                      </button>
                      <button
                        onClick={() => openFeedbackModal(submission, 'rejected')}
                        className="btn bg-red-100 text-red-700 hover:bg-red-200 text-sm py-2 px-3"
                      >
                        <FiX />
                        {t('moderator.reject')}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Feedback Modal */}
      {feedbackModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h3 className="text-xl font-semibold text-deep-twilight mb-4">
              {t('moderator.addFeedback')}
            </h3>
            <p className="text-gray-600 mb-4">
              <strong>{submission?.title}</strong>
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="input"
              rows={4}
              placeholder={t('submission.feedback')}
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleStatusUpdate(feedbackModal.submission._id, feedbackModal.action, feedback)}
                className={`btn ${feedbackModal.action === 'revision' ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'}`}
              >
                {feedbackModal.action === 'revision' ? t('moderator.requestRevision') : t('moderator.reject')}
              </button>
              <button
                onClick={() => setFeedbackModal({ open: false, submission: null, action: '' })}
                className="btn btn-secondary"
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeratorPage;
