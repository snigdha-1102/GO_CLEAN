import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ImagePlus, X, Send, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const API_BASE = "https://go-clean-backend-47t6.onrender.com";

const AddStory = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const submit = async () => {
    if (!text.trim() && !image) {
      toast.error("Add some text or an image!");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("text", text);
      if (image) formData.append("image", image);

      const res = await fetch(`${API_BASE}/api/story`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to post");

      toast.success("Story posted! 🎉");
      navigate("/feed");
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <p className="text-foreground text-lg">Please login to post stories</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <button onClick={() => navigate("/feed")} className="text-foreground">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-foreground font-semibold text-lg">New Story</h1>
        <div className="w-6" />
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-6 gap-6 max-w-lg mx-auto w-full">
        {/* Image area */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full aspect-[9/16] max-h-[50vh] rounded-xl overflow-hidden bg-secondary relative cursor-pointer"
          onClick={() => !preview && fileRef.current?.click()}
        >
          {preview ? (
            <>
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm rounded-full p-1.5"
              >
                <X size={18} className="text-foreground" />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <ImagePlus size={28} />
              </div>
              <p className="text-sm">Tap to add photo</p>
            </div>
          )}
        </motion.div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Text input */}
        <motion.textarea
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          placeholder="Write something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-xl p-4 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border"
        />

        {/* Submit */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.97 }}
          onClick={submit}
          disabled={submitting}
          className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity"
        >
          {submitting ? (
            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send size={18} />
              Post Story
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default AddStory;