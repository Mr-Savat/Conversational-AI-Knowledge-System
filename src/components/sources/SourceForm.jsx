// import React, { useState } from 'react';

// const SourceForm = ({ type, onSubmit, onCancel }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     url: '',
//   });
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleTextSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.content.trim()) {
//       setError('Content is required');
//       return;
//     }
    
//     setLoading(true);
//     setError(null);
    
//     const result = await onSubmit({
//       title: formData.title || 'Untitled',
//       type: 'text',
//       content: formData.content,
//     });
    
//     if (result.success) {
//       onCancel();
//     } else {
//       setError(result.error);
//     }
//     setLoading(false);
//   };

//   const handleFileSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file');
//       return;
//     }
    
//     setLoading(true);
//     setError(null);
    
//     const result = await onSubmit(file, formData.title || file.name);
    
//     if (result.success) {
//       onCancel();
//     } else {
//       setError(result.error);
//     }
//     setLoading(false);
//   };

//   const handleUrlSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.url) {
//       setError('URL is required');
//       return;
//     }
    
//     setLoading(true);
//     setError(null);
    
//     const result = await onSubmit(formData.url, formData.title);
    
//     if (result.success) {
//       onCancel();
//     } else {
//       setError(result.error);
//     }
//     setLoading(false);
//   };

//   const renderTextForm = () => (
//     <form onSubmit={handleTextSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Title <span className="text-gray-400 text-xs">(optional)</span>
//         </label>
//         <input
//           type="text"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//           placeholder="Enter a descriptive title"
//         />
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Content *
//         </label>
//         <textarea
//           value={formData.content}
//           onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//           required
//           rows={8}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
//           placeholder="Enter your text content here. This will be processed and stored in the knowledge base."
//         />
//       </div>
      
//       {error && (
//         <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//           ❌ {error}
//         </div>
//       )}
      
//       <div className="flex gap-3 pt-2">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={loading}
//           className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
//         >
//           {loading ? 'Processing...' : 'Add Knowledge'}
//         </button>
//       </div>
//     </form>
//   );

//   const renderFileForm = () => (
//     <form onSubmit={handleFileSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Title <span className="text-gray-400 text-xs">(optional)</span>
//         </label>
//         <input
//           type="text"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//           placeholder="Enter a descriptive title"
//         />
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           File *
//         </label>
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           required
//           accept=".pdf,.docx,.pptx,.txt,.md,.csv,.json"
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent file:mr-3 file:py-1 file:px-3 file:border-0 file:text-sm file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
//         />
//         <p className="mt-1 text-xs text-gray-500">
//           Supported: PDF, DOCX, PPTX, TXT, MD, CSV, JSON
//         </p>
//       </div>
      
//       {error && (
//         <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//           ❌ {error}
//         </div>
//       )}
      
//       <div className="flex gap-3 pt-2">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={loading}
//           className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
//         >
//           {loading ? 'Uploading...' : 'Upload File'}
//         </button>
//       </div>
//     </form>
//   );

//   const renderUrlForm = () => (
//     <form onSubmit={handleUrlSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Title <span className="text-gray-400 text-xs">(optional)</span>
//         </label>
//         <input
//           type="text"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//           placeholder="Enter a title (auto-detected if left blank)"
//         />
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           URL *
//         </label>
//         <input
//           type="url"
//           value={formData.url}
//           onChange={(e) => setFormData({ ...formData, url: e.target.value })}
//           required
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//           placeholder="https://example.com/article"
//         />
//       </div>
      
//       {error && (
//         <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//           ❌ {error}
//         </div>
//       )}
      
//       <div className="flex gap-3 pt-2">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={loading}
//           className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
//         >
//           {loading ? 'Crawling...' : 'Add URL'}
//         </button>
//       </div>
//     </form>
//   );

//   return (
//     <>
//       {type === 'text' && renderTextForm()}
//       {type === 'file' && renderFileForm()}
//       {type === 'url' && renderUrlForm()}
//     </>
//   );
// };

// export default SourceForm;
import React, { useState } from 'react';

const SourceForm = ({ type, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    url: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const result = await onSubmit({
      title: formData.title || 'Untitled',
      type: 'text',
      content: formData.content,
    });
    
    if (result.success) {
      onCancel();
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const result = await onSubmit(file, formData.title || file.name);
    
    if (result.success) {
      onCancel();
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!formData.url) {
      setError('URL is required');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const result = await onSubmit(formData.url, formData.title);
    
    if (result.success) {
      onCancel();
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const inputClasses = "w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-black/8 dark:border-white/8 rounded-xl text-[15px] text-[#1d1d1f] dark:text-white placeholder:text-[#8e8e93] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all";
  const labelClasses = "block text-[13px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1.5 ml-1 tracking-tight";

  const renderTextForm = () => (
    <form onSubmit={handleTextSubmit} className="space-y-5">
      <div>
        <label className={labelClasses}>
          Title <span className="text-[#8e8e93] font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={inputClasses}
          placeholder="Enter a descriptive title"
        />
      </div>
      
      <div>
        <label className={labelClasses}>
          Content
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={6}
          className={`${inputClasses} font-mono text-[13px] leading-relaxed resize-none`}
          placeholder="Enter your text content here..."
        />
      </div>
      
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[#ff453a] text-[13px] font-medium animate-in fade-in zoom-in-95">
          {error}
        </div>
      )}
      
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 cursor-pointer px-4 py-2.5 bg-black/5 dark:bg-white/8 rounded-xl text-[15px] font-semibold text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/12 active:scale-[0.98] transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 cursor-pointer px-4 py-2.5 bg-[#0071e3] text-white rounded-xl text-[15px] font-semibold hover:opacity-90 active:scale-[0.98] disabled:opacity-50 transition-all shadow-sm"
        >
          {loading ? 'Adding...' : 'Add Knowledge'}
        </button>
      </div>
    </form>
  );

  const renderFileForm = () => (
    <form onSubmit={handleFileSubmit} className="space-y-5">
      <div>
        <label className={labelClasses}>
          Title <span className="text-[#8e8e93] font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={inputClasses}
          placeholder="Enter a descriptive title"
        />
      </div>
      
      <div>
        <label className={labelClasses}>
          File
        </label>
        <div className="relative group">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
            accept=".pdf,.docx,.pptx,.txt,.md,.csv,.json"
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-dashed border-black/15 dark:border-white/15 rounded-xl text-[13px] text-[#8e8e93] file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[12px] file:font-semibold file:bg-[#0071e3] file:text-white hover:file:opacity-90 cursor-pointer"
          />
        </div>
        <p className="mt-2 text-[11px] text-[#8e8e93] ml-1">
          PDF, DOCX, PPTX, TXT, MD, CSV, JSON
        </p>
      </div>
      
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[#ff453a] text-[13px] font-medium">
          {error}
        </div>
      )}
      
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 cursor-pointer px-4 py-2.5 bg-black/5 dark:bg-white/8 rounded-xl text-[15px] font-semibold text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/12 active:scale-[0.98] transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 cursor-pointer px-4 py-2.5 bg-[#0071e3] text-white rounded-xl text-[15px] font-semibold shadow-sm active:scale-[0.98] transition-all"
        >
          {loading ? 'Uploading...' : 'Upload File'}
        </button>
      </div>
    </form>
  );

  const renderUrlForm = () => (
    <form onSubmit={handleUrlSubmit} className="space-y-5">
      <div>
        <label className={labelClasses}>
          Title <span className="text-[#8e8e93] font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={inputClasses}
          placeholder="Auto-detected if left blank"
        />
      </div>
      
      <div>
        <label className={labelClasses}>
          URL
        </label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
          className={inputClasses}
          placeholder="https://example.com/article"
        />
      </div>
      
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[#ff453a] text-[13px] font-medium">
          {error}
        </div>
      )}
      
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 cursor-pointer px-4 py-2.5 bg-black/5 dark:bg-white/8 rounded-xl text-[15px] font-semibold text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/12 active:scale-[0.98] transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 cursor-pointer px-4 py-2.5 bg-[#0071e3] text-white rounded-xl text-[15px] font-semibold shadow-sm active:scale-[0.98] transition-all"
        >
          {loading ? 'Crawling...' : 'Add URL'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      {type === 'text' && renderTextForm()}
      {type === 'file' && renderFileForm()}
      {type === 'url' && renderUrlForm()}
    </div>
  );
};

export default SourceForm;