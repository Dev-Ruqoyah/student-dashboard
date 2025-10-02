import  { useEffect, useState } from "react";
import type { CourseCardProps } from "../../../components/card/courseCard";
import CourseCard from "../../../components/card/courseCard";
import { getCourses } from "../../../utils/studentServices";
import { useLoading } from "../../../contexts/useLoadingContext";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [courses, setCourses] = useState<CourseCardProps[]>([]);
  const { setLoading } = useLoading();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await getCourses();

      // Ensure response fits CourseCardProps
      const mappedCourses: CourseCardProps[] = response.map((course: any) => ({
        id: course.id,
        title: course.title,
        status: course.status,
        progress: course.progress,
        instructor: course.instructor,
        theatre: course.theatre,
        unit: course.unit,
        category: course.category,
      }));

      setCourses(mappedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Filtering logic
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "" ||
      (filter === "active" && course.status === "Active") ||
      (filter === "inprogress" && course.status === "In Progress") ||
      (filter === "completed" && course.status === "Completed");

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      {/* Header nav */}
      <div className="flex justify-between items-center pb-6 flex-wrap gap-4">
        <div>
          <h3 className="text-lg font-semibold">My Courses</h3>
          <p className="text-gray-800">
            Manage your enrolled courses and track progress
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Courses</option>
              <option value="active">Active</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course list */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No courses found.
          </p>
        )}
      </div>
    </>
  );
};

export default Courses;
