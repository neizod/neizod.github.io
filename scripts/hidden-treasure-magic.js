let labels = [0,1,2,3,4,5,6,7];
const xorall = (init=0) => labels.reduce((a, x, i) => a ^ (x*getstand(i)), init);

const gettreasure = () => parseInt(document.querySelector('[name="treasure"]:checked').value);
const getstand = (i) => document.querySelector(`[name="x${i}"]`).checked;
const getname = (i) => String.fromCharCode(65+i);

const movetreasure = () => {
    const j = gettreasure();
    for (let i=0; i<8; i++) {
        document.querySelector(`#t${i}`).innerHTML = i == j ? "💎" : "&nbsp;" ;
    }
    clear();
};

const togstand = (i) => {
    document.querySelector(`#p${i}`).innerHTML = emoji(i, getstand(i));
    clear();
};

const emoji = (gender, standing) => {
    if (gender == 2 || gender == 4 || gender == 5) {
        return standing ? "🧍‍♂️" : "🧎‍♂️" ;
    } else if (gender == 0 || gender == 1 || gender == 7) {
        return standing ? "🧍‍♀️" : "🧎‍♀️" ;
    }
    return standing ? "🧍" : "🧎" ;
};

const clear = () => {
    document.querySelector('#assistant').disabled = false;
    document.querySelector('#magician').disabled = true;
    document.querySelector('#ra').innerHTML = "&nbsp;";
    document.querySelector('#rm').innerHTML = "&nbsp;";
};

const protocol = (i) => {
    if (i == 0) {
        labels = [0,1,2,3,4,5,6,7];
        document.querySelector('#normal').disabled = true;
        document.querySelector('#reverse').disabled = false;
    } else {
        labels = [7,6,5,4,3,2,1,0];
        document.querySelector('#normal').disabled = false;
        document.querySelector('#reverse').disabled = true;
    }
    clear();
};

const assistant = () => {
    const idx = labels.indexOf(xorall(labels[gettreasure()]));
    document.querySelector(`[name="x${idx}"]`).click();
    document.querySelector('#assistant').disabled = true;
    document.querySelector('#magician').disabled = false;
    document.querySelector('#ra').innerHTML = `${getname(idx)} changed`
};

const magician = () => {
    const idx = labels.indexOf(xorall());
    document.querySelector('#rm').innerHTML = `${getname(idx)} have`
    document.querySelector('#magician').disabled = true;
}

document.addEventListener('DOMContentLoaded', () => {
    movetreasure();
    for (let i=0; i<8; i++) {
        togstand(i);
    }
    document.querySelector('#normal').click();
}, false);
