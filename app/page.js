"use client";
import React, { useState, useContext, createContext, useEffect } from 'react';
import { ChevronDown, Search, Bell, Home, FileText, Users, BarChart3, Settings, LogOut, Check, X, Clock, AlertCircle, Star, Calendar, Upload, Plus, Filter, TrendingUp, MessageSquare, Award, BookOpen, Mail, Shield, Link2, Eye, Download, Send, User, Building, GraduationCap, Tag, Globe, Activity, Zap, CheckCircle, XCircle, ArrowRight, Menu, ChevronRight, Briefcase, Target, UserCheck, RefreshCw, Edit, Save, Camera } from 'lucide-react';

// Create contexts for state management
const AuthContext = createContext();
const AppContext = createContext();

// Custom hooks
const useAuth = () => useContext(AuthContext);
const useApp = () => useContext(AppContext);

// Dummy data generation
const generateDummyData = () => {
  const fields = ['Computer Science', 'Biology', 'Psychology', 'Environmental Science', 'Economics'];
  const subfields = {
    'Computer Science': ['Machine Learning', 'Distributed Systems', 'Human-Computer Interaction', 'Cybersecurity'],
    'Biology': ['Molecular Biology', 'Genetics', 'Neuroscience', 'Ecology'],
    'Psychology': ['Cognitive Psychology', 'Social Psychology', 'Clinical Psychology', 'Developmental Psychology'],
    'Environmental Science': ['Climate Science', 'Conservation Biology', 'Environmental Policy', 'Renewable Energy'],
    'Economics': ['Behavioral Economics', 'Development Economics', 'Financial Economics', 'Labor Economics']
  };

  const institutions = [
    'Stanford University', 'MIT', 'Harvard University', 'UC Berkeley', 'Cambridge University',
    'Oxford University', 'ETH Zurich', 'University of Toronto', 'Imperial College London', 'Yale University'
  ];

  const firstNames = ['Emily', 'Michael', 'Sarah', 'David', 'Jennifer', 'Robert', 'Lisa', 'James', 'Maria', 'John'];
  const lastNames = ['Chen', 'Smith', 'Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

  const generateUser = (id) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const field = fields[Math.floor(Math.random() * fields.length)];
    
    return {
      id,
      name: `Dr. ${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${institutions[Math.floor(Math.random() * institutions.length)].toLowerCase().replace(/\s+/g, '')}.edu`,
      institution: institutions[Math.floor(Math.random() * institutions.length)],
      position: ['Assistant Professor', 'Associate Professor', 'Professor', 'Postdoctoral Researcher', 'Research Scientist'][Math.floor(Math.random() * 5)],
      fields: [field, ...subfields[field].slice(0, Math.floor(Math.random() * 3) + 1)],
      avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
      verified: Math.random() > 0.3,
      orcid: Math.random() > 0.5 ? `0000-000${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` : null,
      reviewStats: {
        completed: Math.floor(Math.random() * 50) + 10,
        avgTurnaround: Math.floor(Math.random() * 14) + 7,
        rating: (Math.random() * 1.5 + 3.5).toFixed(1)
      }
    };
  };

  const generatePaper = (id, authors) => {
    const field = fields[Math.floor(Math.random() * fields.length)];
    const status = ['draft', 'under_review', 'revision_requested', 'accepted', 'published'][Math.floor(Math.random() * 5)];
    const authorCount = Math.floor(Math.random() * 4) + 1;
    const selectedAuthors = [];
    
    for (let i = 0; i < authorCount; i++) {
      selectedAuthors.push(authors[Math.floor(Math.random() * authors.length)]);
    }

    const titles = {
      'Computer Science': [
        'Deep Learning Approaches for Real-Time Object Detection in Edge Computing Environments',
        'Quantum-Resistant Cryptographic Protocols for Blockchain Networks',
        'Federated Learning with Differential Privacy: A Comprehensive Survey',
        'Natural Language Understanding in Low-Resource Languages Using Transfer Learning'
      ],
      'Biology': [
        'CRISPR-Cas9 Mediated Gene Editing in Primary Human T Cells',
        'Microbiome Dynamics in Response to Environmental Stressors',
        'Novel Biomarkers for Early Detection of Alzheimer\'s Disease',
        'Evolutionary Adaptations in Deep-Sea Organisms'
      ],
      'Psychology': [
        'The Impact of Social Media on Adolescent Mental Health: A Longitudinal Study',
        'Cognitive Biases in Decision Making Under Uncertainty',
        'Neuroplasticity and Learning: Implications for Educational Practice',
        'Cultural Variations in Emotional Expression and Recognition'
      ],
      'Environmental Science': [
        'Machine Learning Models for Climate Change Prediction',
        'Biodiversity Conservation in Urban Environments',
        'Renewable Energy Integration: Challenges and Solutions',
        'Microplastic Pollution in Marine Ecosystems: A Global Assessment'
      ],
      'Economics': [
        'Behavioral Factors in Financial Market Volatility',
        'The Economics of Remote Work: Productivity and Well-being',
        'Cryptocurrency Adoption: A Cross-Country Analysis',
        'Income Inequality and Social Mobility: New Evidence from Panel Data'
      ]
    };

    const abstracts = {
      'Computer Science': 'This paper presents a novel approach to addressing key challenges in modern computing systems. We propose an innovative framework that significantly improves performance while maintaining security and efficiency. Our experimental results demonstrate substantial improvements over existing state-of-the-art methods.',
      'Biology': 'We investigate fundamental biological processes using cutting-edge experimental techniques. Our findings reveal previously unknown mechanisms that have significant implications for understanding disease pathology and developing new therapeutic interventions. The results provide new insights into cellular and molecular biology.',
      'Psychology': 'This study examines important psychological phenomena through rigorous empirical investigation. Using a large-scale longitudinal design, we uncover significant patterns in human behavior and cognition. Our findings have important implications for both theoretical understanding and practical applications.',
      'Environmental Science': 'We present a comprehensive analysis of environmental challenges and potential solutions. Through extensive field work and computational modeling, we identify critical factors affecting ecosystem health and sustainability. Our results inform evidence-based policy recommendations for environmental protection.',
      'Economics': 'This research analyzes economic phenomena using advanced econometric techniques and novel datasets. We identify causal relationships and test theoretical predictions with important policy implications. Our findings contribute to understanding complex economic dynamics in modern markets.'
    };

    return {
      id,
      title: titles[field][Math.floor(Math.random() * titles[field].length)],
      abstract: abstracts[field],
      authors: selectedAuthors,
      field,
      subfields: subfields[field].slice(0, Math.floor(Math.random() * 3) + 1),
      status,
      submittedDate: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
      lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      reviewsReceived: status === 'under_review' ? 0 : Math.floor(Math.random() * 3) + 1,
      reviewsNeeded: 3,
      version: Math.floor(Math.random() * 3) + 1,
      downloads: Math.floor(Math.random() * 100) + 10,
      views: Math.floor(Math.random() * 500) + 50
    };
  };

  const generateReview = (paper, reviewer) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      paperId: paper.id,
      reviewer,
      ratings: {
        methodology: Math.floor(Math.random() * 2) + 3,
        originality: Math.floor(Math.random() * 2) + 3,
        clarity: Math.floor(Math.random() * 2) + 3,
        significance: Math.floor(Math.random() * 2) + 3
      },
      recommendation: ['Accept', 'Minor Revisions', 'Major Revisions', 'Reject'][Math.floor(Math.random() * 4)],
      comments: {
        strengths: 'The paper presents novel insights and is well-written. The methodology is sound and the results are clearly presented.',
        weaknesses: 'Some aspects of the analysis could be strengthened. Additional experiments would enhance the conclusions.',
        detailed: 'The introduction effectively motivates the research question. The methods section is comprehensive. The results are interesting but would benefit from additional statistical analysis.'
      },
      submittedDate: new Date(Date.now() - Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000).toISOString()
    };
  };

  const generateNotifications = (userId) => {
    const types = ['review_request', 'review_received', 'paper_accepted', 'new_follower', 'comment', 'deadline'];
    const notifications = [];
    
    for (let i = 0; i < 10; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const isRead = Math.random() > 0.6;
      
      notifications.push({
        id: i,
        type,
        title: {
          review_request: 'New Review Request',
          review_received: 'Review Completed',
          paper_accepted: 'Paper Accepted',
          new_follower: 'New Follower',
          comment: 'New Comment',
          deadline: 'Review Deadline Approaching'
        }[type],
        message: {
          review_request: 'You have been invited to review "Deep Learning Approaches for Edge Computing"',
          review_received: 'A review has been submitted for your paper',
          paper_accepted: 'Congratulations! Your paper has been accepted',
          new_follower: 'Dr. Sarah Johnson is now following your work',
          comment: 'New comment on your paper discussion',
          deadline: 'Review for "Quantum Computing Applications" is due in 2 days'
        }[type],
        priority: type === 'deadline' || type === 'review_request' ? 'urgent' : type === 'paper_accepted' || type === 'review_received' ? 'update' : 'social',
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString(),
        isRead
      });
    }
    
    return notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  // Generate data
  const users = Array.from({ length: 20 }, (_, i) => generateUser(i));
  const papers = Array.from({ length: 50 }, (_, i) => generatePaper(i, users));
  const reviews = [];
  
  papers.forEach(paper => {
    if (paper.status !== 'draft') {
      const reviewCount = Math.min(paper.reviewsReceived, 3);
      for (let i = 0; i < reviewCount; i++) {
        const reviewer = users.find(u => !paper.authors.includes(u));
        if (reviewer) {
          reviews.push(generateReview(paper, reviewer));
        }
      }
    }
  });

  return { users, papers, reviews, notifications: generateNotifications };
};

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [authStep, setAuthStep] = useState('landing');

  useEffect(() => {
    const { users: generatedUsers } = generateDummyData();
    setUsers(generatedUsers);
  }, []);

  const demoUsers = users.slice(0, 5);

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const switchUser = (userId) => {
    const foundUser = users.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthStep('landing');
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: users.length,
      avatar: `https://ui-avatars.com/api/?name=${userData.name.replace('Dr. ', '')}&background=random`,
      verified: false,
      reviewStats: {
        completed: 0,
        avgTurnaround: 0,
        rating: 0
      }
    };
    setUsers([...users, newUser]);
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, users, demoUsers, login, logout, register, switchUser, authStep, setAuthStep }}>
      {children}
    </AuthContext.Provider>
  );
};

