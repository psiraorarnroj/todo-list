import { NextResponse } from "next/server";
import IUser from "../interface/IUser";
import IResponseGetUser from "../interface/IResponseGetUser";

const fetchDummyUser = async (): Promise<IUser[]> => {
  const response = await fetch("https://dummyjson.com/users");
  const data = await response.json();
  return data.users;
};

const groupByDepartment = (users: IUser[]): IResponseGetUser => {
  const grouped: IResponseGetUser = {};

  users.forEach((user) => {
    const { department } = user.company;
    if (!grouped[department]) {
      grouped[department] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
      };
    }

    const departmentData = grouped[department];

    departmentData[user.gender]++;

    departmentData.hair[user.hair.color] =
      (departmentData.hair[user.hair.color] || 0) + 1;

    const fullName = `${user.firstName}${user.lastName}`;
    departmentData.addressUser[fullName] = user.address.postalCode;
  });

  for (const department in grouped) {
    const ages = users
      .filter((user) => user.company.department === department)
      .map((user) => user.age);
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);
    grouped[department].ageRange = `${minAge}-${maxAge}`;
  }

  return grouped;
};

export const GET = async () => {
  try {
    const users = await fetchDummyUser();
    const groupedData = groupByDepartment(users);
    return NextResponse.json(groupedData);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users data" + error },
      { status: 500 },
    );
  }
};
