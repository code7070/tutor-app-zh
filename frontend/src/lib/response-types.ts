export interface IResponseTutors {
  data: Daum[];
  meta: Meta;
}

export interface IResponseTutorsRaw {
  data: DaumRaw[];
  meta: Meta;
}

export interface IResponseTutorDetailRaw {
  data: DaumRaw;
  meta: Meta;
}

export interface IResponseTutorDetail {
  data: Daum;
  meta: Meta;
}

interface Daum {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  countryOfBirth?: string;
  nativeLanguage?: string;
  feePerLesson?: number;
  experienceInYears?: number;
  bioHighlight?: string;
  bioLong: string;
  rating?: number;
  isRefundable: boolean;
  isVerified: boolean;
  user_id: UserId;
  languagesSpoken: LanguagesSpoken[];
  photo: string;
  isSuperTutor: boolean;
  isActive: boolean;
  introVideo: string;
}

interface DaumRaw extends Omit<Daum, "photo"> {
  photo: IPhoto;
}

interface IPhoto {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface UserId {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface LanguagesSpoken {
  id: number;
  proficiency: string;
  language: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
