"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Card className="rounded-2xl shadow-md border border-yellow-500/40 bg-white dark:bg-neutral-900 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-yellow-500">
              Política de Privacidade
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8 text-neutral-700 dark:text-neutral-200 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                1. Introdução
              </h2>
              <p>
                Esta Política de Privacidade descreve como coletamos, utilizamos,
                armazenamos e protegemos suas informações pessoais ao utilizar
                nossa plataforma. Prezamos pela transparência e pelo respeito à
                sua privacidade, adotando medidas para garantir a segurança dos
                seus dados em conformidade com a legislação aplicável.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                2. Informações Coletadas
              </h2>
              <p>
                Podemos coletar as seguintes informações quando você interage com
                nossa plataforma:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dados pessoais fornecidos no cadastro (nome, e-mail, etc.).</li>
                <li>Informações de pagamento necessárias para processar compras.</li>
                <li>Registros de navegação e interação com o site.</li>
                <li>
                  Dados técnicos como endereço IP, tipo de navegador e sistema
                  operacional.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                3. Uso das Informações
              </h2>
              <p>As informações coletadas podem ser utilizadas para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processar pedidos e pagamentos realizados na plataforma.</li>
                <li>Fornecer suporte técnico e atendimento ao cliente.</li>
                <li>
                  Melhorar a experiência de navegação e personalizar conteúdos.
                </li>
                <li>
                  Enviar comunicações relacionadas a atualizações, promoções ou
                  alterações nos serviços (quando autorizado).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                4. Compartilhamento de Dados
              </h2>
              <p>
                Não comercializamos, alugamos ou compartilhamos suas informações
                pessoais com terceiros, exceto:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Quando necessário para a conclusão de transações (ex.: meios de pagamento).</li>
                <li>Quando exigido por lei, ordem judicial ou autoridades competentes.</li>
                <li>Para parceiros contratados que auxiliem na operação da plataforma, sempre sob cláusulas de confidencialidade.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                5. Segurança da Informação
              </h2>
              <p>
                Adotamos medidas técnicas e organizacionais adequadas para proteger
                suas informações contra acessos não autorizados, perda, uso indevido
                ou divulgação indevida. Entretanto, nenhum sistema é totalmente
                seguro, e não podemos garantir a inviolabilidade absoluta dos dados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                6. Retenção de Dados
              </h2>
              <p>
                As informações serão armazenadas pelo tempo necessário para cumprir
                as finalidades descritas nesta política, observando prazos legais ou
                regulatórios aplicáveis. Após esse período, os dados poderão ser
                anonimizados ou excluídos de forma segura.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                7. Direitos do Usuário
              </h2>
              <p>
                Você possui direitos em relação às suas informações pessoais,
                incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acessar e obter cópia dos seus dados armazenados.</li>
                <li>Solicitar correção de informações incorretas ou desatualizadas.</li>
                <li>Requerer a exclusão de seus dados, quando aplicável.</li>
                <li>
                  Revogar o consentimento previamente concedido para tratamento de
                  dados.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                8. Alterações desta Política
              </h2>
              <p>
                Esta Política de Privacidade pode ser atualizada a qualquer momento,
                visando aprimorar nossos processos ou cumprir novas exigências
                legais. Alterações entram em vigor a partir da publicação nesta
                página, e recomendamos a revisão periódica do conteúdo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                9. Contato
              </h2>
              <p>
                Em caso de dúvidas, solicitações ou exercício de direitos
                relacionados a esta Política de Privacidade, entre em contato com
                nossa equipe por meio dos canais oficiais de atendimento informados
                na plataforma.
              </p>
            </section>

            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-12 text-center">
              Última atualização: Setembro de 2025
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
