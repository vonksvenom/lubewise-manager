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
      const scale = 2;
      const baseSize = 256;
      const padding = 16;
      
      toPng(element, {
        quality: 1.0,
        pixelRatio: scale,
        width: baseSize,
        height: baseSize,
        style: {
          transform: 'none',
          margin: `${padding}px`,
          backgroundColor: 'white'
        }
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `qr-${data.nome || "code"}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Erro ao gerar imagem do QR code:", err);
        });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        id={`qr-${data.id}`}
        className="bg-white p-4 rounded-lg shadow-sm"
        style={{ width: 'fit-content' }}
      >
        <QRCodeSVG
          value={JSON.stringify(qrData)}
          size={256}
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