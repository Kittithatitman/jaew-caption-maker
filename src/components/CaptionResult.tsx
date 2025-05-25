
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CaptionResultProps {
  caption: string;
}

const CaptionResult: React.FC<CaptionResultProps> = ({ caption }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
        <h3 className="text-lg font-semibold flex items-center">
          ✨ แคปชั่นที่สร้างขึ้นให้คุณ
        </h3>
      </div>
      
      <div className="p-6">
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-blue-500">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm">
            {caption}
          </p>
        </div>
        
        <button
          onClick={copyToClipboard}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {copied ? (
            <>
              <Check size={20} />
              <span>คัดลอกแล้ว!</span>
            </>
          ) : (
            <>
              <Copy size={20} />
              <span>คัดลอกแคปชั่น</span>
            </>
          )}
        </button>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          กดปุ่มเพื่อคัดลอกแคปชั่นไปโพสต์ในเฟสบุ๊ค
        </p>
      </div>
    </div>
  );
};

export default CaptionResult;
