export type Career = {
  id: string;
  name: string;
};

export type Campus = {
  id: string;
  name: string;
};

export type Student = {
  id: string;
  name: string;
  matricula: string;
  semester: number;
  career: string;
  campus: string;
  createdAt: Date;
};