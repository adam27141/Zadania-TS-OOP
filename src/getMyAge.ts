type Allowed = Date | number | string;

function getMyAge(input: Allowed): number {
  let date: Date = new Date();
  let actualYear = date.getFullYear();
  let Age: number;

  if (typeof input === "string") {
    Age = actualYear - Number(input);
  } else if (typeof input === "object") {
    input = input.getFullYear();
    Age = actualYear - input;
  } else {
    Age = actualYear - input;
  }

  return Age;
}

const result1 = getMyAge(new Date(2002, 1, 1));
const result2 = getMyAge("2002");
const result3 = getMyAge(2002);

console.log(result3);

// wyniki result1, result2 i result3 mają być identyczne
