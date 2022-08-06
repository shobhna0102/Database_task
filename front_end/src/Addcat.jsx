import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

//const notify = () => toast.success("Added!");

const Addcat = () => {

    const location = useLocation();
    const [categoryName, setName] = useState("");
    const [categoryDescription, setDesctiption] = useState("");
    const [price, setPrice] = useState("");
    const [selectedFile, setSelectedFile] = useState();

    const [showAdd, setShowAdd] = useState(true);
    const [id, setId] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        //setIsSelected(true);
    };

    useEffect(() => {
        if (location?.state) {
            const { elem } = location?.state;
            setId(elem._id)
            elem && setShowAdd(false);
            setName(elem.categoryName);
            setDesctiption(elem.categoryDescription);
            setPrice(elem.price);
            setSelectedFile(elem.images);
            console.log("data222222222", elem.images)
        }
        //setShowAdd(false)
    }, []);

    console.log("ID", id)



    console.log("@@@@@@@@@@@@@@@", selectedFile);
    const onEditClick = async () => {
        // console.log("data", data)
        console.log("@@@@@@@@@@ id", id)
        const data = new FormData();
        data.append("categoryName", categoryName);
        data.append("categoryDescription", categoryDescription);
        data.append("price", price);
        data.append("images", selectedFile);


        console.log("data", data)
        const response = await fetch(`http://localhost:5000/updateCategory?id=${id}`, {
            method: "PUT",
            body: data,
            headers: {
                "access-control-allow-origin": "*",
            },
        });
        if (response.ok) {
            console.log("success");
            alert("Added");
            window.location.reload();
        } else {
            console.log(response);
            alert("error");
        }

    }
    const postData = async (e) => {
        e.preventDefault();
        console.log("id-----------", e);

        if (selectedFile === null || selectedFile === undefined) {
            return alert("Please upload an image");
        }
        const data = new FormData();
        data.append("categoryName", categoryName);
        data.append("categoryDescription", categoryDescription);
        data.append("price", price);
        data.append("images", selectedFile);



        const response = await fetch("http://localhost:5000/categoryAdd", {
            method: "POST",
            body: data,
            headers: {
                "access-control-allow-origin": "*",
            },
        });
        if (response.ok) {
            console.log("success");

            alert("Added")
            window.location.reload();
        } else {
            console.log(response);
            alert("error");
        }
    }
    return (
        <div className="my-5">
            <h1 className="text-center">Add Category</h1>
            <div className="container contact_div">
                <div className="row">
                    <div className="col-md-6 col-10 mx-auto">
                        <form
                            method="POST"

                            encType="multipart/form-data"
                        >
                            <div className="mb-3">
                                <label className="fNameorm-label">categoryName</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    name="product_name"
                                    value={categoryName}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Category Name"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="fNameorm-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={categoryDescription}
                                    onChange={(e) => setDesctiption(e.target.value)}
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="fNameorm-label">Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    name="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Enter price"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="fNameorm-label">Images</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="col-12">
                                {showAdd ? (
                                    <button className="btn btn-outline-primary" type="button" value="submit" onClick={postData} >
                                        AddCategory
                                    </button>
                                ) : (
                                    <button className="btn btn-outline-primary" type="button" value="submit" onClick={onEditClick}>
                                        EditCategory
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addcat;
