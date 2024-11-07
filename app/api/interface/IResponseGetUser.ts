type IResponseGetUser = {
  [department: string]: {
    male: number;
    female: number;
    ageRange: string;
    hair: Record<string, number>;
    addressUser: Record<string, string>;
  };
};

export default IResponseGetUser;
