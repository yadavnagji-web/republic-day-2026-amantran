
import React, { useRef, useEffect, useState } from 'react';
import { InvitationData } from '../types';

interface Props {
  data: InvitationData;
}

const InvitationPreview: React.FC<Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const drawCenteredWrappedText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines: number = 2) => {
    if (!text) return;
    const words = text.split(/\s+/);
    let lines = [];
    let currentLine = words[0] || '';

    for (let i = 1; i < words.length; i++) {
      let word = words[i];
      let width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);

    const visibleLines = lines.filter(l => l.trim().length > 0).slice(0, maxLines);
    visibleLines.forEach((line, index) => {
      ctx.fillText(line, x, y + (index * lineHeight));
    });
  };

  const drawInvitation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetWidth = 1200;
    const targetHeight = 1800;
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const templateImg = new Image();
    templateImg.src = data.templateImage || 'template.jpg'; 
    templateImg.crossOrigin = "anonymous";

    templateImg.onload = () => {
      setImageLoaded(true);
      setError(null);
      
      ctx.drawImage(templateImg, 0, 0, targetWidth, targetHeight);
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      // 1. विद्यालय का नाम (Heading)
      ctx.fillStyle = '#0a0a3c'; 
      ctx.font = 'bold 62px "Hind"'; 
      const maxHeaderWidth = targetWidth * 0.96; 
      drawCenteredWrappedText(ctx, data.vidhyalayName, targetWidth / 2, 105, maxHeaderWidth, 80);

      // 2. अतिथि का नाम - Slightly moved up (685 -> 678)
      if (data.guestName) {
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1e3a8a'; 
        ctx.font = '600 52px "Hind"';
        ctx.fillText(data.guestName, 310, 678, 800);
      }

      // 3. दिनांक (Date) 
      // User requested 1 space bar back from 580 -> 565
      ctx.textAlign = 'center';
      ctx.font = 'bold 56px "Hind"';
      ctx.fillStyle = '#b91c1c'; 
      const dateX = 565; 
      ctx.fillText(data.date, dateX, 1152, 300);

      // 4. समय (Time) 
      // User requested 2 space bars back from 945 -> 915
      const timeX = 915; 
      ctx.fillText(data.time, timeX, 1152);

      // 5. निवेदक (Sender) - 2 Lines, 94% Width
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff'; 
      ctx.font = 'bold 44px "Hind"';
      
      const maxNivedakWidth = targetWidth * 0.94; 
      const nivedakLineHeight = 62;
      const nivedakY = 1675; // Adjusted from 1685 to 1675
      
      drawCenteredWrappedText(ctx, data.nivedak, targetWidth / 2, nivedakY, maxNivedakWidth, nivedakLineHeight, 2);

      // 6. Website Credit - Added as per request
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; 
      ctx.font = '300 24px "Poppins"';
      ctx.fillText('www.creativeteacherstool.in', targetWidth / 2, 1775);
    };

    templateImg.onerror = () => {
      setImageLoaded(false);
      setError("Image error");
    };
  };

  useEffect(() => {
    document.fonts.ready.then(() => {
      drawInvitation();
    });
  }, [data]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Republic_Day_Amantran.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    <div id="preview-section" className="flex flex-col items-center gap-6 w-full animate-fade-in">
      <div className="bg-white p-2 rounded-2xl shadow-2xl border border-slate-200 w-full max-w-[480px] overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="w-full h-auto shadow-sm rounded-sm"
          style={{ aspectRatio: '1200/1800' }}
        />
      </div>
      
      <div className="flex flex-col gap-3 w-full max-w-[480px]">
        <button
          onClick={handleDownload}
          disabled={!imageLoaded}
          className="w-full flex items-center justify-center gap-3 font-bold py-5 px-8 rounded-2xl shadow-2xl transition-all transform hover:scale-[1.02] active:scale-95 bg-slate-900 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className="hindi-font text-xl font-bold">आमंत्रण कार्ड सेव करें</span>
        </button>
      </div>
    </div>
  );
};

export default InvitationPreview;
