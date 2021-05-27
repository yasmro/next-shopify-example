import Client from 'shopify-buy'

export const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,　//自分のストアのURLを入力する
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY, //自分のStorefront APIのアクセストークンを入力する
});