import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";

const QRCodeDisplay = ({ data, showDownload = false }) => {
  const qrData = {
    ...data,
    lubrificante: {
      descricaoComercial: data.lubrificante?.descricaoComercial || "N/A",
      recorrenciaRelubrificacao: data.lubrificante?.recorrenciaRelubrificacao || "N/A",
      quantidadeRelubrificacao: data.lubrificante?.quantidadeRelubrificacao || "N/A"
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById(`qr-${data.id}`);
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          backgroundColor: '#FFFFFF',
          scale: 3,
          logging: false,
          useCORS: true,
          allowTaint: true,
          width: element.offsetWidth,
          height: element.offsetHeight,
          x: 0,
          y: 0
        });

        const link = document.createElement("a");
        link.download = `qr-${data.nome || "code"}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
      } catch (error) {
        console.error("Erro ao gerar imagem do QR code:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        id={`qr-${data.id}`}
        className="bg-white p-8 rounded-lg"
        style={{ 
          width: 'fit-content',
          minWidth: '300px',
          minHeight: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
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