import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  
  useEffect(() => {
    const checkAuthentication = () => {
      const user = localStorage.getItem('user');
      
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const userData = JSON.parse(user);
        
        if (!userData.isLoggedIn) {
          navigate('/login');
          return;
        }

      } catch (error) {
        localStorage.removeItem('user');
        navigate('/login');
      }
    };

    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const loadData = () => {
      
      const sampleClients = [
        { 
          id: 1, 
          name: 'TechCorp Solutions', 
          email: 'contact@techcorp.com', 
          industry: 'Technology', 
          status: 'Active', 
          joinDate: '2024-01-15',
          projects: 3,
          revenue: 45000
        },
        { 
          id: 2, 
          name: 'FinanceBank Ltd', 
          email: 'it@financebank.com', 
          industry: 'Banking', 
          status: 'Active', 
          joinDate: '2024-01-10',
          projects: 2,
          revenue: 35000
        },
        { 
          id: 3, 
          name: 'MediCare Hospital', 
          email: 'admin@medicare.com', 
          industry: 'Healthcare', 
          status: 'Active', 
          joinDate: '2024-01-05',
          projects: 1,
          revenue: 25000
        },
        { 
          id: 4, 
          name: 'RetailChain Stores', 
          email: 'tech@retailchain.com', 
          industry: 'Retail', 
          status: 'Pending', 
          joinDate: '2024-01-20',
          projects: 0,
          revenue: 0
        },
        { 
          id: 5, 
          name: 'EduTech Innovations', 
          email: 'hello@edutech.com', 
          industry: 'Education', 
          status: 'Active', 
          joinDate: '2024-01-18',
          projects: 1,
          revenue: 20000
        }
      ];
      const sampleProjects = [
        { 
          id: 1, 
          name: 'E-commerce Platform', 
          client: 'TechCorp Solutions', 
          type: 'Web Development',
          status: 'Development', 
          progress: 75, 
          deadline: '2024-03-15',
          budget: 25000,
          team: ['John D.', 'Sarah W.', 'Mike J.']
        },
        { 
          id: 2, 
          name: 'Mobile Banking App', 
          client: 'FinanceBank Ltd', 
          type: 'Mobile App',
          status: 'Testing', 
          progress: 90, 
          deadline: '2024-02-20',
          budget: 30000,
          team: ['David B.', 'Jane S.']
        },
        { 
          id: 3, 
          name: 'Healthcare Portal', 
          client: 'MediCare Hospital', 
          type: 'Web Application',
          status: 'Planning', 
          progress: 25, 
          deadline: '2024-04-10',
          budget: 20000,
          team: ['John D.', 'Mike J.']
        },
        { 
          id: 4, 
          name: 'Inventory System', 
          client: 'RetailChain Stores', 
          type: 'Custom Software',
          status: 'Design', 
          progress: 40, 
          deadline: '2024-03-30',
          budget: 35000,
          team: ['Sarah W.', 'David B.']
        }
      ];
      const sampleTeam = [
        { id: 1, name: 'John Doe', role: 'Senior Developer', specialization: 'React, Node.js', projects: 3, status: 'Available' },
        { id: 2, name: 'Jane Smith', role: 'UI/UX Designer', specialization: 'Figma, Adobe XD', projects: 2, status: 'Available' },
        { id: 3, name: 'Mike Johnson', role: 'Full Stack Developer', specialization: 'Python, Django', projects: 2, status: 'Busy' },
        { id: 4, name: 'Sarah Wilson', role: 'Project Manager', specialization: 'Agile, Scrum', projects: 4, status: 'Available' },
        { id: 5, name: 'David Brown', role: 'Mobile Developer', specialization: 'React Native, Flutter', projects: 2, status: 'Available' }
      ];
      const sampleLeads = [
        { id: 1, company: 'StartupXYZ', contact: 'alex@startupxyz.com', service: 'Web App', status: 'Hot', value: 15000, source: 'Referral' },
        { id: 2, company: 'Local Restaurant', contact: 'owner@localrestaurant.com', service: 'Website', status: 'Warm', value: 5000, source: 'Google' },
        { id: 3, company: 'Consulting Firm', contact: 'partner@consulting.com', service: 'CRM System', status: 'Cold', value: 25000, source: 'LinkedIn' },
        { id: 4, company: 'Fitness Center', contact: 'manager@fitness.com', service: 'Mobile App', status: 'Hot', value: 18000, source: 'Referral' }
      ];

      setClients(sampleClients);
      setProjects(sampleProjects);
      setTeamMembers(sampleTeam);
      setLeads(sampleLeads);
    };

    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
      case 'Available':
      case 'Testing':
      case 'Hot':
        return 'bg-green-100 text-green-800';
      case 'Development':
      case 'Warm':
        return 'bg-blue-100 text-blue-800';
      case 'Planning':
      case 'Design':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
      case 'Cold':
        return 'bg-orange-100 text-orange-800';
      case 'Busy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectTypeColor = (type) => {
    switch (type) {
      case 'Web Development':
        return 'bg-purple-100 text-purple-800';
      case 'Mobile App':
        return 'bg-indigo-100 text-indigo-800';
      case 'Web Application':
        return 'bg-pink-100 text-pink-800';
      case 'Custom Software':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const totalRevenue = clients.reduce((sum, client) => sum + client.revenue, 0);
  const activeProjects = projects.filter(p => p.status !== 'Completed').length;
  const activeClients = clients.filter(c => c.status === 'Active').length;
  const teamCapacity = teamMembers.filter(m => m.status === 'Available').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your IT company operations and client projects</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600">+18% this quarter</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{activeProjects}</p>
                <p className="text-xs text-green-600">4 in development</p>
              </div>
            </div>
          </div>

          {/* Active Clients */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">{activeClients}</p>
                <p className="text-xs text-green-600">1 pending approval</p>
              </div>
            </div>
          </div>

         
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Team Capacity</p>
                <p className="text-2xl font-bold text-gray-900">{teamCapacity}/{teamMembers.length}</p>
                <p className="text-xs text-green-600">Available developers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'clients', 'projects', 'team', 'leads'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
              </div>
              <div className="p-6">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="mb-4 last:mb-0 p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Client: {project.client}</p>
                    <div className="flex justify-between items-center">
                      <div className="w-3/4 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Clients */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Clients</h2>
              </div>
              <div className="p-6">
                {clients.slice(0, 4).map((client) => (
                  <div key={client.id} className="flex items-center justify-between mb-4 last:mb-0 p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.industry}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Client Management</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Add New Client
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.industry}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.projects}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${client.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-green-600 hover:text-green-900">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Project Management</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Create New Project
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{project.name}</div>
                          <div className="text-sm text-gray-500">Team: {project.team.join(', ')}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.client}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProjectTypeColor(project.type)}`}>
                          {project.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{project.progress}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${project.budget.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Team Management</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Add Team Member
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Member</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.specialization}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.projects}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Sales Leads</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Add New Lead
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.contact}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${lead.value.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.source}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

       
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout from Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;