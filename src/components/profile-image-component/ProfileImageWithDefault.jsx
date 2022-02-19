import React from "react";
import defaultPicture from "../../assets/images/profile.png";

export const ProfileImageWithDefault = (props) => {
  const { image, tempimage } = props;

  let imageSource = defaultPicture;
  if (image) {
    console.log("imageSource: ", image)
    imageSource = "images/" + image;
  }
  return (
    <img
      alt={`Profile`}
      src={ imageSource || tempimage }
      {...props}
      onError={(event) => {
        event.target.src = defaultPicture;
      }}
    /> 
  );
}; 
