import React, { useState } from "react";
import bookmarks from "../data/bookmarks.json";
import BookmarkCard from "../components/BookmarkCard";
import { Search } from "lucide-react";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-3xl font-bold text-center mb-4">📚 My Bookmarks</h1>

      {/* 🔍 Search Bar */}
      <div className="max-w-lg mx-auto mb-8 relative">
        <input
          type="text"
          placeholder="Search description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      {/* Bookmark Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filteredBookmarks.map((bookmark, idx) => (
          <BookmarkCard key={idx} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
}
