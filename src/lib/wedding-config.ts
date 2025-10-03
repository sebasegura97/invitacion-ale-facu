export interface WeddingConfig {
  date: string;
  time: string;
  location: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  dressCode: string;
  giftInfo: {
    message: string;
    accounts: Array<{
      bank: string;
      account: string;
      name: string;
    }>;
  };
}

export const WEDDING_CONFIG: WeddingConfig = {
  date: "2024-06-15",
  time: "18:00",
  location: "Hacienda San José, Puebla",
  address: "Carretera Federal Puebla-Tlaxcala Km 8.5",
  coordinates: {
    lat: 19.0414,
    lng: -98.2063,
  },
  dressCode: "Elegante - Colores pastel y neutros",
  giftInfo: {
    message: "Tu presencia es nuestro mejor regalo, pero si deseas contribuir:",
    accounts: [
      {
        bank: "BBVA",
        account: "0123456789",
        name: "Alejandra González",
      },
      {
        bank: "Santander",
        account: "9876543210",
        name: "Facundo Martínez",
      },
    ],
  },
};
