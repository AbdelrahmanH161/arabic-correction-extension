import React, { useState } from 'react';
import './Popup.css';

// Placeholder mock corrections for demo
const MOCK_CORRECTIONS = [
  {
    id: 1,
    originalText: '...كان الطلاب يذهبون إلى المدرسة',
    correctedText: 'يذهبون',
    type: 'grammar' as const,
  },
  {
    id: 2,
    originalText: '...في المدينه القديمة',
    correctedText: 'المدينة',
    type: 'spelling' as const,
  },
];

const Popup = () => {
  const [activeTab, setActiveTab] = useState('corrections');
  const [isEnabled, setIsEnabled] = useState(true);
  const [wordCount] = useState(259);
  const [errorCount] = useState(3);

  // Tabs configuration
  const tabs = [
    { id: 'corrections', label: 'التصحيحات' },
    { id: 'language', label: 'اللغة' },
    { id: 'settings', label: 'الإعدادات' },
    { id: 'help', label: 'المساعدة' },
  ];

  // Handle correction actions
  const handleAcceptCorrection = (id: number) => {
    console.log('Accepted correction:', id);
  };

  const handleIgnoreCorrection = (id: number) => {
    console.log('Ignored correction:', id);
  };

  return (
    <div className="popup-container">
      {/* Header with switch */}
      <div className="popup-header">
        <h1>تصحيح</h1>
        <label className="switch">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={() => setIsEnabled(!isEnabled)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="content">
        {activeTab === 'corrections' && (
          <>
            {/* Statistics */}
            <div className="stats-card">
              <div className="stat">
                <span className="stat-label">عدد الكلمات</span>
                <span className="stat-value">{wordCount}</span>
              </div>
              <div className="stat">
                <span className="stat-label">الأخطاء</span>
                <div className="stat-value-with-badge">
                  <span className="stat-value">{errorCount}</span>
                  {errorCount > 0 && (
                    <span className="error-badge">{errorCount}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Corrections List */}
            <div className="corrections-list">
              {MOCK_CORRECTIONS.map((correction) => (
                <div key={correction.id} className="correction-item">
                  <div className="correction-header">
                    <span className={`correction-type ${correction.type}`}>
                      {correction.type === 'grammar' ? 'نحوي' : 'إملائي'}
                    </span>
                    <div className="correction-actions">
                      <button
                        className="accept-button"
                        onClick={() => handleAcceptCorrection(correction.id)}
                      >
                        قبول
                      </button>
                      <button
                        className="ignore-button"
                        onClick={() => handleIgnoreCorrection(correction.id)}
                      >
                        تجاهل
                      </button>
                    </div>
                  </div>
                  <p className="original-text">{correction.originalText}</p>
                  <p className="corrected-text">
                    التصحيح: <span>{correction.correctedText}</span>
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <span>الإصدار ١.٢.٠</span>
        <span>حول</span>
        <span>الإعدادات السريعة</span>
      </div>
    </div>
  );
};

export default Popup; 