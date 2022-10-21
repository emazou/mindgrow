import React, { useState } from 'react'
import { useGetAllProductsQuery } from '../../features/productsAPI'
import ProductCard from './ProductCard'
import '../../styles/Products.css'
import SearchBar from './SearchBar'
import Loading from '../Loading'
export default function Products() {
    const [sort, setSort] = useState('')
    const [product, setProduct] = useState('')
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const { data, isLoading } = useGetAllProductsQuery({ sort: sort, category: category, product: product, subcategory: subcategory })
    const subcategories = data?.response.subcategories
    let products = data?.response.products
    return (
        <div className='container'>
            <div className='filters'>
                <div className='selects'>
                    <select onChange={(e) => {
                        setCategory(e.target.value)
                        setSubcategory('')
                    }
                    }
                    >
                        <option value=''>Categories</option>
                        <option value='Cannabis'>Cannabis</option>
                        <option value='Topicals'>Topicals</option>
                        <option value='Vaping'>Vaping</option>
                        <option value='Pets'>Pets</option>
                        <option value='Edibles'>Edibles</option>
                    </select>
                </div>
                <div className='selects'>
                    <select onChange={(e) => setSort(e.target.value)}>
                        <option value=''>Order by</option>
                        <option value='1'>Lowest price</option>
                        <option value='-1'>Highest price</option>
                    </select>
                </div>
                {
                    category !== '' && <div className='selects-subcategory'>
                        <select onChange={(e) => setSubcategory(e.target.value)}>
                            <option value=''>Subcategories</option>
                            {
                                subcategories?.map(item => <option value={item} key={item}>{item}</option>)
                            }
                        </select>
                    </div>
                }
                <SearchBar value={product} onChange={(e) => setProduct(e.target.value)} />
            </div>
            <div className='cards-container'>
                {subcategories?.length === 0 && (
                    <>
                        <h2>{category === "" ? 'All products' : category}</h2>
                        {
                            products?.map(item =>
                                <ProductCard key={item._id}
                                    id={item._id}
                                    name={item.name}
                                    category={item.category}
                                    subcategory={item.subcategory}
                                    price={item.price}
                                    photo={item.photo}
                                    stock={item.stock}
                                />)
                        }
                        {
                            products?.length === 0 && <p>No results</p>
                        }
                        {
                            isLoading && <Loading />
                        }
                    </>
                )
                }
                {subcategories?.length > 0 && (
                    <>
                        <h2>{category}</h2>
                        <div>
                            {
                                subcategories.map((subcategory) => {
                                    const filteredProducts = products.filter(product => product.subcategory === subcategory)
                                    return filteredProducts.length > 0 ? (
                                        <div className="cards-container" key={subcategory}>
                                            <h3>{subcategory}</h3>
                                            <div className='cards-subcategory'>
                                                {
                                                    filteredProducts.map(item => <ProductCard key={item._id} id={item._id} name={item.name} category={item.category} subcategory={item.subcategory} price={item.price} photo={item.photo} />)
                                                }
                                            </div>
                                        </div>
                                    ) : null;
                                })
                            }
                        </div>
                        {
                            products?.length === 0 && <p>No results</p>
                        }

                    </>
                )
                }
                {
                    isLoading && <Loading />
                }
            </div>
        </div>
    )
}
