import { QRCodeCanvas } from "qrcode.react";


const bins = [
  "BIN-001",
  "BIN-002",
  "BIN-003",
  "BIN-004",
  "BIN-005"
];

const BinQRGenerator = () => {
  return (
    <div style={{ padding: 50}}>
      <h2>Dustbin QR Codes</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 30 }}>
        {bins.map((bin) => {
          const url = `${window.location.origin}/report?binId=${bin}`;

          return (
            <div key={bin} style={{ textAlign: "center" }}>
              <QRCodeCanvas value={url} size={160} />

              <p>{bin}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BinQRGenerator;
