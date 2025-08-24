import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Representation() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const location = useLocation();
  const responseData = location.state?.responseData;
  console.log("responseData in Representation.jsx:");
  console.log(responseData);
  // Sample data for charts
  const monthlyData = [
    { month: 'Jan', patients: 120, screenings: 95, treatments: 80 },
    { month: 'Feb', patients: 150, screenings: 120, treatments: 100 },
    { month: 'Mar', patients: 180, screenings: 145, treatments: 125 },
    { month: 'Apr', patients: 200, screenings: 165, treatments: 140 },
    { month: 'May', patients: 220, screenings: 180, treatments: 155 },
    { month: 'Jun', patients: 240, screenings: 195, treatments: 170 },
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.patients));

  // CSS-based pie chart data
  const genderData = [
    { label: 'Female', value: 45, color: '#10B981', offset: 0 },
    { label: 'Male', value: 35, color: '#3B82F6', offset: 45 },
    { label: 'Other', value: 20, color: '#EF4444', offset: 80 },
  ];

  const ageData = [
    { label: '0-20', value: 15, color: '#8B5CF6', offset: 0 },
    { label: '21-40', value: 35, color: '#10B981', offset: 15 },
    { label: '41-60', value: 30, color: '#F59E0B', offset: 50 },
    { label: '60+', value: 20, color: '#EF4444', offset: 80 },
  ];

  const channelData = [
    { label: 'Mobile App', value: 40, color: '#3B82F6', offset: 0 },
    { label: 'Web Portal', value: 30, color: '#10B981', offset: 40 },
    { label: 'Direct', value: 20, color: '#F59E0B', offset: 70 },
    { label: 'Referral', value: 10, color: '#EF4444', offset: 90 },
  ];

  // Create pie chart using conic gradient
  const createPieChart = (data) => {
    let cumulativePercent = 0;
    const gradientStops = data.map(item => {
      const start = cumulativePercent;
      cumulativePercent += item.value;
      return `${item.color} ${start}% ${cumulativePercent}%`;
    }).join(', ');

    return `conic-gradient(${gradientStops})`;
  };

  const getHeatmapColor = (value) => {
    if (value < 20) return '#1F2937';
    if (value < 40) return '#065F46';
    if (value < 60) return '#10B981';
    if (value < 80) return '#34D399';
    return '#6EE7B7';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">SightConnect Impact</h1>
        </div>
        <p className="text-gray-400">Comprehensive healthcare analytics dashboard</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors">
          <div className="text-4xl font-bold text-blue-400 mb-2">186k</div>
          <div className="text-gray-400 text-sm mb-3">Patients Onboarded</div>
          <div className="flex items-center gap-2">
            <div className="text-green-400 text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              +12.5%
            </div>
            <div className="text-xs text-gray-500">vs last month</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-500 transition-colors">
          <div className="text-2xl font-bold text-green-400 mb-2">3.86k</div>
          <div className="text-gray-400 text-sm mb-3">Active Screenings</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div className="bg-green-400 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
          <div className="text-xs text-gray-400">75% of target</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-colors">
          <div className="text-2xl font-bold text-purple-400 mb-2">2.39k</div>
          <div className="text-gray-400 text-sm mb-3">Treatments</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div className="bg-purple-400 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
          <div className="text-xs text-gray-400">60% of target</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-orange-500 transition-colors">
          <div className="text-2xl font-bold text-orange-400 mb-2">717</div>
          <div className="text-gray-400 text-sm mb-3">Referrals</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div className="bg-orange-400 h-2 rounded-full animate-pulse" style={{ width: '45%' }}></div>
          </div>
          <div className="text-xs text-gray-400">45% of target</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Accessing Channels Pie Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Accessing Channels</h3>
          <div className="flex justify-center mb-4">
            <div 
              className="w-32 h-32 rounded-full relative"
              style={{ background: createPieChart(channelData) }}
            >
              <div className="absolute inset-4 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">Total</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {channelData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-300">{item.label}</span>
                <span className="text-xs text-gray-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Gender Distribution</h3>
          <div className="flex justify-center mb-4">
            <div 
              className="w-32 h-32 rounded-full relative"
              style={{ background: createPieChart(genderData) }}
            >
              <div className="absolute inset-4 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">100%</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {genderData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-300">{item.label}</span>
                </div>
                <span className="text-sm text-gray-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Age Distribution */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Age Distribution</h3>
          <div className="flex justify-center mb-4">
            <div 
              className="w-32 h-32 rounded-full relative"
              style={{ background: createPieChart(ageData) }}
            >
              <div className="absolute inset-4 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">Age</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {ageData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-300">{item.label}</span>
                </div>
                <span className="text-xs text-gray-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">User Growth</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedTimeframe('month')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  selectedTimeframe === 'month' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Month
              </button>
              <button 
                onClick={() => setSelectedTimeframe('year')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  selectedTimeframe === 'year' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Year
              </button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {monthlyData.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex items-end gap-1 h-40">
                  <div 
                    className="bg-blue-500 w-6 rounded-t hover:bg-blue-400 transition-colors cursor-pointer"
                    style={{ height: `${(item.patients / maxValue) * 100}%` }}
                    title={`Patients: ${item.patients}`}
                  ></div>
                  <div 
                    className="bg-green-500 w-6 rounded-t hover:bg-green-400 transition-colors cursor-pointer"
                    style={{ height: `${(item.screenings / maxValue) * 100}%` }}
                    title={`Screenings: ${item.screenings}`}
                  ></div>
                  <div 
                    className="bg-purple-500 w-6 rounded-t hover:bg-purple-400 transition-colors cursor-pointer"
                    style={{ height: `${(item.treatments / maxValue) * 100}%` }}
                    title={`Treatments: ${item.treatments}`}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">{item.month}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-gray-300">Patients</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-300">Screenings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span className="text-gray-300">Treatments</span>
            </div>
          </div>
        </div>

        {/* Daily Registrations Heatmap */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Daily Registrations</h3>
          <div className="grid grid-cols-12 gap-1 mb-4">
            {Array.from({ length: 84 }, (_, i) => {
              const value = Math.floor(Math.random() * 100);
              return (
                <div
                  key={i}
                  className="aspect-square rounded cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: getHeatmapColor(value) }}
                  title={`Day ${i + 1}: ${value} registrations`}
                ></div>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              {[20, 40, 60, 80, 100].map((value) => (
                <div
                  key={value}
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: getHeatmapColor(value) }}
                ></div>
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400 mb-2">143</div>
          <div className="text-gray-400 text-sm mb-3">Daily Average</div>
          <div className="flex items-end gap-1 h-8">
            {[40, 65, 35, 80, 45, 70, 55].map((height, i) => (
              <div 
                key={i} 
                className="bg-blue-400 w-4 rounded-t hover:bg-blue-300 transition-colors cursor-pointer" 
                style={{ height: `${height}%` }}
                title={`Day ${i + 1}: ${height}%`}
              ></div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-green-400 mb-2">128</div>
          <div className="text-gray-400 text-sm mb-3">Weekly Target</div>
          <div className="flex items-end gap-1 h-8">
            {[50, 75, 45, 90, 55, 80, 65].map((height, i) => (
              <div 
                key={i} 
                className="bg-green-400 w-4 rounded-t hover:bg-green-300 transition-colors cursor-pointer" 
                style={{ height: `${height}%` }}
                title={`Week ${i + 1}: ${height}%`}
              ></div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-purple-400 mb-2">427</div>
          <div className="text-gray-400 text-sm mb-3">Monthly Goal</div>
          <div className="flex items-end gap-1 h-8">
            {[60, 85, 55, 100, 65, 90, 75].map((height, i) => (
              <div 
                key={i} 
                className="bg-purple-400 w-4 rounded-t hover:bg-purple-300 transition-colors cursor-pointer" 
                style={{ height: `${height}%` }}
                title={`Month ${i + 1}: ${height}%`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-white font-semibold">Bayes-ic</span>
          </div>
          <div className="text-sm text-gray-400">
            Made with <span className="text-red-500">♥</span> by the Bayes-ic Team
          </div>
        </div>
      </div>
    </div>
  );
}

export default Representation;