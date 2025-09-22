import Link from "next/link";
import Image from "next/image";

interface Produto {
  id: string;
  nome: string;
  preco: number;
  descricao?: string;
  imagem?: string;
  beneficios?: Record<string, boolean | string>;
}

type Categoria =
  | "vips"
  | "boosters"
  | "cash"
  | "coins"
  | "services"
  | "medalhas";

const produtos: Record<Categoria, Produto[]> = {
  vips: [
    {
      id: "pro",
      nome: "PRO",
      preco: 50,
      imagem: "/vip-pro.png",
      beneficios: {
        "Chat Prefix": "PRO neveshardd",
        "/fly": true,
        "/hat": true,
        "/nick": false,
        "/tpa": false,
        "Acesso áreas exclusivas": true,
      },
    },
    {
      id: "elite",
      nome: "ELITE",
      preco: 100,
      imagem: "/vip-elite.png",
      beneficios: {
        "Chat Prefix": "ELITE neveshardd",
        "/fly": true,
        "/hat": true,
        "/nick": true,
        "/tpa": false,
        "Acesso áreas exclusivas": true,
      },
    },
    {
      id: "mestre",
      nome: "MESTRE",
      preco: 150,
      imagem: "/vip-mestre.png",
      beneficios: {
        "Chat Prefix": "MESTRE neveshardd",
        "/fly": true,
        "/hat": true,
        "/nick": true,
        "/tpa": true,
        "Acesso áreas exclusivas": true,
      },
    },
  ],

  boosters: [
    {
      id: "booster1",
      nome: "Booster 1h",
      preco: 10,
      descricao: "Multiplique seus ganhos por 1 hora",
      imagem: "/boosters-category.png",
    },
    {
      id: "booster2",
      nome: "Booster 3h",
      preco: 25,
      descricao: "Evolução acelerada por 3 horas",
      imagem: "/boosters-category.png",
    },
    {
      id: "booster3",
      nome: "Booster 24h",
      preco: 70,
      descricao: "Vantagens máximas por 24 horas",
      imagem: "/boosters-category.png",
    },
  ],

  cash: [
    {
      id: "cash50",
      nome: "50 Cash",
      preco: 5,
      descricao: "Saldo virtual para usar na loja",
      imagem: "/cash-category.png",
    },
    {
      id: "cash100",
      nome: "100 Cash",
      preco: 10,
      descricao: "Mais saldo para suas compras",
      imagem: "/cash-category.png",
    },
    {
      id: "cash500",
      nome: "500 Cash",
      preco: 40,
      descricao: "Pacote econômico de saldo",
      imagem: "/cash-category.png",
    },
  ],

  coins: [
    {
      id: "coin50",
      nome: "50 Coins",
      preco: 2,
      descricao: "Moedas para itens exclusivos",
      imagem: "/coins-category.png",
    },
    {
      id: "coin100",
      nome: "100 Coins",
      preco: 3.5,
      descricao: "Pacote intermediário de moedas",
      imagem: "/coins-category.png",
    },
    {
      id: "coin500",
      nome: "500 Coins",
      preco: 15,
      descricao: "Pacote econômico de moedas",
      imagem: "/coins-category.png",
    },
  ],

  services: [
    {
      id: "unban",
      nome: "Unban",
      preco: 100,
      descricao: "Remoção de banimento do servidor",
      imagem: "/services-category.png",
    },
    {
      id: "unmute",
      nome: "Unmute",
      preco: 50,
      descricao: "Remoção de mute do chat",
      imagem: "/services-category.png",
    },
    {
      id: "rename",
      nome: "Rename Player",
      preco: 75,
      descricao: "Alteração do nick do jogador",
      imagem: "/services-category.png",
    },
  ],

  medalhas: [
    {
      id: "medal1",
      nome: "Pacote Tóxico",
      preco: 20,
      descricao: "3 medalhas exclusivas",
      imagem: "/medals-category.png",
    },
    {
      id: "medal2",
      nome: "Pacote Experiência",
      preco: 50,
      descricao: "7 medalhas exclusivas",
      imagem: "/medals-category.png",
    },
    {
      id: "medal3",
      nome: "Pacote Sarcástico",
      preco: 100,
      descricao: "15 medalhas exclusivas",
      imagem: "/medals-category.png",
    },
  ],
};


const categoryIcons: Record<Categoria, React.ReactNode> = {
  boosters: <Image src={"/boosters-category.png"} width={100} height={100} alt="boosters" />,
  cash: <Image src={"/cash-category.png"} width={100} height={100} alt="cash" />,
  coins: <Image src={"/coins-category.png"} width={100} height={100} alt="coins" />,
  services: <Image src={"/services-category.png"} width={100} height={100} alt="services" />,
  medalhas: <Image src={"/medals-category.png"} width={100} height={100} alt="medalhas" />,
  vips: <Image src={"/vips-category.png"} width={100} height={100} alt="vips" />,
};

const formatPrice = (valor: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);

