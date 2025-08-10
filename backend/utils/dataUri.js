import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDataUri = (file) => {
  if (!file) return null; //  Prevents crash if file is undefined

  const extName = path.extname(file.originalname);
  return parser.format(extName, file.buffer);
};

export default getDataUri;
