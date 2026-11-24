# Antes de publicar a versão final do cliente

Lista de verificação para quando o Ryori aprovar. Enquanto for protótipo, nada disto muda.

## Sai da versão final

- [ ] Faixa de protótipo no topo do site, do link da bio, da reserva e do painel.
- [ ] `noindex,nofollow` em todas as páginas e o `robots.txt` que bloqueia buscadores.
- [ ] Botão "Ver o que corrigimos" do site (mostra o "antes" dos erros da casa).
- [ ] A data fixa "24/11/2026" nos rodapés e nas notas de preço e horário.
- [ ] O link "Painel da equipe" no rodapé do site público.
- [ ] As reservas de exemplo do painel (`exemplos` em `site/marca.js`).

## Entra na versão final

- [ ] Domínio ryori.com.br registrado pelo grupo, em nome do grupo (conferir antes: em 24/11/2026 estava livre).
- [ ] Login no painel, com cada unidade vendo só as suas reservas.
- [ ] Reserva enviada de verdade (hoje fica só no `localStorage` do navegador).
- [ ] WhatsApp de cada casa em `site/marca.js` (campo `zap`). Hoje está vazio: o do Iguatemi era o fixo (85) 3241-4683, e o do Buganvília não conferia com nada público.
- [ ] Alergênicos de cada prato no campo `alerg` de `site/cardapio.js`, confirmados pela cozinha. Hoje todos os pratos mostram "Alergênicos: confirmar com a casa".
- [ ] Filtro "sem glúten / sem lactose / sem crustáceos" no cardápio: só depois que os alergênicos forem confirmados. Hoje está desligado de propósito.
- [ ] Missoshiru: confirmar com a cozinha se o caldo leva peixe. Saiu da "mesa vegetariana" até lá.
- [ ] "Tuna chilli: Atum, ahi tuna": confirmar a descrição com a casa.
- [ ] Sequência Japonesa: etapas e preço (hoje sem preço, "a confirmar com a casa").
- [ ] Grupos de 9 ou mais: hoje levam à seção "As casas", com telefone. Se a casa quiser, criar uma página de eventos.
- [ ] Link exato do Tripadvisor de cada casa (hoje é uma busca).
- [ ] Fotos em `assets/`, aprovadas pela casa (hoje vêm do Wix do Grupo Social Clube por link direto).
- [ ] Traduções para inglês revisadas pela casa.
- [ ] JSON-LD do site (`site/index.html`) com a URL final, o link do cardápio e o WhatsApp confirmado.
- [ ] Horário e endereço alinhados com o perfil do Google da casa (o dono do perfil dá o acesso).

## Conferir no dia

- [ ] Abrir cada rota em 390 px e 1280 px: nenhum botão morto, nenhum texto cortado, preço com "R$".
- [ ] Horários contra a bio do Instagram e o Tripadvisor da casa.
