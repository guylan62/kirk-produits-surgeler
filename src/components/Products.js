import { useEffect, useState } from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';
import { typeImplementation } from '@testing-library/user-event/dist/type/typeImplementation';

function Products() {
  const [posts, setposts] = useState(null);
  const [product,setproduct] = useState("");
  const [panier,setpanier] = useState(null);
  const [total,settotal] = useState(0);

  useEffect( () => {
    getAllData() ;


},[]) ;

  const getAllData = () => {

    axios.get("/db/products.json")
    .then(res => {
      const p = res.data;
      setposts( p );
    });
    
    
  }

function decrement(index) {

  let items = [...posts];
  let item = {...items[index.target.id]}
  if(item.quantitySelected > 0){
  item.quantitySelected = item.quantitySelected - 1; 
  items[index.target.id] = item;
   setposts(items);
  }
}

function increment(index) {
  let items = [...posts];
  let item = {...items[index.target.id]};

  item.quantitySelected = item.quantitySelected + 1;
  item.addedToBasket = true
  items[index.target.id] = item;
   setposts(items);
  
}

function addme(){
  setpanier(posts.filter(p => p.addedToBasket))
  
}



 function reset(id){
  const remove = panier.filter( i => i.id != id.target.id);
  setpanier(remove);
  
 }

 function timeWait()
 {
   setTimeout(totalBasket, 5000);
  }


 function totalBasket(){
   let sumPrix = 0;
 

  panier.forEach(element => {
    sumPrix += element.prix * element.quantitySelected;
  });
  console.log(sumPrix)
  settotal(sumPrix) ;

 }




  return (
 <>
    <h1>KIRK ENTERPRISE</h1>

    <div>
      <ul>
      {panier && panier.map( p => {
        return (
          <>
          <li key={p.id}>{p.title} : {p.prix*p.quantitySelected} </li>
          
          
          
          <button id={p.id} onClick={reset.bind(p.id)}>X</button>
          </>
          )
  })}
  {/* {console.log(panier)} */}
      </ul>
      <button onClick={totalBasket.bind()}>Mettre à jours le prix
      </button>
      <label>{total}</label>
    </div>

    <input list="produits" placeholder="Enter Post Title" onChange={event => setproduct(event.target.value)} />
    <datalist  id="produits">
    {posts && posts.map( p => {
        return (

          <option key={p.id} value={p.title}>{p.title}</option>
          )
  })}
    </datalist>
  <div className='container'>
  <ul>
  {posts && posts.filter(post => {
    if (product === '') {
      return post;
    } else if (post.title.toLowerCase().includes(product.toLowerCase())) {
      return post;
    }
  }).map( p => {
        return (

          <li key={p.id}>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <img src={p.image} ></img>
                <p>{p.prix}</p>
                <button id={p.id} onClick={decrement.bind(p.id)}>-</button>
                <label>{p.quantitySelected}</label>
                <button id={p.id} onClick={increment.bind(p.id)}>+</button>
                <button id={p.id} onClick={addme.bind()}>Add me</button>

          </li>
          )
  })}
  </ul> 
  </div>
 </>
  );
}

export default Products;