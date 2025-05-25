
import React, { useState, useEffect } from 'react';
import { Sparkles, Key, AlertCircle } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';
import ToneSelector from '../components/ToneSelector';
import LoadingAnimation from '../components/LoadingAnimation';
import CaptionResult from '../components/CaptionResult';
import { generateCaption } from '../utils/openAIUtils';
import { fileToBase64 } from '../utils/imageUtils';

const Index = () => {
  const [topic, setTopic] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedTone, setSelectedTone] = useState('รีวิว');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const saveApiKey = () => {
    localStorage.setItem('openai_api_key', apiKey);
    setShowApiKey(false);
    alert('บันทึก API Key สำเร็จ!');
  };

  const handleGenerateCaption = async () => {
    if (!apiKey.trim()) {
      setError('กรุณาใส่ OpenAI API Key');
      return;
    }

    if (!topic.trim() && !selectedImage) {
      setError('กรุณาใส่หัวข้อหรืออัปโหลดรูปภาพ');
      return;
    }

    setLoading(true);
    setError('');
    setCaption('');

    try {
      let imageBase64;
      if (selectedImage) {
        imageBase64 = await fileToBase64(selectedImage);
      }

      const generatedCaption = await generateCaption(
        apiKey,
        topic,
        selectedTone,
        imageBase64
      );
      
      setCaption(generatedCaption);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการสร้างแคปชั่น');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center space-x-2">
              <Sparkles className="text-blue-500" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                แคปชั่นแจ๋ว
              </span>
            </h1>
            <p className="text-gray-600 mt-2">
              สร้างแคปชั่นเจ๋งๆ สำหรับโพสต์เฟสบุ๊คของคุณ ด้วย AI
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
              สร้างแคปชั่นของคุณ
            </h2>

            {/* Topic Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                หัวข้อหรือเรื่องที่ต้องการเขียน
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="เช่น: ไปเที่ยวเชียงใหม่, กินข้าวที่ร้านใหม่, รีวิวหนัง..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* Image Upload */}
            <ImageUpload 
              selectedImage={selectedImage}
              onImageChange={setSelectedImage}
            />

            {/* Tone Selector */}
            <ToneSelector 
              selectedTone={selectedTone}
              onToneChange={setSelectedTone}
            />

            {/* API Key Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  OpenAI API Key
                </label>
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  {showApiKey ? 'ซ่อน' : 'แสดง/แก้ไข'}
                </button>
              </div>
              
              {showApiKey && (
                <div className="space-y-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={saveApiKey}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Key size={16} />
                    <span>บันทึก API Key</span>
                  </button>
                </div>
              )}
              
              {apiKey && !showApiKey && (
                <div className="text-xs text-green-600 flex items-center space-x-1">
                  <Key size={14} />
                  <span>API Key ถูกบันทึกแล้ว</span>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                <AlertCircle className="text-red-500 mt-0.5" size={16} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerateCaption}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              <Sparkles size={20} />
              <span>{loading ? 'กำลังสร้าง...' : 'สร้างแคปชั่นเจ๋งๆ'}</span>
            </button>
          </div>

          {/* Result Area */}
          <div className="space-y-6">
            {loading && <LoadingAnimation />}
            
            {caption && !loading && (
              <CaptionResult caption={caption} />
            )}

            {!loading && !caption && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  พร้อมสร้างแคปชั่นแจ๋วแล้ว!
                </h3>
                <p className="text-gray-600">
                  ใส่หัวข้อหรืออัปโหลดรูปภาพ เลือกโทนที่ต้องการ<br />
                  แล้วกดสร้างแคปชั่นได้เลย
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            สร้างด้วย ❤️ เพื่อคนไทยทุกคน | ใช้ OpenAI GPT-4o-mini
          </p>
          <p className="text-xs text-gray-400 mt-1">
            API Key จะถูกเก็บในเครื่องของคุณเท่านั้น เราไม่เก็บข้อมูลใดๆ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
