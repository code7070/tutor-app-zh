export type TSortTutor =
  | "rating"
  | "price-higher"
  | "price-lower"
  | "relevance";

export type TFilterTutor = {
  price: { min: number; max: number };
  isNative: boolean;
  countryOfBirth: string;
  isSuperTutor: boolean;
};

// interface ITutorReview {
// //   id: string;
// //   lessonId: string;
// //   rating: number;
// //   comment: string;
// //   created_at: string;
// //   update_at: string;
// // }

// interface ITutorLanguage {
//   language: string;
//   codeLang: string;
//   proficiency: string;
// }

// // interface ILesson {
// //   id: string;
// //   tutorId: string;
// //   studentId: string;
// //   startAt: string;
// //   endAt: string;
// //   duration: number;
// //   status: string;
// //   created_at: string;
// //   update_at: string;
// // }

// // interface ISChedule {
// //   id: string;
// //   tutorId: string;
// //   availableStart: string;
// //   availableEnd: string;
// //   created_at: string;
// //   updated_at: string;
// // }

// // interface IStudent {
// //   id: string;
// //   userId: string;
// //   name: string;
// //   prefered_language: string;
// //   created_at: string;
// //   updated_at: string;
// // }

// export interface ITutor {
//   id: string;
//   userId: string;
//   name: string;
//   countryOfBirth: string;
//   nativeLanguage: string;
//   feePerLesson: number;
//   reviews_count: number;
//   lessons_given: number;
//   students_count: number;
//   experience_years: number;
//   bioHighlight: string;
//   aboutMe: string;
//   languagesSpoken: ITutorLanguage[];
//   created_at: string;
//   updated_at: string;

//   rating: number;
//   isRefundable: boolean;
//   isVerified: boolean;
// }
