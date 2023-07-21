import { NextResponse } from "next/server";
import products from "/public/products.json";

export const GET = async (request, { params }) => {
  const id = params.id;

  const product = products.find(
    (pd) => pd.product.id.toString() === id.toString()
  );

  return NextResponse.json(product);
};
