const alphabet: string[] = "abcdefghijklmnoprstuwxyz".split("");

const aggregateIntoChunks = (array: string[]): string[][] => {
  let chunks: string[][] = [];
  let arrayOfElements: string[] = [];

  array.forEach((element: string) => {
    arrayOfElements.push(element);
  });

  while (arrayOfElements.length > 0) {
    let randomNumber4_7: number = Math.floor(Math.random() * 4) + 4;
    let chunk: string[] = [];

    for (let i = 0; i < randomNumber4_7; i++) {
      const letter = arrayOfElements.shift();
      if (letter) {
        chunk.push(letter);
      }
    }

    chunks.push(chunk);
    let lastChunkElement = chunks[chunks.length - 1];
    if (lastChunkElement.length < 4) {
      chunks = [];

      array.forEach((element) => {
        arrayOfElements.push(element);
      });
    }
  }
  return chunks;
};

let resultRandomChunks = aggregateIntoChunks(alphabet);
console.log(resultRandomChunks);
