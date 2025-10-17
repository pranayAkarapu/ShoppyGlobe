import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useEffect, useState } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';

const RelatedProducts = ({category, subCategory}) => {

    const {products} = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        if(products.length > 0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=>category === item.category);
            productsCopy = productsCopy.filter((item)=> subCategory === item.subCategory);

            setRelated(productsCopy.slice(0,5))
        }
    },[products])

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'> 
        <Title text1={'RELATED'} text2={'PRODUCTS'}/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item, index)=>(
            <div
              key={item._id || index}
              onClick={() =>{ window.scrollTo(0, 0); navigate(`/product/${item._id}`)}}
              style={{ cursor: 'pointer' }}
            >
              <ProductItem
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
