import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FiUsers, FiFileText, FiUserCheck, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { adminService } from '../services/adminService';

const AdminPage = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const [usersData, statsData] = await Promise.all([
        adminService.getAllUsers(filter ? { role: filter } : {}),
        adminService.getStats()
      ]);
      setUsers(usersData.users);
      setStats(statsData.stats);
    } catch (error) {
      toast.error(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminService.updateUserRole(userId, newRole);
      toast.success(t('common.success'));
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || t('common.error'));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm(t('common.confirmDelete'))) return;

    try {
      await adminService.deleteUser(userId);
      toast.success(t('common.success'));
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || t('common.error'));
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      user: 'bg-gray-100 text-gray-800',
      moderator: 'bg-blue-100 text-blue-800',
      admin: 'bg-purple-100 text-purple-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role]}`}>
        {role}
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
      <h1 className="text-3xl font-bold text-deep-twilight mb-8">{t('admin.title')}</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-bright-teal to-turquoise-surf text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-light-cyan">{t('admin.totalUsers')}</p>
              <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
            </div>
            <FiUsers size={48} className="opacity-50" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">{t('admin.verifiedUsers')}</p>
              <p className="text-3xl font-bold">{stats?.verifiedUsers || 0}</p>
            </div>
            <FiUserCheck size={48} className="opacity-50" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">{t('admin.totalSubmissions')}</p>
              <p className="text-3xl font-bold">{stats?.totalSubmissions || 0}</p>
            </div>
            <FiFileText size={48} className="opacity-50" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-deep-twilight">{t('admin.users')}</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input w-auto"
          >
            <option value="">{t('moderator.all')}</option>
            <option value="user">{t('admin.user')}</option>
            <option value="moderator">{t('admin.moderatorRole')}</option>
            <option value="admin">{t('admin.adminRole')}</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('auth.name')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('auth.email')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                  <td className="py-3 px-4">
                    {user.isVerified ? (
                      <span className="text-green-600 text-sm">{t('profile.verified')}</span>
                    ) : (
                      <span className="text-orange-600 text-sm">{t('profile.notVerified')}</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="text-sm border rounded px-2 py-1"
                      >
                        <option value="user">{t('admin.user')}</option>
                        <option value="moderator">{t('admin.moderatorRole')}</option>
                        <option value="admin">{t('admin.adminRole')}</option>
                      </select>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
