import React from "react";
import defaultPicture from "../../assets/images/profile.png";

export const ProfileImageWithDefault = (props) => {
  const { image, tempimage } = props;

  let imageSource = defaultPicture;
  if (image) {
    imageSource = "/images/profile/" + image;
  }
  return (
    <img
      alt={`Profile`}
      src={ imageSource ? imageSource : tempimage }
      {...props}
      onError={(event) => {
        event.target.src = defaultPicture;
      }}
    /> 
  ); 
}; 
