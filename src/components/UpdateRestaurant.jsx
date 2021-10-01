import React,{useContext,useEffect,useState} from 'react'
import {useHistory,useParams} from 'react-router';
import RestaurantFinder from '../apis/RestaurantFinder'
import {RestaurantContext} from '../context/RestaurantsContext';

const UpdateRestaurant = (props) => {
    const {id}=useParams();
    const {restaurants}=useContext(RestaurantContext);
    const [name,setName]=useState("");
    const [location,setLocation]=useState("");
    const [priceRange,setPriceRange]=useState("");
    let history=useHistory();

    useEffect(()=>{
        const fetchData=async()=>{
            const response = await RestaurantFinder.get(`/${id}`);
            console.log(response.data.data);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        };
        fetchData();
    },[]);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const updatedRestaurant=await RestaurantFinder.put(`/${id}`,{
            name,
            location,
            price_range:priceRange
        });
        history.push("/");
    };



    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e=>setName(e.target.value)} id="name" className="form-control" type="text"/>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={e=>setLocation(e.target.value)} id="" className="form-control" type="text"/>
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input value={priceRange} onChange={e=>setPriceRange(e.target.value)} id="price_range" className="form-control" type="number"/>
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant
