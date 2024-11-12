import { QRCodeSVG } from 'qrcode.react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from 'html2canvas';

const QRCodeDisplay = ({ data, showDownload = false }) => {
  const handleDownload = async () => {
    const qrElement = document.getElementById('qr-code');
    if (!qrElement) return;

    try {
      const canvas = await html2canvas(qrElement);
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.tag}-${data.nome}-${data.area}-${data.cip || ''}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  const qrData = {
    tag: data.tag,
    nome: data.nome,
    modelo: data.modelo,
    area: data.area,
    responsavel: data.responsavel,
    status: data.status,
    fabricante: data.fabricante,
    numeroSerie: data.numeroSerie,
    dataFabricacao: data.dataFabricacao,
    cip: data.cip
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div id="qr-code" className="bg-white p-4 rounded-lg">
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
          Download QR Code
        </Button>
      )}
    </div>
  );
};

export default QRCodeDisplay;