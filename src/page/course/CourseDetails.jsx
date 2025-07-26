import { useLoaderData, useParams } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import video from '../../assets/image/Videos-green.svg'
import { MdSlowMotionVideo, MdAccessTime, MdLanguage, MdGroup, MdStar, MdPlayCircle } from "react-icons/md";
import { FaArrowAltCircleDown, FaArrowLeft, FaArrowRight, FaDotCircle, FaPhone, FaVideo, FaCheck, FaBookOpen, FaUsers, FaCertificate, FaDownload, FaShareAlt, FaHeart } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { RiPagesLine } from "react-icons/ri";
import EachModule from "./EachModule";
import { LuDot } from "react-icons/lu";
import { FaPhoneVolume, FaRankingStar, FaGraduationCap, FaLaptopCode, FaChartLine, FaBriefcase } from "react-icons/fa6";
import { GiStarGate } from "react-icons/gi";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";

const CourseDetails = () => {
   const searchData = new URLSearchParams(window.location.search)
   const message = searchData.get('message')
   console.log(message);
   var luck = false;

   const { course_id } = useParams();
   const course = useLoaderData();
   const { user, loading } = useContext(AuthContext);
   const [Email, setEmail] = useState(course.students);
   const [activeTab, setActiveTab] = useState('overview');
   const [showVideo, setShowVideo] = useState(false);

   if (user) {
      const { email } = user
      if (Email.includes(email)) {
         luck = true;
      }
      else {
         if (message == 'Successful') {
            course.students = [...Email, email];
            console.log('Email add hoice', course.students);
            fetch(`https://skill-share-server-se.vercel.app/courses/${course._id}`, {
               method: "PUT",
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(course)
            })
               .then(res => res.json())
               .then(data => {
                  console.log("updated data:", data)
                  luck = true;
               })
         }
      }
   }

   const { course_image, course_name, starting_date, price, Modules, num_mod, instructors } = course;

   const pay = async () => {
      try {
         const { data } = await axios.post('https://skill-share-server-se.vercel.app/api/bkash/payment/create', { amount: price, orderId: 1 }, { withCredentials: true })
         if (!luck)
            window.location.href = data.bkashURL
      } catch (error) {
         console.log(error)
      }
   }

   // Sample additional data for enhanced content
   const courseStats = {
      totalStudents: 2847,
      rating: 4.8,
      totalReviews: 1250,
      completionRate: 94,
      jobPlacementRate: 87
   };

   const courseFeatures = [
      { icon: <FaLaptopCode />, title: "প্র্যাকটিক্যাল প্রজেক্ট", desc: "৮টি রিয়েল-ওয়ার্ল্ড প্রজেক্ট" },
      { icon: <FaCertificate />, title: "সার্টিফিকেট", desc: "ইন্ডাস্ট্রি স্বীকৃত সার্টিফিকেট" },
      { icon: <FaUsers />, title: "কমিউনিটি সাপোর্ট", desc: "২৪/৭ কমিউনিটি সাপোর্ট" },
      { icon: <FaBriefcase />, title: "ক্যারিয়ার সাপোর্ট", desc: "জব প্লেসমেন্ট সহায়তা" }
   ];

   const learningOutcomes = [
      "Laravel Framework এর সম্পূর্ণ A to Z শিখবেন",
      "Modern PHP Development এর বেস্ট প্র্যাকটিস",
      "Database Design এবং Eloquent ORM",
      "API Development এবং Authentication",
      "Payment Gateway Integration",
      "Deployment এবং Server Management",
      "Real-time Applications with WebSocket",
      "Testing এবং Debugging Techniques"
   ];

   const prerequisites = [
      "Basic HTML, CSS, JavaScript জ্ঞান",
      "PHP এর প্রাথমিক ধারণা",
      "MySQL Database এর বেসিক ধারণা",
      "একটি কম্পিউটার এবং ইন্টারনেট সংযোগ"
   ];

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
         {/* Hero Section with Breadcrumb */}
         <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-8">
            <div className="max-w-[1370px] mx-auto px-6">
               <nav className="text-blue-200 mb-4">
                  <span>হোম</span> / <span>কোর্স</span> / <span className="text-white">কোর্স বিস্তারিত</span>
               </nav>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                     <MdStar className="text-yellow-400" />
                     <span>{courseStats.rating}</span>
                     <span className="text-blue-200">({courseStats.totalReviews} রিভিউ)</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <MdGroup />
                     <span>{courseStats.totalStudents} শিক্ষার্থী</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="max-w-[1370px] mx-auto px-6 py-8">
            {/* Mobile Image */}
            <div className="block lg:hidden mb-6">
               <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src={course_image} alt={course_name} className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                     <button 
                        onClick={() => setShowVideo(true)}
                        className="bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-300 rounded-full p-4 shadow-lg"
                     >
                        <MdPlayCircle className="text-4xl text-blue-600" />
                     </button>
                  </div>
               </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
               {/* Left Side - Main Content */}
               <div className="w-full lg:w-3/5">
                  {/* Course Title & Description */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                     <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-6 leading-tight">
                        {course_name}
                     </h1>
                     <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        সবচেয়ে গোছানো ও আপডেটেড কারিকুলামে বাংলা ভাষায় লারাভেল ডেভেলপার হবার বেস্ট জার্নি অপেক্ষা করছে আপনার জন্য। 
                        এই কোর্সে আপনি শিখবেন আধুনিক ওয়েব ডেভেলপমেন্টের সকল দিক এবং ইন্ডাস্ট্রি স্ট্যান্ডার্ড বেস্ট প্র্যাকটিস।
                     </p>

                     {/* Action Buttons */}
                     <div className="flex flex-wrap gap-4 mb-6">
                        <button className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                           <FaShareAlt /> শেয়ার করুন
                        </button>
                        <button className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
                           <FaHeart /> উইশলিস্টে যোগ করুন
                        </button>
                        <button className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">
                           <FaDownload /> সিলেবাস ডাউনলোড
                        </button>
                     </div>

                     {/* Course Schedule */}
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border-l-4 border-orange-500">
                           <SlCalender className="text-2xl text-orange-500" />
                           <div>
                              <p className="font-semibold text-gray-700">শুরু হবে</p>
                              <p className="text-orange-600 font-bold">{starting_date}</p>
                           </div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-l-4 border-green-500">
                           <MdAccessTime className="text-2xl text-green-500" />
                           <div>
                              <p className="font-semibold text-gray-700">ক্লাস শিডিউল</p>
                              <p className="text-green-600 font-bold">রবি, মঙ্গল (রাত ৯:০০ - ১০:৩০)</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Course Features */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                     <h2 className="text-2xl font-bold text-gray-800 mb-6">এই কোর্সের বিশেষত্ব</h2>
                     <div className="grid md:grid-cols-2 gap-6">
                        {courseFeatures.map((feature, index) => (
                           <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                              <div className="text-2xl text-blue-600 mt-1">
                                 {feature.icon}
                              </div>
                              <div>
                                 <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                 <p className="text-gray-600 text-sm">{feature.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Tab Navigation */}
                  <div className="bg-white rounded-2xl shadow-lg mb-8">
                     <div className="flex border-b border-gray-200">
                        {[
                           { id: 'overview', label: 'ওভারভিউ' },
                           { id: 'curriculum', label: 'কারিকুলাম' },
                           { id: 'instructor', label: 'ইন্সট্রাক্টর' },
                           { id: 'reviews', label: 'রিভিউ' }
                        ].map((tab) => (
                           <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`px-6 py-4 font-semibold transition-colors ${
                                 activeTab === tab.id 
                                    ? 'text-blue-600 border-b-2 border-blue-600' 
                                    : 'text-gray-600 hover:text-blue-600'
                              }`}
                           >
                              {tab.label}
                           </button>
                        ))}
                     </div>

                     <div className="p-8">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                           <div className="space-y-8">
                              {/* Learning Outcomes */}
                              <div>
                                 <h3 className="text-xl font-bold text-gray-800 mb-4">এই কোর্স শেষে আপনি যা শিখবেন</h3>
                                 <div className="grid md:grid-cols-2 gap-3">
                                    {learningOutcomes.map((outcome, index) => (
                                       <div key={index} className="flex items-start gap-3">
                                          <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                          <p className="text-gray-700">{outcome}</p>
                                       </div>
                                    ))}
                                 </div>
                              </div>

                              {/* Prerequisites */}
                              <div>
                                 <h3 className="text-xl font-bold text-gray-800 mb-4">কোর্সের জন্য প্রয়োজনীয়তা</h3>
                                 <div className="space-y-3">
                                    {prerequisites.map((prereq, index) => (
                                       <div key={index} className="flex items-start gap-3">
                                          <FaDotCircle className="text-blue-500 mt-1 flex-shrink-0" />
                                          <p className="text-gray-700">{prereq}</p>
                                       </div>
                                    ))}
                                 </div>
                              </div>

                              {/* Course Stats */}
                              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                                 <h3 className="text-xl font-bold text-gray-800 mb-4">কোর্স পরিসংখ্যান</h3>
                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                       <div className="text-2xl font-bold text-blue-600">{courseStats.totalStudents}</div>
                                       <div className="text-sm text-gray-600">মোট শিক্ষার্থী</div>
                                    </div>
                                    <div className="text-center">
                                       <div className="text-2xl font-bold text-green-600">{courseStats.completionRate}%</div>
                                       <div className="text-sm text-gray-600">সম্পূর্ণ করার হার</div>
                                    </div>
                                    <div className="text-center">
                                       <div className="text-2xl font-bold text-purple-600">{courseStats.jobPlacementRate}%</div>
                                       <div className="text-sm text-gray-600">চাকরি প্রাপ্তির হার</div>
                                    </div>
                                    <div className="text-center">
                                       <div className="text-2xl font-bold text-yellow-600">{courseStats.rating}</div>
                                       <div className="text-sm text-gray-600">রেটিং</div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )}

                        {/* Curriculum Tab */}
                        {activeTab === 'curriculum' && (
                           <div>
                              <div className="flex flex-wrap items-center gap-6 mb-8">
                                 <h2 className="text-2xl font-bold text-gray-800">স্টাডি প্ল্যান</h2>
                                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-2">
                                       <FaBookOpen className="text-blue-500" />
                                       {num_mod} টি মডিউল
                                    </span>
                                    <span className="flex items-center gap-2">
                                       <MdPlayCircle className="text-green-500" />
                                       ৪৮ টি লাইভ ক্লাস
                                    </span>
                                    <span className="flex items-center gap-2">
                                       <TfiWrite className="text-purple-500" />
                                       ১৬ টি এসাইনমেন্ট
                                    </span>
                                 </div>
                              </div>

                              <div className="space-y-4">
                                 {Modules.map(mod => (
                                    <EachModule module={mod} luck={luck} key={mod.module_id} />
                                 ))}
                              </div>
                           </div>
                        )}

                        {/* Instructor Tab */}
                        {activeTab === 'instructor' && (
                           <div>
                              <h2 className="text-2xl font-bold text-gray-800 mb-6">আপনার ইন্সট্রাক্টর</h2>
                              
                              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border-l-4 border-orange-500 p-6">
                                 <div className="flex items-center gap-3 mb-6">
                                    <FaGraduationCap className="text-2xl text-orange-500" />
                                    <h3 className="text-xl font-semibold text-gray-800">Lead Instructor</h3>
                                 </div>

                                 <div className="space-y-6">
                                    {instructors.map((instructor, index) => (
                                       <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                          <div className="flex flex-col md:flex-row gap-6">
                                             <div className="flex-shrink-0">
                                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg">
                                                   <img 
                                                      src={instructor.instructor_image} 
                                                      alt={instructor.instructor_name}
                                                      className="w-full h-full object-cover"
                                                   />
                                                </div>
                                             </div>
                                             <div className="flex-1">
                                                <h4 className="text-xl font-bold text-gray-800 mb-2">
                                                   {instructor.instructor_name}
                                                </h4>
                                                <p className="text-blue-600 font-medium mb-4">
                                                   {instructor.instructor_specialties}
                                                </p>
                                                <div className="space-y-3">
                                                   <div className="flex items-center gap-2 text-gray-600">
                                                      <FaChartLine className="text-green-500" />
                                                      <span>১০+ বছর ইন্ডাস্ট্রি এক্সপেরিয়েন্স</span>
                                                   </div>
                                                   <div className="flex items-center gap-2 text-gray-600">
                                                      <FaUsers className="text-blue-500" />
                                                      <span>৫০০০+ সফল শিক্ষার্থী</span>
                                                   </div>
                                                   <div className="flex items-center gap-2 text-gray-600">
                                                      <MdStar className="text-yellow-500" />
                                                      <span>৪.৯ রেটিং</span>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        )}

                        {/* Reviews Tab */}
                        {activeTab === 'reviews' && (
                           <div>
                              <h2 className="text-2xl font-bold text-gray-800 mb-6">শিক্ষার্থীদের রিভিউ</h2>
                              
                              {/* Review Summary */}
                              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-8">
                                 <div className="flex items-center gap-6">
                                    <div className="text-center">
                                       <div className="text-4xl font-bold text-yellow-600">{courseStats.rating}</div>
                                       <div className="flex justify-center gap-1 mt-2">
                                          {[1, 2, 3, 4, 5].map((star) => (
                                             <MdStar key={star} className="text-yellow-500" />
                                          ))}
                                       </div>
                                       <div className="text-sm text-gray-600 mt-1">
                                          {courseStats.totalReviews} রিভিউ
                                       </div>
                                    </div>
                                    <div className="flex-1">
                                       <div className="space-y-2">
                                          {[5, 4, 3, 2, 1].map((rating) => (
                                             <div key={rating} className="flex items-center gap-3">
                                                <span className="text-sm w-8">{rating}★</span>
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                   <div 
                                                      className="bg-yellow-500 h-2 rounded-full"
                                                      style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%` }}
                                                   ></div>
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                   {rating === 5 ? '876' : rating === 4 ? '250' : rating === 3 ? '65' : rating === 2 ? '37' : '22'}
                                                </span>
                                             </div>
                                          ))}
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              {/* Sample Reviews */}
                              <div className="space-y-6">
                                 {[
                                    {
                                       name: "মোহাম্মদ রাহুল",
                                       rating: 5,
                                       comment: "অসাধারণ একটি কোর্স! ইন্সট্রাক্টরের শেখানোর পদ্ধতি খুবই কার্যকর। Laravel এর জটিল বিষয়গুলো সহজভাবে বুঝিয়েছেন।",
                                       date: "২ দিন আগে"
                                    },
                                    {
                                       name: "ফাতিমা খান",
                                       rating: 5,
                                       comment: "এই কোর্স করার পর আমি একটি ভালো চাকরি পেয়েছি। প্র্যাকটিক্যাল প্রজেক্টগুলো খুবই হেল্পফুল ছিল।",
                                       date: "১ সপ্তাহ আগে"
                                    },
                                    {
                                       name: "আব্দুল করিম",
                                       rating: 4,
                                       comment: "খুব ভালো কোর্স। কিছু জায়গায় আরো বিস্তারিত হলে ভালো হতো। তবে সার্বিকভাবে সন্তুষ্ট।",
                                       date: "২ সপ্তাহ আগে"
                                    }
                                 ].map((review, index) => (
                                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                                       <div className="flex items-start justify-between mb-4">
                                          <div>
                                             <h4 className="font-semibold text-gray-800">{review.name}</h4>
                                             <div className="flex items-center gap-2 mt-1">
                                                <div className="flex gap-1">
                                                   {[1, 2, 3, 4, 5].map((star) => (
                                                      <MdStar
                                                         key={star}
                                                         className={star <= review.rating ? 'text-yellow-500' : 'text-gray-300'}
                                                      />
                                                   ))}
                                                </div>
                                                <span className="text-sm text-gray-500">{review.date}</span>
                                             </div>
                                          </div>
                                       </div>
                                       <p className="text-gray-700">{review.comment}</p>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* About Course */}
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                     <h2 className="text-2xl font-bold text-gray-800 mb-6">কোর্স সম্পর্কে বিস্তারিত</h2>
                     <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-6">
                           সফটওয়ার ইঞ্জিনিয়ার নিয়োগ দেওয়ার ক্ষেত্রে দেশি বা বিদেশি টেক কোম্পানিগুলো কোডিং ইন্টারভিউ নিয়ে থাকেন যেখানে মূলত ক্যান্ডিডেটের প্রবলেম সলভিং এবিলিটি যাচাই করা হয়ে থাকে। 
                           আর এ কোয়েশ্চনগুলো ম্যাক্সিমাম ক্ষেত্রেই থাকে ডাটা স্ট্রাকচার এবং অ্যালগরিদমকে কেন্দ্র করে।
                        </p>
                        
                        <p className="mb-6">
                           এই কোর্সটি বিশেষভাবে ডিজাইন করা হয়েছে যারা Laravel দিয়ে প্রফেশনাল ওয়েব অ্যাপ্লিকেশন ডেভেলপ করতে চান তাদের জন্য। 
                           আমাদের এক্সপার্ট ইনস্ট্রাক্টরদের গাইডেন্সে আপনি শিখবেন ইন্ডাস্ট্রি স্ট্যান্ডার্ড কোডিং প্র্যাকটিস এবং আধুনিক ডেভেলপমেন্ট টুলস।
                        </p>

                        <p>
                           কোর্স শেষে আপনি সক্ষম হবেন সম্পূর্ণ একটি ই-কমার্স ওয়েবসাইট, ব্লগ, CMS এবং API তৈরি করতে। 
                           এছাড়াও পাবেন ক্যারিয়ার গাইডেন্স এবং জব প্লেসমেন্ট সাপোর্ট।
                        </p>
                     </div>
                  </div>
               </div>

               {/* Right Side - Course Purchase Card */}
               <div className="w-full lg:w-2/5">
                  <div className="sticky top-8">
                     {/* Desktop Image with Video Overlay */}
                     <div className="hidden lg:block mb-6">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                           <img src={course_image} alt={course_name} className="w-full h-64 object-cover" />
                           <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                              <button 
                                 onClick={() => setShowVideo(true)}
                                 className="bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-300 rounded-full p-4 shadow-lg"
                              >
                                 <MdPlayCircle className="text-4xl text-blue-600" />
                              </button>
                           </div>
                        </div>
                     </div>

                     {/* Purchase Card */}
                     <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                        {/* Price Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                           <div className="flex items-center justify-between">
                              <div>
                                 <h3 className="text-2xl font-bold">৳{price}</h3>
                                 <p className="text-blue-100">একবার পেমেন্ট, লাইফটাইম অ্যাক্সেস</p>
                              </div>
                              <div className="text-right">
                                 <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                                    <span className="text-sm">৫০% ছাড়</span>
                                 </div>
                                 <p className="text-sm text-blue-100 line-through mt-1">৳{price * 2}</p>
                              </div>
                           </div>
                        </div>

                        <div className="p-6">
                           {/* Enrollment Button */}
                           {!luck ? (
                              <button 
                                 onClick={pay}
                                 className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-6"
                              >
                                 <span className="flex items-center justify-center gap-3">
                                    এখনই এনরোল করুন
                                    <FaArrowRight />
                                 </span>
                              </button>
                           ) : (
                              <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl text-center font-semibold mb-6">
                                 <FaCheck className="inline mr-2" />
                                 আপনি এই কোর্সে এনরোল করেছেন
                              </div>
                           )}

                           {/* Course Includes */}
                           <div className="mb-6">
                              <h4 className="font-bold text-lg text-gray-800 mb-4">এই কোর্সে আপনি পাচ্ছেন</h4>
                              
                              <div className="space-y-3">
                                 {[
                                    { icon: <MdAccessTime />, text: "১৬ সপ্তাহের স্টাডি প্ল্যান", color: "text-blue-500" },
                                    { icon: <FaLaptopCode />, text: "৮টি প্র্যাকটিক্যাল প্রজেক্ট", color: "text-green-500" },
                                    { icon: <MdPlayCircle />, text: "১০০+ ভিডিও লেকচার", color: "text-red-500" },
                                    { icon: <FaBookOpen />, text: "ডাউনলোডেবল রিসোর্স", color: "text-purple-500" },
                                    { icon: <FaCertificate />, text: "কমপ্লিশন সার্টিফিকেট", color: "text-yellow-500" },
                                    { icon: <FaUsers />, text: "কমিউনিটি অ্যাক্সেস", color: "text-indigo-500" },
                                    { icon: <FaPhone />, text: "ডাইরেক্ট মেন্টর সাপোর্ট", color: "text-orange-500" },
                                    { icon: <FaBriefcase />, text: "জব প্লেসমেন্ট সহায়তা", color: "text-teal-500" }
                                 ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                       <div className={`${item.color} text-lg`}>
                                          {item.icon}
                                       </div>
                                       <span className="text-gray-700">{item.text}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           {/* Money Back Guarantee */}
                           <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                              <div className="flex items-center gap-3">
                                 <div className="bg-green-500 text-white rounded-full p-2">
                                    <FaCheck />
                                 </div>
                                 <div>
                                    <h5 className="font-semibold text-green-800">৩০ দিনের মানি-ব্যাক গ্যারান্টি</h5>
                                    <p className="text-sm text-green-600">সন্তুষ্ট না হলে ১০০% রিফান্ড</p>
                                 </div>
                              </div>
                           </div>

                           {/* Limited Time Offer */}
                           <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                              <div className="text-center">
                                 <h5 className="font-semibold text-red-800 mb-2">সীমিত সময়ের অফার!</h5>
                                 <div className="flex justify-center items-center gap-2 text-red-600">
                                    <span className="bg-red-100 px-2 py-1 rounded">০২</span>
                                    <span>:</span>
                                    <span className="bg-red-100 px-2 py-1 rounded">২৩</span>
                                    <span>:</span>
                                    <span className="bg-red-100 px-2 py-1 rounded">৪৫</span>
                                    <span>:</span>
                                    <span className="bg-red-100 px-2 py-1 rounded">১২</span>
                                 </div>
                                 <p className="text-sm text-red-600 mt-1">দিন : ঘন্টা : মিনিট : সেকেন্ড</p>
                              </div>
                           </div>

                           {/* Contact Support */}
                           <div className="border-t border-gray-200 pt-6">
                              <div className="text-center">
                                 <h5 className="font-semibold text-gray-800 mb-3">কোন প্রশ্ন আছে?</h5>
                                 <div className="flex justify-center items-center gap-2 text-orange-600 mb-3">
                                    <FaPhoneVolume />
                                    <span className="font-semibold">০১৭৮৯৩৪৯৯</span>
                                 </div>
                                 <p className="text-sm text-gray-600 mb-4">সকাল ১০টা থেকে রাত ১০টা</p>
                                 
                                 <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                                       <FaPhone />
                                       <span className="text-sm">কল করুন</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                                       <FaVideo />
                                       <span className="text-sm">ভিডিও কল</span>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Additional Info Cards */}
                     <div className="space-y-4 mt-6">
                        {/* Student Testimonial */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                           <div className="flex items-start gap-3">
                              <img 
                                 src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format" 
                                 alt="Student" 
                                 className="w-10 h-10 rounded-full"
                              />
                              <div>
                                 <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-sm">আহমেদ হাসান</span>
                                    <div className="flex gap-1">
                                       {[1,2,3,4,5].map(star => (
                                          <MdStar key={star} className="text-yellow-500 text-xs" />
                                       ))}
                                    </div>
                                 </div>
                                 <p className="text-xs text-gray-600">
                                    "এই কোর্স আমার ক্যারিয়ার চেঞ্জ করে দিয়েছে। এখন আমি একটি টেক কোম্পানিতে Laravel ডেভেলপার হিসেবে কাজ করছি।"
                                 </p>
                              </div>
                           </div>
                        </div>

                        {/* Course Stats */}
                        <div className="bg-gray-50 rounded-xl p-4">
                           <h5 className="font-semibold text-gray-800 mb-3">কোর্স পরিসংখ্যান</h5>
                           <div className="grid grid-cols-2 gap-4 text-center">
                              <div>
                                 <div className="text-2xl font-bold text-blue-600">{courseStats.totalStudents}</div>
                                 <div className="text-xs text-gray-600">এনরোলড স্টুডেন্ট</div>
                              </div>
                              <div>
                                 <div className="text-2xl font-bold text-green-600">{courseStats.rating}</div>
                                 <div className="text-xs text-gray-600">গড় রেটিং</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Video Modal */}
            {showVideo && (
               <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh]">
                     <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-xl font-semibold">কোর্স প্রিভিউ</h3>
                        <button 
                           onClick={() => setShowVideo(false)}
                           className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                           ✕
                        </button>
                     </div>
                     <div className="p-4">
                        <video controls width="100%" height="auto" className="rounded-lg">
                           <source src='https://res.cloudinary.com/dcao1wljw/video/upload/v1705068809/rqnktzvjuk1xdgevgteq.mp4' type="video/mp4" />
                           Your browser does not support the video tag.
                        </video>
                     </div>
                  </div>
               </div>
            )}

            {/* Related Courses Section */}
            <div className="mt-16">
               <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">সম্পর্কিত কোর্সসমূহ</h2>
               <div className="grid md:grid-cols-3 gap-6">
                  {[
                     {
                        title: "React.js Complete Course",
                        price: "৮,৯৯৯",
                        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop&auto=format",
                        rating: 4.7,
                        students: 1850
                     },
                     {
                        title: "Node.js Backend Development",
                        price: "৭,৯৯৯",
                        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop&auto=format",
                        rating: 4.9,
                        students: 2100
                     },
                     {
                        title: "Full Stack JavaScript",
                        price: "১২,৯৯৯",
                        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop&auto=format",
                        rating: 4.8,
                        students: 3200
                     }
                  ].map((relatedCourse, index) => (
                     <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <img src={relatedCourse.image} alt={relatedCourse.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                           <h3 className="font-bold text-lg text-gray-800 mb-2">{relatedCourse.title}</h3>
                           <div className="flex items-center gap-2 mb-3">
                              <div className="flex gap-1">
                                 {[1,2,3,4,5].map(star => (
                                    <MdStar key={star} className="text-yellow-500 text-sm" />
                                 ))}
                              </div>
                              <span className="text-sm text-gray-600">({relatedCourse.students})</span>
                           </div>
                           <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-orange-600">৳{relatedCourse.price}</span>
                              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                 বিস্তারিত দেখুন
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
               <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">প্রায়শই জিজ্ঞাসিত প্রশ্ন</h2>
               <div className="space-y-6">
                  {[
                     {
                        question: "কোর্সটি কতদিনের জন্য অ্যাক্সেস পাবো?",
                        answer: "একবার ক্রয় করলে আপনি লাইফটাইম অ্যাক্সেস পাবেন। কোন সময়সীমা নেই।"
                     },
                     {
                        question: "কোর্স সার্টিফিকেট কি ইন্ডাস্ট্রিতে গ্রহণযোগ্য?",
                        answer: "হ্যাঁ, আমাদের সার্টিফিকেট বাংলাদেশের অনেক টেক কোম্পানি স্বীকার করে এবং আমাদের CV রিভিউ সার্ভিস আছে।"
                     },
                     {
                        question: "ক্লাস মিস হলে কি করব?",
                        answer: "প্রতিটি লাইভ ক্লাস রেকর্ড করা হয় এবং আপনি যেকোনো সময় দেখতে পারবেন।"
                     },
                     {
                        question: "কোর্স ফি কিস্তিতে দেওয়া যাবে?",
                        answer: "দুঃখিত, এই মুহূর্তে কিস্তির সুবিধা নেই। তবে আমাদের বিশেষ ছাড় অফার রয়েছে।"
                     },
                     {
                        question: "কোর্স শেষে চাকরির গ্যারান্টি আছে কি?",
                        answer: "আমরা চাকরির গ্যারান্টি দিতে পারি না, তবে আমাদের জব প্লেসমেন্ট সাপোর্ট টিম আপনাকে সাহায্য করবে।"
                     }
                  ].map((faq, index) => (
                     <div key={index} className="border border-gray-200 rounded-xl p-6">
                        <h3 className="font-semibold text-lg text-gray-800 mb-3">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default CourseDetails;