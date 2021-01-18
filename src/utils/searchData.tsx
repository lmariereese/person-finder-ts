import {mockData} from "../mockData";
import {Person} from '../Components/PersonFinder';

function searchData(search: string): Array<Person> {
  if (search === "")
    return mockData;
  return mockData.filter((person: Person) => person.name.toLowerCase().includes(search.toLowerCase())
  );
}

export default searchData;
