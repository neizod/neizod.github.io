let states = [0,0,0,0,0,0,0];

const targets = [
  [[true, 0, 0], [true, 1, 1]],
  [[true, 2, 0], [true, 3, 1]],
  [[true, 0, 2], [true, 1, 3]],
  [[true, 2, 2], [true, 3, 3]],
];
const pieces = [
  [[true, 0, 0], [true, 0, 3], [true, 3, 0], [true, 3, 3]],
  [[true, 0, 2], [true, 0, 3]],
  [[true, 2, 0], [false, 3, 0]],
  [[false, 0, 3], [true, 1, 3]],
  [[true, 3, 0], [true, 3, 1]],
  [[false, 0, 0], [false, 2, 0], [true, 0, 2], [true, 2, 2]],
  [[true, 1, 1], [true, 3, 1], [false, 1, 3], [false, 3, 3]],
];

const attach_class = (id, class_name) => {
  const mi = document.getElementById(id);
  for (const name of ['sub', 'add', 'zero', 'one', 'under', 'over']) {
    mi.classList.remove(name);
  }
  mi.classList.add(class_name);
};

const attach_disabled = (id, which) => {
  const mi = document.getElementById(id);
  for (const element of mi.getElementsByTagName('button')) {
    element.removeAttribute('disabled');
  }
  mi.getElementsByClassName(which)[0].setAttribute('disabled', '');
};

const sub = (i) => {
  attach_disabled(`m${i}`, 'sub');
  attach_class(`m${i}`, 'sub');
  update(i, -1);
};

const zero = (i) => {
  attach_disabled(`m${i}`, 'zero');
  attach_class(`m${i}`, 'zero');
  update(i, 0);
};

const add = (i) => {
  attach_disabled(`m${i}`, 'add');
  attach_class(`m${i}`, 'add');
  update(i, +1);
};

const cycle = (i) => {
  [zero, add, sub][1 + states[i-1]](i);
};

const make_lines = function*(size) {
  for (const axis of ['xy','yx']) {
    for (let i=0; i<5; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute(`${axis[0]}1`, -2*size);
      line.setAttribute(`${axis[0]}2`, +2*size);
      line.setAttribute(`${axis[1]}1`, (i-2)*size);
      line.setAttribute(`${axis[1]}2`, (i-2)*size);
      yield line;
    }
  }
};

const make_rect = (size, r, c, class_name) => {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.classList.add(class_name);
  rect.setAttribute('x', size*(c-2));
  rect.setAttribute('y', size*(r-2));
  rect.setAttribute('width', size);
  rect.setAttribute('height', size);
  return rect;
};

const populate = (id, spec) => {
  const size = id.startsWith('m') ? 12 : 25;
  const lines = document.getElementById(id).getElementsByClassName('lines')[0];
  for (const line of make_lines(size)) {
    lines.append(line);
  }
  const cells = document.getElementById(id).getElementsByClassName('cells')[0];
  for (const [same, r, c] of spec) {
    cells.append(make_rect(size, r, c, same ? 'same' : 'diff'));
  }
};

const decide_class = (cell) => {
  if (cell === 0)
    return 'zero';
  if (cell === 1)
    return 'one';
  if (cell > 1)
    return 'over';
  return 'under';
};

const update = (i, value) => {
  states[i-1] = value;
  let game = [...Array(4)].map(_ => Array(4).fill(0));
  for (let k=0; k<7; k++) {
    for (const [same, r, c] of pieces[k]) {
      game[r][c] += (same ? +1 : -1) * states[k];
    }
  }
  for (let r=0; r<4; r++) {
    for (let c=0; c<4; c++) {
      const class_name = decide_class(game[r][c]);
      attach_class(`cell${r+1}${c+1}`, class_name);
      attach_class(`text${r+1}${c+1}`, class_name);
      const text = document.getElementById(`text${r+1}${c+1}`);
      text.innerHTML = `${game[r][c] > 0 ? '+' : ''}${game[r][c]}`;
    }
  }
};

const reset = () => {
  for (let i=0; i<7; i++) {
    zero(i+1);
  }
};

const invert = () => {
  for (let i=0; i<7; i++) {
    if (states[i] === 1) {
      sub(i+1);
    } else if (states[i] === -1) {
      add(i+1);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  for (let i=0; i<2; i++) {
    for (let j=0; j<2; j++) {
      populate(`c${i+1}${j+1}`, targets[2*i+j]);
    }
  }
  for (let i=0; i<7; i++) {
    populate(`m${i+1}`, pieces[i]);
  }
  reset();
}, false);
