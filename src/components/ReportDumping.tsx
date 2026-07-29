import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MapPin, Phone, Upload, Hash, AlertTriangle, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import langData from "@/lang";
import GlobalHero from "./GlobalHero";

const ReportDumping = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);

  const [binId, setBinId] = useState("");
  const [location, setLocation] = useState("Fetching location...");
  const [issueType, setIssueType] = useState("");

  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const lang = localStorage.getItem("lang") || "en";
  const t = langData[lang];

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const id = searchParams.get("binId");
    if (id) setBinId(id);
  }, [searchParams]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation(`https://maps.google.com/?q=${lat},${lng}`);
        },
        () => {
          setLocation("Location access denied.");
        }
      );
    }
  }, []);

  const handleFileChange = (e: any) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const submitReport = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://go-clean-backend-47t6.onrender.com/api/report",
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast({
          title: t.success,
          description: t.successDesc
        });

        setPhone("");
        setDescription("");
        setIssueType("");
        setFile(null);
        setPreview("");
      } else {
        toast({
          title: t.fail,
          description: result.message || t.error
        });
      }
    } catch (error) {
      toast({
        title: t.serverError,
        description: t.serverErrorDesc
      });
    }

    setIsSubmitting(false);
    setShowAuthModal(false);
    setPendingFormData(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!issueType) {
      toast({
        title: t.selectIssue,
        description: t.selectIssueDesc
      });
      return;
    }

    const formData = new FormData();
    formData.append("binId", binId);
    formData.append("issueType", issueType);
    formData.append("location", location);
    formData.append("phone", phone);
    formData.append("description", description);

    if (user) {
      formData.append("userId", user._id);
    }

    if (file) {
      formData.append("image", file);
    }

    if (!user) {
      setPendingFormData(formData);
      setShowAuthModal(true);
    } else {
      await submitReport(formData);
    }
  };

  const handleGuestSubmit = () => {
    if (pendingFormData) {
      submitReport(pendingFormData);
    }
  };

  const handleRegisterRedirect = () => {
    setShowAuthModal(false);
    navigate("/signup");
  };

  return (
    <GlobalHero>
      <section className="min-h-screen flex items-start justify-center px-4 py-24">
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-600">
              {t.reportTitle}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4" />
                  {t.binId}
                </Label>
                <Input
                  value={binId || "Manual Report"}
                  readOnly
                  className="bg-gray-100 h-11"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  {t.issueType}
                </Label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-green-600"
                >
                  <option value="">{t.selectIssue}</option>
                  <option value="Illegal Dumping">{t.illegal}</option>
                  <option value="Overflowing Bin">{t.overflow}</option>
                  <option value="Damaged Bin">{t.damaged}</option>
                </select>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  {t.location}
                </Label>
                <Input
                  value={location}
                  readOnly
                  className="bg-gray-100 h-11"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4" />
                  {t.phone}
                </Label>
                <Input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div>
                <Label className="mb-2">{t.description}</Label>
                <Textarea
                  rows={4}
                  placeholder={t.descPlaceholder}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="text-sm"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Upload className="w-4 h-4" />
                  {t.upload}
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="h-11"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="mt-3 rounded-lg max-h-40 object-cover"
                  />
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white py-3 text-base rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? t.submitting : t.submit}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Submit Report
              </h3>
              <p className="text-gray-600 text-sm">
                Choose how you'd like to continue
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleGuestSubmit}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-3 text-base rounded-xl"
                disabled={isSubmitting}
              >
                Continue as Guest
              </Button>

              <Button
                onClick={handleRegisterRedirect}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base rounded-xl"
              >
                Register Account
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Registering allows you to track your reports and earn rewards
            </p>
          </div>
        </div>
      )}
    </GlobalHero>
  );
};

export default ReportDumping;
