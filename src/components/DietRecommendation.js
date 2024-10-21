import React, { useState } from 'react';
import { FaHeartbeat, FaBrain, FaLungs, FaBone, FaAllergies, FaCapsules } from 'react-icons/fa';
import './DietRecommendation.css';

function DietRecommendation() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dietPlans = [
    'Increase fluid intake daily',
    'Avoid processed foods',
    'Include more fruits and vegetables',
  ];

  const healthCategories = [
    {
      title: 'Heart Health',
      icon: <FaHeartbeat />,
      recommendations: [
        'Do: Regular exercise',
        'Don\'t: Excessive salt intake',
        'Tip: Avoid fried food and sugary drinks.',
        'Emergency: Take Disprin if chest pain occurs.',
        'Exercise: Cardiovascular exercises like walking, swimming.',
      ],
    },
    {
      title: 'Skin Allergy',
      icon: <FaAllergies />,
      recommendations: [
        'Do: Use hypoallergenic skincare products.',
        'Don\'t: Use harsh chemical soaps.',
        'Tip: Avoid direct sunlight for long periods.',
      ],
    },
    {
      title: 'Bone Health',
      icon: <FaBone />,
      recommendations: [
        'Do: Increase calcium and Vitamin D intake.',
        'Don\'t: Avoid sedentary lifestyles.',
        'Tip: Weight-bearing exercises are great for bone strength.',
      ],
    },
    {
      title: 'Brain Health',
      icon: <FaBrain />,
      recommendations: [
        'Do: Engage in puzzles and mental exercises.',
        'Don\'t: Overindulge in screen time.',
        'Tip: Omega-3-rich foods like fish are beneficial for the brain.',
      ],
    },
    {
      title: 'Lung Health',
      icon: <FaLungs />,
      recommendations: [
        'Do: Practice deep breathing exercises.',
        'Don\'t: Smoke or expose yourself to pollutants.',
        'Tip: Include antioxidant-rich foods like berries.',
      ],
    },
    {
      title: 'Oncology',
      icon: <FaCapsules />,
      recommendations: [
        'Do: Follow a cancer prevention diet with antioxidants.',
        'Don\'t: Consume alcohol excessively.',
        'Tip: Include cruciferous vegetables like broccoli and kale.',
      ],
    },
  ];

  return (
    <div className="diet-recommendation">
      <h1>Diet Recommendations</h1>
      <div className="diet-plan-box">
        <h2>Your Diet Plan</h2>
        <ul>
          {dietPlans.map((plan, index) => (
            <li key={index}>{plan}</li>
          ))}
        </ul>
      </div>
      
      <h2>Health Categories</h2>
      <div className="health-category-container">
        {healthCategories.map((category, index) => (
          <div
            key={index}
            className="health-category-box"
            onClick={() => setSelectedCategory(category)}
          >
            {category.icon}
            <h3>{category.title}</h3>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="recommendations-box">
          <h2>{selectedCategory.title} Tips</h2>
          <ul>
            {selectedCategory.recommendations.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DietRecommendation;
