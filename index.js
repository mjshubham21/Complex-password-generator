//DOM.
const resElt = document.getElementById("result");
const lengthElt = document.getElementById("length");
const lowerElt = document.getElementById("lower");
const upperElt = document.getElementById("upper");
const numbersElt = document.getElementById("number");
const symbolsElt = document.getElementById("symbol");
const genrerateElt = document.getElementById("generate");
const clipboardElt = document.getElementById("clipboard");

const randomFunc = {
  lower: getLower,
  upper: getUpper,
  number: getNumber,
  symbol: getSymbol,
};

//clipboard from google.
clipboardElt.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const pwd = resElt.innerText;

  if (!pwd) {
    return;
  }

  textarea.value = pwd;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied.");
});

genrerateElt.addEventListener("click", () => {
  const length = +lengthElt.value;
  const hasLower = lowerElt.checked;
  const hasUpper = upperElt.checked;
  const hasNumber = numbersElt.checked;
  const hasSymbol = symbolsElt.checked;

  resElt.innerText = genreratePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

//generate funtion:
function genreratePassword(lower, upper, number, symbol, length) {
  let pwd = "";
  const typesCount = lower + upper + number + symbol;

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  } else
    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        pwd += randomFunc[funcName]();
      });
    }
  const finalpwd = pwd.slice(0, length);
  return finalpwd;
}

//4 Func. for char types to include.
function getLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97); //lower case starts at 97.
}

function getUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65); //upper case starts at 65.
}

function getNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48); //nums starts at 48.
}

function getSymbol() {
  const symbols = "!@#$%^&*=";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
