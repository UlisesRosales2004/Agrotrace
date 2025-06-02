import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { createRating, getAllRatings } from "../services/ratingService";
import type { Product } from "../types/product";
import type { Rating } from "../services/ratingService";

interface ProductCardProps {
    product: Product;
    showQR?: boolean;
    allowRating?: boolean; // Nueva prop para permitir calificar
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    showQR = false,
    allowRating = false
}) => {
    const [qrCode, setQrCode] = useState<string>("");
    const [currentRating, setCurrentRating] = useState<number>(0);
    const [totalRatings, setTotalRatings] = useState<number>(0);
    const [isSubmittingRating, setIsSubmittingRating] = useState<boolean>(false);
    const [hasUserRated, setHasUserRated] = useState<boolean>(false);

    // Generar QR Code
    useEffect(() => {
        if (showQR && product.urlFirmado) {
            QRCode.toDataURL(product.urlFirmado)
                .then((url) => setQrCode(url))
                .catch((err) => console.error("Error generando QR:", err));
        }
    }, [product.urlFirmado, showQR]);

    // Cargar calificaciones existentes
    useEffect(() => {
        loadRatings();
    }, [product.id_lote]);

    const loadRatings = async () => {
        try {
            const allRatings = await getAllRatings();

            // Filtrar calificaciones para este lote
            const productRatings = allRatings.filter(
                (rating: Rating) => rating.lote.id_lote === product.id_lote
            );

            if (productRatings.length > 0) {
                const avgRating = productRatings.reduce(
                    (sum, rating) => sum + rating.cantidadEstrellas, 0
                ) / productRatings.length;

                setCurrentRating(Number(avgRating.toFixed(1)));
                setTotalRatings(productRatings.length);
            } else {
                // Si hay promedio del backend, usarlo
                setCurrentRating(product.promedioCalificaciones || 0);
                setTotalRatings(productRatings.length);
            }
        } catch (error) {
            console.error("Error cargando calificaciones:", error);
            // Usar promedio del backend como fallback
            setCurrentRating(product.promedioCalificaciones || 0);
            setTotalRatings(0);
        }
    };

    const handleRatingSubmit = async (stars: number) => {
        if (isSubmittingRating || hasUserRated) return;

        setIsSubmittingRating(true);
        try {
            const newRating: Omit<Rating, 'id'> = {
                cantidadEstrellas: stars,
                lote: {
                    id_lote: product.id_lote
                }
            };

            await createRating(newRating);
            setHasUserRated(true);

            // Recargar calificaciones para mostrar la nueva
            await loadRatings();

            console.log(`Calificación enviada: ${stars} estrellas para el lote ${product.id_lote}`);
        } catch (error) {
            console.error("Error enviando calificación:", error);
        } finally {
            setIsSubmittingRating(false);
        }
    };

    // Componente StarRating integrado
    const StarRating = ({ rating, interactive = false, onRatingChange }: {
        rating: number;
        interactive?: boolean;
        onRatingChange?: (rating: number) => void;
    }) => {
        const [hoverRating, setHoverRating] = useState<number>(0);

        const handleClick = (starIndex: number) => {
            if (interactive && onRatingChange) {
                onRatingChange(starIndex);
            }
        };

        const handleMouseEnter = (starIndex: number) => {
            if (interactive) {
                setHoverRating(starIndex);
            }
        };

        const handleMouseLeave = () => {
            if (interactive) {
                setHoverRating(0);
            }
        };

        const getStarColor = (starIndex: number) => {
            const currentRating = hoverRating || rating;

            if (starIndex <= Math.floor(currentRating)) {
                return "text-yellow-400";
            } else if (starIndex === Math.ceil(currentRating) && currentRating % 1 !== 0) {
                return "text-yellow-200";
            } else {
                return "text-gray-300";
            }
        };

        return (
            <div className="flex items-center gap-1">
                <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, index) => {
                        const starIndex = index + 1;
                        return (
                            <button
                                key={starIndex}
                                type="button"
                                disabled={!interactive}
                                onClick={() => handleClick(starIndex)}
                                onMouseEnter={() => handleMouseEnter(starIndex)}
                                onMouseLeave={handleMouseLeave}
                                className={`
                                    w-5 h-5
                                    ${getStarColor(starIndex)}
                                    ${interactive
                                        ? 'cursor-pointer hover:scale-110 transition-transform'
                                        : 'cursor-default'
                                    }
                                    focus:outline-none
                                `}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-full h-full"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        );
                    })}
                </div>

                <span className="text-sm text-gray-600 ml-1">
                    {rating > 0 ? rating.toFixed(1) : '0.0'}
                </span>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{product.nombre}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Tipo:</span> {product.tipoCultivo}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Siembra:</span> {product.fechaSiembre}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Cosecha:</span> {product.fechaCosecha}
                    </p>
                </div>
                {showQR && qrCode && (
                    <div className="flex flex-col items-center">
                        <img src={qrCode} alt="QR Code" className="w-16 h-16" />
                        <span className="text-xs text-gray-500 mt-1">Verificar</span>
                    </div>
                )}
            </div>

            {/* Descripción */}
            {product.descripcion && (
                <div className="mb-3">
                    <p className="text-sm text-gray-700">{product.descripcion}</p>
                </div>
            )}

            {/* Prácticas utilizadas */}
            {product.practicasUtilizadas && (
                <div className="mb-3">
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Prácticas:</span> {product.practicasUtilizadas}
                    </p>
                </div>
            )}

            {/* Certificaciones */}
            <div className="flex flex-wrap gap-2 mb-4">
                {product.certificaciones?.map((cert: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {cert}
                    </span>
                ))}
            </div>

            {/* Rating Section */}
            <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <StarRating
                            rating={currentRating}
                            interactive={allowRating && !hasUserRated}
                            onRatingChange={allowRating ? handleRatingSubmit : undefined}
                        />
                        <span className="text-sm text-gray-600">
                            ({totalRatings} {totalRatings === 1 ? 'calificación' : 'calificaciones'})
                        </span>
                    </div>
                </div>

                {/* Mensaje de estado para rating */}
                {allowRating && (
                    <div className="text-xs text-gray-500 mt-1">
                        {isSubmittingRating && (
                            <span className="text-blue-600">Enviando calificación...</span>
                        )}
                        {hasUserRated && (
                            <span className="text-green-600">¡Gracias por tu calificación!</span>
                        )}
                        {!hasUserRated && !isSubmittingRating && (
                            <span>Haz clic en las estrellas para calificar</span>
                        )}
                    </div>
                )}
            </div>

            {/* Información del agricultor */}
            {product.agricultor && (
                <div className="border-t pt-3 mt-3">
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Productor:</span> {product.agricultor.nombre}
                    </p>
                    {product.agricultor.ubicacion && (
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Ubicación:</span> {product.agricultor.ubicacion}
                        </p>
                    )}
                </div>
            )}

            {/* Fechas importantes */}
            <div className="border-t pt-3 mt-3 text-xs text-gray-500">
                <div className="flex justify-between">
                    <span>Cargado: {product.fechaCarga}</span>
                    {product.fechaExpiracion && (
                        <span>Expira: {product.fechaExpiracion}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;