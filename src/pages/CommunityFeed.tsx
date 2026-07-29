import { useEffect, useState, useRef, useCallback } from "react";
import { Heart, MessageCircle, Plus, Share2, Bookmark, ChevronUp, ImageOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Story {
  _id: string;
  userId?: { name: string };
  text?: string;
  image?: string;
  createdAt?: string;
}

const API_BASE = "https://go-clean-backend-47t6.onrender.com";

const CommunityFeed = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [doubleTapId, setDoubleTapId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [user, setUser] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/api/story`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setStories(data);
        else if (data.stories) setStories(data.stories);
        else setStories([]);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const toggleLike = useCallback((id: string) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const toggleSave = useCallback((id: string) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const handleDoubleTap = useCallback(
    (id: string) => {
      if (!liked.includes(id)) toggleLike(id);
      setDoubleTapId(id);
      setTimeout(() => setDoubleTapId(null), 800);
    },
    [liked, toggleLike]
  );

  const handleImageError = (storyId: string) => {
    setImageErrors((prev) => new Set([...prev, storyId]));
  };

  const getImageUrl = (story: Story) => {
    return story.image || null;
  };

  const getTimeAgo = (dateStr?: string) => {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const idx = Math.round(container.scrollTop / window.innerHeight);
      setActiveIndex(idx);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-3 border-pink-500 border-t-transparent animate-spin" />
          <p className="text-gray-400 text-sm font-medium">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide overscroll-none touch-pan-y"
    >

      {/* ✅ TOP RIGHT BUTTON (FIXED) */}
      {user && (
        <motion.button
          onClick={() => navigate("/add-story")}
          className="fixed top-14 right-5 z-[999] bg-gradient-to-r from-pink-500 to-purple-600 text-white p-5 rounded-full shadow-xl"
        >
          <Plus size={22} />
        </motion.button>
      )}

      {stories.map((story, index) => {
        const imageUrl = getImageUrl(story);
        const isLiked = liked.includes(story._id);
        const isSaved = saved.includes(story._id);
        const hasImageError = imageErrors.has(story._id);

        return (
          <div key={story._id} className="h-screen snap-start relative bg-black">

            {/* IMAGE */}
            <div className="w-full h-full flex items-center justify-center bg-black">
              {imageUrl && !hasImageError ? (
                <img
                  src={imageUrl}
                  alt="story"
                  className="max-w-full max-h-full object-contain"
                  onDoubleClick={() => handleDoubleTap(story._id)}
                  onError={() => handleImageError(story._id)}
                />
              ) : (
                <ImageOff size={40} className="text-gray-500" />
              )}
            </div>

            {/* DARK OVERLAY FOR VISIBILITY */}
            <div className="absolute inset-0 bg-black/40" />

            {/* ACTION BUTTONS */}
            <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5 z-20">
              <button onClick={() => toggleLike(story._id)}>
                <Heart className={`w-7 h-7 ${isLiked ? "text-pink-500 fill-pink-500" : "text-white"}`} />
              </button>

              <MessageCircle className="w-7 h-7 text-white" />
              <Share2 className="w-7 h-7 text-white" />

              <button onClick={() => toggleSave(story._id)}>
                <Bookmark className={`w-7 h-7 ${isSaved ? "fill-white" : "text-white"}`} />
              </button>
            </div>

            {/* USER INFO (ALWAYS VISIBLE) */}
            <div className="absolute bottom-6 left-4 right-16 z-20 text-white">
              <p className="font-semibold">
                {story.userId?.name || "Anonymous"}
              </p>
              <p className="text-xs text-gray-300">
                {getTimeAgo(story.createdAt)}
              </p>

              {story.text && (
                <p className="text-sm mt-2">{story.text}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityFeed;