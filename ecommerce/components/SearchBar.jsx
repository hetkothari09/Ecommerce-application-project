import React,{ useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  if (!query) {
    // display message or alert to user
    // alert('Please enter a Product to Search');
    toast.error('Please enter a Product to Search');
    return;
  }
  router.push(`/search/${encodeURIComponent(query)}`);
};

  return (
    <div className="search-bar">
        <form onSubmit={handleSubmit}>
            <input className="search-bar-input"
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit"className="search-bar-button">Search</button>
        </form>
    </div>
  );
};

export default SearchBar;
