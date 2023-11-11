const verbs = [{
  id: 0,
  forms: ['с', 'север'],
}, {
  id: 1,
  forms: ['в', 'восток'],
}, {
  id: 2,
  forms: ['ю', 'юг'],
}, {
  id: 3,
  forms: ['з', 'запад'],
}, {
  id: 4,
  forms: ['х', 'вв', 'вверх', 'наверх', 'поднимись', 'подняться'],
}, {
  id: 5,
  forms: ['н', 'вн', 'вниз', 'спустись', 'слезь', 'спуститься', 'слезть'],
}, {
  id: 6,
  forms: ['св', 'северо-восток'],
}, {
  id: 7,
  forms: ['сз', 'северо-запад'],
}, {
  id: 8,
  forms: ['юв', 'юго-восток'],
}, {
  id: 9,
  forms: ['юз', 'юго-запад'],
}, {
  id: 10,
  forms: ['иди', 'пойди', 'отправляйся', 'идти', 'пойти', 'отправиться', 'го', 'подойди', 'подойти', 'войди', 'войти', 'пройди', 'пройти', 'зайди', 'зайти', 'беги', 'бежать', 'подбеги', 'подбежать'],
  method: 'go',
}, {
  id: 11,
  forms: ['инструкция', 'информация', 'инфо', 'инст', 'инстр', 'справка'],
}, {
  id: 12,
  forms: ['выход', 'конец', 'закончи', 'хватит', 'вых', 'выхо', 'рестарт', 'заново', 'сначала'],
}, {
  id: 13,
  forms: ['и', 'ин', 'инв', 'инве', 'инвентарь'],
}, {
  id: 14,
  forms: ['сохрани', 'сохранить', 'сох', 'сохр', 'save', 'запиши', 'запись'],
}, {
  id: 15,
  forms: ['загрузи', 'загрузить', 'заг', 'загр', 'load'],
}, {
  id: 16,
  forms: ['отмена', 'отменить', 'отм', 'взад'],
}, {
  id: 17,
  forms: ['повтор', 'повт', 'повтори', 'повторить', 'п', 'еще', 'ещё'],
}, {
  id: 18,
  forms: ['возьми', 'подними', 'бери', 'забери', 'взять', 'поднять', 'забрать', 'брать', 'б', 'бр', 'воз', 'возь', 'бер', 'вз', 'подн', 'подбери', 'подобрать', 'схватить', 'схвати'],
  method: 'takeItem',
}, {
  id: 19,
  forms: ['положи', 'выбрось', 'оставь', 'выброси', 'положить', 'выбросить', 'оставить', 'брось', 'кидай', 'метни', 'бросить', 'кинуть', 'метнуть', 'к', 'пол', 'выбр', 'ост', 'поставь', 'поставить', 'класть', 'клади', 'швырни', 'швырнуть', 'кинь', 'сбей', 'сбить'],
  method: 'dropItem',
}, {
  id: 20,
  forms: ['о', 'осм', 'осмо', 'ос', 'ис', 'изуч', 'осмотри', 'изучи', 'исследуй', 'осмотреть', 'изучить', 'исследовать', 'рассмотри', 'рассмотреть', 'посмотреть', 'посмотри', 'обыщи', 'обыскать', 'изучай', 'обыскивай', 'трогай', 'потрогай', 'трогать', 'потрогать', 'щупать', 'пощупать', 'щупай', 'ощупай', 'смотри', 'смотреть'],
  method: 'examine',
}, {
  id: 21,
  forms: ['жди', 'ж', 'ждать', 'жду', 'подождать', 'подожди', 'ожидай', 'ожидать'],
  method: 'wait',
}, {
  id: 22,
  forms: ['г', 'говори', 'поговори', 'скажи', 'поболтай', 'болтай', 'общайся', 'пообщайся', 'спроси', 'говорить', 'сказать', 'поговорить', 'поболтать', 'болтать', 'общаться', 'пообщаться', 'спросить', 'сообщи', 'сообщить'],
  method: 'talk',
}, {
  id: 23,
  forms: ['купи', 'приобрети', 'покупай', 'купить', 'приобрести', 'куп', 'покупать'],
  method: 'buy',
}, {
  id: 24,
  forms: ['зап', 'запл', 'плат', 'заплати', 'заплатить', 'плати', 'платить'],
  method: 'pay',
}, {
  id: 25,
  forms: ['у', 'ударь', 'убей', 'атакуй', 'бей', 'ударить', 'убить', 'атаковать', 'бить', 'напасть', 'напади', 'нападай', 'прогони', 'прогнать'],
  method: 'hit',
}, {
  id: 26,
  forms: ['р', 'руб', 'разр', 'сруб', 'руби', 'поруби', 'разруби', 'заруби', 'переруби', 'сруби', 'рубить', 'разрубить', 'порубить', 'перерубить', 'срубить'],
  method: 'chop',
}, {
  id: 27,
  forms: ['открой', 'отопри', 'открыть', 'отпереть', 'отк', 'откр', 'распахни', 'распахнуть', 'раскрой', 'раскрыть', 'отвори', 'отворить'],
  method: 'open',
}, {
  id: 28,
  forms: ['залезь', 'заберись', 'лезь', 'карабкайся', 'вскарабкайся', 'залезть', 'забраться', 'лезть', 'карабкаться', 'вскарабкаться', 'лез', 'пролезть', 'пролезь', 'взбираться', 'взобраться', 'взберись'],
  method: 'climb',
}, {
  id: 29,
  forms: ['перейди', 'пересеки', 'перейти', 'пересечь', 'пройди', 'пройти'],
  method: 'cross',
}, {
  id: 30,
  forms: ['ломай', 'сломай', 'разломай', 'поломай', 'ломать', 'сломать', 'разломать', 'поломать', 'лом', 'слом', 'разбей', 'разбить', 'взломать', 'взломай', 'разрушить', 'разрушь'],
  method: 'destroy',
}, {
  id: 31,
  forms: ['прислони', 'приставь', 'поставь', 'прислонить', 'приставить', 'поставить', 'прис', 'присл', 'прист'],
  method: 'lean',
}, {
  id: 32,
  forms: ['съешь', 'ешь', 'попробуй', 'откуси', 'есть', 'съесть', 'попробовать', 'откусить', 'кушай', 'кушать', 'жри', 'сожри', 'жрать', 'сожрать', 'съем', 'поем', 'ем'],
  method: 'eat',
}, {
  id: 33,
  forms: ['включи', 'включить', 'вкл'],
  method: 'turnOn',
}, {
  id: 34,
  forms: ['высыпь', 'рассыпь', 'высыпи', 'посыпь', 'сыпь', 'высыпать', 'рассыпать', 'посыпать', 'сыпать', 'высы', 'выс', 'расс'],
  method: 'pour',
}, {
  id: 35,
  forms: ['заправь', 'заряди', 'залей', 'заправить', 'зарядить', 'залить', 'запр', 'зар'],
  method: 'fuel',
}, {
  id: 36,
  forms: ['смажь', 'смазать', 'смаж', 'смаз'],
  method: 'oil',
}, {
  id: 37,
  forms: ['нажми', 'потяни', 'надави', 'жми', 'тяни', 'дёрни', 'нажать', 'потянуть', 'надавить', 'жать', 'тянуть', 'дёрнуть', 'дернуть', 'дерни', 'наж', 'нажм', 'нажа', 'потя', 'тян'],
  method: 'press',
}, {
  id: 38,
  forms: ['отрази', 'отбей', 'отразить', 'отбить'],
  method: 'reflect',
}, {
  id: 39,
  forms: ['поцелуй', 'целуй', 'поцеловать', 'целовать', 'чмокнуть', 'чмокни'],
  method: 'kiss',
}, {
  id: 40,
  forms: ['разбуди', 'буди', 'разбудить', 'будить', 'бужу'],
  method: 'wake',
}, {
  id: 41,
  forms: ['выключи', 'выключить', 'выкл', 'выруби', 'вырубить', 'отключи', 'отключить', 'откл', 'деакт', 'деактивировать', 'деактивируй'],
  method: 'turnOff',
}, {
  id: 42,
  forms: ['выйди', 'выйти', 'уйди', 'уйти', 'вылезь', 'вылезти', 'выходи', 'выбраться', 'выберись', 'покинь', 'выбираться'],
  method: 'leave',
}, {
  id: 43,
  forms: ['закрой', 'закрыть', 'запри', 'запереть'],
  method: 'close',
}, {
  id: 44,
  forms: ['надень', 'надеть', 'одень', 'одеть', 'облачись', 'облачиться', 'напяль', 'напялить'],
  method: 'dress',
}, {
  id: 45,
  forms: ['сними', 'снять'],
  method: 'undress',
}, {
  id: 46,
  forms: ['пить', 'пей', 'выпить', 'выпей', 'попить', 'попей', 'пью', 'выпью'],
  method: 'drink',
}, {
  id: 47,
  forms: ['тянуть', 'тяни', 'вытянуть', 'вытяни', 'тащить', 'тащи', 'вытащить', 'вытащи', 'потянуть', 'потяни', 'вынь', 'вынимай'],
  method: 'pull',
}, {
  id: 48,
  forms: ['крути', 'крутить', 'вращай', 'вращать', 'поверни', 'повернуть', 'верти', 'вертеть', 'поверти', 'повертеть'],
  method: 'rotate',
}, {
  id: 49,
  forms: ['тереть', 'три', 'потереть', 'потри', 'тру'],
  method: 'rub',
}, {
  id: 50,
  forms: ['петь', 'пой', 'спеть', 'спой', 'пою', 'спою'],
  method: 'sing',
}, {
  id: 51,
  forms: ['дать', 'дай', 'предложи', 'предложить', 'отдай', 'отдать', 'дам', 'даю', 'дадим', 'корми', 'кормить', 'накорми', 'накормить', 'покорми', 'покормить', 'прикорми', 'прикормить', 'подкорми', 'подкормить', 'угости', 'угостить', 'предложи', 'предложить', 'вручи', 'вручить', 'подари', 'подарить', 'презентуй', 'презентовать'],
  method: 'give',
}, {
  id: 52,
  forms: ['поджечь', 'подожги', 'зажечь', 'зажги', 'жечь', 'жги', 'поджигай', 'зажигай'],
  method: 'burn',
}, {
  id: 53,
  forms: ['нюхай', 'нюхать', 'понюхай', 'понюхать', 'занюхай', 'занюхать', 'принюхайся', 'принюхаться'],
  method: 'sniff',
}, {
  id: 54,
  forms: ['слушать', 'слушай', 'прислушаться', 'прислушайся', 'послушать', 'слышать', 'слух'],
  method: 'hear',
}, {
  id: 55,
  forms: ['копать', 'копай', 'выкопать', 'выкопай', 'вырыть', 'рыть', 'вырой', 'рой'],
  method: 'dig',
}, {
  id: 56,
  forms: ['резать', 'режь', 'отрезать', 'отрежь', 'разрезать', 'разрежь', 'нарезать', 'нарежь', 'порезать', 'порежь'],
  method: 'cut',
}, {
  id: 57,
  forms: ['рвать', 'рви', 'сорвать', 'сорви', 'разорвать', 'разорви', 'порвать', 'порви'],
  method: 'tear',
}, {
  id: 58,
  forms: ['связать', 'свяжи', 'привязать', 'привяжи'],
  method: 'tie',
}, {
  id: 59,
  forms: ['дуть', 'дуй', 'задуть', 'задуй', 'подуть', 'подуй', 'дунь', 'дунуть'],
  method: 'blow',
}, {
  id: 60,
  forms: ['спи', 'спать', 'уснуть', 'заснуть', 'усни', 'засни', 'дремать', 'дремли', 'подремать', 'подремли'],
  method: 'sleep',
}, {
  id: 61,
  forms: ['проснись', 'проснуться'],
  method: 'wakeUp',
}, {
  id: 62,
  forms: ['плыть', 'плыви', 'переплыть', 'переплыви', 'плавай', 'плавать', 'уплыть', 'уплыви', 'нырять', 'нырни'],
  method: 'swim',
}, {
  id: 63,
  forms: ['читать', 'прочитать', 'читай', 'прочитай', 'прочесть', 'прочти'],
  method: 'read',
}, {
  id: 64,
  forms: ['наполнить', 'налить', 'наполни', 'налей', 'набрать', 'набери'],
  method: 'fill',
}, {
  id: 65,
  forms: ['прыгнуть', 'перепрыгнуть', 'прыгни', 'перепрыгни', 'перескочить', 'перескочи'],
  method: 'jump',
}, {
  id: 66,
  forms: ['развяжи', 'развязать', 'отвяжи', 'отвязать'],
  method: 'untie',
}, {
  id: 67,
  forms: ['помощь', 'помоги', 'help', 'хелп', 'помогите', 'совет', 'подсказка'],
  method: 'help',
}, {
  id: 68,
  forms: ['счёт', 'счет', 'очки', 'ход', 'ходы', 'сч'],
  method: 'score',
}, {
  id: 69,
  forms: ['вылей', 'лей', 'выплесни', 'плесни', 'вылить', 'лить', 'выплеснуть', 'плеснуть', 'облей', 'облить', 'залей', 'залить'],
  method: 'pour',
}, {
  id: 70,
  forms: ['крикни', 'кричи', 'крикнуть', 'кричать', 'закричи', 'закричать', 'ори', 'орать', 'заори', 'заорать', 'проори', 'проорать', 'орни', 'орнуть'],
  method: 'yell',
}, {
  id: 71,
  forms: ['вставь', 'воткни', 'вставить', 'воткнуть', 'вставляй', 'втыкай'],
  method: 'insert',
}, {
  id: 72,
  forms: ['тряси', 'потряси', 'трясти', 'потрясти', 'качать', 'качай', 'покачай', 'покачать', 'раскачай', 'раскачать'],
  method: 'shake',
}];

export default verbs;
