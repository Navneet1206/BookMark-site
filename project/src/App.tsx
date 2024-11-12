import React, { useState, useEffect } from "react";
import { BookmarkPlus, Search, Bookmark as BookmarkIcon } from "lucide-react";
import { BookmarkCard } from "./components/BookmarkCard";
import { AddBookmarkForm } from "./components/AddBookmarkForm";
import type { Bookmark } from "./types";

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleAddBookmark = (
    newBookmark: Omit<Bookmark, "id" | "createdAt">
  ) => {
    const bookmark: Bookmark = {
      ...newBookmark,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      favicon: `https://www.google.com/s2/favicons?domain=${
        new URL(newBookmark.url).hostname
      }`,
    };
    setBookmarks([bookmark, ...bookmarks]);
    setShowAddForm(false);
  };

  const handleDeleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  const handleEditBookmark = (bookmark: Bookmark) => {
    // TODO: Implement edit functionality
    console.log("Edit bookmark:", bookmark);
  };

  const categories = ["all", ...new Set(bookmarks.map((b) => b.category))];

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || bookmark.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookmarkIcon className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Bookmark Manager
              </h1>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <BookmarkPlus className="w-5 h-5 mr-2" />
              Add Bookmark
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              onDelete={handleDeleteBookmark}
              onEdit={handleEditBookmark}
            />
          ))}
        </div>

        {filteredBookmarks.length === 0 && (
          <div className="text-center py-12">
            <BookmarkIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No bookmarks found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by adding a new bookmark"}
            </p>
          </div>
        )}
      </main>

      {showAddForm && (
        <AddBookmarkForm
          onAdd={handleAddBookmark}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

export default App;
