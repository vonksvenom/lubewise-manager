import { QRCodeSVG } from 'qrcode.react';

const QRCodeDisplay = ({ data }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <QRCodeSVG 
        value={JSON.stringify(data)}
        size={128}
        level="H"
        includeMargin={true}
      />
    </div>
  );
};

export default QRCodeDisplay;