export interface Category {
  category_id: number;
  category_name: string;
}

export interface Course {
  course_id: number;
  course_name: string;
  category: Category;
}
