
import React from 'react';

interface ToneSelectorProps {
  selectedTone: string;
  onToneChange: (tone: string) => void;
}

const tones = [
  { value: 'รีวิว', label: '📝 รีวิว', description: 'แบบรีวิวสินค้า สถานที่ หรือประสบการณ์' },
  { value: 'เล่าเรื่อง', label: '📖 เล่าเรื่อง', description: 'แบบเล่าเรื่องราวหรือประสบการณ์' },
  { value: 'ตลก', label: '😄 ตลก', description: 'แบบขำขัน เฮฮา สนุกสนาน' },
  { value: 'แมวส์', label: '😸 แมวส์', description: 'แบบน่ารัก อ่อนหวาน เซ็นท์แมวส์' },
  { value: 'จริงจัง', label: '🎯 จริงจัง', description: 'แบบเป็นทางการ จริงจัง มีน้ำหนัก' },
  { value: 'แรงบันดาลใจ', label: '💪 แรงบันดาลใจ', description: 'แบบให้กำลังใจ สร้างแรงบันดาลใจ' },
  { value: 'ประชาสัมพันธ์', label: '📢 ประชาสัมพันธ์', description: 'แบบโปรโมท ขายของ แนะนำสินค้า' },
  { value: 'โนสตัลเจีย', label: '💭 โนสตัลเจีย', description: 'แบบถอนหลังไปในอดีต ความทรงจำ' }
];

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onToneChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        โทนการเขียนที่ต้องการ
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {tones.map((tone) => (
          <div
            key={tone.value}
            onClick={() => onToneChange(tone.value)}
            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
              selectedTone === tone.value
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="font-medium text-sm">{tone.label}</div>
            <div className="text-xs text-gray-600 mt-1">{tone.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;
