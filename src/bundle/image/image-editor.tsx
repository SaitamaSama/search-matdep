import * as React from "react";
import styled from "@emotion/styled";
import ReactCrop, { ReactCropState } from "react-image-crop";
import "./react-crop.scss";
import { getCroppedImg } from "./util";
import { mq } from "../util/styled";

const ImageEditorContainer = styled.section`
  width: 30vw;
  height: 50vh;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mq["lg"]} {
    width: 30vw;
    height: 50vh;
  }
  ${mq["sm"]} {
    width: 90vw;
    height: 50vh;
  }
`;
const Button = styled.button({
  border: "none",
  outline: "none",
  fontFamily: "inherit",
  fontSize: 14,
  background: "#E2C044",
  color: "#323232",
  padding: ".6rem 1.25rem",
  marginTop: "1.5rem",
  borderRadius: 4,
  textTransform: "uppercase",
  cursor: "pointer",
});

export interface ImageEditorProps {
  image: string;
  onImageFinish: (image: string) => void;
}

export const ImageEditor = (props: ImageEditorProps) => {
  const [image, setImage] = React.useState<string | null>(props.image);
  const [crop, setCrop] = React.useState<any>({
    unit: "%",
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  });
  const imageRef = React.useRef<HTMLImageElement>();

  if (!image) {
    return null;
  }

  React.useEffect(() => {
    setImage(props.image);
  }, [props.image]);

  const search = () => {
    if (!imageRef.current) return;
    console.log(crop);
    const image = getCroppedImg(imageRef.current, crop, "image.png");
    props.onImageFinish(image);
  };

  return (
    <ImageEditorContainer>
      <ReactCrop
        crop={crop}
        src={image}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange={(crop: ReactCropState) => {
          setCrop(crop);
        }}
        onImageLoaded={(image) => {
          imageRef.current = image;
          return true;
        }}
        imageStyle={{
          maxWidth: "100%",
          maxHeight: "40vh",
        }}
      />
      <Button onClick={search}>Search</Button>
    </ImageEditorContainer>
  );
};
