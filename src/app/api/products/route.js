import { NextResponse } from "next/server";
import products from "/public/products.json";

export const GET = async () => {
  return NextResponse.json(products);
};
