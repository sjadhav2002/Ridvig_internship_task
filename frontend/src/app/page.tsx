"use client";
import { useEffect, useState } from 'react';
import ItemCard from './../components/itemCard';
import MyNavbar from './../components/navBar';
import styles from "./page.module.css"

interface Item {
  id : number ,
  name : string,
  company : string,
  price : number,
  quantity : string,
  description : string,
}


export default function Home() {

  const [products, setProducts] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/getProducts");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Item[] = await response.json();
        console.log(data)
        setProducts(data);
        if(data.length == 0){
          window.location.href=  "/crud"
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  while (loading) return <p>Loading...</p>;

  return (
    <div>
      <MyNavbar />
      <div className={styles.card_container}>
        {products.map((item, index)=>(
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
