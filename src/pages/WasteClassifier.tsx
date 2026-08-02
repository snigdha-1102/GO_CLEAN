import { useState } from "react";

const WasteClassifier = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const analyzeImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/classify/classify",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setResult(data.result);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6">

      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          🤖 AI Waste Classifier
        </h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-6 rounded-xl w-full h-80 object-cover"
          />
        )}

        <button
          onClick={analyzeImage}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
        >
          {loading ? "Analyzing..." : "Analyze Waste"}
        </button>

        {result && (
          <div className="mt-8 bg-green-50 p-5 rounded-xl">
            <h2 className="font-bold text-xl mb-3">
              AI Result
            </h2>

            <p className="whitespace-pre-wrap">
              {result}
            </p>
          </div>
        )}

      </div>

    </div>
  );
};

export default WasteClassifier;