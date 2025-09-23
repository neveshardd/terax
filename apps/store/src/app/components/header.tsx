"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBasket, StoreIcon, X, LogOut } from "lucide-react";
import gsap from "gsap";
import { useCartStore } from "@/app/cart";
import { useAuth } from "@/app/hooks/useAuth";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const links = [{ href: "/", label: "Loja", icon: StoreIcon }];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

  const handleClose = () => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setIsOpen(false),
      });
    }
  };

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.set(menuRef.current, { x: "100%" });
      gsap.to(menuRef.current, {
        x: "0%",
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout`, {
        method: "GET",
        credentials: 'include'
      });
      window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}/login`;
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-yellow-500/40 
      bg-white shadow-md dark:bg-neutral-900 dark:text-neutral-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-lg font-bold tracking-tight text-yellow-500 md:hidden">TERAX</h1>

        {/* Navegação Desktop */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-700 dark:text-neutral-200">
          <h1 className="text-xl font-extrabold tracking-tight text-yellow-500 drop-shadow-sm">TERAX</h1>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-lg px-4 py-2 transition-all hover:bg-yellow-500/10 hover:text-yellow-500"
              >
                {Icon && <Icon size={18} strokeWidth={2.2} />}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Ações Desktop */}
        <nav className="hidden md:flex items-center text-sm font-medium space-x-4 relative">
          {/* Carrinho */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center rounded-lg p-2 transition-all hover:bg-yellow-500/10"
          >
            <ShoppingBasket size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-black shadow">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Avatar com Dropdown (ShadCN) */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center">
                  <Avatar>
                    {/* Se tivesse imagem, colocaria AvatarImage */}
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem className="flex items-center gap-2" onClick={handleLogout}>
                  <LogOut size={16} /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href={`${process.env.NEXT_PUBLIC_AUTH_URL}/login`}
                className="rounded-lg border border-yellow-500/50 px-4 py-2 text-sm font-medium transition-colors hover:bg-yellow-500/10"
              >
                Login
              </Link>
              <Link
                href={`${process.env.NEXT_PUBLIC_AUTH_URL}/register`}
                className="rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-2 text-sm font-bold text-black shadow-md transition-transform hover:scale-95"
              >
                Cadastro
              </Link>
            </>
          )}
        </nav>

        {/* Botão Menu Mobile */}
        <button
          className="md:hidden rounded-md p-2 transition-colors hover:bg-yellow-500/10"
          onClick={() => setIsOpen(true)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Drawer Mobile */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-50 flex h-full w-full flex-col 
          bg-white dark:bg-neutral-900 px-8 py-6"
        >
          {/* Header do Drawer (logo + fechar) */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-xl font-bold text-yellow-500">TERAX</h1>
            <button
              className="rounded-md p-2 hover:bg-yellow-500/10"
              onClick={handleClose}
            >
              <X size={28} />
            </button>
          </div>

          {/* Navegação central */}
          <nav className="flex flex-col space-y-6 text-lg font-medium text-neutral-700 dark:text-neutral-200">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-full flex items-center gap-2 rounded-lg 
                  transition-colors hover:bg-yellow-500/10 hover:text-yellow-500"
                  onClick={handleClose}
                >
                  {Icon && <Icon size={20} strokeWidth={2.2} />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Botões fixos no rodapé */}
          <div className="mt-auto flex flex-col gap-4 pb-6">
            {user ? (
              <>
                {/* Avatar + nome/email no mobile */}
                <div className="flex items-center gap-3 p-3 rounded-lg border border-yellow-500/30 bg-yellow-500/5">
                  <Avatar>
                    <AvatarFallback>
                      {user.name ? user.name[0] : user.email[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-sm">
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {user.name || "Usuário"}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400 text-xs truncate max-w-[160px]">
                      {user.email}
                    </span>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={async () => {
                    try {
                      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout`, {
                        method: "GET",
                        credentials: "include",
                      });
                      window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}/login`;
                    } catch (err) {
                      console.error("Erro ao fazer logout:", err);
                    }
                  }}
                  className="w-full rounded-lg border border-yellow-500 px-4 py-3 
                   text-yellow-500 font-bold transition-colors hover:bg-yellow-500/10"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                {/* Carrinho */}
                <Link
                  href="/cart"
                  className="relative flex items-center justify-center w-full rounded-lg 
                   border border-yellow-500 px-4 py-3 text-yellow-500 font-medium 
                   transition-colors hover:bg-yellow-500/10"
                  onClick={handleClose}
                >
                  <ShoppingBasket size={22} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center 
                           justify-center rounded-full bg-yellow-500 text-xs font-bold text-black shadow">
                      {totalItems}
                    </span>
                  )}
                  <span className="ml-2">Carrinho</span>
                </Link>

                {/* Entrar */}
                <Link
                  href="/login"
                  className="block w-full rounded-lg border border-yellow-500 px-4 py-3 
                   text-center text-yellow-500 font-bold transition-colors hover:bg-yellow-500/10"
                  onClick={handleClose}
                >
                  Entrar
                </Link>

                {/* Cadastro */}
                <Link
                  href="/register"
                  className="block w-full rounded-lg bg-yellow-500 px-4 py-3 text-center 
                   text-black font-bold transition-transform hover:scale-95"
                  onClick={handleClose}
                >
                  Cadastro
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
