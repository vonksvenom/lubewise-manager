import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";

const QRCodeDisplay = ({ data, showDownload = false }) => {
  // Create a more detailed version of the data for QR code
  const qrData = {
    id: data.id,
    tag: data.tag,
    nome: data.nome,
    modelo: data.modelo,
    fabricante: data.fabricante,
    numeroSerie: data.numeroSerie,
    status: data.status,
    area: data.area,
    responsavel: data.responsavel,
    lubrificante: data.lubrificante ? {
      descricaoComercial: data.lubrificante.descricaoComercial,
      recorrenciaRelubrificacao: data.lubrificante.recorrenciaRelubrificacao,
      quantidadeRelubrificacao: data.lubrificante.quantidadeRelubrificacao,
      pontoLubrificacao: data.lubrificante.pontoLubrificacao,
      tipo: data.lubrificante.tipo
    } : null,
    ultimaManutencao: data.ultimaManutencao,
    proximaManutencao: data.proximaManutencao
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
          level="L"
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