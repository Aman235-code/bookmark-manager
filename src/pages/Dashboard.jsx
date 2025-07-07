/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import bookmarks from "../data/bookmarks.json";
import BookmarkCard from "../components/BookmarkCard";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 6;

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("page")) || 1
  );
  const [search, setSearch] = useState("");

  // Store page in localStorage
  useEffect(() => {
    localStorage.setItem("page", currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 scroll to top
  }, [currentPage]);

  // Filter bookmarks
  const filtered = bookmarks.filter((bookmark) =>
    (bookmark.title + bookmark.description)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBookmarks = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-3xl font-bold text-red-600 text-center mb-4">
        📚 My Bookmarks
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search bookmarks..."
          className="border px-4 py-2 w-full max-w-md rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Bookmarks with Framer Motion animation */}
      <motion.div
        key={currentPage + search} // ensures animation on change
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
      >
        {currentBookmarks.map((bookmark, idx) => (
          <BookmarkCard key={idx} bookmark={bookmark} />
        ))}
      </motion.div>

      {/* Pagination numbers */}
      {/* Pagination Numbers */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 text-sm font-semibold transition-all duration-300 ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white shadow-md scale-105"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
