//import { useEffect, useState } from "react";
import USeAxioseSecure from "../../../hooks/USeAxioseSecure";
import UseAuth from "../../../hooks/UseAuth";
//For SweetALert
import Swal from 'sweetalert2'


const Apply = () => {
    //From Custom Hook
    const auth = UseAuth();
    const { user } = auth;
    const axiosSecure=USeAxioseSecure()
   // const [myappli, setMyappli] = useState([]);

    // const url = `https://skill-share-server-se.vercel.app/apply?email=${user?.email}`;
    // useEffect(() => {
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => setMyappli(data))

    //     // axiosSecure.get(url)
    //     // .then(res => setBookings(res.data))

    // }, [url]);

    const handleaddproduct = event => {
        event.preventDefault();

        const form = event.target;
        const per_name = form.per_name.value;
        const p_num = form.p_num.value;
        const con_name = form.con_name.value;
        const profile = form.profile.value;
        const nid = form.nid.value;
        const uniID = form.uniID.value;
        const date = form.date.value;
        const price = form.price.value;
        const description = form.description.value;
        const education = form.education.value; // Fix the typo here

        const Apply = {
            per_name,
            p_num,
            con_name,
            profile,
            nid,
            uniID,
            date,
            price,
            description,
            education,
            email: user.email,
            status:'NO'
        };

        console.log(Apply);

        axiosSecure.post('/apply',Apply)
        .then(res=>{
           console.log(res.data)
           if(res.data.insertedId){
               //alert('Application Complited');
               Swal.fire({
                title: 'success!',
                text: 'Your Application Successfully Complited',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
              form.reset();
           }
        //    else {
        //     // Application already exists or other error
        //      alert(res.data.message);
        //   }
           
        })
        // .catch(error => {
        //     // Handle network or other errors
        //     console.error('An error occurred:', error.message);
        //     alert('Already one course Exists')
        //   });


    }


   // console.log(myappli[0] && myappli[0].status);



    return (
        <div>
            <h1 className="text-4xl text-center border-b-2 mt-4 font-semibold">Application Form</h1>
            {/* <div className="text-xl font-semibold mt-2">
                <h1 >Application Status:
                  { myappli[0] && myappli[0].status=='confirm'?<span className=" ml-2  text-green-500">Appeoved</span >:<span className="ml-2  text-red-500">Pending</span> }
                 </h1>
            </div> */}
            <div className="bg-black p-20 mb-1  mt-12 rounded-xl"
                data-aos="fade-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000">
                <h2 className='text-center text-2xl mb-6 text-white font-semibold'>Please Apply </h2>
                <form onSubmit={handleaddproduct}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white " >Name</span>
                            </label>
                            <input type="text" name="per_name" placeholder="person name.." className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white " >Phone Number</span>
                            </label>
                            <input type="text" name="p_num" placeholder="phone number" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white " >Content Name</span>
                            </label>
                            <input type="text" name="con_name" placeholder="product name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Your Photo</span>
                            </label>
                            <input type="text" name="profile" placeholder="img url...." className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">NID Photo</span>
                            </label>
                            <input type="text" name="nid" placeholder="img url...." className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Uni IDcard photo</span>
                            </label>
                            <input type="text" name="uniID" placeholder="img url...." className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Date</span>
                            </label>
                            <input type="date" name="date" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Avg Price</span>
                            </label>
                            <input type="text" name="price" placeholder="price" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Description</span>
                            </label>
                            <textarea
                                name="description"
                                placeholder="Enter your description here"
                                className="input input-bordered"
                                required
                            ></textarea>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Educational Qualificaton</span>
                            </label>
                            <textarea
                                name="education"
                                placeholder="Enter your description here"
                                className="input input-bordered"
                                required
                            ></textarea>
                        </div>

                    </div>
                    <div className="form-control mt-6" >
                        <input className="btn btn-primary btn-block" type="submit" value="Apply" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Apply;