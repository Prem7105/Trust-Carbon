import React, { useState } from 'react';
import { 
  Users, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye,
  Filter,
  Search,
  Download,
  BarChart3,
  Shield
} from 'lucide-react';
import { Project, VerificationDetails } from '../../types';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [filterStatus, setFilterStatus] = useState('All');

  const mockProjects: Project[] = [
    {
      id: 'PRJ-001',
      title: 'Solar Farm Installation',
      description: 'Large-scale solar energy project in California',
      category: 'Renewable Energy',
      status: 'Under Review',
      submittedBy: 'GreenTech Corp',
      submittedDate: '2024-01-15',
      estimatedCredits: 500,
      documents: [],
      location: 'California, USA',
      duration: '2 years',
      budget: 2500000
    },
    {
      id: 'PRJ-002',
      title: 'Forest Conservation Initiative',
      description: 'Protecting 1000 hectares of rainforest',
      category: 'Forest Conservation',
      status: 'Approved',
      submittedBy: 'EcoGuardians',
      submittedDate: '2024-01-10',
      estimatedCredits: 750,
      documents: [],
      location: 'Brazil',
      duration: '5+ years',
      budget: 1800000
    },
    {
      id: 'PRJ-003',
      title: 'Wind Energy Development',
      description: 'Offshore wind farm construction',
      category: 'Renewable Energy',
      status: 'Rejected',
      submittedBy: 'WindPower Ltd',
      submittedDate: '2024-01-08',
      estimatedCredits: 400,
      documents: [],
      location: 'Denmark',
      duration: '1 year',
      budget: 3200000
    },
    {
      id: 'PRJ-004',
      title: 'Waste-to-Energy Plant',
      description: 'Converting municipal waste to clean energy',
      category: 'Waste Management',
      status: 'Under Review',
      submittedBy: 'CleanEnergy Solutions',
      submittedDate: '2024-01-12',
      estimatedCredits: 300,
      documents: [],
      location: 'Germany',
      duration: '1 year',
      budget: 1500000
    }
  ];

  const mockUsers = [
    {
      id: 'USR-001',
      name: 'John Smith',
      email: 'john@greentech.com',
      company: 'GreenTech Corp',
      joinDate: '2023-12-01',
      projectsSubmitted: 3,
      creditsEarned: 245,
      status: 'Active'
    },
    {
      id: 'USR-002',
      name: 'Sarah Johnson',
      email: 'sarah@ecoguardians.org',
      company: 'EcoGuardians',
      joinDate: '2023-11-15',
      projectsSubmitted: 5,
      creditsEarned: 890,
      status: 'Active'
    },
    {
      id: 'USR-003',
      name: 'Mike Chen',
      email: 'mike@windpower.com',
      company: 'WindPower Ltd',
      joinDate: '2024-01-05',
      projectsSubmitted: 1,
      creditsEarned: 0,
      status: 'Suspended'
    }
  ];

  const filteredProjects = filterStatus === 'All' 
    ? mockProjects 
    : mockProjects.filter(project => project.status === filterStatus);

  const handleApprove = (projectId: string) => {
    alert(`Project ${projectId} approved!`);
  };

  const handleReject = (projectId: string) => {
    alert(`Project ${projectId} rejected!`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <Shield className="w-8 h-8 mr-3 text-blue-600" />
          Admin Panel
        </h1>
        <p className="text-gray-600">
          Manage projects, users, and system verification
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{mockProjects.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockProjects.filter(p => p.status === 'Under Review').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockProjects.filter(p => p.status === 'Approved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockUsers.filter(u => u.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'projects', label: 'Project Management', icon: FileCheck },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'projects' && (
        <div className="bg-white rounded-xl shadow-sm">
          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All Status</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Projects Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.title}</div>
                        <div className="text-sm text-gray-500">{project.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{project.submittedBy}</div>
                      <div className="text-sm text-gray-500">{project.submittedDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {project.estimatedCredits}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Eye className="w-4 h-4" />
                        </button>
                        {project.status === 'Under Review' && (
                          <>
                            <button
                              onClick={() => handleApprove(project.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(project.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Users
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projects
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.company}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.projectsSubmitted}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.creditsEarned}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUserStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-700">
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Projects</span>
                <span className="font-semibold">{mockProjects.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Approval Rate</span>
                <span className="font-semibold text-green-600">75%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Credits</span>
                <span className="font-semibold">487</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Value</span>
                <span className="font-semibold">$2.4M</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Analytics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Users</span>
                <span className="font-semibold">{mockUsers.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Users</span>
                <span className="font-semibold text-green-600">
                  {mockUsers.filter(u => u.status === 'Active').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Projects/User</span>
                <span className="font-semibold">3.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Credits Earned</span>
                <span className="font-semibold">1,135</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;