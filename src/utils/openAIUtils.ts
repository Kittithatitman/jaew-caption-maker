
export const generateCaption = async (
  apiKey: string,
  topic: string,
  tone: string,
  imageBase64?: string
): Promise<string> => {
  const messages: any[] = [
    {
      role: "system",
      content: `คุณเป็นผู้เชี่ยวชาญในการเขียนแคปชั่นภาษาไทยสำหรับโซเชียลมีเดีย โดยเฉพาะเฟสบุ๊ค ให้เขียนแคปชั่นที่น่าสนใจ เหมาะสมกับโทน "${tone}" และใช้อีโมจิให้เหมาะสม สร้างแคปชั่นที่มีความยาวประมาณ 2-4 ประโยค`
    },
    {
      role: "user",
      content: imageBase64 
        ? [
            {
              type: "text",
              text: `สร้างแคปชั่นในโทน "${tone}" สำหรับรูปภาพนี้${topic ? ` เกี่ยวกับหัวข้อ: ${topic}` : ''}`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        : `สร้างแคปชั่นในโทน "${tone}" สำหรับหัวข้อ: ${topic}`
    }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 300,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    throw new Error('การเชื่อมต่อ OpenAI ไม่สำเร็จ กรุณาตรวจสอบ API Key');
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
