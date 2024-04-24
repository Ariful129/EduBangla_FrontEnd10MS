import logo from '../assets/login/Logo2.png'


const Footer = () => {
    return (
        <footer id="footerSection" className="footer p-10 bg-[#6f9196] text-white  font-extralight rounded-b-2xl">
            <div >
                <img data-aos="flip-left" className=" rounded-3xl w-44 border-2 border-gray-400 h-14" src={logo} alt="" />
                <p>Explore limitless learning <br></br>opportunities and unleash your <br></br>potential with SkillShare's dynamic online platform.</p>
            </div>
            <div>
                <span className="footer-title">Services</span>
                <a className="link link-hover">Developing</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
            </div>
            <div>
                <span className="footer-title">Links</span>
                <a href='/about' className="link link-hover">About us</a>
                <a href='/contact' className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
           
            </div>
            <div>
                <span className="footer-title">Contact</span>
                <a className="link link-hover">skill34@gmail.com</a>
                <a className="link link-hover">+8801908****45</a>
                <a className="link link-hover">Dahka, Bangladesh</a>
            </div>
        </footer>
    );
};

export default Footer;