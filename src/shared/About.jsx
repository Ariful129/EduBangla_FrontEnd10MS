import ban from '../assets/image/banner.jpeg'


const About = () => {
    return (
        <div className='m-16  flex-row'>
            <h1 className=" text-center text-2xl  font-bold mb-4">About Us</h1>
            <div className=' flex lg:flex-row gap-8'>
            <div className='w-1/2'>
                
                <img src={ban} alt=""  />
             </div>
             <div className='w-1/2 '>
               <p className=' font-semibold text-xm'>
                "Welcome to SkillShare, your premier destination for online learning and skill development.
                 Our platform offers a diverse range of courses taught by industry experts,
                  empowering you to master new skills and advance your career. Whether you're 
                  a beginner or an experienced professional, SkillShare provides a 
                  supportive community and flexible learning options tailored to your needs.
                   Join millions of learners worldwide in discovering your passion and unlocking
                    your full potential with SkillShare. Start your journey today and embrace a
                     world of endless possibilities with our innovative and engaging web application."</p>
             </div>
             
            </div>

            
            
        </div>
    );
};

export default About;