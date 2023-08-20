let altered = false;

const las = [0,1,2,3,4,5,6,7];
const lms = [0,1,2,3,4,5,6,7];

const factorial = (n) => n === 0? 1 : n*factorial(n-1);
const divmod = (n, m) => [Math.floor(n/m), n%m];
const modulo = (n, m) => ((n % m) + m) % m;
const xorall = (ls, init=0) => ls.reduce((a, x, i) => a ^ (x*get_stand(i)), init);

const shuffle = (xs, k, ls=null) => {
  if (xs.length === 0) { return ls; }
  [i, k] = divmod(k, factorial(xs.length-1));
  ls.push(...xs.splice(i, 1));
  return shuffle(xs, k, ls);
}

const dom_protype = (which) => document.querySelector(`[name="p${which}"]`);
const dom_proval = (which) => document.querySelector(`[name="v${which}"]`);

const get_treasure = () => parseInt(document.querySelector('[name="treasure"]:checked').value);
const get_stand = (i) => document.querySelector(`[name="x${i}"]`).checked;
const get_name = (i) => String.fromCharCode(65+i);

const get_protocol = (which) => {
  const type = dom_protype(which).value;
  if (type === 's') { return 0; }
  if (type === 'i') { return modulo(-1, factorial(8)); }
  let val = parseInt(dom_proval(which).value);
  return isNaN(val) ? 12345 : modulo(val, factorial(8)) ;
};

const get_emoji = (gender, standing) => {
  if (gender === 2 || gender === 4 || gender === 5) {
    return standing ? '🧍‍♂️' : '🧎‍♂️' ;
  } else if (gender === 0 || gender === 1 || gender === 7) {
    return standing ? '🧍‍♀️' : '🧎‍♀️' ;
  }
  return standing ? '🧍' : '🧎' ;
};

const make_protocol = (which) => {
  const ls = which === 'a' ? las : lms ;
  const val = get_protocol(which);
  ls.length = 0;
  shuffle([0,1,2,3,4,5,6,7], val, ls);
};


const ui_protocol = (which) => {
  altered = false;
  make_protocol(which);
  dom_proval(which).style.visibility = dom_protype(which).value === 'c' ? 'visible' : 'hidden' ;
  ui_clear();
};

const ui_treasure = () => {
  altered = false;
  const j = get_treasure();
  for (let i=0; i<8; i++) {
    document.querySelector(`#t${i}`).innerHTML = i === j ? '💎' : '&nbsp;' ;
  }
  ui_clear();
};

const ui_stand = (i) => {
  altered = false;
  document.querySelector(`#p${i}`).innerHTML = get_emoji(i, get_stand(i));
  ui_clear();
};

const ui_clear = () => {
  document.querySelector('#ra').innerHTML = '&nbsp;';
  document.querySelector('#rm').innerHTML = '&nbsp;';
  if (!altered) {
    document.querySelector('#ra').innerHTML = '⚠️ no alteration yet ⚠️';
    document.querySelector('#aa').disabled = false;
  }
  if (get_protocol('a') !== get_protocol('m')) {
    document.querySelector('#rm').innerHTML = '⚠️ different protocol ⚠️';
  }
};

const ui_assistant = () => {
  altered = true;
  const idx = las.indexOf(xorall(las, las[get_treasure()]));
  document.querySelector(`[name="x${idx}"]`).click();
  document.querySelector('#ra').innerHTML = `${get_name(idx)} changed`;
  document.querySelector('#aa').disabled = true;
};

const ui_magician = () => {
  const idx = lms.indexOf(xorall(lms));
  document.querySelector('#rm').innerHTML = `${get_name(idx)} have`;
}


document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('[name="treasure"][value="5"]').click();
  ui_treasure();
  for (let i=0; i<8; i++) {
    ui_stand(i);
  }
  ui_protocol('a');
  ui_protocol('m');
}, false);
