import React from 'react';
import { usePDFFiles } from '../../../../hooks/usePDFFiles';
import FormField from './FormField';

interface PDFSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function PDFSelector({ value, onChange, error }: PDFSelectorProps) {
  const { files, loading, error: fetchError } = usePDFFiles();

  if (loading) {
    return (
      <FormField label="PDF File">
        <div className="mt-1 flex justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
        </div>
      </FormField>
    );
  }

  const displayError = error || fetchError;

  return (
    <FormField label="PDF File" error={displayError}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      >
        <option value="">Select a PDF file</option>
        {files.length > 0 ? (
          files.map((file) => (
            <option key={file.url} value={file.url}>
              {file.name}
            </option>
          ))
        ) : (
          <option value="" disabled>No PDF files available</option>
        )}
      </select>
      {files.length === 0 && !error && (
        <p className="mt-1 text-sm text-gray-500">
          No PDF files found in storage. Please upload some files first.
        </p>
      )}
    </FormField>
  );
}