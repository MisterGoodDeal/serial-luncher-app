export type Faker = {
  todos?: Todo[];
  todo?: Todo;
};

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
