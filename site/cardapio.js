// Ryori Sushi Iguatemi, cardápio digital público (menu.getin.app) em 24/11/2026. Preços como estão lá.
// A casa não informa alergênicos. Marcas usadas pelo "monte sua mesa": cru (peixe cru), veg (sem carne nem peixe), q (quente).
// sug = ordem de sugestão montada pela Timeless a partir do cardápio, para o protótipo. O sushiman ajusta na mesa.
// fix = texto original quando corrigimos. en = tradução sugerida, a revisar.
// alerg = alergênicos do prato (Lei estadual 17.899/2022, CE). Valores possíveis: gluten, trigo, lactose, leite, peixe,
// amendoas, corantes, castanhas, soja, ovo, crustaceos. Só entra o que a casa confirmar; vazio mostra "confirmar com a casa".
window.CARDAPIO=[
 {cat:'Para começar',en:'Starters',id:'starters',itens:[
  {alerg:[],n:'Gyoza brie',d:'Dumpling com queijo brie, tarê, azeite trufado e pipoca de quinoa. 5 unidades.',p:36,t:['q','veg'],sug:2,en:['Brie gyoza','Dumplings with brie, tare, truffle oil and puffed quinoa. 5 pieces.']},
  {alerg:[],n:'Crispy rice',d:'Salmão ou atum picante sobre arroz crocante. 4 unidades.',p:34,t:['cru'],sug:1,en:['Crispy rice','Spicy salmon or tuna on crispy rice. 4 pieces.']},
  {alerg:[],n:'Rock shrimp',d:'Camarões empanados com spicy mayo e ovas.',p:69,t:['q'],sug:3,en:['Rock shrimp','Battered shrimp with spicy mayo and roe.']},
  {alerg:[],n:'KFC (Korean fried chicken)',d:'Frango frito coreano com molho picante e amendoim.',p:29,t:['q'],sug:5,en:['KFC (Korean fried chicken)','Korean fried chicken, spicy sauce and peanuts.']},
  {alerg:[],n:'Pork gyoza',d:'Pastéis de porco e nirá no vapor. 5 unidades.',p:39,t:['q'],sug:6,en:['Pork gyoza','Steamed pork and garlic chive dumplings. 5 pieces.']},
  {alerg:[],n:'Salmão cone',d:'Recheado com tartare de salmão, ovas e fromage blanc com wasabi e mel. 5 unidades.',p:49,t:['cru'],sug:4,fix:'tar tare',en:['Salmon cone','Salmon tartare, roe and wasabi-honey fromage blanc. 5 pieces.']},
  {alerg:[],n:'Fish taco',d:'Massa gyoza crocante, salmão ao molho de wasabi, ovas, furikake e cebolinha. 2 unidades.',p:44,t:['cru'],sug:7,en:['Fish taco','Crispy gyoza shell, salmon in wasabi sauce, roe, furikake. 2 pieces.']},
  {alerg:[],n:'Harumaki',d:'Queijo coalho, carne ou camarão. 2 unidades.',p:25,t:['q'],sug:9,en:['Harumaki','Spring rolls: coalho cheese, beef or shrimp. 2 pieces.']},
  {alerg:[],n:'Missoshiru',d:'Sopa de soja com tofu, somen e cebolinha.',p:22,t:['q'],sug:10,en:['Miso soup','Soy broth with tofu, somen and scallion.']}
 ]},
 {cat:'Vegetais',en:'Vegetables',id:'veg',itens:[
  {alerg:[],n:'Edamame',d:'Soja cozida no vapor. Com azeite trufado, mais R$ 6.',p:37,t:['veg'],sug:8,fix:'c om azeite trufado',en:['Edamame','Steamed soybeans. With truffle oil, R$ 6 more.']},
  {alerg:[],n:'Cheese corn',d:'Milho doce gratinado com queijo coalho e mayo kewpie.',p:38,t:['q','veg'],sug:11,en:['Cheese corn','Sweet corn gratin with coalho cheese and kewpie mayo.']},
  {alerg:[],n:'Shimeji',d:'Cogumelo grelhado na chapa japonesa.',p:67,t:['q','veg'],sug:12,en:['Shimeji','Mushrooms from the Japanese griddle.']},
  {alerg:[],n:'Pepino',d:'Salada de pepino, cenoura e molho agridoce. Com salmão, mais R$ 6.',p:26,t:['veg'],sug:13,fix:'c om salmão',en:['Cucumber salad','Cucumber, carrot, sweet-and-sour dressing. With salmon, R$ 6 more.']}
 ]},
 {cat:'Especialidades do sushibar',en:'Sushi bar specials',id:'sushibar',itens:[
  {alerg:[],n:'Shakê butter truffle',d:'Carpaccio de salmão selado na manteiga trufada, flor de sal e limão-siciliano.',p:58,t:['cru'],sug:1,en:['Shake butter truffle','Seared salmon carpaccio in truffle butter, fleur de sel and lemon.']},
  {alerg:[],n:'Tuna chilli',d:'Atum, ahi tuna, cebolete e crunch chilli. 7 unidades.',p:55,t:['cru'],sug:2,en:['Tuna chilli','Tuna, ahi tuna, scallion and chilli crunch. 7 pieces.']},
  {alerg:[],n:'Tiradito de salmão',d:'Salmão, azeite cítrico, missô em pó e azeite trufado.',p:62,t:['cru'],sug:3,en:['Salmon tiradito','Salmon, citrus oil, miso powder and truffle oil.']},
  {alerg:[],n:'Ebi roll',d:'Salmão e camarão sobre esfera crocante. 4 unidades.',p:40,t:['cru'],sug:4,en:['Ebi roll','Salmon and shrimp on a crispy sphere. 4 pieces.']},
  {alerg:[],n:'Usuzukuri tako',d:'Carpaccio de polvo, azeite de ervas, alcaparras, ovas de capelin e cebolinha.',p:64,t:['cru'],sug:5,fix:'Ussuzukuri Takô',en:['Usuzukuri tako','Octopus carpaccio, herb oil, capers, capelin roe.']},
  {alerg:[],n:'Wagyu stone',d:'Wagyu com molho de gergelim e ponzu, finalizado na pedra quente.',p:98,t:['q'],sug:6,en:['Wagyu stone','Wagyu with sesame and ponzu, finished on a hot stone.']},
  {alerg:[],n:'Maguro foie gras',d:'Tempurá de shimeji, foie gras e teriyaki trufado. 5 unidades.',p:65,t:['q'],sug:7,fix:'Magurô Foie Gras (a descrição não cita atum)',en:['Maguro foie gras','Shimeji tempura, foie gras and truffle teriyaki. 5 pieces.']},
  {alerg:[],n:'Tuna spicy missô',d:'Atum selado com molho spicy missô, gema e furikake.',p:49,t:['cru'],sug:8,en:['Tuna spicy miso','Seared tuna, spicy miso sauce, yolk and furikake.']},
  {alerg:[],n:'Carpaccio de vieiras',d:'Salsa trufada, ovas, raspas de limão-siciliano e flor de sal.',p:92,t:['cru'],sug:9,en:['Scallop carpaccio','Truffle salsa, roe, lemon zest and fleur de sel.']}
 ]},
 {cat:'Sequência Japonesa',en:'Japanese tasting sequence',id:'sequencia',nota:'Do PDF público do Linktree da casa (24/11/2026). Valor por pessoa. Meireles: almoço de segunda a domingo, R$ 129 (sem sashimi); jantar de domingo a quarta, R$ 159 (com sashimi). Iguatemi: jantar de domingo a quarta, R$ 159 (com sashimi).',notaEn:'From the public PDF on the restaurant’s Linktree (24 Nov 2026). Per person. Meireles: lunch Mon–Sun, R$ 129 (no sashimi); dinner Sun–Wed, R$ 159 (with sashimi). Iguatemi: dinner Sun–Wed, R$ 159 (with sashimi).',itens:[
  {alerg:[],n:'Jantar, com sashimi',d:'Entradas, carpaccio, hand roll e onigiri, cozinha asiática, sushis tradicionais, duplas e makis especiais e sobremesa. Domingo a quarta, nas duas casas.',p:159,t:[],en:['Dinner, with sashimi','Starters, carpaccio, hand roll and onigiri, Asian kitchen, traditional sushi, special pairs and makis, and dessert. Sunday to Wednesday, at both houses.']},
  {alerg:[],n:'Almoço, sem sashimi',d:'A mesma sequência no almoço, de segunda a domingo. Só no Meireles.',p:129,t:[],en:['Lunch, no sashimi','The same sequence at lunch, Monday to Sunday. Meireles only.']}
 ]},
 {cat:'Almoço executivo',en:'Lunch menu',id:'executivo',nota:'Servido no almoço.',notaEn:'Served at lunch.',itens:[
  {alerg:[],n:'Bento Ryori',d:'4 sushis, saladinha, yakimeshi e grelhado. Vegetariano R$ 56, frango R$ 58, peixe ou filé R$ 69.',p:56,t:[],en:['Ryori bento','4 sushi, salad, yakimeshi and a grill. Veggie R$ 56, chicken R$ 58, fish or filet R$ 69.']},
  {alerg:[],n:'Teppan lunch',d:'Entradas, grelhado, legumes e yakimeshi. De R$ 68 (frango) a R$ 89 (camarão).',p:68,t:[],en:['Teppan lunch','Starters, grill, vegetables and yakimeshi. From R$ 68 (chicken) to R$ 89 (shrimp).']},
  {alerg:[],n:'Sushibar clássico',d:'Entradas e combinado de 14 peças tradicionais escolhidas pelo sushiman.',p:74,t:[],en:['Classic sushi bar','Starters and 14 traditional pieces chosen by the sushi chef.']},
  {alerg:[],n:'Uramaki shake crispy',d:'8 peças de uramaki filadélfia, mayo kewpie, tarê, crispy e ovas.',p:62,t:[],fix:'huramaki',en:['Crispy salmon uramaki','8 pieces: salmon cream cheese uramaki, kewpie, tare, crispy, roe.']}
 ]}
];
