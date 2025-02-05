import React, { useState, useEffect } from 'react';
import { Send, Save, Trash2 } from 'lucide-react';
import type { RequestMethod } from '../types';

interface RequestPanelProps {
  request?: RequestMethod;
  onSend: (request: RequestMethod) => void;
  onSave: (request: RequestMethod) => void;
}

export function RequestPanel({ request: initialRequest, onSend, onSave }: RequestPanelProps) {
  const [method, setMethod] = useState<RequestMethod['method']>(initialRequest?.method || 'GET');
  const [url, setUrl] = useState(initialRequest?.url || '');
  const [headers, setHeaders] = useState<Record<string, string>>(initialRequest?.headers || {});
  const [body, setBody] = useState(initialRequest?.body || '');

  useEffect(() => {
    if (initialRequest) {
      setMethod(initialRequest.method);
      setUrl(initialRequest.url);
      setHeaders(initialRequest.headers);
      setBody(initialRequest.body || '');
    }
  }, [initialRequest]);
  
  const handleSend = () => {
    onSend({ method, url, headers, body });
  };

  const handleSave = () => {
    onSave({ method, url, headers, body });
  };

  return (
    <div className="bg-secondary-light border border-gray-800 rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex space-x-4">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as RequestMethod['method'])}
          className="px-4 py-2 bg-secondary border border-gray-700 rounded-md text-white font-mono focus:border-primary focus:ring-1 focus:ring-primary"
        >
          {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="flex-1 px-4 py-2 bg-secondary border border-gray-700 rounded-md text-white focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-300">Headers</h3>
        <div className="bg-secondary p-4 rounded-md">
          {Object.entries(headers).map(([key, value], index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={key}
                onChange={(e) => {
                  const newHeaders = { ...headers };
                  delete newHeaders[key];
                  newHeaders[e.target.value] = value;
                  setHeaders(newHeaders);
                }}
                placeholder="Key"
                className="flex-1 px-3 py-1 bg-secondary-light border border-gray-700 rounded-md text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setHeaders({ ...headers, [key]: e.target.value });
                }}
                placeholder="Value"
                className="flex-1 px-3 py-1 bg-secondary-light border border-gray-700 rounded-md text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={() => {
                  const newHeaders = { ...headers };
                  delete newHeaders[key];
                  setHeaders(newHeaders);
                }}
                className="p-1 text-gray-400 hover:text-primary"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={() => setHeaders({ ...headers, '': '' })}
            className="text-sm text-primary hover:text-primary-dark"
          >
            + Add Header
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-300">Request Body</h3>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter request body (JSON)"
          className="w-full h-40 px-4 py-2 bg-secondary border border-gray-700 rounded-md font-mono text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white border border-gray-700 rounded-md hover:bg-secondary flex items-center space-x-2"
        >
          <Save size={16} />
          <span>Save</span>
        </button>
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md flex items-center space-x-2"
        >
          <Send size={16} />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
}