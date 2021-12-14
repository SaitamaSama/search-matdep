import * as React from 'react';
import styled from '@emotion/styled';
import { mq } from '../util/styled';
import { MdImageSearch } from 'react-icons/md';

const ImageUploadContainer = styled.section({
  display: 'flex',
  justifyContent: 'center',
  padding: "3rem 1rem",
});
const ImageFileUpload = styled.input({
  width: 1,
  height: 1,
  overflow: 'hidden',
  opacity: 0,
});
const ImageUploadButtonContainer = styled.section`
  ${mq["lg"]} {
  }
  align-items: center;
  display: flex;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  transition: .1s all ease;
`;
const ImageSearchIcon = styled.div({
  fontSize: 40,
  marginBottom: -6
});
const Label = styled.div({
  fontSize: 27,
  marginLeft: 64,
  color: '#999999',
})

export interface ImageUploaderProps {
  onImageUpload: (image: string) => void;
}

export const ImageUploader = (props: ImageUploaderProps) => {
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = React.useState<string | null>(null);

  const readImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result as string);
      props.onImageUpload(reader.result as string);
    }
  };

  return (
    <ImageUploadContainer>
      <ImageFileUpload type="file" ref={imageInputRef} onChange={readImage} />
      <ImageUploadButtonContainer onClick={() => imageInputRef.current?.click()}>
        <ImageSearchIcon>
          <MdImageSearch style={{ fontSize: 'inherit' }} />
        </ImageSearchIcon>
        <Label>
          Upload images for your project
        </Label>
      </ImageUploadButtonContainer>
    </ImageUploadContainer>
  );
};