"use client";

import { use, useState } from "react";
import { useCartStore } from "@/app/cart/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Star, Truck, BadgeCheck, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Tipagem correta para App Router (não usar Promise)
interface Props {
  params: { category: string; product: string };
}

export default function ProductPage({ params }: { params: Promise<Props["params"]> }) {
  const { category, product } = use(params);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  // --- Estados de animação ---
  const [addedMain, setAddedMain] = useState(false);
  const [buyClicked, setBuyClicked] = useState(false);
  const [addedRelated, setAddedRelated] = useState<Record<string, boolean>>({});

  /**
   * Imagens de TODOS os produtos
   * (adicione as imagens na pasta public/ com os nomes correspondentes)
   */
  const productImages: Record<string, string> = {
    // VIPs
    pro: "/vip-pro.png",
    elite: "/vip-elite.png",
    mestre: "/vip-mestre.png",

    // Boosters
    booster1: "/boosters-category.png",
    booster2: "/boosters-category.png",
    booster3: "/boosters-category.png",

    // Cash
    cash50: "/cash-category.png",
    cash100: "/cash-category.png",
    cash500: "/cash-category.png",

    // Coins (exemplo)
    coin50: "/coins-category.png",
    coin100: "/coins-category.png",
    coin500: "/coins-category.png",

    // Serviços
    unban: "/services-category.png",
    unmute: "/services-category.png",
    rename: "/services-category.png",
  };

  // Se não houver imagem específica, usa um default
  const imageSrc = productImages[product] ?? "/images/default-product.png";

  // --- Funções ---
  const handleAddToCart = () => {
    addItem({
      id: product,
      nome: product,
      preco: 50,
      quantidade: 1,
      categoria: category,
    });
    setAddedMain(true);
    setTimeout(() => setAddedMain(false), 800);
  };

  const handleBuyNow = () => {
    addItem({
      id: product,
      nome: product,
      preco: 50,
      quantidade: 1,
      categoria: category,
    });
    setBuyClicked(true);
    setTimeout(() => setBuyClicked(false), 200);
    router.push("/cart");
  };

  const handleAddRelated = (p: string) => {
    addItem({
      id: p,
      nome: p,
      preco: 50,
      quantidade: 1,
      categoria: "vips",
    });
    setAddedRelated((prev) => ({ ...prev, [p]: true }));
    setTimeout(
      () => setAddedRelated((prev) => ({ ...prev, [p]: false })),
      800
    );
  };

  return (
    <>
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      <div className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mb-4 flex flex-wrap gap-2">
        <Link
          href="/"
          className="hover:underline text-neutral-600 dark:text-neutral-400"
        >
          Home
        </Link>
        <span className="select-none">/</span>
        <Link
          href={`/${category}`}
          className="hover:underline text-neutral-600 dark:text-neutral-400 capitalize"
        >
          {category}
        </Link>
        <span className="select-none">/</span>
        <span className="capitalize font-medium text-neutral-900 dark:text-white">
          {product}
        </span>
      </div>


      {/* Produto principal */}
      <Card className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold capitalize flex flex-wrap gap-2 items-center justify-between text-neutral-900 dark:text-white">
            {product}
            <span className="text-xs px-3 py-1 rounded-full bg-yellow-200/70 text-yellow-800 dark:bg-yellow-400/20 dark:text-yellow-300 font-medium">
              🔥 Mais Vendido
            </span>
          </CardTitle>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
            Categoria: {category}
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Imagem */}
            <div className="flex items-center justify-center bg-neutral-50 dark:bg-neutral-800 rounded-xl p-6 sm:p-8">
              <Image
                src={imageSrc}
                alt={product}
                width={350}
                height={350}
                className="object-contain"
              />
            </div>

            {/* Detalhes */}
            <div className="space-y-6">
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
                <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">
                  +1.200 jogadores já compraram
                </span>
              </div>

              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Torne-se <strong>{product.toUpperCase()}</strong> no servidor e
                desbloqueie poderes exclusivos. Entre no jogo com status,
                conquiste respeito e aproveite benefícios que só os VIPs têm
                acesso.
              </p>

              <p className="text-xl sm:text-2xl font-bold text-green-600">
                R$ 50,00
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  className={`flex-1 cursor-pointer rounded-xl flex items-center justify-center gap-2 transition-transform duration-200 ${addedMain ? "scale-105 bg-green-500 text-white" : ""
                    }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {addedMain ? "Adicionado!" : "Adicionar"}
                </Button>

                <Button
                  variant="secondary"
                  onClick={handleBuyNow}
                  className={`flex-1 cursor-pointer rounded-xl flex items-center justify-center gap-2 transition-transform duration-200 ${buyClicked ? "scale-105" : ""
                    }`}
                >
                  <Zap className="w-5 h-5" />
                  Comprar Agora
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-green-500 shrink-0" />
                  Entrega automática no servidor
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-blue-500 shrink-0" />
                  Suporte dedicado via Discord
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Especificações */}
      <Card className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white">
            Especificações Técnicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm sm:text-base border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
            <tbody>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <td className="p-3 font-medium bg-neutral-50 dark:bg-neutral-800">
                  Servidor
                </td>
                <td className="p-3">jogar.terax.world</td>
              </tr>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <td className="p-3 font-medium bg-neutral-50 dark:bg-neutral-800">
                  Tipo
                </td>
                <td className="p-3">VIP {product.toUpperCase()}</td>
              </tr>
              <tr>
                <td className="p-3 font-medium bg-neutral-50 dark:bg-neutral-800">
                  Duração
                </td>
                <td className="p-3">30 dias</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Relacionados - exemplo só para VIPs */}
      {category === "vips" && (
        <Card className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white">
              Produtos Relacionados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {["pro", "elite", "mestre"].map((p) => (
                <div
                  key={p}
                  className="flex flex-col items-center rounded-xl border border-neutral-200 dark:border-neutral-800
                             bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-sm hover:shadow-md 
                             hover:scale-[1.02] transition-all p-4"
                >
                  <Image
                    src={productImages[p]}
                    alt={p}
                    width={350}
                    height={350}
                    className="object-contain"
                  />
                  <p className="font-medium capitalize text-neutral-900 dark:text-white">
                    {p}
                  </p>
                  <p className="text-green-600 font-bold">R$ 50,00</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddRelated(p)}
                    className={`mt-2 flex cursor-pointer items-center justify-center gap-2 transition-transform duration-200 ${addedRelated[p]
                      ? "scale-105 bg-green-500 text-white"
                      : ""
                      }`}
                  >
                    {addedRelated[p] ? "Adicionado!" : "Adicionar"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA Voltar */}
      <div className="text-center">
        <Link
          href={`/${category}`}
          className="inline-block px-6 py-3 rounded-xl bg-neutral-900 text-white hover:scale-105 transition text-sm sm:text-base"
        >
          Voltar para {category}
        </Link>
      </div>
    </main>
    </>
  );
}
