import React from 'react';
import Select from 'react-select';
import { Search, X, ChevronDown } from 'lucide-react';

const SourceFilters = ({ filters, onFilterChange }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({ search: '', type: '', status: '' });
  };

  const hasActiveFilters = filters.search || filters.type || filters.status;

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'text', label: 'Text' },
    { value: 'document', label: 'Document' },
    { value: 'url', label: 'URL' },
    { value: 'faq', label: 'FAQ' },
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'processing', label: 'Processing' },
    { value: 'error', label: 'Error' },
  ];

  // Dynamic Styles for React-Select
  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'rgba(118, 118, 128, 0.12)',
      borderRadius: '10px',
      border: 'none',
      minHeight: '36px',
      height: '36px',
      boxShadow: 'none',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      // Dark mode handling within JS styles
      '@media (prefers-color-scheme: dark)': {
        backgroundColor: 'rgba(118, 118, 128, 0.24)',
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0 12px',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'inherit', // Inherits from Tailwind text color
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#8e8e93',
      paddingRight: '8px',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(25px) saturate(180%)',
      WebkitBackdropFilter: 'blur(25px) saturate(180%)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      border: '0.5px solid rgba(0,0,0,0.1)',
      overflow: 'hidden',
      padding: '4px',
      // Dark mode menu background
      '.dark &': {
        backgroundColor: 'rgba(44, 44, 46, 0.85)', // iOS Dark Elevated
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }
    }),
    option: (base, state) => ({
      ...base,
      fontSize: '14px',
      borderRadius: '8px',
      margin: '2px 0',
      backgroundColor: state.isSelected 
        ? '#007aff' 
        : state.isFocused ? 'rgba(0,0,0,0.05)' : 'transparent',
      color: state.isSelected ? 'white' : 'inherit',
      cursor: 'pointer',
      '.dark &': {
        backgroundColor: state.isSelected 
          ? '#0a84ff' 
          : state.isFocused ? 'rgba(255,255,255,0.1)' : 'transparent',
      }
    }),
  };

  return (
    <div className="flex flex-wrap items-center gap-3 font-[-apple-system,BlinkMacSystemFont,sans-serif] text-black dark:text-white">
      
      {/* 🔍 Search Input */}
      <div className="relative group">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8e8e93] dark:text-[#98989d]"
          strokeWidth={2}
        />
        <input
          type="text"
          placeholder="Search"
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="pl-9 pr-3 py-2 w-56 bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] border-none rounded-[10px] text-[14px] placeholder:text-[#8e8e93] dark:placeholder:text-[#98989d] focus:ring-2 focus:ring-[#007aff] dark:focus:ring-[#0a84ff] transition-all outline-none"
        />
      </div>

      {/* 📂 Type Select */}
      <div className="w-40">
        <Select
          options={typeOptions}
          value={typeOptions.find(opt => opt.value === filters.type)}
          onChange={(selected) => handleChange('type', selected?.value || '')}
          styles={customStyles}
          isSearchable={false}
          className="react-select-container"
          classNamePrefix="react-select"
          components={{ DropdownIndicator: () => <ChevronDown size={14} className="mr-2 text-[#8e8e93]" /> }}
        />
      </div>

      {/* 📊 Status Select */}
      <div className="w-40">
        <Select
          options={statusOptions}
          value={statusOptions.find(opt => opt.value === filters.status)}
          onChange={(selected) => handleChange('status', selected?.value || '')}
          styles={customStyles}
          isSearchable={false}
          components={{ DropdownIndicator: () => <ChevronDown size={14} className="mr-2 text-[#8e8e93]" /> }}
        />
      </div>

      {/* ❌ Clear Button */}
      {hasActiveFilters && (
    <button
    onClick={clearFilters}
    className="flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[#007aff] dark:text-[#0a84ff] hover:bg-[#007aff]/10 active:scale-95 rounded-full transition-all"
  >
    <span>Clear</span>
    <X size={14} strokeWidth={2.5} />
  </button>
      )}
    </div>
  );
};

export default SourceFilters;