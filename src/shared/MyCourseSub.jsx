import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from 'react-icons/fa';

const MyCourseSub = ({cou}) => {
    const {_id,course_id,course_name,course_image}=cou;

    const navigate = useNavigate();

    const handleCourseDetails =()=>{
        console.log("mama",course_id,_id);
        navigate(`/courses/${course_id}`);
    }
    return (
        <div>
            
        <div  className="card h-[350px] card-compact bg-base-100 shadow-xl hover:shadow-gray-500 hover:scale-95 hover:cursor-pointer transition ease-in-out delay-150">
            <figure><img className='h-[200px] bg-green-400 w-full'  src={course_image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title  text-xl">{course_name}</h2>
                <div className="card-actions justify-end">
                <button onClick={handleCourseDetails} className="btn  btn-warning  mt-4 ">Details <FaLongArrowAltRight /></button> 
                </div>
            </div>
        </div>  

    </div>
    );
};

export default MyCourseSub;