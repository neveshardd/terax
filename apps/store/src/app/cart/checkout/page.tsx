"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/app/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  Barcode,
  LogIn,
  TicketPercent,
  User,
  FileText,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";

export default function CheckoutPage() {
  const { loading, user } = useAuth();
  const items = useCartStore((state) => state.items);
  const cartTotal = useCartStore((state) => state.total());

  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | null>(null);
  const [loadingg, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [nick, setNick] = useState("");
  const [cpf, setCpf] = useState("");

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}/login?redirect=${encodeURIComponent(window.location.href)}`;
    }
  }, [user, loading]);


  if (loading || !user) return <p>Carregando...</p>

  const handleApplyCoupon = () => {
    if (coupon === "BEMVINDO10") {
      setDiscount(cartTotal * 0.1);
      setCouponApplied("BEMVINDO10");
    } else if (coupon === "DESCONTO5") {
      setDiscount(5);
      setCouponApplied("DESCONTO5");
    } else {
      alert("Cupom inválido");
      setDiscount(0);
      setCouponApplied(null);
    }
  };

  const totalWithDiscount = cartTotal - discount;

  const handleCheckout = () => {
    if (!paymentMethod) return alert("Escolha um método de pagamento");
    if (!nick) return alert("Informe o nick do jogador");

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  if (!loading && !user) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-neutral-900 dark:text-white">
          Checkout
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Você precisa estar logado para finalizar sua compra.
        </p>
        <Button className="rounded-xl flex items-center gap-2 mx-auto shadow-md hover:scale-[1.02] transition-transform">
          <LogIn className="w-5 h-5" /> Fazer Login
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Checkout
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              Finalizando compra para: <strong>{user.name}</strong>
            </p>
          </div>

          <Link
            href="/cart"
            className="flex items-center gap-2 text-sm sm:text-base px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:scale-105 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Carrinho
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400 text-center py-10">
            Seu carrinho está vazio 🛒
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6 lg:col-span-2">
              <Card className="rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-white text-lg sm:text-xl">
                    <User className="w-5 h-5 text-green-600" />
                    Dados do Jogador
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block font-medium text-neutral-800 dark:text-neutral-200 text-sm">
                      Nick do Jogador *
                    </label>
                    <input
                      type="text"
                      value={nick}
                      onChange={(e) => setNick(e.target.value)}
                      placeholder="Ex: SeuNick123"
                      className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 p-3 text-sm sm:text-base focus:ring-2 focus:ring-green-500 outline-none transition"
                    />
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                      ⚠️ Atenção: não nos responsabilizamos por nicks incorretos.
                    </p>
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-800 dark:text-neutral-200 text-sm">
                      CPF (opcional)
                    </label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      placeholder="000.000.000-00"
                      className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 p-3 text-sm sm:text-base focus:ring-2 focus:ring-green-500 outline-none transition"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-white text-lg sm:text-xl">
                    <TicketPercent className="w-5 h-5 text-yellow-500" />
                    Cupom de Desconto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      placeholder="Digite seu cupom"
                      className="flex-1 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-2 bg-white dark:bg-neutral-950 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      variant="outline"
                      className="flex items-center justify-center gap-2 rounded-xl shadow-sm px-4 py-2"
                    >
                      <TicketPercent className="w-5 h-5" />
                      Aplicar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-white text-lg sm:text-xl">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Método de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant={paymentMethod === "pix" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("pix")}
                      className="flex items-center justify-center gap-2 flex-1 py-4 sm:py-6 rounded-xl"
                    >
                      <Barcode className="w-5 h-5" />
                      PIX
                    </Button>
                    <Button
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("card")}
                      className="flex items-center justify-center gap-2 flex-1 py-4 sm:py-6 rounded-xl"
                    >
                      <CreditCard className="w-5 h-5" />
                      Cartão
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-white text-lg sm:text-xl">
                    <ShoppingBag className="w-5 h-5 text-purple-500" />
                    Resumo do Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-700 pb-2 text-sm sm:text-base"
                    >
                      <span className="text-neutral-700 dark:text-neutral-300">
                        {item.nome} x{item.quantidade}
                      </span>
                      <span className="font-semibold text-green-600">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between items-center font-medium text-neutral-800 dark:text-neutral-200 text-sm sm:text-base">
                    <span>Subtotal:</span>
                    <span>R$ {cartTotal.toFixed(2)}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between items-center text-green-600 text-sm sm:text-base">
                      <span>Cupom {couponApplied}:</span>
                      <span>- R$ {discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                    <span>Total:</span>
                    <span className="text-green-600">
                      R$ {totalWithDiscount.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className={`w-full flex justify-center items-center gap-2 rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-200 text-sm sm:text-base ${loadingg ? "scale-95 opacity-70" : ""
                      }`}
                    disabled={loadingg || !nick || !paymentMethod}
                  >
                    {loadingg
                      ? "Processando..."
                      : success
                        ? "Compra Concluída!"
                        : "Finalizar Compra"}
                  </Button>

                  {success && (
                    <p className="text-green-600 mt-4 text-center text-sm sm:text-base">
                      Compra simulada com sucesso! 🎉
                    </p>
                  )}

                  <div className="text-center mt-4">
                    <Link
                      href="/cart"
                      className="inline-flex items-center gap-2 text-sm sm:text-base px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:scale-105 transition"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Voltar ao Carrinho
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
