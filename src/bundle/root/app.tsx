import * as React from "react";
import { Header } from "../header/header";
import { ImageEditor } from "../image/image-editor";
import { ImageUploader } from "../image/image-uploader";
import styled from "@emotion/styled";
import { IProduct, Product } from "../product/product";

const CroppedImageDisplay = styled.div({
  width: "30vw",
  height: "50vh",
  margin: "2rem auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 7.5vw;
  margin: 1rem 10vw;
`;

export const App = () => {
  const [image, setImage] = React.useState<string | null>(null);
  const [croppedImage, setCroppedImage] = React.useState<string | null>(null);
  const [results, setResults] = React.useState<Array<IProduct>>([]);

  React.useEffect(() => {
    if (croppedImage && croppedImage.length > 0) {
      fetch("https://search.pavankumar.live/", {
        method: "POST",
        body: JSON.stringify({
          imgSrc: croppedImage,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setResults(res.list_img);
        })
        .catch((err) => console.error(err));
    }
  }, [croppedImage]);

  return (
    <>
      <Header />
      <ImageUploader onImageUpload={setImage} />
      {image && !croppedImage && (
        <ImageEditor image={image} onImageFinish={setCroppedImage} />
      )}
      {croppedImage && (
        <CroppedImageDisplay>
          <img src={croppedImage} alt="cropped" />
        </CroppedImageDisplay>
      )}
      {results.length > 0 && (
        <ProductGrid>
          {results.map((product) => (
            <Product key={product.AWS_LINK_1} {...product} />
          ))}
        </ProductGrid>
      )}
    </>
  );
};
