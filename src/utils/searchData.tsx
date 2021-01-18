import {mockData} from "../mockData";

interface Person {
  name: string;
  email: string;
  description: string;
  avatar: string;
}

const searchData = (search: string) => {
  if (search === "") return mockData;
  const lowerCaseSearchTerm: string = search.toLowerCase();
  return mockData.filter((person: Person) => {
    if (person.name.toLowerCase() === lowerCaseSearchTerm) return true;
    if (person.name.toLowerCase().includes(lowerCaseSearchTerm)) return true;
    return false;
  });
}

export default searchData;
