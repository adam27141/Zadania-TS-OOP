interface settings {
  actualPageIdx: number;
  entriesOnPage: number;
}

const dataPagination = [1, 2, 3, 4, 5, 6, 7];
const settings = { actualPageIdx: 1, entriesOnPage: 3 };

const paginateArray = (dataEntries: number[], settings: settings): number[] => {
  let startIndex: number =
    (settings.actualPageIdx - 1) * settings.entriesOnPage;
  let endIndex: number =
    Math.min(
      settings.actualPageIdx * settings.entriesOnPage,
      dataEntries.length
    ) - 1;

  return dataEntries.slice(startIndex, endIndex + 1);
};

const resultPagination = paginateArray(dataPagination, settings);
console.log(resultPagination);
