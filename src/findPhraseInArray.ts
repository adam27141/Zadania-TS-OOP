const inputData: string[] = [
  "jabłko",
  "banan",
  "czereśnia",
  "daktyl",
  "borówka",
  "figa",
  "winogrono",
  "melon",
  "kiwi",
  "cytryna",
  "mango",
  "nektarynka",
  "pomarańcza",
  "papaja",
  "pigwa",
];

const findPhraseInArray = (array: string[], phrase: string) => {
  let arrayOfFoundWords: (string | number)[][] = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element.includes(phrase)) {
      arrayOfFoundWords.push([i, element]);
    }
  }
  return arrayOfFoundWords;
};

const resultPhraseInArray = findPhraseInArray(inputData, "ja");
console.log(resultPhraseInArray);
