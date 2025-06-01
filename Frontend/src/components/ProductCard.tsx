import React, { useState } from "react";
import StarRating from "./StarRating";
import QRCode from "qrcode";

const ProductCard = ({ product, showQR = false }) => {
    const [qrCode, setQrCode] = useState("");

    React.useEffect(() => {
        if (showQR && product.signedUrl) {
            QRCode.toDataURL(product.signedUrl)
                .then((url) => setQrCode(url))
                .catch((err) => console.error(err));
        }
    }, [product.signedUrl, showQR]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600">Cosechado: {product.harvestDate}</p>
                </div>
                {showQR && qrCode && (
                    <div className="flex flex-col items-center">
                        <img src={qrCode || "/placeholder.svg"} alt="QR Code" className="w-16 h-16" />
                        <span className="text-xs text-gray-500 mt-1">Verificar</span>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
                {product.certifications.map((cert, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {cert}
                    </span>
                ))}
            </div>

            <StarRating rating={product.rating} />
        </div>
    );
};

export default ProductCard;
