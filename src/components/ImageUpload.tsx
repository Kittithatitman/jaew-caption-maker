
import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { resizeImage } from '../utils/imageUtils';

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  selectedImage: File | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, selectedImage }) => {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      try {
        const resizedFile = await resizeImage(file);
        onImageChange(resizedFile);
        
        const preview = URL.createObjectURL(resizedFile);
        setImagePreview(preview);
      } catch (error) {
        console.error('Error resizing image:', error);
      }
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, []);

  const removeImage = () => {
    onImageChange(null);
    setImagePreview(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        อัปโหลดรูปภาพ (ไม่บังคับ)
      </label>
      
      {imagePreview ? (
        <div className="relative">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">
            <span className="font-medium text-blue-600">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวางที่นี่
          </p>
          <p className="text-xs text-gray-500 mt-2">
            รองรับไฟล์ JPG, PNG (รูปจะถูกย่อขนาดเป็น 350x350 พิกเซล)
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
