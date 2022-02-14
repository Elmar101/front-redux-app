import React from 'react';
import defaultPicture from '../assets/images/profile.png';

export const ProfileImageWithDefault = (props) => {
  const { image , tempimgage} = props;

  let imageSource = defaultPicture;
  if (image) {
    imageSource = image;
  }
  return <img alt={`Profile`} src={ tempimgage || imageSource} {...props} />;
};
