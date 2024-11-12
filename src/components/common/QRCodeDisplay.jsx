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
      const scale = 4;
      const baseSize = 256; // Tamanho base do QR code
      const padding = 32; // Padding para garantir que não haja corte
      const totalSize = baseSize + (padding * 2);

      toPng(element, {
        quality: 1.0,
        pixelRatio: scale,
        width: totalSize,
        height: totalSize,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          padding: `${padding}px`
        },
        canvasWidth: totalSize * scale,
        canvasHeight: totalSize * scale
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
        className="bg-white p-8 rounded-lg shadow-sm"
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