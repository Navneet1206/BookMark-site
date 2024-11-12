import React from 'react';
import { ExternalLink, Trash2, Edit } from 'lucide-react';
import type { Bookmark } from '../types';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
  onEdit: (bookmark: Bookmark) => void;
}

export function BookmarkCard({ bookmark, onDelete, onEdit }: BookmarkCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {bookmark.favicon ? (
            <img src={bookmark.favicon} alt="" className="w-6 h-6" />
          ) : (
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {bookmark.title}
            </h3>
            <p className="text-sm text-gray-500 truncate">{bookmark.url}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ExternalLink className="w-5 h-5 text-gray-600" />
          </a>
          <button
            onClick={() => onEdit(bookmark)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Edit className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(bookmark.id)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {bookmark.category}
        </span>
      </div>
    </div>
  );
}