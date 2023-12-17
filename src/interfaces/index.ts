export interface categoryCreateInt {
  name: string;
}

export interface categoryUpdateInt {
  name: string;
  id: number;
}

export interface familyCreateInt {
  name: string;
}

export interface familyUpdateInt {
  name: string;
  id: number;
}

export interface peopleCreateInt {
  family_id: number;
  category_id: number;
  first_name: string;
  last_name: string;
  gender: string;
  age: number;
  avatar: string;
}

export interface peopleUpdateInt {
  id: number;
  family_id: number;
  category_id: number;
  first_name: string;
  last_name: string;
  gender: string;
  age: number;
  avatar: string;
}

export interface peopleListParam {
  take: number;
  page: number;
  query: string;
  family_id: number;
  category_id: number;
  gender: string;
}

export interface gameCreateInt {
  title: string;
  link: string | null;
  participants: number;
  teams: number;
}
