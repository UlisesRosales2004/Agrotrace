import type React from "react"

import { useEffect, useState } from "react"
import { Shield, Eye, Leaf, Zap, MapPin, Award, User } from "lucide-react"
import FarmerCard from "../components/FarmerCard"
import { getFarmers } from "../services/farmerService";
import { getFarmerProducts } from "../services/productService"; 
import type { Usuario } from "../types/user"

interface PublicLandingProps {
  onLogin: () => void
  onViewProfile: (farmer: Usuario) => void
}

const PublicLanding: React.FC<PublicLandingProps> = ({ onLogin, onViewProfile }) => {
  const [farmers, setFarmers] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFarmersWithProductCount = async () => {
      try {
        // 1. Obtener todos los agricultores
        const farmersData = await getFarmers();

        // 2. Para cada agricultor, obtener la cantidad de productos
        const farmersWithProductCount = await Promise.all(
          farmersData.map(async (farmer) => {
            try {
              const products = await getFarmerProducts(farmer.id_agrigultor);
              return {
                ...farmer,
                productsCount: products.length
              };
            } catch (error) {
              console.error(`Error fetching products for farmer ${farmer.id_agrigultor}:`, error);
              return {
                ...farmer,
                productsCount: 0
              };
            }
          })
        );

        setFarmers(farmersWithProductCount);
      } catch (error) {
        console.error("Error fetching farmers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFarmersWithProductCount()
  }, [])

  const benefits = [
    {
      icon: <Eye className="w-8 h-8 text-green-600" />,
      title: "Trazabilidad Completa",
      description: "Conoce el origen exacto de cada producto desde la semilla hasta tu mesa",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Tecnología Blockchain",
      description: "Registro inmutable que garantiza transparencia y autenticidad",
    },
    {
      icon: <Zap className="w-8 h-8 text-green-600" />,
      title: "Visibilidad Total",
      description: "Acceso a información detallada del proceso productivo en tiempo real",
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Confianza Garantizada",
      description: "Verificación automática de calidad y autenticidad de productos",
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-600" />,
      title: "Apoyo Local",
      description: "Compra directa a productores de tu región, fortaleciendo la economía local",
    },
    {
      icon: <Leaf className="w-8 h-8 text-blue-600" />,
      title: "Frescura Asegurada",
      description: "Productos cosechados según demanda para máxima frescura y calidad",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-green-600">🌱 AgroTrace</h1>
            <button
              onClick={onLogin}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Login como agricultor
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Del Campo a Tu Mesa */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Del Campo Directamente a Tu Mesa
              </h2>
              <p className="text-xl text-green-700 font-medium">
                Conectamos productores locales con consumidores conscientes
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nuestra plataforma revoluciona la cadena alimentaria eliminando intermediarios innecesarios.
                Garantizamos la frescura de cada producto mientras apoyas directamente a la agricultura local. Con
                tecnología blockchain, cada alimento cuenta su historia: desde qué semilla se plantó, cómo se cultivó,
                hasta el momento exacto de la cosecha. Conocer el origen de tus alimentos nunca fue tan importante como
                ahora.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onLogin}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Comenzar Ahora
                </button>
                <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold">
                  Conocer Más
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://i.pinimg.com/originals/4f/ec/ee/4fecee3b0ba71316c5ffe25a78265c9e.jpg"
                alt="Campo verde con cultivos orgánicos"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Productos frescos disponibles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Agricultores Asociados */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conoce a Nuestros Productores</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Agricultores comprometidos con la calidad, la sostenibilidad y la transparencia en cada cosecha
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="text-gray-500 mt-4">Cargando agricultores...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {farmers.map((farmer) => (
                <FarmerCard key={farmer.id_agrigultor} farmer={farmer} onViewProfile={onViewProfile} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Por Qué Elegir Nuestra App?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Revolucionamos la agricultura con tecnología de vanguardia para garantizar transparencia, calidad y
              confianza en cada producto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4 mx-auto">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{benefit.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Únete a la Revolución Agrícola Digital</h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Sé parte del cambio hacia una agricultura más transparente, sostenible y conectada. Cada compra que realizas
            apoya directamente a los productores locales y promueve prácticas agrícolas responsables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onLogin}
              className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-bold text-lg shadow-lg hover:shadow-xl"
            >
              Comenzar Ahora
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-8 text-green-100">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              <span>Eco-Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Certificado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold">AgroTrace</span>
          </div>
          <p className="text-gray-400">
            © 2024 AgroTrace. Conectando el campo con tu mesa de manera transparente y sostenible.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default PublicLanding