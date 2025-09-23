"use client";

import { useCartStore } from "@/app/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Bonus {
  id: string;
  label: string;
  condition: (total: number) => boolean;
  amount: (total: number) => number;
  color?: string;
  durationMinutes?: number; // duração em minutos
}

const productNames: Record<string, string> = {
  pro: "VIP Pro",
  elite: "VIP Elite",
  mestre: "VIP Mestre",
  booster1: "Booster 1h",
  booster2: "Booster 2h",
  booster3: "Booster 3h",
  cash50: "Cash 50",
  cash100: "Cash 100",
  cash500: "Cash 500",
  coin50: "Coins 50",
  coin100: "Coins 100",
  coin500: "Coins 500",
  unban: "Unban",
  unmute: "Unmute",
  rename: "Rename",
};

export default function MiniCart() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total());
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  // --- Definindo os bônus ---
  const bonuses: Bonus[] = [
    {
      id: "bonus5",
      label: "+5% de desconto por compras acima de R$100",
      condition: (t) => t >= 100 && bonusTimeLeft["bonus5"] > 0,
      amount: (t) => t * 0.05,
      color: "text-yellow-600",
      durationMinutes: 1, // duração em minutos
    },
  ];

  const [bonusTimeLeft, setBonusTimeLeft] = useState<Record<string, number>>({});

  // --- Atualizar cooldown a cada segundo ---
  useEffect(() => {
    const stored = localStorage.getItem("bonusTimeLeft");
    if (stored) {
      setBonusTimeLeft(JSON.parse(stored));
    } else {
      const initial: Record<string, number> = {};
      bonuses.forEach((b) => {
        initial[b.id] = (b.durationMinutes || 10) * 60; // minutos -> segundos
      });
      setBonusTimeLeft(initial);
    }

    const interval = setInterval(() => {
      setBonusTimeLeft((prev) => {
        const updated: Record<string, number> = {};
        for (const key in prev) {
          updated[key] = Math.max(prev[key] - 1, 0);
        }
        localStorage.setItem("bonusTimeLeft", JSON.stringify(updated));
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const appliedBonuses = bonuses.filter((b) => b.condition(total));
  const totalBonus = appliedBonuses.reduce((acc, b) => acc + b.amount(total), 0);
  const totalWithBonus = total - totalBonus;

  const bonusThreshold = 100;
  const missing = Math.max(bonusThreshold - total, 0);
  const progress = Math.min((total / bonusThreshold) * 100, 100);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Card className="rounded-2xl shadow-md border border-yellow-500/40 bg-white dark:bg-neutral-900 backdrop-blur-md">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
              {items.length > 0 ? `Seu Carrinho (${items.length} itens)` : "Seu Carrinho"}
            </CardTitle>
            {items.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={clearCart}
                className="rounded-full cursor-pointer shadow-sm hover:scale-105 transition bg-red-500 hover:bg-red-600"
              >
                Esvaziar
              </Button>
            )}
          </CardHeader>

          <CardContent>
            {items.length === 0 ? (
              <p className="text-neutral-500 dark:text-neutral-400 text-center py-16 text-base sm:text-lg">
                Seu carrinho está vazio 🛒
                <br />
                <span className="text-yellow-600 font-semibold block mt-2">
                  Garanta já seus kits e vantagens exclusivas no servidor!
                </span>
              </p>
            ) : (
              <>
                <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-neutral-900 dark:text-white">
                          {productNames[item.nome] || item.nome}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          R$ {item.preco.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg text-yellow-600 min-w-[80px] text-right">
                          R$ {item.preco.toFixed(2)}
                        </span>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Resumo e bônus */}
                <div className="mt-6 border-t border-yellow-500/30 pt-4 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                    <span className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">Total:</span>
                    <span className="text-xl sm:text-2xl font-bold text-yellow-600">
                      R$ {totalWithBonus.toFixed(2)}
                    </span>
                  </div>

                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                    <div className="h-2 bg-yellow-500 transition-all" style={{ width: `${progress}%` }} />
                  </div>

                  {/* Mensagens de bônus */}
                  {appliedBonuses.map((b) => (
                    <p key={b.id} className={`text-sm mt-2 font-semibold ${b.color || "text-yellow-600"}`}>
                      🎉 {b.label} (-{b.amount(total).toFixed(2)} R$) | Tempo restante: {Math.floor(bonusTimeLeft[b.id] / 60)}m {bonusTimeLeft[b.id] % 60}s
                    </p>
                  ))}

                  {!appliedBonuses.find((b) => b.id === "bonus5") && missing > 0 && (
                    <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-400">
                      💡 Faltam <span className="font-semibold text-yellow-600">R$ {missing.toFixed(2)}</span> para ganhar <strong>+5% de desconto</strong>!
                    </p>
                  )}

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                    Seus itens serão entregues automaticamente no servidor assim que o pagamento for confirmado.
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => router.push("/cart/checkout")}
                    className="flex-1 cursor-pointer rounded-xl shadow-md bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:scale-[1.02] transition-transform text-base sm:text-lg font-bold"
                  >
                    Finalizar Compra 🚀
                  </Button>
                  <Button
                    onClick={() => router.push("/")}
                    variant="outline"
                    className="flex-1 cursor-pointer rounded-xl shadow-md border-yellow-500 text-yellow-600 hover:bg-yellow-500/10 transition-transform"
                  >
                    Continuar Comprando
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
