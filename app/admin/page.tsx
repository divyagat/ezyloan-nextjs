'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Image as ImageIcon,
  MessageSquare,
  FileText,
  LogOut,
  Users,
  Upload,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Menu,
  X,
  Lock,
  User as UserIcon
} from 'lucide-react';
import axios from 'axios';

const SERVER_HOST = process.env.NEXT_PUBLIC_SERVER_HOST || 'https://ezy-lonebackend.vercel.app';

// TypeScript Interfaces
interface User {
  username: string;
  [key: string]: any;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

// Main Admin Application
export default function AdminApp() {
  const [currentPage, setCurrentPage] = useState<string>('login');
  const [user, setUser] = useState<User | null>(null); // ✅ Fixed type
  const [token, setToken] = useState<string | null>(null); // ✅ Fixed type
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken); // ✅ Now accepts string
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
      
      // Verify token validity
      axios.get(`${SERVER_HOST}/api/auth/verify`)
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setCurrentPage('login');
        });
    } else {
      setCurrentPage('login');
    }
  }, []);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post<LoginResponse>(`${SERVER_HOST}/api/auth/login`, credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentPage('dashboard');
      
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Invalid credentials'
      };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
    setCurrentPage('login');
  };

  // Render the appropriate page
  if (currentPage === 'login') {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <AdminDashboard
      user={user}
      onLogout={handleLogout}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
}

