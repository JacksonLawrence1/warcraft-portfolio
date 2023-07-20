import { WOW_CLIENT_ID, WOW_CLIENT_SECRET } from '$env/static/private';

const clientId = WOW_CLIENT_ID;
const clientSecret = WOW_CLIENT_SECRET;

export const load = async ({ fetch }) => {

    const fetchProducts = async () => {
        const productRes = await fetch('https://dummyjson.com/products?limit=5');
        const productData = await productRes.json();
        return productData.products;
    }

    return {
        products: fetchProducts(),
    }
}