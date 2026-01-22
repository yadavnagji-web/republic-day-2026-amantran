
import React, { useState } from 'react';
import InvitationForm from './components/InvitationForm';
import InvitationPreview from './components/InvitationPreview';
import { InvitationData } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<InvitationData>({
    vidhyalayName: 'कार्यालय राजकीय वरिष्ठ उपाध्याय संस्कृत विद्यालय कुंआ, जिला-डूंगरपुर (राज.)',
    guestName: '',
    date: '26 जनवरी 2026',
    time: '8',
    nivedak: 'प्रधानाचार्य एवं समस्त विद्यालय परिवार, एस.एम.सी व एस.डी.एम.सी. सदस्य\nराजकीय वरिष्ठ उपाध्याय संस्कृत विद्यालय कुंआ',
    templateImage: localStorage.getItem('rd_template_b64') || undefined
  });

  const handleUpdate = (newData: InvitationData) => {
    setFormData(newData);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // Function to load template from link
  const loadTemplateFromLink = async () => {
    setLoading(true);
    try {
      // Using direct link for Google Drive file
      const fileId = '14QzTFE0Ad2WVOqi1gkPc8w2AnKBfHYD3';
      const directUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
      
      // Fetch the image and convert to base64 to ensure it works on canvas without CORS issues later
      const response = await fetch(directUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const b64 = reader.result as string;
        setFormData(prev => ({ ...prev, templateImage: b64 }));
        localStorage.setItem('rd_template_b64', b64);
        setLoading(false);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error loading template:", error);
      alert("टेम्पलेट लोड करने में समस्या आई। कृपया इंटरनेट कनेक्शन जाँचें या अपना खुद का अपलोड करें।");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <header className="max-w-4xl mx-auto mb-8 text-center">
        <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
          गणतंत्र दिवस 2026
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2 hindi-font">गणतंत्र दिवस आमंत्रण कार्ड</h1>
        <p className="text-slate-500 hindi-font text-lg">सरल 3 चरणों में अपना कार्ड तैयार करें</p>
        
        {/* Step Indicator */}
        <div className="flex items-center justify-center mt-8 gap-2 md:gap-4">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                step === s ? 'bg-orange-500 text-white scale-110 shadow-lg' : 
                step > s ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {step > s ? '✓' : s}
              </div>
              {s < 3 && <div className={`h-1 w-8 md:w-16 rounded ${step > s ? 'bg-green-500' : 'bg-slate-200'}`} />}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between max-w-[320px] md:max-w-[440px] mx-auto mt-2 text-[10px] md:text-xs font-bold text-slate-400 hindi-font">
          <span className={step >= 1 ? 'text-orange-600' : ''}>टेम्पलेट सेटअप</span>
          <span className={step >= 2 ? 'text-orange-600' : ''}>विवरण भरें</span>
          <span className={step >= 3 ? 'text-orange-600' : ''}>कार्ड डाउनलोड</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto">
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-100">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-slate-800 hindi-font">चरण 1: टेम्पलेट तैयार करें</h2>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-left">
                  <p className="text-blue-800 font-bold mb-2 hindi-font">प्रक्रिया (Instructions):</p>
                  <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1 hindi-font leading-relaxed">
                    <li>"टेम्पलेट लोड करें" बटन दबाएं ताकि मुख्य कार्ड डिज़ाइन अपने आप लोड हो जाए।</li>
                    <li>टेम्पलेट लोड होने के बाद 'आगे बढ़ें' पर क्लिक करें।</li>
                    <li>अगले चरण में विद्यालय का नाम, अतिथि और समय की जानकारी भरें।</li>
                    <li>अंतिम चरण में अपना कार्ड प्रीव्यू करें और डाउनलोड करें।</li>
                  </ol>
                </div>
                
                <div className="flex flex-col gap-4 justify-center py-6">
                  <button
                    onClick={loadTemplateFromLink}
                    disabled={loading}
                    className={`px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg border-2 ${
                      formData.templateImage ? 'bg-green-50 border-green-500 text-green-700' : 'bg-orange-500 border-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="hindi-font text-lg">
                      {formData.templateImage ? 'टेम्पलेट लोड हो गया (Link से)' : 'टेम्पलेट लोड करें (Link से)'}
                    </span>
                  </button>

                  <div className="relative">
                    <input
                      type="file"
                      id="template-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const b64 = reader.result as string;
                            setFormData(prev => ({ ...prev, templateImage: b64 }));
                            localStorage.setItem('rd_template_b64', b64);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <label 
                      htmlFor="template-upload"
                      className="cursor-pointer text-slate-500 hover:text-slate-800 text-sm underline hindi-font"
                    >
                      या अपनी कोई अन्य फोटो अपलोड करें
                    </label>
                  </div>
                </div>

                {formData.templateImage && (
                  <div className="mt-4 animate-bounce">
                    <button 
                      onClick={nextStep}
                      className="bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-xl shadow-xl hover:bg-orange-700 transition-all active:scale-95 hindi-font"
                    >
                      आगे बढ़ें →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <InvitationForm 
                initialData={formData} 
                onUpdate={handleUpdate} 
                onBack={prevStep} 
                onNext={nextStep}
              />
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in flex flex-col items-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 hindi-font text-center">चरण 3: आपका आमंत्रण कार्ड तैयार है</h2>
              <InvitationPreview data={formData} />
              <button 
                onClick={prevStep}
                className="mt-8 text-slate-400 hover:text-slate-600 font-bold underline cursor-pointer hindi-font"
              >
                ← वापस जाकर सुधार करें
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-12 text-center text-slate-400 text-sm pb-8 hindi-font">
        © 2026 आमंत्रण कार्ड निर्माता - राष्ट्र प्रथम
      </footer>
    </div>
  );
};

export default App;
