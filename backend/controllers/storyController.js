import Story from "../models/Story.js";

export const createStory = async (req, res) => {
  try {
    const { userId, text } = req.body;

    const story = new Story({
      userId,
      text,
      image: req.file ? req.file.path : null,
    });

    await story.save();

    res.json({ message: "Story added", story });

  } catch (err) {
    res.status(500).json({ message: "Error creating story" });
  }
};

// ✅ ADD THIS
export const getStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(stories);

  } catch (err) {
    res.status(500).json({ message: "Error fetching stories" });
  }
};