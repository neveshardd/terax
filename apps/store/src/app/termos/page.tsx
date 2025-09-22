import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Card className="rounded-2xl shadow-md border border-yellow-500/40 bg-white dark:bg-neutral-900 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-yellow-500">
              Termos de Uso
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8 text-neutral-700 dark:text-neutral-200 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                1. Introdução
              </h2>
              <p>
                Bem-vindo à nossa loja digital. Estes Termos de Uso têm como objetivo
                estabelecer as regras e condições para utilização dos nossos
                serviços, aquisição de produtos e interação com a plataforma. Ao
                acessar, navegar ou efetuar compras, você declara estar ciente e de
                acordo com todas as disposições aqui previstas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                2. Aceitação dos Termos
              </h2>
              <p>
                O uso da plataforma implica na aceitação integral e irrestrita
                destes Termos de Uso. Caso não concorde, recomendamos que não
                prossiga com a utilização da loja nem com a realização de compras.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                3. Produtos e Serviços
              </h2>
              <p>
                Todos os produtos oferecidos são de natureza digital e entregues
                automaticamente após a confirmação do pagamento. É responsabilidade
                do cliente verificar a compatibilidade dos itens adquiridos com o
                ambiente ou servidor em que pretende utilizá-los. A loja reserva-se
                o direito de alterar, atualizar ou remover produtos sem aviso prévio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                4. Pagamentos
              </h2>
              <p>
                Os pagamentos devem ser realizados exclusivamente através dos meios
                disponibilizados na plataforma. Pedidos não confirmados no prazo
                estipulado serão automaticamente cancelados. Todas as transações
                financeiras são processadas em ambiente seguro, podendo estar
                sujeitas a validações adicionais para prevenção de fraudes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                5. Política de Reembolsos e Cancelamentos
              </h2>
              <p>
                Considerando a natureza digital dos produtos, não realizamos
                reembolsos após a entrega, salvo em casos excepcionais de falhas
                técnicas comprovadamente atribuídas à nossa plataforma. Nestes casos,
                a solicitação deverá ser formalizada em até 7 (sete) dias úteis
                após a compra, mediante abertura de chamado em nosso suporte oficial.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                6. Responsabilidades do Usuário
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer informações corretas e atualizadas no momento da compra.</li>
                <li>Respeitar todas as regras estabelecidas pela plataforma e pelo servidor em que utilizar os produtos.</li>
                <li>Não utilizar a loja ou seus produtos para fins ilícitos, fraudulentos ou que infrinjam direitos de terceiros.</li>
                <li>Responsabilizar-se pela guarda e uso adequado das credenciais de acesso.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                7. Limitação de Responsabilidade
              </h2>
              <p>
                Não nos responsabilizamos por falhas decorrentes de problemas técnicos
                do cliente, incompatibilidade com sistemas de terceiros, uso inadequado
                dos produtos ou indisponibilidade temporária de serviços externos. A
                responsabilidade da loja limita-se ao valor pago pelo produto, nos
                termos previstos na seção de reembolsos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                8. Privacidade e Proteção de Dados
              </h2>
              <p>
                Respeitamos sua privacidade e seguimos práticas de proteção de dados
                alinhadas à legislação vigente. Informações pessoais coletadas serão
                utilizadas exclusivamente para fins relacionados à execução e
                melhoria dos serviços, não sendo compartilhadas com terceiros sem
                consentimento expresso, exceto quando exigido por lei.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                9. Alterações dos Termos
              </h2>
              <p>
                Estes Termos de Uso poderão ser modificados a qualquer momento, sem
                necessidade de aviso prévio. Alterações passam a vigorar a partir da
                publicação nesta página. Recomendamos a leitura periódica para
                manter-se atualizado.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                10. Contato e Suporte
              </h2>
              <p>
                Em caso de dúvidas, solicitações ou reclamações, nossa equipe de
                suporte está disponível através dos canais oficiais informados na
                plataforma. Nosso objetivo é garantir uma experiência segura,
                transparente e satisfatória para todos os clientes.
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