const Check = ({ value }: { value: boolean | string }) =>
  typeof value === "boolean" ? (
    value ? (
      <span className="text-green-600 font-bold">✔</span>
    ) : (
      <span className="text-red-500 font-bold">✘</span>
    )
  ) : (
    <span className="font-mono">{value}</span>
  );

interface Props {
  params: Promise<{ category: Categoria }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const produtosDaCategoria = produtos[category];

  if (!produtosDaCategoria) {
    return (
      <div className="max-w-4xl mx-auto text-center p-10">
        <h1 className="text-3xl font-bold mb-4">Categoria não encontrada</h1>
        <p className="text-neutral-600">
          A categoria <strong>{category}</strong> não existe.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 rounded-xl bg-neutral-900 text-white hover:scale-105 transition"
        >
          Voltar para a loja
        </Link>
      </div>
    );
  }

  if (produtosDaCategoria.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center p-10">
        <h1 className="text-3xl font-bold mb-4 capitalize">{category}</h1>
        <p className="text-neutral-600">Nenhum produto disponível nesta categoria ainda.</p>
      </div>
    );
  }

  if (category === "vips") {
    const beneficiosList = Object.keys(produtosDaCategoria[0].beneficios || {});

    return (
      <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mb-4 flex flex-wrap gap-2">
          <Link
            href="/"
            className="hover:underline text-neutral-600 dark:text-neutral-400"
          >
            Home
          </Link>
          <span className="select-none">/</span>
          {category}
        </div>

        <h1 className="text-3xl font-bold mb-4">Planos VIP</h1>
        <p className="text-neutral-600 mb-10">
          Escolha o plano ideal para desbloquear benefícios exclusivos e melhorar sua experiência no servidor.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {produtosDaCategoria.map((vip) => (
            <div
              key={vip.id}
              className="flex flex-col p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 
                         bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md 
                         shadow-sm hover:shadow-md hover:scale-[1.02] transition-all"
            >
              {vip.imagem && (
                <Image
                  src={vip.imagem}
                  alt={vip.nome}
                  width={150}
                  height={150}
                  className="object-contain mx-auto mb-3"
                />
              )}
              <div className="text-xl font-semibold text-neutral-900 dark:text-white">
                {vip.nome}
              </div>
              <div className="mt-2 text-sm text-neutral-500">
                Benefícios exclusivos no servidor
              </div>
              <div className="mt-4 text-2xl font-bold text-green-600">
                {formatPrice(vip.preco)}
              </div>
              <Link
                href={`/vips/${vip.id}`}
                className="mt-6 px-4 py-2 rounded-sm bg-yellow-400 font-bold text-neutral-900 hover:bg-yellow-500 transition"
              >
                Comprar
              </Link>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-4">Comparativo de benefícios</h2>
        <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-neutral-100 dark:bg-neutral-900">
              <tr>
                <th className="border border-neutral-300 dark:border-neutral-700 p-3 text-left">
                  Benefícios
                </th>
                {produtosDaCategoria.map((vip) => (
                  <th
                    key={vip.id}
                    className="border border-neutral-300 dark:border-neutral-700 p-3 text-center"
                  >
                    {vip.nome}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {beneficiosList.map((beneficio) => (
                <tr key={beneficio} className="hover:bg-neutral-50 dark:hover:bg-neutral-800">
                  <td className="border border-neutral-300 dark:border-neutral-700 p-3">
                    {beneficio}
                  </td>
                  {produtosDaCategoria.map((vip) => (
                    <td
                      key={vip.id}
                      className="border border-neutral-300 dark:border-neutral-700 p-3 text-center"
                    >
                      {vip.beneficios && <Check value={vip.beneficios[beneficio]} />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mb-4 flex flex-wrap gap-2">
        <Link
          href="/"
          className="hover:underline text-neutral-600 dark:text-neutral-400"
        >
          Home
        </Link>
        <span className="select-none">/</span>
        {category}
      </div>
      <h1 className="text-3xl font-bold mb-4 capitalize">{category}</h1>
      <p className="text-neutral-600 mb-10">
        Explore os produtos da categoria <strong>{category}</strong> e escolha o que melhor atende às suas necessidades.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtosDaCategoria.map((produto) => (
          <Link
            key={produto.id}
            href={`/${category}/${produto.id}`}
            className="flex flex-col p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800
                       bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md
                       shadow-sm hover:shadow-md hover:scale-[1.02] transition-all text-center items-center"
          >
            {produto.imagem ? (
              <Image
                src={produto.imagem}
                alt={produto.nome}
                width={64}
                height={64}
                className="object-contain mx-auto mb-3"
              />
            ) : (
              categoryIcons[category]
            )}
            <div className="text-lg font-semibold text-neutral-900 dark:text-white">
              {produto.nome}
            </div>
            {produto.descricao && (
              <p className="mt-2 text-sm text-neutral-500">{produto.descricao}</p>
            )}
            <div className="mt-4 text-xl font-bold text-green-600">
              {formatPrice(produto.preco)}
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
