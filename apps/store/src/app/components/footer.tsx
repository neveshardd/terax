'use client'

import Link from "next/link";
import { Github, Mail, ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="
        mt-16 border-t border-neutral-200 dark:border-neutral-800
        bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm">
        {/* Sobre */}
        <div className="text-left">
          <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
            Sobre
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Esta é a loja oficial do servidor, onde você pode adquirir{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              VIPs
            </span>
            ,{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              boosters
            </span>
            ,{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              moedas virtuais
            </span>{" "}
            e serviços exclusivos.
          </p>
        </div>

        {/* Links úteis */}
        <div className="text-left">
          <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
            Links úteis
          </h3>
          <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
            <li>
              <Link
                href="/"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Início da loja
              </Link>
            </li>
            <li>
              <Link
                href="/vips"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Planos VIP
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Serviços
              </Link>
            </li>
          </ul>
        </div>

        {/* Segurança */}
        <div className="text-left">
          <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
            Segurança
          </h3>
          <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
            <li>
              <Link
                href="/termos"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link
                href="/politica"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Política e Privacidade
              </Link>
            </li>
          </ul>
        </div>

        {/* Contato */}
        <div className="text-left">
          <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
            Contato
          </h3>
          <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
            <li className="flex justify-start items-center gap-2">
              <Mail className="w-4 h-4" />
              <a
                href="mailto:suporte@terax.world"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                suporte@terax.world
              </a>
            </li>
            <li className="flex justify-start items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>ID do Servidor: jogar.terax.world</span>
            </li>
            <li className="flex justify-start items-center gap-2">
              <Github className="w-4 h-4" />
              <a
                href="https://github.com/neveshardd/terax"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                neveshardd
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="
          border-t border-neutral-200 dark:border-neutral-800
          py-6 text-center text-xs
          text-neutral-500 dark:text-neutral-400
        "
      >
        © {new Date().getFullYear()} Loja Terax World — Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
