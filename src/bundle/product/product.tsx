import * as React from "react";
import styled from "@emotion/styled";
import { mq } from "../util/styled";

export interface IProduct {
  AWS_LINK_1: string;
  WS_LINK_2: string;
  Application: string;
  Brand: string;
  Category: string;
  "Collection Name": string;
  Color: string;
  "Color Family": string;
  Construction: string;
  Description: string;
  Features: string;
  Finish: string;
  Location: string;
  "Manufacturer SKU": string;
  Origin: string;
  "Packing Size": string;
  Pattern: string;
  Price: string;
  "Price Unit": string;
  "Product Images 1": string;
  "Product Images 10": string;
  "Product Images 2": string;
  "Product Images 3": string;
  "Product Images 4": string;
  "Product Images 5": string;
  "Product Images 6": string;
  "Product Images 7": string;
  "Product Images 8": string;
  "Product Images 9": string;
  "Product Name": string;
  "Sample dimension": string;
  "Testing Certificates": string;
  Thickness: string;
  "Tile Size (cmxcm)": string;
  Usage: string;
  Warranty: string;
  "Warranty Details": string;
}

export interface ProductCardProps {
  background: string;
}
const ProductCard = styled.div(
  (props: ProductCardProps) => `
${mq["sm"]} {
  width: 230px;
  height: 230px;
}
border-radius: 10px;
background: url(${props.background});
background-size: cover;
border: 1px solid #e2e2e2;
position: relative;
`,
);
const ProductTitle = styled.div({
  background: "#FFF",
  position: "absolute",
  bottom: 0,
  left: 0,
  borderBottomLeftRadius: 10,
  color: "#000",
  padding: "0.5rem",
});

export const Product = (props: IProduct) => {
  return (
    <ProductCard background={props.AWS_LINK_1}>
      <ProductTitle>{props["Product Name"]}</ProductTitle>
    </ProductCard>
  );
};
