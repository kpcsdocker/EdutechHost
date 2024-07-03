export interface Category {
  categoryId: number;
  categoryName: string;
}

export interface Subcategory {
  subcategoryId: number;
  subcategoryName: string;
  category: Category;
}

export interface Course {
  courseId: number;
  courseName: string;
}

export interface CourseSubcategory {
  id: number;
  course: Course;
  subcategory: Subcategory;
}
