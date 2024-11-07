type GenderType = "male" | "female";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: GenderType;
  age: number;
  hair: { color: string; type: string };
  address: { postalCode: string };
  company: { department: string };
}

export default User;