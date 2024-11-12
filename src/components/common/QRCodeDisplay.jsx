import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";

const QRCodeDisplay = ({ data, showDownload = false }) => {
  const qrData = {
    ...data,
    lubrificante: {
      descricaoComercial: data.lubrificante?.descricaoComercial || "N/A",
      recorrenciaRelubrificacao: data.lubrificante?.recorrenciaRelubrificacao || "N/A",
      quantidadeRelubrificacao: data.lubrificante?.quantidadeRelubrificacao || "N/A"
    }
  };

  const handleDownload = () => {
    const element = document.getElementById(`qr-${data.id}`);
    if (element) {
      toPng(element)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `qr-${data.nome || "code"}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Error generating QR code image:", err);
        });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        id={`qr-${data.id}`}
        className="bg-white p-4 rounded-lg shadow-sm"
      >
        <QRCodeSVG
          value={JSON.stringify(qrData)}
          size={128}
          level="H"
          includeMargin={true}
        />
      </div>
      {showDownload && (
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download QR
        </Button>
      )}
    </div>
  );
};

export default QRCodeDisplay;