export interface BankAccount {
  id: string;
  owner: string; // Nombre del titular
  bank: string; // Banco o institución
  currency: string; // Moneda (ARS, USD, EUR, CHF)
  country: string; // País o región
  accountType?: string; // Tipo de cuenta (opcional)
  cbu?: string; // CBU (para Argentina)
  alias?: string; // Alias de cuenta
  accountNumber?: string; // Número de cuenta
  cuit?: string; // CUIT (para Argentina)
  iban?: string; // IBAN (para cuentas internacionales)
  phoneNumber?: string; // Número de teléfono (para apps como TWINT)
  description?: string; // Descripción adicional
}

export interface WeddingConfig {
  date: string;
  confirmationDateLimit: string;
  time: string;
  location: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  dressCode: string;
  giftInfo: {
    accounts: BankAccount[];
  };
}

export const WEDDING_CONFIG: WeddingConfig = {
  date: "20 de diciembre de 2025",
  confirmationDateLimit: "7 de noviembre de 2025",
  time: "Desde las 17:30hs",
  location: "Hosteria la Caldera",
  address: "Santa Mónica s/n, La Caldera, Salta",
  coordinates: {
    lat: 19.0414,
    lng: -98.2063,
  },
  dressCode: "Elegante Sport",
  giftInfo: {
    accounts: [
      // Cuentas de Alejandra Burgos
      {
        id: "ale-brubank-ars",
        owner: "Alejandra Burgos",
        bank: "Brubank",
        currency: "ARS",
        country: "Argentina",
        cbu: "1430001713033434630019",
        alias: "alejandraburgos.bru",
        accountNumber: "1303343463001",
        cuit: "27-38651225-1",
      },

      // Cuentas de Facundo Mirabella
      {
        id: "facu-bbva-ars",
        owner: "Facundo Mirabella",
        bank: "BBVA",
        currency: "ARS",
        country: "Argentina",
        cbu: "0170087940000037577249",
        alias: "Fmirabe",
      },
      {
        id: "facu-bbva-usd",
        owner: "Facundo Mirabella",
        bank: "BBVA",
        currency: "USD",
        country: "Argentina",
        cbu: "0170087944000032064335",
        alias: "FMIRABEUSD",
      },
      {
        id: "facu-bbva-eur",
        owner: "Facundo Mirabella",
        bank: "BBVA",
        currency: "EUR",
        country: "Argentina",
        cbu: "0170087941000000148417",
      },
      {
        id: "facu-ubs-chf",
        owner: "Facundo Mirabella",
        bank: "UBS",
        currency: "CHF",
        country: "Suiza",
        iban: "CH54 0026 8268 1372 0540 N",
        description: "Cuenta en francos suizos",
      },
      {
        id: "facu-twint",
        owner: "Facundo Mirabella",
        bank: "TWINT",
        currency: "CHF",
        country: "Suiza",
        phoneNumber: "+41 79 269 5228",
        description: "App de pagos móviles en Suiza",
      },
      {
        id: "facu-revolut-eur",
        owner: "Facundo Mirabella",
        bank: "Revolut",
        currency: "EUR",
        country: "Europa",
        iban: "LT20 3250 0281 1577 7375",
        description: "Cuenta en euros para transferencias en el exterior",
      },
    ],
  },
};
