import { Star } from "lucide-react";

const StarRating = ({ rating, size = "w-4 h-4" }) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`${size} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
            ))}
            <span className="text-sm text-gray-600 ml-1">{rating}</span>
        </div>
    );
};

export default StarRating;
