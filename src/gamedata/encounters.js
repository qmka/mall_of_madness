/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import Inventory from '../classes/inventory.js';
import CurrentLocation from '../classes/location.js';
import Flags from '../classes/flags.js';
import ItemPlaces from '../classes/itemplaces.js';
import Counters from '../classes/counters.js';

import objects from './objects.js';

import {
  defaultTexts,
} from './default-data.js';

const encounters = {
  // Добавляем дополнительную информацию к описанию локации в зависимости от различных условий
  addDescription() {
    let encounter;

    
    const currentLocation = CurrentLocation.get();

    switch (currentLocation) {
        case 16:
          if (!Flags.get("isGluttonKilled")) encounter = 'На полу сидит толстый мерзкий !*обжора*! с ведром на голове.';
          break;
        case 21:
          if (!Flags.get("isSecurityKilled")) encounter = 'Около восточной двери сидит мерзкого вида !*охранник*!.';
          break;
        case 19:
          if (!Flags.get("isGiantKilled")) encounter = 'Огромный !*великан*! преграждает путь на запад.';
          break;
        case 28:
          if (!Flags.get("isMonsterKilled")) encounter = 'Около кучи мусора сидит унылого вида !*монстр*! и играется с фонариком.';
          break;
    }
    
    if (encounter) {
        return `<p>${encounter}</p>`;
    }
    return '';
  },

  addInfoToInventory() {
    let info = '';

    /*
    Добавьте свой код, который будет выводится по команде "И" после перечисления предметов в инвентаре.
    */

    return info;
  },

  // Прокручиваем все заданные игрой счётчики
  setCounters() {
    /*
    Counters.increase('gameTurns');
    */
  },

  // Проверяем, мешает ли игроку что-либо двигаться в выбранном им направлении
  checkPlayerObstacles(direction) {
    /*
    const currentLocation = CurrentLocation.get();
    if (currentLocation === 7 && !Flags.get("isTrollKilled") && direction === 'e') {
        return "Тролль рычит и не даёт мне пройти.";
    }
    */
    const currentLocation = CurrentLocation.get();
    if (currentLocation === 21 && !Flags.get("isSecurityKilled") && direction === 'e') {
      return "Охранник сидит прямо у восточной двери и не даёт мне пройти."
    }
    if (currentLocation === 19 && !Flags.get("isGiantKilled") && direction === 'w') {
      return "Великан загораживает проход на запад, мне не пройти!"
    }
    if (currentLocation === 23 && !Flags.get("isDoorOpen") && direction === 's') {
      return "Дверь закрыта, я не могу пройти."
    }
    if (currentLocation === 29 && !Flags.get("isFlashlightOn") && direction === 's') {
      return "Здесь слишком темно, чтобы двигаться дальше."
    }

    return '';
  },

  // Функция возвращает текст для вывода на экран окончания игры
  getGameOverText() {
    /*
    if (Flags.get("isDiedFromTrollWithAxe")) {
        return 'Да, не стоило с маленьким топориком лезть на большого тролля. Вы успели нанести всего несколько ударов перед тем, как тролль разорвал вас на куски...';
    }
    */

    return defaultTexts.defaultGameOverText;
  },

  // Функция проверяет, действует ли в локации какое-либо условие, не укладывающееся в общую логику игры.
  getUniqueEncounter(verbId, objectIds) {
    let answer;
    let flag = false;

    /*
    // В локации с ведьмой у игрока только один ход, чтобы отразить заклятье, иначе его выбрасывает в предыдущую комнату
    if (CurrentLocation.get() === 27 && !Flags.get("isWitchKilled")) {
        flag = true;
        if (verbId === 38 && objectIds.includes(25)) {
            if (Inventory.includes(10)) {
                Flags.toggle("isWitchKilled");
                Inventory.removeItem(10);
                answer = "Вы отразили заклятье мечом, и оно ударило прямо в ведьму! Издав истошный крик, ведьма рассыпалась в пыль. К сожалению, меч тоже не уцелел.";
            } else {
                CurrentLocation.set(17);
                answer = "Вам нечем отразить заклятье. Заклятье ударяет вам в грудь и выкидывает в комнату с решёткой."
            }
        } else {
            CurrentLocation.set(17);
            answer = "Вы не успеваете ничего сделать. Заклятье ударяет вам в грудь и выкидывает в комнату с решёткой.";
        }
    }
    */

    return {
      answer,
      flag,
    };
  },

  take(objectIds) {
    // Если игрок хочет взять всё (id объекта "всё" = 0)
    if (objectIds.includes(0)) {
      // Проверяем, есть ли предметы в локации
      const itemsArray = ItemPlaces.getLocationItemsArray(CurrentLocation.get());
      const answer = Inventory.getItemsString(itemsArray, defaultTexts.playerTakeItems, defaultTexts.thereIsNoItems);
      if (itemsArray.length !== 0) {
        itemsArray.forEach((item) => {
          Inventory.addItem(item);
          ItemPlaces.set(item, -1);
        });
      }
      return answer;
    }
    /*
    Добавьте свой код, если нужно
    */

    return 'Вы не можете это сделать.';
  },

  drop(objectIds) {
    // Положить всё (id объекта "всё" = 0)
    if (objectIds.includes(0)) {
        // Проверяем, есть ли предметы в локации
        const itemsArray = Inventory.getAll();
        const answer = Inventory.getItemsString(itemsArray, defaultTexts.playerDropItems, defaultTexts.playerHasNoItems);
        if (itemsArray.length !== 0) {
            itemsArray.forEach((item) => {
                Inventory.removeItem(item);
                ItemPlaces.set(item, CurrentLocation.get());
            });
        };
        return answer;
    }
    /*
    Добавьте свой код, если нужно
    */

    return defaultTexts.playerUselessAction;
  },

  examine(objectId) {
    /*
    const currentLocation = CurrentLocation.get();

    if (currentLocation === 7 && !Flags.get("isTrollKilled") && objectId === 17) {
        return "Это огромный мерзкий зелёный тролль. Ничего, кроме страха и омерзения, не вызывает.";
    }
    */
    const currentLocation = CurrentLocation.get();

    if (currentLocation === 10 && objectId === 14) {
      let desc = "Это высокое дерево с толстым стволом, могучими ветвями и жёсткой древней корой."
      if (!Flags.get("isAppleNotOnTree")) {
        desc += " На высоте нескольких метров среди ветвей вы замечаете единственный плод этого дерева - судя по виду, это яблоко."
      }
      return desc
    }

    if (currentLocation === 16 && objectId === 15 && !Flags.get("isGluttonKilled")) {
      return "Это толстый волосатый обжора с ведром на голове. Огромными ручищами он отрывает куски мяса от гигантского окорока и забрасывает их в свою ненасытную пасть, забрызгивая всё вокруг вонючим жиром. Кажется, что он сошёл со средневековой гравюры, изображающей грех чревоугодия и обжорства."
    }

    if (currentLocation === 3 || (Flags.get("isBucketFull") && Inventory.includes(3))) {
      return "Горячая вода, которая, кажется, не торопится остывать."
    }

    if (currentLocation === 19 && objectId === 18 && !Flags.get("isGiantKilled")) {
      return "Это огромный ледяной великан, состоящий из нескольких намертво слипшихся глыб мороженого. Истинное порождение ледяной бездны морозильников безумного супермаркета."
    }

    if (currentLocation == 17 && objectId === 23) {
      if (Flags.get("isAppleEaten")) {
        return 'Кажется, достаточно преисполнился в своём познании, что могу прочитать эту надпись. На стене углём корявым почерком выведено: "Скажи КНИ".'
      }
      return "На стене углём выведены какие-то непонятные для меня каракули. Я не настолько специалист по лингвистике, чтобы в них разобрать что-то осмысленное."
    }

    if (currentLocation == 23 && objectId === 24) {
      let desc = 'Это массивная металлическая дверь. На ней прикреплена табличка: "Подземелье скидок". В данный момент дверь '
      if (Flags.get("isDoorOpen")) {
        desc += "открыта."
      } else {
        desc += "закрыта."
      }
      return desc
    }

    if (currentLocation === 28 && objectId === 25 && !Flags.get("isMonsterKilled")) {
      return "Это средних размеров монстр, покрытый тяжелой, серой шерстью, с усталыми глазами, выражающими уныние и бесконечную грусть."
    }

    if (currentLocation === 21 && objectId === 26 && !Flags.get("isSecurityKilled")) {
      return "Это гуманоидное существо, одетое в форму охранника. Можно было бы сказать, что это просто человек-охранник, но от человека оно отличается слишком неестественным, огромным чувствительным волосатым носом с целой матрицей ноздрей. Такой учует подвох издалека!"
    }

    return defaultTexts.defaultDescription;
  },

  wait() {
    return 'Вы немного передохнули. Время двигаться дальше!';
  },

  talk(objectIds) {
    const currentLocation = CurrentLocation.get();

    if (currentLocation === 16 && objectIds.includes(15) && !Flags.get("isGluttonKilled")) {
      return '"МЯСО!!! ДАЙ МНЕ МЯСО!!!" - раздаётся утробный рык из пасти обжоры.'
    }

    if (currentLocation === 19 && objectIds.includes(18) && !Flags.get("isGiantKilled")) {
      return "Великан не обращает внимания на ваши слова. Не уверен, что он даже их понимает."
    }

    if (currentLocation === 28 && objectIds.includes(25) && !Flags.get("isMonsterKilled")) {
      return 'Монстр бормочет грустно: "ПИТЬ! ЕСТЬ! БАДАБУМ!!!".'
    }

    if (currentLocation === 21 && objectIds.includes(26) && !Flags.get("isSecurityKilled")) {
      return '"КЫШ!!! ИДИ ОТСЮДА!!!" - кричит охранник, брызжа слюной.'
    }
    return 'Здесь не с кем говорить.';
  },

  buy(objectIds) {
    return 'Вы не можете это купить';
  },

  pay(objectIds) {
    return 'У вас нет денег.';
  },

  hit(objectIds) {
    const currentLocation = CurrentLocation.get();

    if (currentLocation === 16 && objectIds.includes(15) && !Flags.get("isGluttonKilled")) {
      return '"Обжора слишком занят и слишком толст, чтобы хоть что-то почувствовать. Это бесполезно.'
    }

    if (currentLocation === 19 && objectIds.includes(18) && !Flags.get("isGiantKilled")) {
      return "Броня из толстого замороженного льда настолько прочна, что на ней не остаётся даже царапины; великан же вас просто не замечает."
    }

    if (currentLocation === 28 && objectIds.includes(25) && !Flags.get("isMonsterKilled")) {
      return 'Монстр бормочет грустно: "ВОТ ТАК ВСЕГДА... :(".'
    }

    if (currentLocation === 21 && objectIds.includes(26) && !Flags.get("isSecurityKilled")) {
      return '"ТЫ У МЕНЯ ДОЖДЁШЬСЯ" - хмурится охранник, пресекая ваши попытки.'
    }
    return 'Ничего не произошло.';
  },

  chop(objectIds) {
    return 'Это делу не поможет.';
  },

  open(objectIds) {
    if (CurrentLocation.get() === 23 && objectIds.includes(24)) {
      if (!Flags.get("isDoorOpen")) { // дверь заперта
        if (Inventory.includes(4)) {
          return "Дверь заперта. У вас есть ключик, но он не подходит к этой двери."
        } else {
          return "Дверь заперта, её надо как-то открыть. Или что-то сделать, чтобы она открылась сама."
        }
      } else {
        return "Дверь уже открыта."
      }
    }
    return 'Тут нечего открывать.';
  },

  lean(objectIds, objectsInInput) {
    // objectsInInput может понадобиться, потому что прислонить объект нельзя сам по себе.
    // Его можно прислонить только к чему-то

    return 'Хм, это делу не поможет.';
  },

  destroy(objectIds) {
    return 'Вы не можете это сломать.';
  },

  cross(objectIds) {
    return 'Непонятно, что вы хотите сделать.';
  },

  climb(objectIds) {
    const currentLocation = CurrentLocation.get();
    if (currentLocation === 10 && objectIds.includes(14)) {
      return "Вы несколько раз пытаетесь залезть на дерево, но на гладкой поверхности ствола совершенно не за что зацепиться, а до ближайших ветвей далековато."
    }
    if (currentLocation === 22 && objectIds.includes(27)) {
      if (Flags.get("isRedbullDrinken")) {
        CurrentLocation.set(0);
        return ''
      }
      return "У меня нет сил, чтобы залезть на такую высоту. Где бы этих сил взять???"      
    }
    if (currentLocation === 34 && objectIds.includes(20)) {
      CurrentLocation.set(35);
      return ''
    }
    if (currentLocation === 13 && objectIds.includes(19)) {
      return "Во-первых, сегодня не день ВДВ. Во-вторых, фонтанчик маловат, чтобы я в него или на него залез."
    }
    return 'Вы не можете туда залезть.';
  },

  go(objectIds) {
    if (CurrentLocation.get() === 34 && objectIds.includes(20)) {
      CurrentLocation.set(35);
      return ''
    }
    return defaultTexts.playerCantGo;
  },

  eat(objectIds) {
    if (objectIds.includes(2) && Inventory.includes(2)) {
      Inventory.removeItem(2);
      ItemPlaces.set(2, 10);
      return "Я с удовольствием съел банан, он неожиданно оказался вкусным. Хотя смутное предчувствие говорит мне, что из-за своей привычки тянуть в рот всё съедобное я остался без важного квестового предмета. К счастью, во фруктовом саду я видел ещё бананы."
    }
    if (objectIds.includes(9) && Inventory.includes(9)) {
      Flags.toggle("isAppleEaten");
      return "Я съел яблоко и почувствовал в голове мудрость веков... и небольшую изжогу. Что-то определённо изменилось."
    }
    if (objectIds.includes(10) && Inventory.includes(10)) {
      return "Запах и цвет данного экземпляра свидетельствуют о том, что по нему прошлись несколько раз, к тому же не факт, что это были люди. Вы пробуете ментос на зуб и благоразумно отказываетесь от сиюминутно возникшего желания съесть эту дрянь."
    }
    if (objectIds.includes(12) && Inventory.includes(12)) {
      return 'Когда вы попадёте в игру по мотивам шоу "Звёзды в Африке" или "Последний Герой", вам, определённо придётся есть дурианы, бычьи яйца, мадагаскарских тараканов и прочую дрянь. Но в рамках этой игры вас тошнит от одного запаха этого фрукта, куда уж там его есть...'
    }
    return 'Вы не можете это съесть.';
  },

  turnOn(objectIds) {
    if (objectIds.includes(11) && Inventory.includes(11)) {
      let answer = "Вы нажали кнопку на корпусе фонарика. Фонарик "
      Flags.toggle("isFlashlightOn");
      if (Flags.get("isFlashlightOn")) {
        answer += "загорелся тусклым светом."
      } else {
        answer += "потух."
      }
      return answer
    }

    return 'У вас нет ничего такого, что можно было бы включить или выключить.';
  },

  pour(objectIds) {
    return 'Это нельзя рассыпать.';
  },

  fuel(objectIds) {
    return 'Здесь нечего зарядить или заправить.';
  },

  oil(objectIds) {
    return 'Для этого вам понадобится масло.';
  },

  press(objectIds) {
    if (objectIds.includes(11) && Inventory.includes(11)) {
      return this.turnOn(objectIds)
    }

    return 'Здесь нечего нажимать.';
  },

  reflect(objectIds) {
    return 'Не понимаю, что вы хотите сделать.';
  },

  kiss(objectIds) {
    return 'Не стоит к этому прикасаться губами.';
  },

  wake(objectIds) {
    return 'Непонятно, кого вы тут хотите разбудить.';
  },

  turnOff(objectIds) {
    return this.turnOn(objectIds);
  },

  leave(objectIds) {
    if (CurrentLocation.get() === 35) {
      CurrentLocation.set(34);
      return ''
    }
    return 'Не понимаю, что вы хотите сделать.';
  },

  close(objectIds) {
    return 'Здесь нечего закрывать.';
  },

  dress(objectIds) {
    return 'Среди вещей у меня нет ничего, что я бы мог надеть. Впрочем, моя обычная одежда мне и так нравится.';
  },

  undress(objectIds) {
    return 'Я могу снять с себя только мою одежду. Но сейчас не та ситуация, когда имеет смысл раздеваться.';
  },

  drink(objectIds) {
    if (objectIds.includes(1) && Inventory.includes(1)) {
      Inventory.removeItem(1);
      ItemPlaces.set(1, 8);
      return "Молочко хорошо пошло! Главное, не увлекаться - что-то я пока не заметил здесь туалета..."
    }
    if (objectIds.includes(5) && Inventory.includes(5)) {
      Inventory.removeItem(5);
      Flags.toggle("isFantaExists");
      return "Фанта хорошо пошла, ах этот вкус детства!"
    }
    if (objectIds.includes(6) && Inventory.includes(6)) {
      Inventory.removeItem(6);
      Flags.toggle("isPepsiExists");
      return "Освежает и бодрит! Просто взрыв бодрости..."
    }
    if (objectIds.includes(7) && Inventory.includes(7)) {
      Inventory.removeItem(7);
      if (!Flags.get("isRedbullDrinken")) {
        Flags.toggle("isRedbullDrinken")
        Flags.toggle("isRedbullExists");
      }
      return "Рэдбулл ожидаемо придал мне сил, чувствую, что гору способен свернуть. Или залезть на неё!"
    }
    if (objectIds.includes(19) && CurrentLocation.get() === 13) {
      return "Тут нечего пить, фонтанчик давно пересох."
    }
    if (objectIds.includes(17) && CurrentLocation.get() === 3) {
      return "Ай, горячая!"
    }
    return 'Я не могу это выпить.';
  },

  pull(objectIds) {
    if (objectIds.includes(4) && CurrentLocation.get() === 13 && Flags.get("isKeyInFontain")) {
      Flags.toggle("isKeyInFontain");
      Inventory.addItem(4);
      return "Я вытащил ключик из замочной скважины фонтанчика."
    }
    return 'Здесь нет ничего такого, что я мог бы потянуть или вытащить, и это произвело бы хоть какой-то эффект.';
  },

  rotate(objectIds) {
    // Ключик в фонтанчике можно крутить, только если он вставлен
    if (objectIds.includes(4) && CurrentLocation.get() === 13 && Flags.get("isKeyInFontain")) {
      // Счётчик показывает, что дальше выкинет поворот ключа. 0 - исходное, 1 - фанта, 2 - пепси, 3 - редбулл, после 3 сброс на 0
      // При этом если один из напитков уже выдан и существует, то ничего не выпадает, но прокрутка засчитывается
      let counter = Counters.get("keyTurns");
      let answer = "Вы повернули ключик в фонтанчике. "
      counter += 1
      if (counter === 1) {
        if (!Flags.get("isFantaExists")) {
          Flags.toggle("isFantaExists");
          ItemPlaces.set(5, 13);
          answer += "Раздался щелчок, и из большой дырки в фонтанчике что-то выпало на пол."
        } else {
          answer += "Ничего не произошло."
        }
      } else if (counter === 2) {
        if (!Flags.get("isPepsiExists")) {
          Flags.toggle("isPepsiExists");
          ItemPlaces.set(6, 13);
          answer += "Раздался щелчок, и из большой дырки в фонтанчике что-то выпало на пол."
        } else {
          answer += "Ничего не произошло."
        }
      } else if (counter === 2) {
        if (!Flags.get("isPepsiExists")) {
          Flags.toggle("isPepsiExists");
          ItemPlaces.set(6, 13);
          answer += "Раздался щелчок, и из большой дырки в фонтанчике что-то выпало на пол."
        } else {
          answer += "Ничего не произошло."
        }
      } else if (counter === 3) {
        if (!Flags.get("isRedbullExists")) {
          Flags.toggle("isRedbullExists");
          ItemPlaces.set(7, 13);
          answer += "Раздался щелчок, и из большой дырки в фонтанчике что-то выпало на пол."
        } else {
          answer += "Ничего не произошло."
        }
      } else {
        counter = 0;
        answer += "Раздался щелчок, потом звук вращающихся шестерёнок, потом всё стихло."
      }

      Counters.set("keyTurns", counter);
      return answer;
    }

    return 'Здесь нет ничего такого, что бы можно было покрутить, и это произвело бы хоть какой-то эффект.';
  },

  rub(objectIds) {
    return 'Тереть это бесполезно.';
  },

  sing(objectIds) {
    return 'Волшебники-гномы! В минувшие дни<br>Искусно металлы ковали они.<br>Сапфиры, алмазы, рубины, топазы<br>Хранили они и гранили они!';
  },

  give(objectIds) {
    const currentLocation = CurrentLocation.get();
    // Ключевые действия
    // 1. Дать мальчику
    if (currentLocation === 35 && objectIds.includes(21)) {
      if (objectIds.includes(5) && Inventory.includes(5)) {
        Inventory.removeItem(5);
        Inventory.addItem(8);
        return '"Спасибо, дружище!" - мальчик с горящими глазами хватает фанту. - "Чем бы тебя отблагодарить? Дай подумать...". Откуда-то из-за спины он достаёт игрушечный бумеранг. "Оружием это назвать сложно, но авось в хозяйстве пригодится.", - подмигивает он.'
      }
      return "Мальчик покачивает головой."
    }
    // 2. Дать девочке
    if (currentLocation === 35 && objectIds.includes(22)) {
      if (objectIds.includes(1) && Inventory.includes(1)) {
        Inventory.removeItem(1);
        Inventory.addItem(13);
        return '"Ух, молочко, любимое!!!" - пищит девчонка и выхватывает у вас бутылку. Потом, будто бы что-то вспомнив, шарит за пазухой и потягивает вам в знак благодарности свиток.'
      }
      return "Девочка будто бы не замечает вас."
    }
    // 3. Дать обжоре
    // 4. Дать великану
    // 5. Дать монстру
    // 6. Дать охраннику

    return 'Не получится.';
  },

  burn(objectIds) {
    return 'У вас нет ни огнива, ни спичек.';
  },

  sniff(objectIds) {
    return 'Вы принюхиваетесь, но не улавливаете никаких необычных запахов.';
  },

  hear(objectIds) {
    return 'Вы прислушиваетесь, но не слышите ничего необычного.';
  },

  dig(objectIds) {
    return 'У вас нет лопаты, а руками копать бессмысленно. И негигиенично!';
  },

  cut(objectIds) {
    return defaultTexts.playerUselessAction;
  },

  tear(objectIds) {
    return defaultTexts.playerUselessAction;
  },

  tie(objectIds, objectsInInput) {
    // objectsInInput может понадобиться, потому что связывают обычно два объекта

    return 'У вас нет ни верёвки, ни ниток.';
  },

  blow(objectIds) {
    return defaultTexts.playerUselessAction;
  },

  sleep(objectIds) {
    return 'Не время спать, пока зло не дремлет!';
  },

  wakeUp(objectIds) {
    return 'Вы щипаете себя за щёку - больно! Это означает, что вы не спите - всё реально.';
  },

  swim(objectIds) {
    return 'Здесь негде плавать.';
  },

  read(objectIds) {
    return 'Здесь нечего читать.';
  },

  fill(objectIds) {
    return defaultTexts.playerUselessAction;
  },

  jump(objectIds) {
    return defaultTexts.playerUselessAction;
  },

  untie(objectIds) {
    return defaultTexts.playerUselessAction;
  },

  help(objectIds) {
    return 'Это достаточно простая игра, чтобы пройти её без подсказок. Обязательно осматривайте все предметы, это поможет вам продвинуться вперёд.';
  },

  score(objectIds) {
    return 'В этой игре не встроена возможность подсчёта очков.';
  },
};

export default encounters;
