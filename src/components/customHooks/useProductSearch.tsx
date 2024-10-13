import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductDTO } from '../../types/Product';

export type Products = ProductDTO[];

export default function useProductSearch(
  query: string,
  pageNumber: number,
  products?: Products | null | undefined
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newProducts, setNewProducts] = useState<ProductDTO[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setNewProducts([]);
  }, [query]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);
    setError(false);

    axios({
      method: 'GET',
      url: 'https://dummyjson.com/products',
      params: { skip: pageNumber * 20, limit: 20 },
      cancelToken: source.token,
    })
      .then((res) => {
        setNewProducts((prevProds) => [
          ...prevProds,
          ...res.data.products,
        ]);
        setHasMore(res.data.products.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => {
      source.cancel();
    };
  }, [query, pageNumber]);

  return { loading, error, newProducts, hasMore };
}
