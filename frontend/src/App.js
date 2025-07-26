import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// WhatsApp Floating Button Component
const FloatingWhatsApp = () => {
  const whatsappNumber = "+6285850473256";
  const message = "Halo, saya ingin konsultasi gratis mengenai masalah hukum";
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`https://wa.me/6285850473256?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 flex items-center justify-center"
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.687"/>
        </svg>
      </a>
    </div>
  );
};

// Service Detail Modal Component  
const ServiceModal = ({ service, isOpen, onClose }) => {
  if (!isOpen) return null;

  const serviceDetails = {
    "Hukum Pidana": {
      title: "Layanan Hukum Pidana",
      description: "Kami menyediakan layanan hukum pidana komprehensif dengan pendekatan profesional dan strategi yang tepat untuk melindungi hak-hak klien dalam menghadapi tuntutan pidana.",
      categories: [
        "Tindak Pidana Umum",
        "Tindak Pidana Khusus", 
        "Tindak Pidana Ekonomi",
        "Tindak Pidana Korupsi",
        "Tindak Pidana Narkotika",
        "Tindak Pidana Cybercrime"
      ],
      cases: [
        "Pencurian dan Perampokan",
        "Penggelapan Dana",
        "Penipuan dan Fraud",
        "Kekerasan Fisik",
        "Pembunuhan",
        "Pemerkosaan",
        "Narkotika dan Psikotropika",
        "Korupsi Pejabat",
        "Pencucian Uang",
        "Kejahatan Siber"
      ],
      process: [
        "Konsultasi awal dan analisis kasus",
        "Penelitian hukum mendalam",
        "Penyusunan strategi pembelaan",
        "Pendampingan saat pemeriksaan",
        "Penyusunan pembelaan di pengadilan",
        "Banding dan kasasi jika diperlukan"
      ]
    },
    "Hukum Perdata": {
      title: "Layanan Hukum Perdata",
      description: "Menyelesaikan sengketa perdata dengan pendekatan hukum yang komprehensif, mulai dari negosiasi, mediasi hingga litigasi di pengadilan untuk mencapai solusi terbaik bagi klien.",
      categories: [
        "Sengketa Kontrak",
        "Hukum Waris",
        "Sengketa Properti",
        "Wanprestasi",
        "Perbuatan Melawan Hukum",
        "Kepailitan"
      ],
      cases: [
        "Sengketa Jual Beli",
        "Waris dan Hibah",
        "Sengketa Tanah",
        "Breach of Contract",
        "Ganti Rugi",
        "Pembatalan Kontrak",
        "Eksekusi Putusan",
        "Somasi dan Tuntutan"
      ],
      process: [
        "Analisis dokumen dan bukti",
        "Negosiasi dengan pihak lawan",
        "Mediasi dan arbitrase",
        "Penyusunan gugatan",
        "Representasi di pengadilan",
        "Eksekusi putusan"
      ]
    },
    "Hukum Bisnis": {
      title: "Layanan Hukum Bisnis & Korporasi",
      description: "Mendampingi perusahaan dalam aspek hukum bisnis, dari pendirian hingga penyelesaian sengketa korporasi untuk mendukung pertumbuhan bisnis yang berkelanjutan.",
      categories: [
        "Pendirian Perusahaan",
        "Corporate Governance",
        "Merger & Akuisisi",
        "Kepatuhan Regulasi",
        "Sengketa Korporasi",
        "Kontrak Bisnis"
      ],
      cases: [
        "Pendirian PT dan CV",
        "Perubahan Anggaran Dasar",
        "Akuisisi Perusahaan",
        "Joint Venture",
        "Sengketa Pemegang Saham",
        "Kepatuhan Pajak",
        "Kontrak Kerjasama",
        "Likuidasi Perusahaan"
      ],
      process: [
        "Business legal audit",
        "Penyusunan struktur korporasi",
        "Due diligence",
        "Negosiasi kontrak",
        "Compliance review",
        "Dispute resolution"
      ]
    },
    "Hukum Keluarga": {
      title: "Layanan Hukum Keluarga", 
      description: "Menangani permasalahan hukum keluarga dengan penuh empati dan profesionalisme, memberikan solusi terbaik untuk kepentingan seluruh anggota keluarga.",
      categories: [
        "Perceraian",
        "Hak Asuh Anak",
        "Pembagian Harta Gono-Gini",
        "Adopsi",
        "Penetapan Ahli Waris",
        "Pernikahan Campuran"
      ],
      cases: [
        "Cerai Talak",
        "Cerai Gugat", 
        "Custodi Anak",
        "Nafkah Iddah",
        "Pembagian Aset",
        "Adopsi Anak",
        "Perwalian",
        "Sengketa Keluarga"
      ],
      process: [
        "Konseling hukum keluarga",
        "Mediasi keluarga",
        "Penyusunan kesepakatan",
        "Proses di Pengadilan Agama/Negeri", 
        "Eksekusi putusan",
        "Pendampingan pasca putusan"
      ]
    },
    "Hukum Ketenagakerjaan": {
      title: "Layanan Hukum Ketenagakerjaan",
      description: "Melindungi hak-hak pekerja dan pengusaha dalam hubungan industrial yang harmonis, menciptakan lingkungan kerja yang adil dan produktif.",
      categories: [
        "PHK dan Kompensasi",
        "Sengketa Industrial",
        "Kontrak Kerja",
        "Keselamatan Kerja",
        "Diskriminasi Workplace",
        "Outsourcing"
      ],
      cases: [
        "PHK Sepihak",
        "Upah Lembur",
        "Pesangon",
        "Sexual Harassment",
        "Kecelakaan Kerja",
        "Pemutusan Kontrak",
        "Mogok Kerja",
        "Serikat Pekerja"
      ],
      process: [
        "Review kontrak kerja",
        "Negosiasi bipartit",
        "Mediasi tripartit",
        "Arbitrase",
        "Pengadilan Hubungan Industrial",
        "Eksekusi putusan"
      ]
    },
    "Hukum Pertanahan": {
      title: "Layanan Hukum Pertanahan",
      description: "Menyelesaikan sengketa tanah dan properti dengan pendekatan hukum yang menyeluruh, memberikan kepastian hukum atas kepemilikan aset tanah klien.",
      categories: [
        "Sengketa Kepemilikan",
        "Sertifikasi Tanah", 
        "Jual Beli Tanah",
        "Warisan Tanah",
        "Pembebasan Lahan",
        "Tanah Adat"
      ],
      cases: [
        "Sengketa Batas Tanah",
        "Tanah Ganda",
        "Pembatalan Sertifikat",
        "Penggusuran",
        "Penipuan Tanah",
        "Warisan Tanah Ulayat",
        "Jual Beli Cacat Hukum",
        "Ganti Rugi Lahan"
      ],
      process: [
        "Survey dan penelitian tanah",
        "Pengecekan sertifikat",
        "Mediasi BPN",
        "Gugatan ke Pengadilan",
        "Proses di PTUN",
        "Eksekusi dan balik nama"
      ]
    }
  };

  const details = serviceDetails[service] || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-blue-900">{details.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Deskripsi Layanan</h3>
              <p className="text-gray-700 leading-relaxed">{details.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Kategori Hukum</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {details.categories?.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    <span className="text-gray-700">{category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Jenis Kasus Yang Ditangani</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {details.cases?.map((caseType, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">{caseType}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Proses Penanganan</h3>
              <div className="space-y-2">
                {details.process?.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Konsultasi Gratis</h4>
                <p className="text-gray-700 mb-4">Dapatkan konsultasi gratis untuk kasus {service.toLowerCase()} Anda dengan tim advokat profesional kami.</p>
                <a 
                  href={`https://wa.me/6285850473256?text=Halo, saya ingin konsultasi gratis mengenai ${service.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.687"/>
                  </svg>
                  Konsultasi Sekarang
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  const openServiceModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeServiceModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  const services = [
    {
      title: "Hukum Pidana",
      description: "Menangani kasus pidana dari ringan hingga berat dengan pendekatan profesional dan strategi hukum yang tepat.",
      icon: "⚖️"
    },
    {
      title: "Hukum Perdata", 
      description: "Menangani sengketa kontrak, waris, dan properti dengan solusi hukum yang komprehensif.",
      icon: "📋"
    },
    {
      title: "Hukum Bisnis",
      description: "Mendampingi pendirian perusahaan hingga penyelesaian sengketa korporasi untuk kemajuan bisnis Anda.",
      icon: "💼"
    },
    {
      title: "Hukum Keluarga",
      description: "Menyelesaikan perceraian, hak asuh, dan adopsi dengan penuh empati dan profesionalisme.",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      title: "Hukum Ketenagakerjaan", 
      description: "Melindungi hak-hak pekerja dan pengusaha dalam hubungan industrial yang harmonis.",
      icon: "👔"
    },
    {
      title: "Hukum Pertanahan",
      description: "Menyelesaikan sengketa tanah dan properti dengan pendekatan hukum yang menyeluruh.",
      icon: "🏡"
    }
  ];

  const lawyers = [
    {
      name: "Muhammad Husnul Yakin, S.H.",
      title: "Advokat",
      specialization: "Hukum Pidana & Perdata", 
      experience: "10+ Tahun Pengalaman",
      image: "https://customer-assets.emergentagent.com/job_7a2cddfd-0f62-450d-a09b-0bdcff6e4f2c/artifacts/zrx7ebzb_Muhammad%20Husnul%20Yakin.%20S.H.%20-%20Advokat.jpg"
    },
    {
      name: "Saidil Alim, S.H.",
      title: "Advokat", 
      specialization: "Hukum Bisnis & Korporasi",
      experience: "8+ Tahun Pengalaman",
      image: "https://customer-assets.emergentagent.com/job_7a2cddfd-0f62-450d-a09b-0bdcff6e4f2c/artifacts/n4tsn3o6_SAIDIL%20ALIM%2C%20S.H.%20-%20Advokat.jpg"
    },
    {
      name: "Yusuf, S.H., M.Kn.", 
      title: "Advokat",
      specialization: "Hukum Keluarga & Pertanahan", 
      experience: "12+ Tahun Pengalaman",
      image: "https://customer-assets.emergentagent.com/job_7a2cddfd-0f62-450d-a09b-0bdcff6e4f2c/artifacts/jnfvlkjq_Yusuf%2C%20S.H.%2C%20M.Kn.%20-%20Advokat.jpg"
    }
  ];

  const offices = [
    {
      name: "Kantor Pusat",
      type: "PUSAT",
      address: "Jl. Ngemplak Barongan No.117, Semampir Timur, Kelurahan Semampir, Kec. Sedati, Kabupaten Sidoarjo, Jawa Timur 61253",
      coordinates: "-7.3721964, 112.7755155",
      mapsUrl: "https://maps.app.goo.gl/9EMvfiywbC4x4VY9A"
    },
    {
      name: "Cabang 1", 
      type: "CABANG",
      address: "Perumahan Permata Alam Permai Jl. Jamrud II Desa Gemurung, Kecamatan Gedangan, Kabupaten Sidoarjo, Jawa Timur",
      coordinates: "-7.4013930, 112.7454892",
      mapsUrl: "https://goo.gl/maps/iTBoqCdw3JcioLrv5"
    },
    {
      name: "Cabang 2",
      type: "CABANG", 
      address: "Kapling Pepe Indah, Jl. Jayengrono Blok A-46, Kelurahan Tani Swah, Kec. Sedati, Kabupaten Sidoarjo, Jawa Timur 61253",
      coordinates: "-7.4018375, 112.7643310",
      mapsUrl: "https://maps.app.goo.gl/BVgVrTavwksAgSZ38"
    },
    {
      name: "Cabang 3",
      type: "CABANG",
      address: "Jl. Anggrek No.17, RT.6/RW.2, Kelurahan Bligo, Kec. Candi, Kabupaten Sidoarjo, Jawa Timur 61271", 
      coordinates: "-7.4733294, 112.7172640",
      mapsUrl: "https://maps.app.goo.gl/mWRu1DCkTEgrRA6YA"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Pelayanan Hukum<br />Berkualitas Tinggi
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Di Kantor Pengacara BINA SATRIA MUDA, kami menghadirkan pelayanan hukum berkualitas tinggi 
              yang didukung oleh tim pengacara berpengalaman dan profesional. Kami bertekad untuk melindungi 
              hak-hak klien kami dan mencapai hasil yang optimal dalam setiap permasalahan hukum yang dihadapi.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/6285850473256?text=Halo, saya ingin konsultasi gratis mengenai masalah hukum"
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300 inline-flex items-center justify-center"
              >
                Konsultasi Gratis Sekarang
              </a>
              <a 
                href="#services" 
                className="bg-white text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300 inline-flex items-center justify-center"
              >
                Lihat Layanan Kami
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Perlindungan Hukum</h3>
              <p className="text-gray-600">Melindungi hak-hak klien dengan optimal</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-semibold mb-2">Keadilan</h3>
              <p className="text-gray-600">Menegakkan keadilan dalam setiap kasus</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Tim Profesional</h3>
              <p className="text-gray-600">Didukung advokat berpengalaman</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Konsultasi Gratis</h3>
              <p className="text-gray-600">Konsultasi masalah hukum tanpa biaya</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Layanan Hukum Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami menyediakan berbagai layanan hukum profesional untuk memenuhi kebutuhan klien 
              dari berbagai kalangan dengan standar pelayanan terbaik.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                onClick={() => openServiceModal(service.title)}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <button className="text-blue-600 font-semibold hover:text-blue-800 transition duration-300 flex items-center">
                  Klik untuk Detail 
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="https://wa.me/6285850473256?text=Halo, saya ingin konsultasi gratis mengenai layanan hukum"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition duration-300"
            >
              Konsultasi Layanan Sekarang
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Tim Advokat Profesional</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tim advokat berpengalaman dan profesional yang siap memberikan solusi hukum terbaik 
              untuk setiap permasalahan yang Anda hadapi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lawyers.map((lawyer, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <img 
                  src={lawyer.image} 
                  alt={lawyer.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-blue-900">{lawyer.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{lawyer.title}</p>
                <p className="text-gray-600 mb-2">{lawyer.specialization}</p>
                <p className="text-sm text-gray-500">{lawyer.experience}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-900 p-8 rounded-xl text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">Integritas</h3>
                <p>Menjunjung tinggi nilai-nilai etika dan profesionalisme dalam setiap penanganan kasus</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Keunggulan</h3>
                <p>Memberikan pelayanan hukum terbaik dengan standar kualitas yang tinggi</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Dedikasi</h3>
                <p>Berkomitmen penuh untuk mencapai hasil optimal bagi setiap klien</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Lokasi Kantor Kami</h2>
            <p className="text-xl text-gray-600">
              Kami hadir di 4 lokasi strategis di Sidoarjo untuk memberikan kemudahan akses layanan hukum bagi klien kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <h3 className="text-2xl font-semibold text-blue-900">{office.name}</h3>
                  <span className="ml-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {office.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{office.address}</p>
                <p className="text-sm text-gray-500 mb-6">Koordinat: {office.coordinates}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={office.mapsUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-center"
                  >
                    Buka di Google Maps
                  </a>
                  <a 
                    href="https://wa.me/6285850473256"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 text-center"
                  >
                    Hubungi WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-blue-50 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Butuh Konsultasi Segera?</h3>
            <p className="text-gray-600 mb-6">Hubungi kami di lokasi terdekat atau konsultasi gratis melalui WhatsApp</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/6285850473256"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300"
              >
                WhatsApp: +6285850473256
              </a>
              <a 
                href="mailto:bsm.bismill4h@gmail.com"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Email: bsm.bismill4h@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Hubungi Kami</h2>
            <p className="text-xl text-gray-600">
              Jangan ragu untuk menghubungi kami. Tim profesional kami siap memberikan konsultasi hukum gratis 
              dan solusi terbaik untuk permasalahan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">Informasi Kontak</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.687"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">WhatsApp</h4>
                      <p className="text-gray-600">+6285850473256</p>
                      <p className="text-sm text-gray-500">Konsultasi gratis 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Email</h4>
                      <p className="text-gray-600">bsm.bismill4h@gmail.com</p>
                      <p className="text-sm text-gray-500">Kirim pertanyaan detail</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2C6.5,2 2,6.5 2,12C2,17.5 6.5,22 12,22C17.5,22 22,17.5 22,12C22,6.5 17.5,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Jam Operasional</h4>
                      <p className="text-gray-600">08:00 - 17:00 WIB</p>
                      <p className="text-sm text-gray-500">Senin - Sabtu</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">Alamat Kantor Pusat</h3>
                <p className="text-gray-600 mb-4">
                  Jl. Ngemplak Barongan No.117, Semampir Timur, Kelurahan Semampir, Kec. Sedati, 
                  Kabupaten Sidoarjo, Jawa Timur 61253
                </p>
                <a 
                  href="https://maps.app.goo.gl/9EMvfiywbC4x4VY9A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Lihat di Peta
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-blue-900">Kirim Pesan</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon *</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subjek Konsultasi *</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pesan / Deskripsi Masalah *</label>
                  <textarea 
                    rows="5" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
                >
                  Kirim via WhatsApp
                </button>
              </form>
              
              <div className="mt-8 p-6 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-lg text-green-800 mb-2">Konsultasi Gratis</h4>
                <p className="text-green-700 mb-4">
                  Dapatkan konsultasi hukum gratis dari tim advokat profesional kami. Kami siap membantu 24/7 melalui WhatsApp.
                </p>
                <a 
                  href="https://wa.me/6285850473256?text=Halo,%20saya%20ingin%20konsultasi%20gratis%20mengenai%20masalah%20hukum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Mulai Konsultasi
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-blue-900 p-8 rounded-xl text-white text-center">
            <h3 className="text-2xl font-semibold mb-4">Mengapa Memilih Kami?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center justify-center">
                <span className="mr-2">✓</span>
                <span>Tim advokat berpengalaman dan profesional</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">✓</span>
                <span>Konsultasi hukum gratis untuk semua klien</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">✓</span>
                <span>4 lokasi strategis di Sidoarjo</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">✓</span>
                <span>Hasil optimal untuk setiap kasus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <a 
              href="https://app.emergent.sh/?utm_source=emergent-badge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-white transition duration-300"
            >
              <img 
                src="https://avatars.githubusercontent.com/in/1201222?s=120&u=2686cf91179bbafbc7a71bfbc43004cf9ae1acea&v=4" 
                alt="Emergent" 
                className="w-8 h-8 mr-2"
              />
              Made with Emergent
            </a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
      
      {/* Service Modal */}
      <ServiceModal 
        service={selectedService}
        isOpen={isModalOpen}
        onClose={closeServiceModal}
      />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;