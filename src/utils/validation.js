import * as yup from 'yup';

// カスタムバリデーション関数
const isNotOnlyWhitespace = (value) => {
  return value && value.trim().length > 0;
};

// フォームバリデーションスキーマ
export const validationSchema = yup.object({
  name: yup
    .string()
    .required('氏名を入力してください')
    .test('not-only-whitespace', '氏名を入力してください', isNotOnlyWhitespace)
    .max(50, '氏名は50文字以内で入力してください'),
    
  address: yup
    .string()
    .required('住所を入力してください')
    .test('not-only-whitespace', '住所を入力してください', isNotOnlyWhitespace)
    .max(200, '住所は200文字以内で入力してください'),
    
  status: yup
    .string()
    .required('開始時期を選択してください'),
    
  motivation: yup
    .string()
    .required('志望動機を入力してください')
    .test('not-only-whitespace', '志望動機を入力してください', isNotOnlyWhitespace)
    .min(50, '志望動機は50文字以上で入力してください')
    .max(1000, '志望動機は1000文字以内で入力してください'),
});

// 開始時期の選択肢
export const statusOptions = [
  { value: 'immediate', label: '即時開始可能' },
  { value: 'within1month', label: '1ヶ月以内' },
  { value: 'within2to3months', label: '2-3ヶ月以内' },
  { value: 'negotiable', label: '要相談' },
];