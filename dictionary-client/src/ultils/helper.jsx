import * as XLSX from "xlsx";

export const generateRange = (start, end) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => index + start);
};

export const readFileDataImport = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    let dataMain = [];

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        dataMain = XLSX.utils.sheet_to_json(worksheet, {
          cellText: true,
        });
        resolve({ dataMain });
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsArrayBuffer(file);
  });
};
