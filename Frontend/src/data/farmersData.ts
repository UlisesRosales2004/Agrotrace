const farmersData = [
    {
        id: 1,
        name: "María González",
        location: "Mendoza, Argentina",
        rating: 4.8,
        productsCount: 12,
        image: "/placeholder.svg?height=80&width=80",
        products: [
            {
                id: 1,
                name: "Tomates Cherry",
                harvestDate: "2024-01-15",
                certifications: ["Orgánico", "Agroecológico"],
                rating: 4.9,
                signedUrl: "https://blockchain.agri/verify/abc123",
            },
            {
                id: 2,
                name: "Lechuga Criolla",
                harvestDate: "2024-01-10",
                certifications: ["Orgánico"],
                rating: 4.7,
                signedUrl: "https://blockchain.agri/verify/def456",
            },
        ],
    },
    {
        id: 2,
        name: "Carlos Rodríguez",
        location: "Córdoba, Argentina",
        rating: 4.6,
        productsCount: 8,
        image: "/placeholder.svg?height=80&width=80",
        products: [
            {
                id: 3,
                name: "Maíz Dulce",
                harvestDate: "2024-01-20",
                certifications: ["Sustentable"],
                rating: 4.5,
                signedUrl: "https://blockchain.agri/verify/ghi789",
            },
        ],
    },
    {
        id: 3,
        name: "Ana Martínez",
        location: "Buenos Aires, Argentina",
        rating: 4.9,
        productsCount: 15,
        image: "/placeholder.svg?height=80&width=80",
        products: [],
    },
];
export default farmersData;
