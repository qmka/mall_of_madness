const objects = [{
  // Объект "ВСЁ" нужен для того, чтобы корректно работали команды "ВЗЯТЬ ВСЁ" и "ПОЛОЖИТЬ ВСЁ".
  // Не удаляйте его
  id: 0,
  forms: ['все', 'всё'],
  canHold: false,
}, {
  id: 1,
  name: 'бутылка молока',
  forms: ['молоко', 'бутылка', 'бутылки', 'бутылке', 'бутылкой', "бут", "буты", "моло", "молока", "молоку", "молоком", "молоке"],
  canHold: true,
  desc: 'Это бутылочка молока от компании "Лунная Бурёнка". Её содержимое светится мягким, приглушённым ночным светом, таким таинственным и опасным. Что-то вам подсказывает, что с этой жидкостью лучше не иметь дела.',
}, {
  id: 2,
  name: 'банан',
  forms: ['банан', 'банану', 'банана', 'бананом', 'банане', 'бана'],
  canHold: true,
  desc: 'С виду это обычный банан. На него налеплена небольшая этикетка производителя Explosive Bananas Inc.',
}, {
  id: 3,
  name: 'ведро',
  forms: ['ведро', 'ведру', 'ведра', 'ведром', 'ведре', 'ведр'],
  canHold: true,
  desc: 'Это крафтовое эмалированное ведро производства компании "Жестянщиков и сыновья".',
}, {
  id: 4,
  name: 'ключик',
  forms: ['ключ', 'ключу', 'ключа', 'ключом', 'ключе', 'ключик', 'ключику', 'ключика', 'ключиком', 'ключике'],
  canHold: true,
  desc: 'Это маленький металлический ключик, украшенный узором в виде пузырьков.',
}, {
  id: 5,
  name: 'фанта',
  forms: ['фанта', 'фанту', 'фанты', 'фантой', 'фанте', 'фант'],
  canHold: true,
  desc: 'Фанта! Распробуй веселье!',
}, {
  id: 6,
  name: 'пепси',
  forms: ['пепси', 'пепс'],
  canHold: true,
  desc: 'Новое поколение выбирает пепси! Вы задумываетесь о том, относитесь ли к нему вы?',
}, {
  id: 7,
  name: 'рэдбулл',
  forms: ['рэдбулл', 'рэдбуллу', 'рэдбулла', 'рэдбуллом', 'рэдбулле', 'рэдб', 'редбулл', 'редбуллу', 'редбулла', 'редбуллом', 'редбулле', 'редб'],
  canHold: true,
  desc: 'Рэдбулл окрыляет! ;)',
}, {
  id: 8,
  name: 'бумеранг',
  forms: ['бумеранг', 'бумерангу', 'бумеранга', 'бумерангом', 'бумеранге', 'буме', 'бумер'],
  canHold: true,
  desc: 'Это игрушечный, но довольно тяжёлый бумеранг. Надпись на этикетке: "Бумеранги дядюшки Аборигена: возвращайтесь к нам, как этот бумеранг возвращается к вам".',
}, {
  id: 9,
  name: 'яблоко',
  forms: ['яблоко', 'яблоку', 'яблока', 'яблоком', 'яблоке', 'ябло', 'ябл'],
  canHold: true,
  desc: 'Яблоко, почти идеальное, если не считать небольшой червоточины. Этикетка на яблоке выглядит дико и лаконично: "Плод познания".',
}, {
  id: 10,
  name: 'ментос',
  forms: ['ментос', 'ментосу', 'ментоса', 'ментосом', 'ментосе', 'мент'],
  canHold: true,
  desc: 'Ментос - свежее решение! Хотя... свежестью данный экземпляр и не пахнет, скорее, пованивает.',
}, {
  id: 11,
  name: 'фонарик',
  forms: ['фонарь', 'фонарю', 'фонаря', 'фонарем', 'фонарём', 'фона', 'фонарик', 'фонарику', 'фонарика', 'фонариком', 'фонаре', 'фонарике'],
  canHold: true,
  desc: 'Дешёвый китайский фонарик, входящий в инвентарь каждого менеджера магазина.',
}, {
  id: 12,
  name: 'дуриан',
  forms: ['дуриан', 'дуриану', 'дуриана', 'дурианом', 'дуриане', 'дури'],
  canHold: true,
  desc: 'Дуриан без этикетки, но с характерным запахом тухлой рыбы, чеснока, яиц или лука, канализации, вонючих носков и сероводорода.',
}, {
  id: 13,
  name: 'свиток',
  forms: ['свиток', 'свитку', 'свитка', 'свитком', 'свитке', 'свит'],
  canHold: true,
  desc: 'Свиток, на которым написано: "КРИ _ _ _    _ _ _  _ _ _". '
}, 






















{
  id: 3,
  forms: ['тролль', 'тролля', 'троллю', 'троллем', 'тро', 'трол', 'тролл'],
  canHold: false,
  desc: 'Это толстый тролль. Тролль - игровой объект, его нельзя взять, но с ним можно взаимодействовать. По умолчанию он находится в локации 1.',
  location: 1,
}];

export default objects;
