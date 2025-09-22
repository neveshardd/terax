import Link from "next/link";
import Image from "next/image";

// Lista de categorias da loja com ícone, id e nome
const categorias = [
  {
    id: "vips",
    nome: "Vips",
    icon: <Image src={"/vips-category.png"} width={100} height={100} alt="vips"/>,
  },
  {
    id: "boosters",
    nome: "Boosters",
    icon: <Image src={"/boosters-category.png"} width={100} height={100} alt="boosters"/>,
  },
  {
    id: "cash",
    nome: "Cash",
    icon: <Image src={"/cash-category.png"} width={100} height={100} alt="cash"/>,
  },
  {
    id: "coins",
    nome: "Coins",
    icon: <Image src={"/coins-category.png"} width={100} height={100} alt="coins"/>,
  },
  {
    id: "services",
    nome: "Serviços",
    icon: <Image src={"/services-category.png"} width={100} height={100} alt="serviços"/>,
  },
  {
    id: "medalhas",
    nome: "Medalhas",
    icon: <Image src={"/medals-category.png"} width={100} height={100} alt="medalhas"/>,
  },
];

export default function Loja() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Título principal */}
        <h1 className="text-3xl font-bold tracking-tight mb-12 text-center text-neutral-900 dark:text-white">
          Escolha uma Categoria
        </h1>

        {/* Grid de categorias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categorias.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.id}`}
              className="
                flex flex-col items-center gap-4 rounded-xl
                border border-neutral-200 dark:border-neutral-800
                bg-white/80 dark:bg-neutral-900/80
                backdrop-blur-md px-6 py-12
                shadow-sm hover:shadow-md hover:scale-[1.02]
                transition-all duration-300
                text-neutral-800 dark:text-neutral-200
              "
            >
              {/* Ícone da categoria */}
              {cat.icon}

              {/* Nome da categoria */}
              <span className="font-semibold text-4xl">{cat.nome}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
