'use client';

import { useState, useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface FileUploaderProps {
  onUploadSuccess: (url: string) => void;
  accept?: string;
  maxSize?: number; // in MB
}

export default function FileUploader({ onUploadSuccess, accept, maxSize = 10 }: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setError('');
    
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      setError(`Файл слишком большой. Максимальный размер: ${maxSize}MB`);
      return;
    }

    setIsUploading(true);
    setProgress(10);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Basic fetch doesn't support progress events natively without XHR or readable streams, 
      // but for local dev this is fine.
      setProgress(50);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Ошибка при загрузке сервера');
      }

      const data = await res.json();
      setProgress(100);
      
      if (data.success) {
        onUploadSuccess(data.url);
      } else {
        throw new Error(data.error || 'Ошибка при загрузке');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
      }, 500);
    }
  };

  return (
    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        accept={accept}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isUploading}
      />
      
      <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
        <UploadCloud className="w-10 h-10 text-foreground-muted" />
        <div className="text-sm font-medium">
          {isUploading ? `Загрузка... ${progress}%` : 'Нажмите или перетащите файл сюда'}
        </div>
        {maxSize && (
          <div className="text-xs text-foreground-muted">
            Максимальный размер: {maxSize}MB
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 text-sm text-danger bg-danger/10 p-2 rounded relative z-10">
          {error}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setError('');
            }}
            className="absolute right-2 top-2 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
