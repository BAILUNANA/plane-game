let game = document.querySelector(".game");
let bullets = document.querySelectorAll(".bullet");
let plane = document.querySelector(".plane");
let monsters = document.querySelectorAll(".enemy");

plane.addEventListener("mousedown", event => {
  let shiftX = event.clientX - plane.offsetLeft;
  let shiftY = event.clientY - plane.offsetTop;

  document.addEventListener("mousemove", handleMove);
  document.addEventListener("mouseup", handleStop);

  function handleMove(event) {
    plane.style.left = event.pageX - shiftX + "px";
    plane.style.top = event.pageY - shiftY + "px";
  }

  function handleStop() {
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleStop);
  }
});

plane.ondragstart = () => false;

function prepareBullet() {
  for (let bullet of bullets) {
    if (bullet.offsetTop <= -10) {
      bullet.style.left = plane.offsetLeft + plane.offsetWidth / 2 + "px";
      bullet.style.top = plane.offsetTop - 20 + "px";
      break;
    }
  }
}

setInterval(prepareBullet, 30);

function letBulletsFly() {
  for (let bullet of bullets) {
    if (bullet.offsetTop > -10) {
      bullet.style.top = bullet.offsetTop - 20 + "px";
    }
  }

  for (let monster of monsters)
    for (let bullet of bullets) {
      // if()
    }
}

setInterval(letBulletsFly, 10);

function dropMonsters() {
  for (let monster of monsters) {
    if (monster.offsetTop < game.offsetHeight) {
      const step = +monster.getAttribute("data-setp");
      monster.style.top = monster.offsetTop + step + "px";
    }
  }
  for (let monster of monsters) {
    for (let bullet of bullets) {
      if (
        checkIntersect(monster, bullet) &&
        !monster.classList.contains("umbrella")
      ) {
        monster.style.top = _.random(-500, -monster.offsetHeight) + "px";
        monster.style.left =
          _.random(0, game.offsetWidth - monster.offsetWidth) + "px";
      }
    }
  }
}

setInterval(dropMonsters, 30);

function initMonsters() {
  for (let monster of monsters) {
    if (monster.offsetTop >= game.offsetHeight) {
      monster.style.top = _.random(-500, -monster.offsetHeight) + "px";
      monster.style.left =
        _.random(0, game.offsetWidth - monster.offsetWidth) + "px";
    }
  }
}

setInterval(initMonsters, 30);

// function dropUmbrellas() {
//   for (let umbrella of umbrellas) {
//     if (umbrella.offsetTop < game.offsetHeight) {
//       umbrella.style.top = umbrella.offsetTop + 4 + "px";
//     }
//   }
// }

// setInterval(dropUmbrellas);

// function initUmbrellas() {
//   for (let umbrella of umbrellas) {
//     if (umbrella.offsetTop >= game.offsetHeight) {
//       umbrella.style.top = _.random(-500, -umbrella.offsetHeight) + "px";
//       umbrella.style.left =
//         _.random(0, game.offsetWidth - umbrella.offsetWidth) + "px";
//     }
//   }
// }

function resetMonsters() {
  for (let monster of monsters) {
    const maxLeft = game.offsetWidth - monster.offsetWidth;
    const maxTop = -monster.offsetHeight;
    monster.setAttribute("data-setp", _.random(1, 8));
    monster.style.left = _.random(0, maxLeft) + "px";
    monster.style.top = _.random(-500, maxTop) + "px";
  }
}

resetMonsters();

function checkIntersect(elem1, elem2) {
  let rect1 = elem1.getBoundingClientRect();
  let rect2 = elem2.getBoundingClientRect();
  let nonIntersect =
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom;
  return !nonIntersect;
}
