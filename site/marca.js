// Ryori: dados da marca e das duas casas de Fortaleza (conferidos em 24/11/2026).
const W='https://static.wixstatic.com/media/404bb8_';
window.MARCA={
  id:'ryori', nome:'Ryori', prefixo:'RY',
  logo:W+'7d5670b5bc4c471db1008a3949596d86~mv2.png/v1/fill/w_600,h_440,al_c,q_85/ryori.png',
  foto:W+'e37d068b0ead4505b15af8d6b31f7db7~mv2.jpg/v1/fill/w_900,h_600,al_c,q_80,enc_auto/ryori.jpg',
  // O site do Ryori não tem seção de eventos: grupos de 9+ vão para as casas, com telefone
  eventos:'../#casas', eventosRotulo:['Falar com a casa','Contact the restaurant'],
  trip:'https://www.tripadvisor.com.br/Search?q=Ryori%20Fortaleza',
  pedidos:[['crianca','Cadeira para criança','High chair'],['balcao','Lugar no balcão do sushiman','A seat at the sushi bar'],['varanda','Mesa na varanda (Buganvília)','A table on the deck (Buganvília)'],['acesso','Acesso sem degraus','Step-free access']],
  unidades:[
    {id:'buganvilia',nome:'Buganvília',sigla:'B',end:'Av. Dom Luís, 1113, lojas 18 e 19',
     // bio do Instagram: todos os dias 11h30–15h e 18h–23h30
     hor:{0:[[690,900],[1080,1410]],1:[[690,900],[1080,1410]],2:[[690,900],[1080,1410]],3:[[690,900],[1080,1410]],4:[[690,900],[1080,1410]],5:[[690,900],[1080,1410]],6:[[690,900],[1080,1410]]},
     foto:W+'f7c92f745a9948dbbdd44abcca40dfcd~mv2.jpg/v1/fill/w_1600,h_1100,al_c,q_82,enc_auto/ryori-buganvilia.jpg',
     // WhatsApp: pendente (o número antigo não confere com nada público). Confirmar com a casa.
     mapa:'https://www.google.com/maps/search/?api=1&query=Ryori+Avenida+Dom+Lu%C3%ADs+1113+Fortaleza',zap:'',tel:'(85) 3224-9997',trip:['4,8','2.527','','4.8','2,527','']},
    {id:'iguatemi',nome:'Iguatemi',sigla:'I',end:'Av. Washington Soares, 85, Shopping Iguatemi',
     // bio do Instagram: todos os dias 11h30–22h
     hor:{0:[[690,1320]],1:[[690,1320]],2:[[690,1320]],3:[[690,1320]],4:[[690,1320]],5:[[690,1320]],6:[[690,1320]]},
     foto:W+'426e0201e447475ab51af18c093908ab~mv2.jpg/v1/fill/w_1600,h_1100,al_c,q_82,enc_auto/ryori-iguatemi.jpg',
     // WhatsApp: pendente. O número antigo era o fixo (85) 3241-4683, que não abre WhatsApp.
     mapa:'https://www.google.com/maps/search/?api=1&query=Ryori+Iguatemi+Fortaleza',zap:'',tel:'(85) 3241-4683',trip:['4,9','1.337','','4.9','1,337','']}
  ],
  exemplos:[
    {k:1,h:20,m:0,casa:'buganvilia',pessoas:2,ocasiao:'Jantar a dois',pedidos:['Lugar no balcão do sushiman'],lugar:'b4',lugarPar:'b5',obs:'',nome:'Exemplo: Luana',zap:'(85) 9 0000-0001',status:'aguardando',motivos:['lugar no balcão do sushiman']},
    {k:1,h:12,m:30,casa:'iguatemi',pessoas:4,ocasiao:'Negócios',pedidos:[],lugar:'m3',obs:'',nome:'Exemplo: Daniel',zap:'(85) 9 0000-0002',status:'confirmada',motivos:[]},
    {k:2,h:19,m:30,casa:'buganvilia',pessoas:7,ocasiao:'Aniversário',pedidos:['Mesa na varanda (Buganvília)'],lugar:'v4',obs:'Uma pessoa alérgica a camarão',nome:'Exemplo: Bianca',zap:'(85) 9 0000-0003',status:'aguardando',motivos:['grupo de 7','mesa na varanda (buganvília)','observação']}
  ]
};
