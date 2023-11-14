import { Fragment } from "react";

import Backdrop from "../UI/Backdrop/Backdrop";
import ImageOverlay from "../ImageOverlay/ImageOverlay";

export default function ImageModal({
  onRemove,
  imagePreview,
  onClick,
  onEnteringCaption,
}) {
  return (
    <Fragment>
      <Backdrop onClick={onClick} />
      <ImageOverlay
        onRemove={onRemove}
        image={imagePreview}
        onEnteringCaption={onEnteringCaption}
      />
    </Fragment>
  );
}
