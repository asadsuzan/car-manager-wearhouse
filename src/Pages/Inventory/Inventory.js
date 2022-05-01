import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GrView } from "react-icons/gr";
import "./Inventory.css";

const Inventory = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [itemQunatity, setIemQunatity] = useState();

  // decrease quantity
  const handleDelevered = () => {
    if (itemQunatity <= 0) {
      setIemQunatity(0);
      alert("Not in stocks,Restocks to Delever");
      return;
    }
    setIemQunatity(parseInt(itemQunatity) - 1);
  };

  // increase quantity
  const handleRestocks = (e) => {
    e.preventDefault();
    const quantity = e.target.quantity.value;
    const newQuantity = parseInt(quantity) + parseInt(itemQunatity);
    if (newQuantity <= 0) {
      alert("Please Enter Valid quantity");
      e.target.reset();
      return;
    }
    setIemQunatity(newQuantity);
    e.target.reset();
  };
  // update items quntity
  useEffect(() => {
    const url = `http://localhost:5000/cars/home/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: item.name,
        price: item.price,
        des: item.des,
        quantity: itemQunatity,
        supplier: item.supplier,
        img: item.img,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [id, itemQunatity, item]);

  //   load items by id
  useEffect(() => {
    const url = `http://localhost:5000/cars/home/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setIemQunatity(data.quantity);
      });
  }, [id]);
  return (
    <section className="singl-item my-5">
      <div className="container">
        {/* for item img */}
        <div>
          <img src={item.img} alt={item.name} />
        </div>
        {/* for item info */}
        <div className="row mt-5">
          <div className="col-lg-8 col-md-8 col-12">
            <p className="item-id">
              <GrView />
              <b className="px-1"> {item._id}</b>
            </p>
            <h4 className="item-name">{item.name}</h4>
            <h4 className="item-price">${item.price}</h4>
            <p>
              <b>Supplier: {item.supplier}</b>
            </p>
            <p className="item-des">{item.des}</p>
          </div>
          <div className="col-lg-4 col-md-4 col-12">
            <h3>
              <i>Stokes: {itemQunatity}</i>
            </h3>
            <button onClick={handleDelevered} className="deleverd-btn">
              Deleverd
            </button>
            <form
              onSubmit={handleRestocks}
              className="d-flex flex-column mt-3"
              style={{ gap: "10px" }}
            >
              <div>
                <label htmlFor="quantity" className="text-capitalize">
                  restock the item
                </label>
                <input
                  placeholder="Quantity"
                  type="number"
                  name="quantity"
                  required
                  className="form-control shadow-lg"
                />
              </div>
              <button type="submit" className="deleverd-btn">
                Restock
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inventory;
