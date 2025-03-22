import React from "react";
import { Button } from "../ui/button";
const Products = () => {
  const products = [
    {
      image:
        "https://imgs.search.brave.com/tFoUgDK8ZcLF3NrKC4zmNhzPgLrP2GKoQojIlFI9Ti8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzE1LzE0LzIy/LzM2MF9GXzQxNTE0/MjI4Ml9pQkNkTm5v/QjJrVElCc3VhVllP/RE5iZVV4NE42aFFv/Ry5qcGc",
      name: "Product 1",
    },
    {
      image: "https://imgs.search.brave.com/OeFzFgeWX_Cwdhpm2JPASsVdf9iw7lmVJFLKgphJlog/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWNo/YW5pY2Fsa2V5Ym9h/cmRzLmNvbS9jZG4v/c2hvcC9hcnRpY2xl/cy9rZXlib2FyZDEu/cG5nP3Y9MTcwODUz/Mjc2NyZ3aWR0aD05/NDA",
      name: "Product 2",
    },
    {
      image: "https://imgs.search.brave.com/cOmpVzJGOJhUk_JEDXxr6d1Um1Hag1XGfsudP78gBHs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzY4LzA1LzU0/LzM2MF9GXzM2ODA1/NTQxNl9qdFVleVhV/dDh0VmVyalc5TGFw/eU13b0k0NmlxMHl3/YS5qcGc",
      name: "Product 3",
    },
    {
      image: "https://imgs.search.brave.com/AkQuqD_HLHCwYefBbKSiiB6v13cSmrL9QYsllgNad48/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0L0Ri/dXJ1VDlnQWVUZDdD/WkRya2hXYmItODQw/LTgwLmpwZw",
      name: "Product 4",
    },
    {
      image: "https://imgs.search.brave.com/15lvPoJTDWjXhidFI4LqbQ3sMaNWXinN4rHBpSYI_AY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTky/ODM4NDcyMy9waG90/by9hLXdoaXRlLWR1/YWxzZW5zZS13aXJl/bGVzcy1nYW1pbmct/Y29udHJvbGxlci1p/cy1zaG93bi1mb3It/dGhlLXBzNS1jb25z/b2xlLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz0wcUJ5QnpG/QjU1Q0dyMjZCcVV3/RW9zSW5sSWEwMFBx/N0tjd2FacURXekE4/PQ",
      name: "Product 5",
    },
    {
      image: "https://imgs.search.brave.com/rfrxGgA_OZDFNzv1vKCiIp9theYXb3l94PL-lYQs1x4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU3/NzMyMDQ5L3Bob3Rv/L2Zvb3RiYWxsLWVx/dWlwbWVudC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9MGZ6/azVnOWhiTlpZVU1t/Y2lzOTJiWTRDSWwt/NjE5WTN3X0hZRzFl/LWF6az0",
      name: "Product 6",
    },
  ];
  return (
    <div className="flex items-center  mt-10 flex-wrap ">
      {products.map((item, index) => {
        return (
          <div key={index} className="w-1/4 mb-10">
            <img
              src={item.image}
              alt="product image"
              className="w-2/3 h-60 object-cover"
            />

            <h1>{item.name}</h1>
            <div className="flex items-center gap-2 mt-2">
            <Button variant='Investor'>View</Button>
            <Button variant='delete'>Delete</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
