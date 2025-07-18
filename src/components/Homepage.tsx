import React from 'react';
import { 
  Leaf, 
  Shield, 
  BarChart3, 
  Globe, 
  CheckCircle, 
  Zap,
  Users,
  TrendingUp,
  Award,
  ArrowRight
} from 'lucide-react';

interface HomepageProps {
  setActiveTab: (tab: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({ setActiveTab }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              TrustCarbon
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              The world's most advanced blockchain-verified carbon tracking platform. 
              Monitor, verify, and trade carbon credits with unprecedented transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('Dashboard')}
                className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => setActiveTab('Marketplace')}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                Explore Marketplace
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose TrustCarbon?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with environmental responsibility 
            to create the most trusted carbon tracking ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Real-Time Monitoring
            </h3>
            <p className="text-gray-600">
              Track CO₂ emissions in real-time with GPS-verified location data and 
              blockchain-secured measurements for complete transparency.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Blockchain Verified
            </h3>
            <p className="text-gray-600">
              Every emission reading is cryptographically secured and verified on the blockchain, 
              ensuring data integrity and preventing fraud.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Advanced Analytics
            </h3>
            <p className="text-gray-600">
              Comprehensive analytics dashboard with real-time charts, trends, and 
              insights to optimize your carbon footprint.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Global Standards
            </h3>
            <p className="text-gray-600">
              Compliant with international carbon credit standards including VCS and 
              Gold Standard for worldwide recognition.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
              <CheckCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Automated Verification
            </h3>
            <p className="text-gray-600">
              Automated geofencing and location verification ensure only authorized 
              zones can generate verified carbon credits.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Instant Trading
            </h3>
            <p className="text-gray-600">
              Trade verified carbon credits instantly on our marketplace with 
              transparent pricing and secure transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Trusted by Organizations Worldwide
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of companies making a real impact on climate change
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-3xl font-bold mb-2">2,500+</div>
              <div className="text-gray-300">Active Companies</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold mb-2">1.2M</div>
              <div className="text-gray-300">Tons CO₂ Tracked</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold mb-2">450K</div>
              <div className="text-gray-300">Credits Traded</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-3xl font-bold mb-2">99.8%</div>
              <div className="text-gray-300">Verification Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How TrustCarbon Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple three-step process makes carbon tracking and trading accessible to everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-green-600">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Monitor Emissions
            </h3>
            <p className="text-gray-600">
              Enable GPS and set up authorized zones. Our sensors automatically track 
              CO₂ emissions with real-time verification.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Earn Credits
            </h3>
            <p className="text-gray-600">
              Verified emission reductions automatically generate carbon credits 
              secured on the blockchain for transparency.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Trade & Offset
            </h3>
            <p className="text-gray-600">
              Trade your credits on our marketplace or use them for carbon offset 
              programs to maximize environmental impact.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the carbon tracking revolution and start earning verified carbon credits today.
          </p>
          <button
            onClick={() => setActiveTab('Dashboard')}
            className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Start Tracking Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;