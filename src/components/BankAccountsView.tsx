"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Wallet, ChevronDown, Check, Copy } from "lucide-react";
import TextDraw from "./TextDraw";
import AnimatedIcon from "./AnimatedIcon";
import Button from "./ui/Button";
import { WEDDING_CONFIG, BankAccount } from "@/lib/wedding-config";

type Region = "argentina" | "suiza" | "europa" | null;

export default function BankAccountsView({ onBack }: { onBack: () => void }) {
  const [selectedRegion, setSelectedRegion] = useState<Region>(null);
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, fieldId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const filterAccountsByRegion = (region: Region): BankAccount[] => {
    if (!region) return [];
    const accounts = WEDDING_CONFIG.giftInfo.accounts;

    switch (region) {
      case "argentina":
        return accounts.filter((acc) => acc.country === "Argentina");
      case "suiza":
        return accounts.filter((acc) => acc.country === "Suiza");
      case "europa":
        return accounts.filter((acc) => acc.country === "Europa");
      default:
        return [];
    }
  };

  const regions = [
    { id: "argentina" as Region, name: "Argentina", flag: "🇦🇷" },
    { id: "suiza" as Region, name: "Suiza", flag: "🇨🇭" },
    { id: "europa" as Region, name: "Europa", flag: "🌍" },
  ];

  const renderAccountField = (
    label: string,
    value: string | undefined,
    accountId: string,
    fieldName: string
  ) => {
    if (!value) return null;
    const fieldId = `${accountId}-${fieldName}`;

    return (
      <div className="flex items-center justify-between py-2 border-b border-wedding-text/10">
        <div className="flex-1">
          <div className="text-xs text-wedding-text/60 mb-1">{label}</div>
          <div className="text-sm font-mono text-wedding-text">{value}</div>
        </div>
        <button
          onClick={() => copyToClipboard(value, fieldId)}
          className="ml-4 p-2 hover:bg-wedding-text/5 rounded-lg transition-colors"
        >
          {copiedField === fieldId ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-wedding-text/40" />
          )}
        </button>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8 rounded-lg shadow-lg flex flex-col gap-6"
    >
      <AnimatedIcon Icon={Wallet} delay={0.5} className="w-8 h-8 mx-auto" />

      <TextDraw delay={1.5} duration={2} size="3xl" className="text-center">
        Datos para transferencias
      </TextDraw>

      {!selectedRegion ? (
        <>
          <TextDraw
            delay={3.5}
            duration={1.5}
            size="lg"
            className="text-center"
          >
            ¿Desde dónde nos enviarás el regalo?
          </TextDraw>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4"
          >
            {regions.map((region, idx) => (
              <motion.button
                key={region.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5 + idx * 0.2 }}
                onClick={() => setSelectedRegion(region.id)}
                className="p-6 rounded-lg border-2 border-wedding-text/20 hover:border-wedding-text/50 hover:bg-wedding-text/5 transition-all flex flex-col items-center gap-3"
              >
                <span className="text-4xl">{region.flag}</span>
                <span className="text-lg font-cursive text-wedding-text">
                  {region.name}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRegion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-6">
              <TextDraw delay={0.5} duration={1} size="xl">
                Cuentas disponibles
              </TextDraw>
              <button
                onClick={() => {
                  setSelectedRegion(null);
                  setExpandedAccount(null);
                }}
                className="text-sm text-wedding-text/60 hover:text-wedding-text underline"
              >
                Cambiar región
              </button>
            </div>

            {filterAccountsByRegion(selectedRegion).map((account, idx) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + idx * 0.15 }}
                className="border border-wedding-text/20 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedAccount(
                      expandedAccount === account.id ? null : account.id
                    )
                  }
                  className="w-full p-4 flex items-center justify-between hover:bg-wedding-text/5 transition-colors"
                >
                  <div className="flex flex-col items-start gap-1">
                    <div className="font-cursive text-lg text-wedding-text">
                      {account.bank} • {account.currency}
                    </div>
                    <div className="text-sm text-wedding-text/60">
                      {account.owner}
                    </div>
                  </div>
                  <motion.div
                    animate={{
                      rotate: expandedAccount === account.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-wedding-text/60" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedAccount === account.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-wedding-text/5 space-y-2">
                        {renderAccountField(
                          "CBU",
                          account.cbu,
                          account.id,
                          "cbu"
                        )}
                        {renderAccountField(
                          "Alias",
                          account.alias,
                          account.id,
                          "alias"
                        )}
                        {renderAccountField(
                          "Nº de cuenta",
                          account.accountNumber,
                          account.id,
                          "accountNumber"
                        )}
                        {renderAccountField(
                          "CUIT",
                          account.cuit,
                          account.id,
                          "cuit"
                        )}
                        {renderAccountField(
                          "IBAN",
                          account.iban,
                          account.id,
                          "iban"
                        )}
                        {renderAccountField(
                          "Teléfono",
                          account.phoneNumber,
                          account.id,
                          "phoneNumber"
                        )}
                        {account.description && (
                          <div className="pt-2 text-xs text-wedding-text/50 italic">
                            {account.description}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <Button onClick={onBack} size="md" variant="outline" className="mt-4">
        <TextDraw delay={0} duration={0.5} size="md">
          Volver
        </TextDraw>
      </Button>
    </motion.div>
  );
}
