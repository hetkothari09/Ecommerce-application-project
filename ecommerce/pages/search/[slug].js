import { useRouter } from 'next/router';
import { client } from '../../lib/client';
import { Product } from '../../components';
import React from 'react';

const SearchResults = ({ products, query }) => {
  const router = useRouter();
  const hasResults = products && products.length > 0;

  if (!hasResults) {
    return (
      <div className="search-results">
        <h2>No results found for `{query}`</h2>
      </div>
    );}
  return (
    <div className="search-results">
      <h2>Search results for `{query}`</h2>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const query = decodeURIComponent(slug);
  const searchQuery = `*[_type == "product" && (name match "${query}*")]`;
  const products = await client.fetch(searchQuery);

  return {
    props: {
      products,
      query,
    },};
};
export default SearchResults;
