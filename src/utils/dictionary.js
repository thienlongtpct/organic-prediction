const dictionary = {
  "Student ID": {
    "vi": "Mã học viên",
  },
  "Generate": {
    "vi": "Tạo bài tập",
  },
  "Statement": {
    "vi": "Đề bài",
  },
  "Exercise 1": {
    "vi": "Bài tập 1",
  },
  "Exercise 2": {
    "vi": "Bài tập 2",
  },
  "Vo Minh Thien Long | InICT | Le Quy Don Technical University": {
    "vi": "Võ Minh Thiên Long | Viện CNTT & TT | Đại học Kỹ thuật Lê Quý Đôn",
  },
  "Institue of Information Technology": {
    "vi": "Viện Công nghệ thông tin",
  },
  "and Communication": {
    "vi": "và Truyền thông",
  },
  "InICT": {
    "vi": "Viện CNTT & TT",
  },
  "Use Python programming language or other tools to implement the following requirements:\n": {
    "vi": "Sử dụng ngôn ngữ lập trình Python hoặc các công cụ khác, thực hiện yêu cầu sau:\n",
  },
  "Use prgramming language Python with BeautifulSoup library to implement this exercise:\n": {
    "vi": "Sử dụng ngôn ngữ lập trình Python và thư viện BeautifulSoup để thực hiện yêu cầu sau:\n",
  },
};

export const translate = (keyword, language) => {
  if (!(keyword in dictionary)) return keyword;
  const keywordTranslated = dictionary[keyword];
  if (!(language in keywordTranslated)) return keyword;
  return keywordTranslated[language];
};