// Login Page Component
function AdminLogin({ onLogin }: { onLogin: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }> }) {
  const [formData, setFormData] = useState<LoginCredentials>({ username: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const result = await onLogin(formData);
    if (!result.success) {
      setError(result.message || 'Login failed');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Users className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">EzyLoan Admin</h1>
          <p className="text-gray-600">Access Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>
          {error && (
            <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Main Dashboard Component
function AdminDashboard({ 
  user, 
  onLogout, 
  currentPage, 
  setCurrentPage 
}: { 
  user: User | null; 
  onLogout: () => void; 
  currentPage: string; 
  setCurrentPage: (page: string) => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalContacts: 0,
    totalLoanApplications: 0,
    pendingApplications: 0,
    totalBanners: 0
  });
  const [banners, setBanners] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loans, setLoans] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<any | null>(null);
  const [loading, setLoading] = useState({
    banners: false,
    contacts: false,
    loans: false
  });

  // Menu items configuration
  const menuItems = [
    { id: 'dashboard', name: 'Overview', icon: LayoutDashboard, component: DashboardOverview },
    { id: 'banners', name: 'Banners', icon: ImageIcon, component: BannersManager },
    { id: 'contacts', name: 'Contacts', icon: MessageSquare, component: ContactsManager },
    { id: 'loans', name: 'Loan Applications', icon: FileText, component: LoansManager }
  ];

  // Fetch dashboard stats
  useEffect(() => {
    if (currentPage === 'dashboard') {
      fetchDashboardStats();
    }
  }, [currentPage]);

  // Fetch data when components are accessed
  useEffect(() => {
    if (currentPage === 'banners' && banners.length === 0) {
      fetchBanners();
    } else if (currentPage === 'contacts' && contacts.length === 0) {
      fetchContacts();
    } else if (currentPage === 'loans' && loans.length === 0) {
      fetchLoans();
    }
  }, [currentPage]);

  const fetchDashboardStats = async () => {
    try {
      const [contactsRes, loansRes, bannersRes] = await Promise.all([
        axios.get(`${SERVER_HOST}/api/contacts`),
        axios.get(`${SERVER_HOST}/api/loans`),
        axios.get(`${SERVER_HOST}/api/banners`)
      ]);
      
      setDashboardStats({
        totalContacts: contactsRes.data.length,
        totalLoanApplications: loansRes.data.length,
        pendingApplications: loansRes.data.filter((loan: any) => loan.status === 'pending').length,
        totalBanners: bannersRes.data.length
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchBanners = async () => {
    setLoading(prev => ({ ...prev, banners: true }));
    try {
      const response = await axios.get(`${SERVER_HOST}/api/banners`);
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
      alert('Failed to load banners. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, banners: false }));
    }
  };

  const fetchContacts = async () => {
    setLoading(prev => ({ ...prev, contacts: true }));
    try {
      const response = await axios.get(`${SERVER_HOST}/api/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      alert('Failed to load contacts. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, contacts: false }));
    }
  };

  const fetchLoans = async () => {
    setLoading(prev => ({ ...prev, loans: true }));
    try {
      const response = await axios.get(`${SERVER_HOST}/api/loans`);
      setLoans(response.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
      alert('Failed to load loan applications. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, loans: false }));
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('page', selectedPage);
    
    try {
      await axios.post(`${SERVER_HOST}/api/banners`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchBanners();
      alert('Banner uploaded successfully!');
    } catch (error) {
      console.error('Error uploading banner:', error);
      alert('Error uploading banner. Please try again.');
    }
    
    setIsUploading(false);
    event.target.value = '';
  };

  const handleDeleteBanner = async (bannerId: string) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    
    try {
      await axios.delete(`${SERVER_HOST}/api/banners/${bannerId}`);
      fetchBanners();
      alert('Banner deleted successfully!');
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Failed to delete banner. Please try again.');
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      await axios.delete(`${SERVER_HOST}/api/contacts/${contactId}`);
      fetchContacts();
      alert('Contact deleted successfully!');
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact. Please try again.');
    }
  };

  const handleStatusUpdate = async (loanId: string, status: string) => {
    try {
      await axios.put(`${SERVER_HOST}/api/loans/${loanId}/status`, { status });
      fetchLoans();
      alert(`Loan application ${status} successfully!`);
    } catch (error) {
      console.error('Error updating loan status:', error);
      alert('Failed to update loan status. Please try again.');
    }
  };

  const handleDeleteLoan = async (loanId: string) => {
    if (!window.confirm('Are you sure you want to delete this loan application?')) return;
    
    try {
      await axios.delete(`${SERVER_HOST}/api/loans/${loanId}`);
      fetchLoans();
      alert('Loan application deleted successfully!');
    } catch (error) {
      console.error('Error deleting loan:', error);
      alert('Failed to delete loan application. Please try again.');
    }
  };

  // Get current component to display
  const CurrentComponent = menuItems.find(item => item.id === currentPage)?.component || menuItems[0].component;

  return (
    <div className="min-h-screen bg-gray-50" id="admin-app">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-lg font-bold text-blue-600 tracking-wide">
            EzyLoan Admin
          </h1>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-6 space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${
                  currentPage === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {user?.username || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              {menuItems.find(item => item.id === currentPage)?.name || 'Dashboard'}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <CurrentComponent
            // Dashboard props
            stats={dashboardStats}
            // Banners props
            banners={banners}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isUploading={isUploading}
            onFileUpload={handleFileUpload}
            onDeleteBanner={handleDeleteBanner}
            loadingBanners={loading.banners}
            // Contacts props
            contacts={contacts}
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
            onDeleteContact={handleDeleteContact}
            loadingContacts={loading.contacts}
            // Loans props
            loans={loans}
            selectedLoan={selectedLoan}
            setSelectedLoan={setSelectedLoan}
            onStatusUpdate={handleStatusUpdate}
            onDeleteLoan={handleDeleteLoan}
            loadingLoans={loading.loans}
          />
        </div>
      </div>
    </div>
  );
}

// Dashboard Overview Component
function DashboardOverview({ stats }: { stats: any }) {
  const router = useRouter();
  
  const statCards = [
    { title: 'Total Contacts', value: stats.totalContacts, color: 'bg-blue-500', icon: <MessageSquare className="h-8 w-8" /> },
    { title: 'Loan Applications', value: stats.totalLoanApplications, color: 'bg-green-500', icon: <FileText className="h-8 w-8" /> },
    { title: 'Pending Applications', value: stats.pendingApplications, color: 'bg-yellow-500', icon: <FileText className="h-8 w-8" /> },
    { title: 'Total Banners', value: stats.totalBanners, color: 'bg-purple-500', icon: <ImageIcon className="h-8 w-8" /> }
  ];

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h3>
        <p className="text-gray-600">Welcome to EzyLoan Admin Panel</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg text-white`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h4>
          <div className="space-y-3">
            <button
              onClick={() => document.getElementById('admin-app')?.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors w-full text-left"
            >
              <ImageIcon className="h-5 w-5 text-blue-600 mr-3" />
              <span className="font-medium text-blue-600">Manage Banners</span>
            </button>
            <button
              onClick={() => document.getElementById('admin-app')?.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors w-full text-left"
            >
              <MessageSquare className="h-5 w-5 text-green-600 mr-3" />
              <span className="font-medium text-green-600">View Contacts</span>
            </button>
            <button
              onClick={() => document.getElementById('admin-app')?.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors w-full text-left"
            >
              <FileText className="h-5 w-5 text-purple-600 mr-3" />
              <span className="font-medium text-purple-600">Review Loan Applications</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">System Status</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">API Status</span>
                <span className="text-sm font-medium text-green-600">Operational</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Database</span>
                <span className="text-sm font-medium text-green-600">Healthy</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="mt-2 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                All systems operational. Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Banners Manager Component
function BannersManager({
  banners,
  selectedPage,
  setSelectedPage,
  isUploading,
  onFileUpload,
  onDeleteBanner,
  loadingBanners
}: {
  banners: any[];
  selectedPage: string;
  setSelectedPage: (page: string) => void;
  isUploading: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteBanner: (bannerId: string) => void;
  loadingBanners: boolean;
}) {
  const pages = [
    { value: 'home', label: 'Home' },
    { value: 'about', label: 'About' },
    { value: 'contact', label: 'Contact' },
    { value: 'apply', label: 'Apply Loan' },
    { value: 'car-refinance', label: 'Car Refinance' },
    { value: 'used-car-refinance', label: 'Used Car Refinance' },
    { value: 'car-balance-transfer', label: 'Car Balance Transfer' },
    { value: 'car-top-up', label: 'Car Top-Up Loan' },
    { value: 'new-car-loan', label: 'New Car Loan' },
    { value: 'personal-loan', label: 'Personal Loan' },
    { value: 'property-loan', label: 'Property Loan' },
    { value: 'commercial-vehicle-loan', label: 'Commercial Vehicle Loan' }
  ];

  const filteredBanners = banners.filter(banner => banner.page === selectedPage);

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Banner Management</h3>
        <p className="text-gray-600">Manage banners for different pages</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Page</label>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
            >
              {pages.map((page) => (
                <option key={page.value} value={page.value}>{page.label}</option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Banner</label>
            <label className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer w-full sm:w-auto">
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Choose Image'}
              <input
                type="file"
                accept="image/*"
                onChange={onFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800">
            {pages.find(p => p.value === selectedPage)?.label} Banners ({filteredBanners.length})
          </h4>
        </div>
        <div className="p-4 md:p-6">
          {loadingBanners ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredBanners.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No banners uploaded for this page</p>
              <p className="text-gray-400 mt-2">Upload your first banner to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredBanners.map((banner) => (
                <div key={banner._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    <img
                      src={banner.image.startsWith('http') ? banner.image : `${SERVER_HOST}${banner.image}`}
                      alt="Banner"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        banner.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {banner.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => onDeleteBanner(banner._id)}
                        className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-50 rounded-full"
                        title="Delete banner"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Uploaded: {new Date(banner.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Contacts Manager Component
function ContactsManager({
  contacts,
  selectedContact,
  setSelectedContact,
  onDeleteContact,
  loadingContacts
}: {
  contacts: any[];
  selectedContact: any | null;
  setSelectedContact: (contact: any | null) => void;
  onDeleteContact: (contactId: string) => void;
  loadingContacts: boolean;
}) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Contact Messages</h3>
        <p className="text-gray-600">Manage customer inquiries and contact messages</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800">All Contacts ({contacts.length})</h4>
        </div>
        <div className="overflow-x-auto">
          {loadingContacts ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No contact messages found</p>
              <p className="text-gray-400 mt-2">Check back later for new messages</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Loan Details</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-gray-900">{contact.fullName}</p>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                        <p className="text-sm text-gray-500">{contact.phoneNumber}</p>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div>
                        <p className="text-sm text-gray-900">{contact.loanType}</p>
                        <p className="text-sm text-gray-500">{contact.loanAmount}</p>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1 hover:bg-blue-50 rounded-full"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDeleteContact(contact._id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-50 rounded-full"
                          title="Delete contact"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full my-8">
            <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Contact Details</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                <DetailItem label="Full Name" value={selectedContact.fullName} />
                <DetailItem label="Email" value={selectedContact.email} />
                <DetailItem label="Phone" value={selectedContact.phoneNumber} />
                <DetailItem label="Loan Type" value={selectedContact.loanType} />
                <DetailItem label="Loan Amount" value={selectedContact.loanAmount} />
                {selectedContact.city && <DetailItem label="City" value={selectedContact.city} />}
                {selectedContact.message && <DetailItem label="Message" value={selectedContact.message} isTextArea />}
              </div>
            </div>
            <div className="p-4 md:p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for contact details
function DetailItem({ label, value, isTextArea }: { label: string; value: string; isTextArea?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className={`text-gray-900 ${isTextArea ? 'whitespace-pre-wrap' : ''}`}>
        {value || 'N/A'}
      </div>
    </div>
  );
}

// Loans Manager Component
function LoansManager({
  loans,
  selectedLoan,
  setSelectedLoan,
  onStatusUpdate,
  onDeleteLoan,
  loadingLoans
}: {
  loans: any[];
  selectedLoan: any | null;
  setSelectedLoan: (loan: any | null) => void;
  onStatusUpdate: (loanId: string, status: string) => void;
  onDeleteLoan: (loanId: string) => void;
  loadingLoans: boolean;
}) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Loan Applications</h3>
        <p className="text-gray-600">Manage and review loan applications</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800">All Applications ({loans.length})</h4>
        </div>
        <div className="overflow-x-auto">
          {loadingLoans ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : loans.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No loan applications found</p>
              <p className="text-gray-400 mt-2">Check back later for new applications</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Loan Details</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loans.map((loan) => (
                  <tr key={loan._id} className="hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-gray-900">{loan.fullName}</p>
                        <p className="text-sm text-gray-500">{loan.phoneNumber}</p>
                        <p className="text-sm text-gray-500 hidden md:block">{loan.city}, {loan.pincode}</p>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div>
                        <p className="text-sm text-gray-900">{loan.loanType}</p>
                        <p className="text-sm text-gray-500">{loan.employmentType}</p>
                        <p className="text-sm text-gray-500">CIBIL: {loan.cibilScore}</p>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={loan.status} />
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                      {new Date(loan.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedLoan(loan)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1 hover:bg-blue-50 rounded-full"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {loan.status === 'pending' && (
                          <>
                            <button
                              onClick={() => onStatusUpdate(loan._id, 'approved')}
                              className="text-green-600 hover:text-green-800 transition-colors p-1 hover:bg-green-50 rounded-full"
                              title="Approve application"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => onStatusUpdate(loan._id, 'rejected')}
                              className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-50 rounded-full"
                              title="Reject application"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => onDeleteLoan(loan._id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-50 rounded-full"
                          title="Delete application"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Loan Details Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8 max-h-[90vh] overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Loan Application Details</h3>
              <button
                onClick={() => setSelectedLoan(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 md:p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-100">Personal Information</h4>
                  <DetailItem label="Full Name" value={selectedLoan.fullName} />
                  <DetailItem label="Phone Number" value={selectedLoan.phoneNumber} />
                  <DetailItem label="Email" value={selectedLoan.email} />
                  <DetailItem label="City" value={selectedLoan.city} />
                  <DetailItem label="Pincode" value={selectedLoan.pincode} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-100">Loan Information</h4>
                  <DetailItem label="Loan Type" value={selectedLoan.loanType} />
                  <DetailItem label="Employment Type" value={selectedLoan.employmentType} />
                  <DetailItem label="CIBIL Score" value={selectedLoan.cibilScore} />
                  <DetailItem label="Monthly Income" value={selectedLoan.monthlyIncome} />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <StatusBadge status={selectedLoan.status} large />
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-1">Application Date</label>
                <p className="text-gray-900">
                  {new Date(selectedLoan.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="p-4 md:p-6 border-t border-gray-200 flex justify-between flex-col sm:flex-row gap-3">
              <div className="flex space-x-3">
                {selectedLoan.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        onStatusUpdate(selectedLoan._id, 'approved');
                        setSelectedLoan(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors min-w-[100px]"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        onStatusUpdate(selectedLoan._id, 'rejected');
                        setSelectedLoan(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors min-w-[100px]"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => setSelectedLoan(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors min-w-[100px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status, large = false }: { status: string; large?: boolean }) {
  const statusConfig: Record<string, { text: string; bg: string; textClass: string; dot: string }> = {
    approved: {
      text: 'Approved',
      bg: 'bg-green-100',
      textClass: 'text-green-800',
      dot: 'bg-green-500'
    },
    rejected: {
      text: 'Rejected',
      bg: 'bg-red-100',
      textClass: 'text-red-800',
      dot: 'bg-red-500'
    },
    pending: {
      text: 'Pending',
      bg: 'bg-yellow-100',
      textClass: 'text-yellow-800',
      dot: 'bg-yellow-500'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.textClass}`}>
      <span className={`inline-block w-2 h-2 mr-1 rounded-full ${config.dot}`}></span>
      {large ? config.text.toUpperCase() : config.text}
    </span>
  );
}