// App Provider Component
const AppProvider = ({ children }) => {
  const { user } = useAuth();
  const [papers, setPapers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeView, setActiveView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterField, setFilterField] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const data = generateDummyData();
    setPapers(data.papers);
    setReviews(data.reviews);
    if (user) {
      setNotifications(data.notifications(user.id));
    }
  }, [user]);

  const getUserPapers = () => {
    if (!user) return [];
    return papers.filter(p => p.authors.some(a => a.id === user.id));
  };

  const getPapersToReview = () => {
    if (!user) return [];
    return papers.filter(p => 
      p.status === 'under_review' && 
      !p.authors.some(a => a.id === user.id) &&
      p.field === user.fields[0]
    );
  };

  const getFilteredPapers = () => {
    let filtered = papers;
    
    if (filterField !== 'all') {
      filtered = filtered.filter(p => p.field === filterField);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.authors.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const submitPaper = (paperData) => {
    const newPaper = {
      id: papers.length,
      ...paperData,
      authors: [user, ...paperData.coAuthors],
      status: 'draft',
      submittedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      reviewsReceived: 0,
      reviewsNeeded: 3,
      version: 1,
      downloads: 0,
      views: 0
    };
    setPapers([...papers, newPaper]);
    return newPaper;
  };

  const submitReview = (paperId, reviewData) => {
    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      paperId,
      reviewer: user,
      ...reviewData,
      submittedDate: new Date().toISOString()
    };
    setReviews([...reviews, newReview]);
    
    // Update paper status
    setPapers(papers.map(p => 
      p.id === paperId 
        ? { ...p, reviewsReceived: p.reviewsReceived + 1 }
        : p
    ));
    
    return newReview;
  };

  return (
    <AppContext.Provider value={{
      papers,
      reviews,
      notifications,
      activeView,
      setActiveView,
      searchQuery,
      setSearchQuery,
      filterField,
      setFilterField,
      getUserPapers,
      getPapersToReview,
      getFilteredPapers,
      markNotificationRead,
      submitPaper,
      submitReview,
      sidebarOpen,
      setSidebarOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Landing Page Component
const LandingPage = () => {
  const { setAuthStep } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">PeerReview Network</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAuthStep('login')}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthStep('register')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Revolutionizing Academic Peer Review
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with researchers, share your work, and participate in transparent, 
            efficient peer review. Join the future of academic collaboration.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => setAuthStep('register')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 flex items-center"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={() => setAuthStep('login')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-medium border-2 border-blue-600 hover:bg-blue-50"
            >
              Demo Access
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Matching</h3>
            <p className="text-gray-600">
              Our AI-powered system connects your paper with the most qualified reviewers in your field.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
            <p className="text-gray-600">
              Receive quality reviews in days, not months. Track progress in real-time.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="bg-amber-100 rounded-lg p-3 w-fit mb-4">
              <Shield className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Credibility</h3>
            <p className="text-gray-600">
              Institution verification and ORCID integration ensure authentic academic collaboration.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-12">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold mb-2">Submit Your Paper</h4>
              <p className="text-sm text-gray-600">Upload your manuscript and specify your review preferences</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-semibold mb-2">Match with Experts</h4>
              <p className="text-sm text-gray-600">Our system finds qualified reviewers based on expertise</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-semibold mb-2">Receive Feedback</h4>
              <p className="text-sm text-gray-600">Get structured, constructive reviews from peers</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h4 className="font-semibold mb-2">Improve & Publish</h4>
              <p className="text-sm text-gray-600">Revise based on feedback and track your impact</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Login Component
const LoginPage = () => {
  const { login, setAuthStep, demoUsers } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      setAuthStep('authenticated');
    } else {
      setError('Invalid credentials. Try a demo account.');
    }
  };

  const handleDemoLogin = (user) => {
    login(user.email, 'demo');
    setAuthStep('authenticated');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@institution.edu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or use demo account</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {demoUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleDemoLogin(user)}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.institution}</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => setAuthStep('register')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Registration Component
const RegistrationPage = () => {
  const { register, setAuthStep } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    institution: '',
    position: '',
    degrees: [],
    fields: [],
    expertise: {}
  });

  const positions = ['Assistant Professor', 'Associate Professor', 'Professor', 'Postdoctoral Researcher', 'Research Scientist', 'PhD Student'];
  const fields = ['Computer Science', 'Biology', 'Psychology', 'Environmental Science', 'Economics'];
  const degrees = ['PhD', 'MD', 'ScD', 'EdD', 'JD'];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    register(formData);
    setAuthStep('authenticated');
  };

  const updateFormData = (updates) => {
    setFormData({ ...formData, ...updates });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
          <p className="text-gray-600 mt-2">Join the academic peer review network</p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
              3
            </div>
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Dr. Jane Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institutional Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="j.smith@university.edu"
              />
              <p className="text-xs text-gray-500 mt-1">Use your institutional email for verification</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData({ password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setAuthStep('landing')}
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                disabled={!formData.name || !formData.email || !formData.password}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Academic Credentials */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Academic Credentials</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Institution
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => updateFormData({ institution: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Stanford University"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Position
              </label>
              <select
                value={formData.position}
                onChange={(e) => updateFormData({ position: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select position</option>
                {positions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Highest Degree(s)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {degrees.map(degree => (
                  <label key={degree} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.degrees.includes(degree)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData({ degrees: [...formData.degrees, degree] });
                        } else {
                          updateFormData({ degrees: formData.degrees.filter(d => d !== degree) });
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm">{degree}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ORCID (Optional)
              </label>
              <input
                type="text"
                value={formData.orcid || ''}
                onChange={(e) => updateFormData({ orcid: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0000-0000-0000-0000"
              />
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!formData.institution || !formData.position}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Research Interests */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Research Interests</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Research Fields
              </label>
              <div className="space-y-3">
                {fields.map(field => (
                  <label key={field} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.fields.includes(field)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData({ fields: [...formData.fields, field] });
                        } else {
                          updateFormData({ fields: formData.fields.filter(f => f !== field) });
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm">{field}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.fields.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expertise Level
                </label>
                <div className="space-y-3">
                  {formData.fields.map(field => (
                    <div key={field} className="flex items-center justify-between">
                      <span className="text-sm">{field}</span>
                      <select
                        value={formData.expertise[field] || ''}
                        onChange={(e) => updateFormData({ 
                          expertise: { ...formData.expertise, [field]: e.target.value }
                        })}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="">Select level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Verification Process</p>
                  <p className="text-sm text-blue-700 mt-1">
                    After registration, we'll send a verification email to your institutional address. 
                    You can connect your ORCID for additional verification.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                disabled={formData.fields.length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Complete Registration
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = () => {
  const { user, logout, switchUser, demoUsers } = useAuth();
  const { activeView, setActiveView, sidebarOpen, setSidebarOpen } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'papers', label: 'My Papers', icon: FileText },
    { id: 'review', label: 'Review Papers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">PeerReview</span>
          </div>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                  activeView === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="h-8 w-8 rounded-full"
              />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.institution}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {showUserMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border">
                <div className="p-2">
                  <p className="px-3 py-2 text-xs font-medium text-gray-500">Switch Demo User</p>
                  {demoUsers.map((demoUser) => (
                    <button
                      key={demoUser.id}
                      onClick={() => {
                        switchUser(demoUser.id);
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <img
                        src={demoUser.avatar}
                        alt={demoUser.name}
                        className="h-6 w-6 rounded-full"
                      />
                      <span>{demoUser.name}</span>
                    </button>
                  ))}
                  <div className="border-t mt-2 pt-2">
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 rounded hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Header Component
const Header = () => {
  const { user } = useAuth();
  const { notifications, searchQuery, setSearchQuery, setSidebarOpen } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-1">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            
            <div className="ml-4 lg:ml-0 flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search papers, authors, or keywords..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100"
              >
                <Bell className="h-6 w-6 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <NotificationDropdown 
                  notifications={notifications}
                  onClose={() => setShowNotifications(false)}
                />
              )}
            </div>

            <div className="hidden lg:flex items-center space-x-2">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="h-8 w-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.position}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Notification Dropdown Component
const NotificationDropdown = ({ notifications, onClose }) => {
  const { markNotificationRead } = useApp();

  const priorityIcons = {
    urgent: { icon: AlertCircle, color: 'text-red-500 bg-red-50' },
    update: { icon: Activity, color: 'text-amber-500 bg-amber-50' },
    social: { icon: Users, color: 'text-green-500 bg-green-50' }
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-900">Notifications</h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No notifications</p>
        ) : (
          notifications.map((notification) => {
            const { icon: Icon, color } = priorityIcons[notification.priority];
            return (
              <div
                key={notification.id}
                onClick={() => markNotificationRead(notification.id)}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(notification.timestamp).toRelativeTime()}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-3 border-t">
        <button
          onClick={onClose}
          className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View All Notifications
        </button>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const { user } = useAuth();
  const { getUserPapers, getPapersToReview, papers, reviews } = useApp();

  const userPapers = getUserPapers();
  const papersToReview = getPapersToReview();
  const recentActivity = papers.slice(0, 5);

  const stats = {
    papersSubmitted: userPapers.length,
    reviewsCompleted: user?.reviewStats.completed || 0,
    avgTurnaround: user?.reviewStats.avgTurnaround || 0,
    impactScore: Math.floor(Math.random() * 100) + 50
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
        <p className="text-gray-600 mt-1">Here's what's happening in your research network</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Papers Submitted</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.papersSubmitted}</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Reviews Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.reviewsCompleted}</p>
            </div>
            <div className="bg-green-100 rounded-lg p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Turnaround</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgTurnaround} days</p>
            </div>
            <div className="bg-amber-100 rounded-lg p-3">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Impact Score</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.impactScore}</p>
            </div>
            <div className="bg-purple-100 rounded-lg p-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Papers Needing Review</h2>
          </div>
          <div className="p-6">
            {papersToReview.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No papers awaiting your review</p>
            ) : (
              <div className="space-y-4">
                {papersToReview.slice(0, 3).map((paper) => (
                  <PaperCard key={paper.id} paper={paper} compact />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Your Recent Papers</h2>
          </div>
          <div className="p-6">
            {userPapers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No papers submitted yet</p>
            ) : (
              <div className="space-y-4">
                {userPapers.slice(0, 3).map((paper) => (
                  <PaperCard key={paper.id} paper={paper} compact showStatus />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Discovery Feed */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Discover New Research</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Paper Card Component
const PaperCard = ({ paper, compact = false, showStatus = false }) => {
  const statusColors = {
    draft: 'bg-gray-100 text-gray-600',
    under_review: 'bg-amber-100 text-amber-600',
    revision_requested: 'bg-orange-100 text-orange-600',
    accepted: 'bg-green-100 text-green-600',
    published: 'bg-blue-100 text-blue-600'
  };

  const statusLabels = {
    draft: 'Draft',
    under_review: 'Under Review',
    revision_requested: 'Revisions Requested',
    accepted: 'Accepted',
    published: 'Published'
  };

  return (
    <div className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${compact ? 'space-y-2' : 'space-y-3'}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`font-semibold text-gray-900 ${compact ? 'text-sm' : 'text-base'}`}>
            {paper.title}
          </h3>
          {!compact && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {paper.abstract}
            </p>
          )}
        </div>
        {showStatus && (
          <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${statusColors[paper.status]}`}>
            {statusLabels[paper.status]}
          </span>
        )}
      </div>

      <div className="flex items-center text-xs text-gray-500 space-x-4">
        <span>{paper.authors.map(a => a.name).join(', ')}</span>
        <span>•</span>
        <span>{paper.field}</span>
      </div>

      {!compact && (
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {paper.views}
            </span>
            <span className="flex items-center">
              <Download className="h-3 w-3 mr-1" />
              {paper.downloads}
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              {paper.reviewsReceived}/{paper.reviewsNeeded}
            </span>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Details
          </button>
        </div>
      )}
    </div>
  );
};

// My Papers View
const MyPapers = () => {
  const { getUserPapers } = useApp();
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const userPapers = getUserPapers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Papers</h1>
          <p className="text-gray-600 mt-1">Manage your submissions and track review progress</p>
        </div>
        <button
          onClick={() => setShowSubmitForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Submit New Paper
        </button>
      </div>

      {showSubmitForm && (
        <PaperSubmissionForm onClose={() => setShowSubmitForm(false)} />
      )}

      {userPapers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No papers yet</h3>
          <p className="text-gray-600 mb-4">Start by submitting your first paper for peer review</p>
          <button
            onClick={() => setShowSubmitForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Paper
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {userPapers.map((paper) => (
            <PaperDetailCard key={paper.id} paper={paper} />
          ))}
        </div>
      )}
    </div>
  );
};

// Paper Detail Card Component
const PaperDetailCard = ({ paper }) => {
  const { reviews } = useApp();
  const paperReviews = reviews.filter(r => r.paperId === paper.id);

  const statusColors = {
    draft: 'bg-gray-100 text-gray-600',
    under_review: 'bg-amber-100 text-amber-600',
    revision_requested: 'bg-orange-100 text-orange-600',
    accepted: 'bg-green-100 text-green-600',
    published: 'bg-blue-100 text-blue-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{paper.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{paper.abstract}</p>
          </div>
          <span className={`ml-4 px-3 py-1 text-sm font-medium rounded-full ${statusColors[paper.status]}`}>
            {paper.status.replace('_', ' ').charAt(0).toUpperCase() + paper.status.slice(1).replace('_', ' ')}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-500 space-x-6 mb-4">
          <span>Submitted: {new Date(paper.submittedDate).toLocaleDateString()}</span>
          <span>Version: {paper.version}</span>
          <span>Field: {paper.field}</span>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Review Progress</h4>
          <div className="flex items-center mb-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(paper.reviewsReceived / paper.reviewsNeeded) * 100}%` }}
              />
            </div>
            <span className="ml-3 text-sm text-gray-600">
              {paper.reviewsReceived}/{paper.reviewsNeeded} reviews
            </span>
          </div>

          {paperReviews.length > 0 && (
            <div className="space-y-3">
              {paperReviews.map((review) => (
                <ReviewSummary key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {paper.views} views
            </span>
            <span className="flex items-center">
              <Download className="h-4 w-4 mr-1" />
              {paper.downloads} downloads
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View Full Paper
            </button>
            <button className="text-gray-600 hover:text-gray-700 font-medium text-sm">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Review Summary Component
const ReviewSummary = ({ review }) => {
  const recommendationColors = {
    'Accept': 'text-green-600',
    'Minor Revisions': 'text-blue-600',
    'Major Revisions': 'text-amber-600',
    'Reject': 'text-red-600'
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <img
            src={review.reviewer.avatar}
            alt={review.reviewer.name}
            className="h-8 w-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{review.reviewer.name}</p>
            <p className="text-xs text-gray-500">{review.reviewer.institution}</p>
          </div>
        </div>
        <span className={`text-sm font-medium ${recommendationColors[review.recommendation]}`}>
          {review.recommendation}
        </span>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-3">
        {Object.entries(review.ratings).map(([key, value]) => (
          <div key={key} className="text-center">
            <p className="text-xs text-gray-500 capitalize">{key}</p>
            <div className="flex justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < value ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
        View Full Review
      </button>
    </div>
  );
};

// Paper Submission Form Component
const PaperSubmissionForm = ({ onClose }) => {
  const { user } = useAuth();
  const { submitPaper } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    field: '',
    subfields: [],
    keywords: [],
    file: null,
    coAuthors: [],
    preferredReviewers: [],
    timeline: '2-weeks',
    visibility: 'public'
  });

  const fields = ['Computer Science', 'Biology', 'Psychology', 'Environmental Science', 'Economics'];
  const timelines = [
    { value: '1-week', label: '1 week' },
    { value: '2-weeks', label: '2 weeks' },
    { value: '1-month', label: '1 month' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const handleSubmit = () => {
    const paper = submitPaper(formData);
    onClose();
  };

  const updateFormData = (updates) => {
    setFormData({ ...formData, ...updates });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Submit New Paper</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((s) => (
                <React.Fragment key={s}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {s}
                  </div>
                  {s < 4 && (
                    <div className={`w-16 h-1 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paper Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateFormData({ title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your paper title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Abstract
                </label>
                <textarea
                  value={formData.abstract}
                  onChange={(e) => updateFormData({ abstract: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Provide a comprehensive abstract of your research"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Research Field
                </label>
                <select
                  value={formData.field}
                  onChange={(e) => updateFormData({ field: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select field</option>
                  {fields.map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: File Upload */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium mb-4">Upload Your Paper</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Drag and drop your PDF here, or click to browse
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => updateFormData({ file: e.target.files[0] })}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block"
                >
                  Select File
                </label>
                {formData.file && (
                  <p className="mt-4 text-sm text-gray-600">
                    Selected: {formData.file.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="machine learning, neural networks, computer vision"
                  onChange={(e) => updateFormData({ 
                    keywords: e.target.value.split(',').map(k => k.trim()) 
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 3: Co-authors */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium mb-4">Add Co-authors</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Co-authors will be notified via email and invited to join the platform
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Co-author Email
                </label>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="coauthor@university.edu"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700">
                    Add
                  </button>
                </div>
              </div>

              {formData.coAuthors.length > 0 && (
                <div className="space-y-2">
                  {formData.coAuthors.map((author, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">{author.email}</span>
                      <button className="text-red-600 hover:text-red-700">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Review Preferences */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium mb-4">Review Preferences</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Review Timeline
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {timelines.map(timeline => (
                    <label key={timeline.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="timeline"
                        value={timeline.value}
                        checked={formData.timeline === timeline.value}
                        onChange={(e) => updateFormData({ timeline: e.target.value })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{timeline.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visibility Settings
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={formData.visibility === 'public'}
                      onChange={(e) => updateFormData({ visibility: e.target.value })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Public - Visible to all researchers</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="visibility"
                      value="field"
                      checked={formData.visibility === 'field'}
                      onChange={(e) => updateFormData({ visibility: e.target.value })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Field Only - Visible to researchers in your field</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={formData.visibility === 'private'}
                      onChange={(e) => updateFormData({ visibility: e.target.value })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Private - Only visible to invited reviewers</span>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Submission Summary</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Title:</span> {formData.title}</p>
                  <p><span className="font-medium">Field:</span> {formData.field}</p>
                  <p><span className="font-medium">Timeline:</span> {timelines.find(t => t.value === formData.timeline)?.label}</p>
                  <p><span className="font-medium">Visibility:</span> {formData.visibility}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between">
            <button
              onClick={step > 1 ? () => setStep(step - 1) : onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800"
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            
            <div className="space-x-3">
              <button
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
              >
                Save as Draft
              </button>
              <button
                onClick={step < 4 ? () => setStep(step + 1) : handleSubmit}
                disabled={
                  (step === 1 && (!formData.title || !formData.abstract || !formData.field)) ||
                  (step === 2 && !formData.file)
                }
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {step < 4 ? 'Next' : 'Submit Paper'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Review Papers View
const ReviewPapers = () => {
  const { getPapersToReview, filterField, setFilterField } = useApp();
  const [selectedPaper, setSelectedPaper] = useState(null);
  const papersToReview = getPapersToReview();

  const fields = ['all', 'Computer Science', 'Biology', 'Psychology', 'Environmental Science', 'Economics'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Review Papers</h1>
        <p className="text-gray-600 mt-1">Discover papers in your field that need peer review</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <div className="flex space-x-2">
            {fields.map(field => (
              <button
                key={field}
                onClick={() => setFilterField(field)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filterField === field
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {field}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedPaper ? (
        <ReviewForm paper={selectedPaper} onClose={() => setSelectedPaper(null)} />
      ) : (
        <div className="grid gap-6">
          {papersToReview.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No papers to review</h3>
              <p className="text-gray-600">Check back later or adjust your field filters</p>
            </div>
          ) : (
            papersToReview.map((paper) => (
              <ReviewPaperCard 
                key={paper.id} 
                paper={paper} 
                onReview={() => setSelectedPaper(paper)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

// Review Paper Card Component
const ReviewPaperCard = ({ paper, onReview }) => {
  const { user } = useAuth();
  const [showReviewerMatch, setShowReviewerMatch] = useState(false);

  // Calculate expertise match
  const expertiseMatch = Math.floor(Math.random() * 30) + 70; // 70-100%

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{paper.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{paper.abstract}</p>
        </div>
        <div className="ml-4 text-right">
          <div className="text-2xl font-bold text-blue-600">{expertiseMatch}%</div>
          <p className="text-xs text-gray-500">Match Score</p>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-500 space-x-6 mb-4">
        <span>Field: {paper.field}</span>
        <span>Submitted: {new Date(paper.submittedDate).toLocaleDateString()}</span>
        <span>Reviews: {paper.reviewsReceived}/{paper.reviewsNeeded}</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center space-x-3">
          {paper.authors.slice(0, 3).map((author, index) => (
            <img
              key={index}
              src={author.avatar}
              alt={author.name}
              className="h-8 w-8 rounded-full"
              title={author.name}
            />
          ))}
          {paper.authors.length > 3 && (
            <span className="text-sm text-gray-500">
              +{paper.authors.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowReviewerMatch(!showReviewerMatch)}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            Why this match?
          </button>
          <button
            onClick={onReview}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            Review This Paper
          </button>
        </div>
      </div>

      {showReviewerMatch && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Expertise Match Details</h4>
          <div className="space-y-1 text-sm text-blue-800">
            <p>• Your expertise in {paper.field} aligns with this paper</p>
            <p>• You've reviewed {Math.floor(Math.random() * 5) + 1} similar papers</p>
            <p>• Your recent work overlaps with the paper's keywords</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Review Form Component
const ReviewForm = ({ paper, onClose }) => {
  const { submitReview } = useApp();
  const [reviewData, setReviewData] = useState({
    ratings: {
      methodology: 0,
      originality: 0,
      clarity: 0,
      significance: 0
    },
    recommendation: '',
    comments: {
      strengths: '',
      weaknesses: '',
      detailed: ''
    }
  });

  const handleSubmit = () => {
    submitReview(paper.id, reviewData);
    onClose();
  };

  const updateRating = (category, value) => {
    setReviewData({
      ...reviewData,
      ratings: { ...reviewData.ratings, [category]: value }
    });
  };

  const updateComment = (section, value) => {
    setReviewData({
      ...reviewData,
      comments: { ...reviewData.comments, [section]: value }
    });
  };

  const recommendations = ['Accept', 'Minor Revisions', 'Major Revisions', 'Reject'];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Review Paper</h2>
            <p className="text-sm text-gray-600 mt-1">{paper.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Ratings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Rate the Paper</h3>
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(reviewData.ratings).map(([category, value]) => (
              <div key={category}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {category}
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => updateRating(category, rating)}
                      className="p-1"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          rating <= value
                            ? 'text-amber-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Recommendation</h3>
          <div className="grid grid-cols-2 gap-3">
            {recommendations.map(rec => (
              <label key={rec} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="recommendation"
                  value={rec}
                  checked={reviewData.recommendation === rec}
                  onChange={(e) => setReviewData({ ...reviewData, recommendation: e.target.value })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{rec}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Review</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Strengths
              </label>
              <textarea
                value={reviewData.comments.strengths}
                onChange={(e) => updateComment('strengths', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What are the main strengths of this paper?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weaknesses
              </label>
              <textarea
                value={reviewData.comments.weaknesses}
                onChange={(e) => updateComment('weaknesses', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What areas need improvement?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Comments
              </label>
              <textarea
                value={reviewData.comments.detailed}
                onChange={(e) => updateComment('detailed', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Provide section-by-section feedback and specific suggestions for improvement..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!reviewData.recommendation || Object.values(reviewData.ratings).some(r => r === 0)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

// Analytics View
const Analytics = () => {
  const { user } = useAuth();
  const { papers, reviews } = useApp();
  
  const userPapers = papers.filter(p => p.authors.some(a => a.id === user?.id));
  const userReviews = reviews.filter(r => r.reviewer.id === user?.id);

  // Generate monthly activity data
  const monthlyActivity = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      papers: Math.floor(Math.random() * 5),
      reviews: Math.floor(Math.random() * 8)
    };
  }).reverse();

  // Field distribution
  const fieldDistribution = {
    'Computer Science': 45,
    'Biology': 25,
    'Psychology': 15,
    'Environmental Science': 10,
    'Economics': 5
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your research impact and review contributions</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Impact Score</h3>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">847</span>
            <span className="ml-2 text-sm text-green-600">+12% this month</span>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>Trending upward</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Review Quality Score</h3>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">4.8</span>
            <span className="ml-2 text-sm text-gray-500">/ 5.0</span>
          </div>
          <div className="mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < 5 ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Network Reach</h3>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">2.3k</span>
            <span className="ml-2 text-sm text-gray-500">researchers</span>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span>Across 15 institutions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Activity Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Activity</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {monthlyActivity.map((month, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col space-y-1">
                <div 
                  className="bg-blue-500 rounded-t"
                  style={{ height: `${month.reviews * 20}px` }}
                  title={`${month.reviews} reviews`}
                />
                <div 
                  className="bg-blue-300 rounded-t"
                  style={{ height: `${month.papers * 20}px` }}
                  title={`${month.papers} papers`}
                />
              </div>
              <span className="text-xs text-gray-600 mt-2">{month.month}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Reviews</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-blue-300 rounded"></div>
            <span className="text-sm text-gray-600">Papers</span>
          </div>
        </div>
      </div>

      {/* Field Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Distribution</h3>
          <div className="space-y-4">
            {Object.entries(fieldDistribution).map(([field, percentage]) => (
              <div key={field}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{field}</span>
                  <span className="text-gray-600">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Award className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Top Reviewer</p>
                <p className="text-xs text-gray-600">Completed 10 reviews this month</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Zap className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Fast Responder</p>
                <p className="text-xs text-gray-600">Average review time under 7 days</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <Target className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">High Impact</p>
                <p className="text-xs text-gray-600">Papers cited 50+ times</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Heatmap</h3>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-53 gap-1 min-w-max">
            {Array.from({ length: 365 }, (_, i) => {
              const intensity = Math.random();
              const colorClass = 
                intensity > 0.8 ? 'bg-green-500' :
                intensity > 0.6 ? 'bg-green-400' :
                intensity > 0.4 ? 'bg-green-300' :
                intensity > 0.2 ? 'bg-green-200' :
                'bg-gray-100';
              
              return (
                <div
                  key={i}
                  className={`h-3 w-3 rounded-sm ${colorClass}`}
                  title={`Day ${i + 1}`}
                />
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2 mt-4">
          <span className="text-xs text-gray-600">Less</span>
          <div className="flex space-x-1">
            <div className="h-3 w-3 bg-gray-100 rounded-sm"></div>
            <div className="h-3 w-3 bg-green-200 rounded-sm"></div>
            <div className="h-3 w-3 bg-green-300 rounded-sm"></div>
            <div className="h-3 w-3 bg-green-400 rounded-sm"></div>
            <div className="h-3 w-3 bg-green-500 rounded-sm"></div>
          </div>
          <span className="text-xs text-gray-600">More</span>
        </div>
      </div>
    </div>
  );
};

// Profile View
const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    institution: user?.institution || '',
    position: user?.position || '',
    bio: 'Passionate researcher focused on advancing knowledge in my field through rigorous peer review and collaboration.',
    website: 'https://university.edu/~researcher',
    twitter: '@researcher',
    linkedin: 'researcher-profile'
  });

  const handleSave = () => {
    // Save profile data
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg">
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="h-24 w-24 rounded-full border-4 border-white"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="pt-16 pb-6 px-8">
          <div className="flex justify-between items-start">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
              )}
              
              <div className="mt-2 space-y-1">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={profileData.position}
                      onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                      className="text-gray-600 border-b border-gray-300 focus:border-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      value={profileData.institution}
                      onChange={(e) => setProfileData({ ...profileData, institution: e.target.value })}
                      className="text-gray-600 border-b border-gray-300 focus:border-blue-500 outline-none"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-gray-600">{profileData.position}</p>
                    <p className="text-gray-600">{profileData.institution}</p>
                  </>
                )}
              </div>

              <div className="mt-4 flex items-center space-x-4">
                {user?.verified && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                )}
                {user?.orcid && (
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Link2 className="h-5 w-5" />
                    <span className="text-sm">ORCID Connected</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">About</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-600">{profileData.bio}</p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Research Fields</h3>
              <div className="flex flex-wrap gap-2">
                {user?.fields.map((field, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {field}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Review Stats</h3>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">
                  <span className="font-medium">{user?.reviewStats.completed}</span> reviews completed
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">{user?.reviewStats.avgTurnaround}</span> days avg. turnaround
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">{user?.reviewStats.rating}</span> average rating
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Contact & Links</h3>
              <div className="space-y-2">
                <a href={`mailto:${user?.email}`} className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </a>
                <a href={profileData.website} className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 rounded-full p-2">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Submitted a new paper</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-green-100 rounded-full p-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Completed review for "Machine Learning in Healthcare"</p>
              <p className="text-xs text-gray-500">5 days ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-amber-100 rounded-full p-2">
              <Star className="h-4 w-4 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Received 5-star review rating</p>
              <p className="text-xs text-gray-500">1 week ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings View
const SettingsView = () => {
  const [settings, setSettings] = useState({
    emailNotifications: {
      reviewRequests: true,
      paperUpdates: true,
      comments: true,
      newsletter: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showStats: true
    },
    review: {
      maxActiveReviews: '5',
      preferredTimeline: '2-weeks',
      autoDeclineAfter: '7'
    }
  });

  const updateEmailSetting = (key, value) => {
    setSettings({
      ...settings,
      emailNotifications: { ...settings.emailNotifications, [key]: value }
    });
  };

  const updatePrivacySetting = (key, value) => {
    setSettings({
      ...settings,
      privacy: { ...settings.privacy, [key]: value }
    });
  };

  const updateReviewSetting = (key, value) => {
    setSettings({
      ...settings,
      review: { ...settings.review, [key]: value }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and privacy settings</p>
      </div>

      {/* Email Notifications */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Review Requests</p>
              <p className="text-xs text-gray-500">Get notified when you're invited to review a paper</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications.reviewRequests}
              onChange={(e) => updateEmailSetting('reviewRequests', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Paper Updates</p>
              <p className="text-xs text-gray-500">Updates on your submitted papers</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications.paperUpdates}
              onChange={(e) => updateEmailSetting('paperUpdates', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Comments & Discussions</p>
              <p className="text-xs text-gray-500">Notifications about comments on your papers</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications.comments}
              onChange={(e) => updateEmailSetting('comments', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Newsletter</p>
              <p className="text-xs text-gray-500">Monthly updates about platform features and research trends</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications.newsletter}
              onChange={(e) => updateEmailSetting('newsletter', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </label>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Visibility
            </label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => updatePrivacySetting('profileVisibility', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="public">Public - Visible to everyone</option>
              <option value="researchers">Researchers Only</option>
              <option value="private">Private - Only visible to connections</option>
            </select>
          </div>

          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Show Email Address</p>
              <p className="text-xs text-gray-500">Display your email on your public profile</p>
            </div>
            <input
              type="checkbox"
              checked={settings.privacy.showEmail}
              onChange={(e) => updatePrivacySetting('showEmail', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Show Review Statistics</p>
              <p className="text-xs text-gray-500">Display your review count and ratings publicly</p>
            </div>
            <input
              type="checkbox"
              checked={settings.privacy.showStats}
              onChange={(e) => updatePrivacySetting('showStats', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </label>
        </div>
      </div>

      {/* Review Preferences */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Review Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Active Reviews
            </label>
            <select
              value={settings.review.maxActiveReviews}
              onChange={(e) => updateReviewSetting('maxActiveReviews', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="3">3 reviews</option>
              <option value="5">5 reviews</option>
              <option value="10">10 reviews</option>
              <option value="unlimited">Unlimited</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Review Timeline
            </label>
            <select
              value={settings.review.preferredTimeline}
              onChange={(e) => updateReviewSetting('preferredTimeline', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1-week">1 week</option>
              <option value="2-weeks">2 weeks</option>
              <option value="1-month">1 month</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auto-decline Requests After
            </label>
            <select
              value={settings.review.autoDeclineAfter}
              onChange={(e) => updateReviewSetting('autoDeclineAfter', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="3">3 days</option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h2>
        <div className="space-y-4">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            Download My Data
          </button>
          <div className="border-t pt-4">
            <button className="text-red-600 hover:text-red-700 font-medium text-sm">
              Delete Account
            </button>
            <p className="text-xs text-gray-500 mt-1">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save All Settings
        </button>
      </div>
    </div>
  );
};

// Main Layout Component
const MainLayout = () => {
  const { activeView } = useApp();

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'papers':
        return <MyPapers />;
      case 'review':
        return <ReviewPapers />;
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:ml-64">
        <Header />
        <main className="p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const { user, authStep } = useAuth();

  // Add relative time formatting
  useEffect(() => {
    Date.prototype.toRelativeTime = function() {
      const now = new Date();
      const diffInSeconds = Math.floor((now - this) / 1000);
      
      if (diffInSeconds < 60) return 'just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
      if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
      if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
      return `${Math.floor(diffInSeconds / 31536000)} years ago`;
    };
  }, []);

  if (!user || authStep !== 'authenticated') {
    if (authStep === 'login') return <LoginPage />;
    if (authStep === 'register') return <RegistrationPage />;
    return <LandingPage />;
  }

  return <MainLayout />;
};

// Root Component with Providers
export default function PeerReviewNetwork() {
  return (
    <AuthProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
  );
}