import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";

const QRCodeDisplay = ({ data, showDownload = false }) => {
  // Create a minimal version of the data for QR code
  const qrData = {
    id: data.id,
    tag: data.tag,
    nome: data.nome,
    status: data.status,
    lubrificante: data.lubrificante ? {
      descricaoComercial: data.lubrificante.descricaoComercial || "N/A",
      recorrenciaRelubrificacao: data.lubrificante.recorrenciaRelubrificacao || "N/A",
      quantidadeRelubrificacao: data.lubrificante.quantidadeRelubrificacao || "N/A"
    } : null
  };

  const handleDownload = async () => {
    const element = document.getElementById(`qr-${data.id}`);
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          backgroundColor: '#FFFFFF',
          scale: 8,
          logging: false,
          useCORS: true,
          allowTaint: true,
          width: element.offsetWidth,
          height: element.offsetHeight,
          x: 0,
          y: 0,
          imageTimeout: 0,
          pixelRatio: 5,
          windowWidth: element.offsetWidth,
          windowHeight: element.offsetHeight
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
        className="bg-white p-4 rounded-lg"
        style={{ 
          width: 'fit-content',
          minWidth: '200px',
          minHeight: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <QRCodeSVG
          value={JSON.stringify(qrData)}
          size={180}
          level="M"
          includeMargin={true}
          style={{
            shapeRendering: 'crispEdges',
          }}
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