import React, { useState } from 'react';
import { Gift, Coins, ShoppingCart, Star, Filter, Search } from 'lucide-react';
import { Reward } from '../../types';

interface RewardsProps {
  userTokens: number;
}

const Rewards: React.FC<RewardsProps> = ({ userTokens }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const rewards: Reward[] = [
    {
      id: '1',
      name: 'Eco-Friendly Water Bottle',
      description: 'Stainless steel water bottle made from recycled materials',
      cost: 50,
      category: 'Physical',
      image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      stock: 25
    },
    {
      id: '2',
      name: 'Tree Planting Certificate',
      description: 'Plant 10 trees in your name in reforestation projects',
      cost: 100,
      category: 'Donation',
      image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      stock: 100
    },
    {
      id: '3',
      name: 'Carbon Footprint NFT',
      description: 'Unique digital artwork representing your carbon impact',
      cost: 75,
      category: 'Digital',
      image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true
    },
    {
      id: '4',
      name: 'Eco-Tour Experience',
      description: 'Guided tour of renewable energy facilities',
      cost: 200,
      category: 'Experience',
      image: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      stock: 5
    },
    {
      id: '5',
      name: 'Solar Power Bank',
      description: 'Portable solar-powered device charger',
      cost: 80,
      category: 'Physical',
      image: 'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      stock: 15
    },
    {
      id: '6',
      name: 'Ocean Cleanup Donation',
      description: 'Support ocean plastic removal projects',
      cost: 60,
      category: 'Donation',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true
    },
    {
      id: '7',
      name: 'Premium Dashboard Access',
      description: 'Advanced analytics and reporting features for 1 year',
      cost: 120,
      category: 'Digital',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true
    },
    {
      id: '8',
      name: 'Sustainable Workshop',
      description: 'Virtual workshop on sustainable living practices',
      cost: 40,
      category: 'Experience',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      stock: 20
    }
  ];

  const categories = ['All', 'Physical', 'Digital', 'Experience', 'Donation'];

  const filteredRewards = rewards.filter(reward => {
    const matchesCategory = selectedCategory === 'All' || reward.category === selectedCategory;
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRedeem = (reward: Reward) => {
    if (userTokens >= reward.cost) {
      alert(`Successfully redeemed: ${reward.name}!`);
    } else {
      alert(`Insufficient tokens. You need ${reward.cost - userTokens} more tokens.`);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Physical': return '📦';
      case 'Digital': return '💻';
      case 'Experience': return '🎯';
      case 'Donation': return '🌱';
      default: return '🎁';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Rewards Store</h1>
          <div className="flex items-center bg-green-100 px-4 py-2 rounded-lg">
            <Coins className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-semibold text-green-800">{userTokens} Tokens</span>
          </div>
        </div>
        <p className="text-gray-600">
          Redeem your earned tokens for eco-friendly rewards and experiences
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search rewards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Token Earning Tips */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          How to Earn More Tokens
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold">1</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Submit Projects</p>
              <p className="text-sm text-gray-600">Earn 10-50 tokens per approved project</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Verify Emissions</p>
              <p className="text-sm text-gray-600">Earn 1-5 tokens per verified reading</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold">3</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Daily Check-ins</p>
              <p className="text-sm text-gray-600">Earn 2 tokens per day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRewards.map(reward => (
          <div key={reward.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={reward.image}
                alt={reward.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium">
                  {getCategoryIcon(reward.category)} {reward.category}
                </span>
              </div>
              {reward.stock && reward.stock <= 10 && (
                <div className="absolute top-3 right-3">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Only {reward.stock} left
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{reward.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{reward.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Coins className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-bold text-gray-900">{reward.cost}</span>
                </div>
                
                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={userTokens < reward.cost || !reward.available}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    userTokens >= reward.cost && reward.available
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  {userTokens >= reward.cost ? 'Redeem' : 'Insufficient'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRewards.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No rewards found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Rewards;