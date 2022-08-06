

import { useEffect, useState } from "react";
import { Link } from "react-router-dom"



function Showcat() {

    const [showCat, setshow] = useState([]);

    // console.log(showCat);
    const fetchData = () => {
        fetch("http://localhost:5000/fetchCategory")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setshow(data);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);


    const deleteData = async (id) => {
        console.log("id", id)
        const response = await fetch(`http://localhost:5000/categoryDelete?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*",
            },
        })
        if (response.ok) {
            console.log("success");
            alert(" Delete this record");
            window.location.reload();
        } else {
            console.log(response);
            alert("error");
        }
    };


    return (
        <div className="menu-items container-fluid mt-5">
            <div className="row">
                <div className="col-11 mx-auto" >
                    <div className="row my-5">

                        {
                            showCat.map((elem) => {
                                const { _id, categoryName, categoryDescription, price, images, } = elem;
                                // console.log(showCat)
                                return (
                                    <>
                                        <div className="item1 col-12 col-md-6 col-lg-6 col-xl-4 my-5" key={_id}>
                                            <div className="row Item-inside">
                                                {/* for images */}
                                                <div className="col-12 col-md-12 col-lg-4 img-div">
                                                    <img src={`http://localhost:5000/${images}`} alt={categoryName} className="img-fluid" />

                                                </div>

                                                {/* menu items description */}
                                                <div className="col-12 col-md-12 col-lg-8">
                                                    <div className="main-title pt-4 pb-3">
                                                        <h1>{categoryName}</h1>
                                                        <p>{categoryDescription}</p>
                                                    </div>
                                                    <div className="menu-price-book">
                                                        <div className="price-book-divide d-flex justify-content-between ">
                                                            <h2>Price : {price}</h2>

                                                        </div>
                                                        <p>*Prices may vary on selected date.</p>


                                                        <button className="btn btn-primary" onClick={() => deleteData(_id)}>Delete</button>
                                                        <Link state={{ elem }} to={`/category`}>
                                                            <button className="btn btn-primary" onClick={() => (_id)}>Edit</button>
                                                        </Link>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Showcat