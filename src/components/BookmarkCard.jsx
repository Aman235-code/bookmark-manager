/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  StickyNote,
  CalendarClock,
  ChevronDown,
  ChevronUp,
  Bookmark,
} from "lucide-react";

const tagColors = {
  tools: "bg-blue-100 text-blue-700",
  "open-source": "bg-green-100 text-green-700",
  dev: "bg-purple-100 text-purple-700",
  ai: "bg-pink-100 text-pink-700",
  github: "bg-gray-100 text-gray-700",
  default: "bg-yellow-100 text-yellow-700",
};

export default function BookmarkCard({ bookmark }) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="hover:cursor-pointer relative mt-6 bg-[#fefefe] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] p-6 pt-8 space-y-4 transition duration-300"
    >
      {/* 📌 Bookmark Icon */}
      <Bookmark
        size={20}
        className="absolute top-3 right-3 text-gray-400 hover:text-yellow-500 transition-colors"
      />

      {/* Title */}
      <motion.a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl pt-8 font-bold text-center text-red-600 flex items-center justify-center gap-2 break-words"
        initial={{ color: "#DC2626" }}
        whileHover={{ color: "#991B1B" }}
        transition={{ duration: 0.3 }}
      >
        {bookmark.title}
        <ExternalLink size={18} />
      </motion.a>

      {/* Description */}
      <p className="text-gray-800 text-justify text-sm">
        {bookmark.description}
      </p>

      {/* Notes Toggle */}
      {bookmark.notes && (
        <div className="text-center">
          <button
            onClick={() => setShowNotes((prev) => !prev)}
            className="text-sm text-blue-600 hover:underline flex items-center justify-center mx-auto gap-1"
          >
            {showNotes ? (
              <>
                <ChevronUp size={16} /> Hide Notes
              </>
            ) : (
              <>
                <ChevronDown size={16} /> Show Notes
              </>
            )}
          </button>

          <AnimatePresence>
            {showNotes && (
              <motion.p
                key="notes"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-justify text-green-600 font-medium mt-2 flex items-center justify-center gap-1 overflow-hidden"
              >
                <StickyNote size={18} /> {bookmark.notes}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {bookmark.tags?.map((tag, idx) => {
          const colorClass = tagColors[tag.toLowerCase()] || tagColors.default;
          return (
            <span
              key={idx}
              className={`text-xs px-2 py-1 rounded-full ${colorClass}`}
            >
              #{tag}
            </span>
          );
        })}
      </div>

      {/* Updated At */}
      <p className="text-xs text-gray-400 flex items-center justify-end gap-1">
        <CalendarClock size={14} />
        {bookmark.updatedAt}
      </p>
    </motion.div>
  );
}
