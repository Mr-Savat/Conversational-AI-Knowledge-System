import React, { useState, useEffect } from 'react';
import {
  MessageSquare, Trash2, Plus, Loader2, Search,
  Settings, User, LogOut, ChevronDown, Brain,
  ChevronLeft, ChevronRight, PenSquare,
} from 'lucide-react';
import api from '../../services/api';
import { useAdminStore } from '../../store/adminStore';

const ChatSidebar = ({ onSelectConversation, currentConversationId, onNewChat }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { signOut, user } = useAdminStore();


  useEffect(() => { loadConversations(); }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await api.getConversations();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, conversationId) => {
    e.stopPropagation();
    if (!window.confirm('Delete this conversation?')) return;
    setDeletingId(conversationId);
    try {
      await api.deleteConversation(conversationId);
      setConversations(prev => prev.filter(c => c.id !== conversationId));
      if (currentConversationId === conversationId) onNewChat();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Failed to delete conversation');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupConversations = () => {
    const groups = { today: [], yesterday: [], older: [] };
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    filteredConversations.forEach(conv => {
      const convDate = new Date(conv.updated_at);
      if (convDate.toDateString() === today.toDateString()) groups.today.push(conv);
      else if (convDate.toDateString() === yesterday.toDateString()) groups.yesterday.push(conv);
      else groups.older.push(conv);
    });
    return groups;
  };

  const conversationGroups = groupConversations();

  if (!expanded) {
    return (
      <div className="flex flex-col items-center h-full w-14 shrink-0 py-3 gap-2 border-r border-black/[0.07] dark:border-white/[0.07] bg-[#fafafc]/95 dark:bg-[#1c1c1e]/95 backdrop-blur-xl">

        {/* Logo/Icon at top */}
        <div className="w-7 h-7 rounded-[7px] bg-[#0071e3] flex items-center justify-center shrink-0">
          <Brain size={15} className="text-white" strokeWidth={1.8} />
        </div>

        {/* Action Buttons Container */}
        <div className="flex flex-col items-center gap-1.5 bg-black/4 dark:bg-white/6 rounded-2xl p-1.5">
          {/* Expand Button */}
          <button
            onClick={() => setExpanded(true)}
            title="Expand sidebar"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-[#1d1d1f] dark:text-white/80 hover:bg-white/60 dark:hover:bg-white/10 transition-all active:scale-95"
          >
            <ChevronRight size={16} strokeWidth={1.6} />
          </button>

          {/* New Chat Button */}
          <button
            onClick={onNewChat}
            title="New conversation"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-[#1d1d1f] dark:text-white/80 hover:bg-white/60 dark:hover:bg-white/10 transition-all active:scale-95"
          >
            <PenSquare size={15} strokeWidth={1.6} />
          </button>
        </div>

        {/* Optional: User avatar at bottom */}
        <div className="mt-auto mb-3">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#0071e3] to-[#34aadc] flex items-center justify-center">
            <User size={12} className="text-white" strokeWidth={1.8} />
          </div>
        </div>
      </div>
    );
  }

  // EXPANDED VIEW 
  return (
    <div className="flex flex-col h-full w-65 shrink-0
      border-r border-black/[0.07] dark:border-white/[0.07]
      bg-[#fafafc]/95 dark:bg-[#1c1c1e]/95
      backdrop-blur-xl overflow-hidden">

      {/* Header */}
      <div className="px-3 pt-4 pb-3 border-b border-black/[0.07] dark:border-white/[0.07] shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[7px] bg-[#0071e3] flex items-center justify-center shrink-0">
              <Brain size={15} className="text-white" strokeWidth={1.8} />
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.02em]
              text-[#1d1d1f] dark:text-white whitespace-nowrap">
              RAG System
            </span>
          </div>
          <button
            onClick={() => setExpanded(false)}
            className="w-7 h-7 min-w-7 rounded-[7px] flex items-center justify-center
              text-[#8e8e93] cursor-pointer hover:bg-black/6 dark:hover:bg-white/8 transition-colors"
          >
            <ChevronLeft size={15} strokeWidth={1.6} />
          </button>
        </div>

        <button
          onClick={onNewChat}
          className="w-full cursor-pointer flex items-center justify-center gap-1.5 px-3 py-2
            bg-[#0071e3] hover:opacity-90 active:scale-[0.98]
            text-white rounded-[10px] text-[13px] font-medium
            tracking-[-0.01em] transition-all mb-2.5"
        >
          <Plus size={14} strokeWidth={2} />
          <span>New Conversation</span>
        </button>

        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8e8e93]"
            strokeWidth={1.8} />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-7 pr-3 py-1.75
              bg-black/5 dark:bg-white/[0.07]
              border border-black/8 dark:border-white/8
              rounded-[9px] text-[13px] tracking-[-0.01em]
              text-[#1d1d1f] dark:text-white
              placeholder:text-[#8e8e93]
              focus:bg-white dark:focus:bg-white/12
              focus:border-[#0071e3]/40 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 size={20} className="animate-spin text-[#8e8e93]" />
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare size={24} className="mx-auto mb-2 text-[#8e8e93]/40" />
            <p className="text-[12px] text-[#8e8e93]">No conversations yet</p>
          </div>
        ) : (
          Object.entries(conversationGroups).map(([key, items]) =>
            items.length > 0 && (
              <div key={key}>
                <p className="px-3.5 py-1 text-[11px] font-medium tracking-[0.03em] uppercase text-[#8e8e93]">
                  {key === 'today' ? 'Today' : key === 'yesterday' ? 'Yesterday' : 'Previous'}
                </p>
                {items.map(conv => (
                  <ConversationItem
                    key={conv.id}
                    conv={conv}
                    isActive={currentConversationId === conv.id}
                    onSelect={onSelectConversation}
                    onDelete={handleDelete}
                    isDeleting={deletingId === conv.id}
                  />
                ))}
              </div>
            )
          )
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-black/[0.07] dark:border-white/[0.07] p-2 shrink-0 relative">
        {showUserMenu && (
          <div className="absolute bottom-full left-2 right-2 mb-1.5
      bg-white dark:bg-[#2c2c2e]
      rounded-xl border border-black/10 dark:border-white/10
      shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden z-10">
            <button
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5
          text-[13px] text-[#1d1d1f] dark:text-white
          tracking-[-0.01em] hover:bg-black/4 dark:hover:bg-white/6
          transition-colors cursor-pointer"
            >
              <User size={14} strokeWidth={1.6} /> Profile
            </button>
            <button
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5
          text-[13px] text-[#1d1d1f] dark:text-white
          tracking-[-0.01em] hover:bg-black/4 dark:hover:bg-white/6
          transition-colors cursor-pointer"
            >
              <Settings size={14} strokeWidth={1.6} /> Settings
            </button>
            <div className="h-px bg-black/[0.07] dark:bg-white/[0.07] my-0.5" />
            <button
              onClick={async () => {
                await signOut();
                window.location.href = '/auth';
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5
          text-[13px] text-[#ff3b30] tracking-[-0.01em] cursor-pointer
          hover:bg-black/4 dark:hover:bg-white/6 transition-colors"
            >
              <LogOut size={14} strokeWidth={1.6} /> Sign Out
            </button>
          </div>
        )}
        <button
          onClick={() => setShowUserMenu(p => !p)}
          className="w-full flex items-center gap-2.5 p-2 rounded-[9px]
          hover:bg-black/4 dark:hover:bg-white/6 transition-colors cursor-pointer"
        >
          <div className="w-7.5 h-7.5 min-w-7.5 rounded-full
            bg-linear-to-br from-[#0071e3] to-[#34aadc]
            flex items-center justify-center
            text-[11px] font-semibold text-white tracking-[0.02em]">
            {user?.user_metadata?.name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-[13px] font-medium text-[#1d1d1f] dark:text-white
        tracking-[-0.01em] truncate">
              {user?.user_metadata?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-[11px] text-[#8e8e93] mt-px">
              {user?.user_metadata?.role === 'admin' ? 'Admin' : 'User'}
            </p>
          </div>
          <ChevronDown
            size={13}
            strokeWidth={1.8}
            className={`text-[#8e8e93] shrink-0 transition-transform duration-200 ${showUserMenu ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

const ConversationItem = ({ conv, isActive, onSelect, onDelete, isDeleting }) => (
  <div
    onClick={() => onSelect(conv.id, conv.title)}
    className={`group flex items-center gap-2.5 px-2.5 py-1.75 mx-1.5 mb-px
      rounded-[9px] cursor-pointer transition-colors ${isActive
        ? 'bg-[#0071e3]/8 dark:bg-[#0071e3]/15'
        : 'hover:bg-black/4 dark:hover:bg-white/6'
      }`}
  >
    <div className={`w-7 h-7 min-w-7 rounded-[7px] flex items-center justify-center ${isActive ? 'bg-[#0071e3]/12' : 'bg-black/5 dark:bg-white/[0.07]'
      }`}>
      <MessageSquare size={13} strokeWidth={1.6}
        className={isActive ? 'text-[#0071e3]' : 'text-[#8e8e93]'} />
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-[13px] tracking-[-0.01em] truncate ${isActive
        ? 'font-medium text-[#0071e3]'
        : 'font-normal text-[#1d1d1f] dark:text-white/90'
        }`}>
        {conv.title || 'New Conversation'}
      </p>
      <p className="text-[11px] text-[#8e8e93] mt-px">{conv.message_count || 0} messages</p>
    </div>
    <button
      onClick={e => onDelete(e, conv.id)}
      disabled={isDeleting}
      className="opacity-0 group-hover:opacity-100 w-6 h-6 min-w-6
        rounded-md flex items-center justify-center cursor-pointer
        text-[#8e8e93] hover:bg-[#ff3b30]/10 hover:text-[#ff3b30] transition-all"
    >
      {isDeleting
        ? <Loader2 size={12} className="animate-spin" />
        : <Trash2 size={12} strokeWidth={1.8} />}
    </button>
  </div>
);

export default ChatSidebar;