const dictionary = {
  "Organic Chemistry Reaction Prediction": {
    "vi": "Dự đoán Phản ứng Hoá học Hữu cơ",
  },
  "SMILES inputs": {
    "vi": "Nhập dữ liệu dạng SMILES"
  },
  "Reactants": {
    "vi": "Chất phản ứng",
  },
  "Known reactants": {
    "vi": "Chất tham gia phản ứng",
  },
  "Products": {
    "vi": "Sản phẩm",
  },
  "Predicted products": {
    "vi": "Sản phẩm dự đoán",
  },
  "Structure diagram": {
    "vi": "Cấu trúc 2D",
  },
  "3D structure": {
    "vi": "Cấu trúc 3D",
  },
  "Structure of": {
    "vi": "Cấu trúc của",
  },
  "Predict": {
    "vi": "Dự đoán",
  },
  "Result": {
    "vi": "Kết quả",
  },
  "Formula": {
    "vi": "Công thức",
  }
};

export const translate = (keyword, language) => {
  if (!(keyword in dictionary)) return keyword;
  const keyword_translated = dictionary[keyword];
  if (!(language in keyword_translated)) return keyword;
  return keyword_translated[language];
};
