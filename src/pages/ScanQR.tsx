import { useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const ScanQR = () => {

  useEffect(() => {

    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(
      undefined,
      "video",
      (result, err) => {

        if (result) {

          const qrText = result.getText();

          window.location.href = qrText;

        }

      }
    );

    return () => {

      codeReader.stopContinuousDecode();

    };

  }, []);

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-black">

      <h1 className="text-white text-2xl mb-6">
        Scan Dustbin QR Code
      </h1>

      <video
        id="video"
        className="w-80 rounded-lg shadow-lg border"
      />

    </div>

  );

};

export default ScanQR;