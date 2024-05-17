import { useContext, useEffect, useState } from "react";
import MyCourseSub from "./MyCourseSub";
import { AuthContext } from "../provider/AuthProvider";


const MyCourse = () => {
    const { user } = useContext(AuthContext);
    const [All_Courses, setAll_Courses] = useState([]);
    useEffect(()=>{
         fetch('https://skill-share-server-se.vercel.app/courses', { mode: 'no-cors' })
         .then(res=>res.json())
         .then(data=>{
          console.log('i am form courses.jsx');
          setAll_Courses(data)
         })
    },[])

    // Filter courses based on the presence of a specific email in students array
    const filteredCourses = All_Courses.filter(course =>
        course.students && course.students.includes(user.email)
      );
    

    return (
        <div className="mt-8">
             <div className="grid grid-cols-4 gap-6">
             {filteredCourses.map(course => (
              <MyCourseSub key={course.course_id} 
                    course={course}></MyCourseSub>
               ))}
             </div>
        </div>
    );
};

export default MyCourse;