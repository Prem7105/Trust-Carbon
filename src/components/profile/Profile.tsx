import React, { useState } from 'react';
import { User, Award, Image, QrCode, Edit, Calendar, MapPin, Mail, Building } from 'lucide-react';
import { Badge, NFT } from '../../types';

interface ProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    joinDate: string;
    totalProjects: number;
    totalTokens: number;
    verificationLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  };
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const badges: Badge[] = [
    {
      id: '1',
      name: 'First Project',
      description: 'Submitted your first carbon reduction project',
      icon: '🚀',
      earned: true,
      earnedDate: '2024-01-15',
      rarity: 'Common'
    },
    {
      id: '2',
      name: 'Eco Warrior',
      description: 'Verified 100+ emission readings',
      icon: '⚔️',
      earned: true,
      earnedDate: '2024-02-20',
      rarity: 'Rare'
    },
    {
      id: '3',
      name: 'Carbon Neutral',
      description: 'Offset 1000+ tons of CO₂',
      icon: '🌍',
      earned: false,
      rarity: 'Epic'
    },
    {
      id: '4',
      name: 'Green Pioneer',
      description: 'Top 1% of carbon credit earners',
      icon: '👑',
      earned: false,
      rarity: 'Legendary'
    }
  ];

  const nfts: NFT[] = [
    {
      id: '1',
      name: 'Carbon Offset Certificate #001',
      description: 'Your first verified carbon offset achievement',
      image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400',
      tokenId: '0x1a2b3c4d',
      contractAddress: '0x742d35Cc6634C0532925a3b8D',
      mintDate: '2024-01-15',
      attributes: [
        { trait_type: 'CO₂ Offset', value: '50 tons' },
        { trait_type: 'Project Type', value: 'Solar Energy' },
        { trait_type: 'Verification Level', value: 'Gold' }
      ]
    },
    {
      id: '2',
      name: 'Forest Guardian Badge',
      description: 'Contributed to forest conservation projects',
      image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400',
      tokenId: '0x5e6f7g8h',
      contractAddress: '0x742d35Cc6634C0532925a3b8D',
      mintDate: '2024-02-10',
      attributes: [
        { trait_type: 'Trees Planted', value: '100' },
        { trait_type: 'Forest Area', value: '5 hectares' },
        { trait_type: 'Biodiversity Score', value: '95' }
      ]
    }
  ];

  const generateQRCode = () => {
    const profileData = {
      id: user.id,
      name: user.name,
      verificationLevel: user.verificationLevel,
      totalTokens: user.totalTokens
    };
    return `https://trustcarbon.com/verify/${btoa(JSON.stringify(profileData))}`;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-600 bg-gray-100';
      case 'Rare': return 'text-blue-600 bg-blue-100';
      case 'Epic': return 'text-purple-600 bg-purple-100';
      case 'Legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getVerificationColor = (level: string) => {
    switch (level) {
      case 'Bronze': return 'text-orange-600 bg-orange-100';
      case 'Silver': return 'text-gray-600 bg-gray-100';
      case 'Gold': return 'text-yellow-600 bg-yellow-100';
      case 'Platinum': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700">
              <Edit className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 text-gray-600">
              <div className="flex items-center justify-center md:justify-start">
                <Mail className="w-4 h-4 mr-2" />
                {user.email}
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Joined {new Date(user.joinDate).toLocaleDateString()}
              </div>
            </div>
            <div className="mt-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getVerificationColor(user.verificationLevel)}`}>
                {user.verificationLevel} Member
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{user.totalProjects}</div>
              <div className="text-sm text-gray-600">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{user.totalTokens}</div>
              <div className="text-sm text-gray-600">Tokens</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'badges', label: 'Badges', icon: Award },
              { id: 'nfts', label: 'NFTs', icon: Image },
              { id: 'qr', label: 'QR Code', icon: QrCode }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
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
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Projects Submitted</span>
                <span className="font-semibold">{user.totalProjects}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Carbon Credits Earned</span>
                <span className="font-semibold">245</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">CO₂ Offset (tons)</span>
                <span className="font-semibold">1,250</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Verification Rate</span>
                <span className="font-semibold">94.2%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {badges.filter(badge => badge.earned).slice(0, 3).map(badge => (
                <div key={badge.id} className="flex items-center space-x-3">
                  <div className="text-2xl">{badge.icon}</div>
                  <div>
                    <p className="font-medium text-gray-900">{badge.name}</p>
                    <p className="text-sm text-gray-600">
                      Earned {new Date(badge.earnedDate!).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`bg-white rounded-xl shadow-sm p-6 ${
                badge.earned ? 'ring-2 ring-green-200' : 'opacity-60'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{badge.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{badge.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(badge.rarity)}`}>
                    {badge.rarity}
                  </span>
                  {badge.earned && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Earned
                    </span>
                  )}
                </div>
                {badge.earned && badge.earnedDate && (
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(badge.earnedDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'nfts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map(nft => (
            <div key={nft.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{nft.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{nft.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Token ID:</span>
                    <span className="font-mono text-gray-900">{nft.tokenId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Minted:</span>
                    <span className="text-gray-900">{new Date(nft.mintDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Attributes</h4>
                  <div className="space-y-1">
                    {nft.attributes.map((attr, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{attr.trait_type}:</span>
                        <span className="text-gray-900">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'qr' && (
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile QR Code</h3>
            <div className="bg-gray-100 p-8 rounded-lg mb-4">
              <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center">
                <QrCode className="w-32 h-32 text-gray-400" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Share this QR code to let others verify your carbon tracking achievements
            </p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-mono text-gray-700 break-all">
                {generateQRCode()}
              </p>
            </div>
            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Download QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;