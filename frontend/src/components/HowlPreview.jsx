import React from 'react';
import { useNavigate } from "react-router-dom";

const HowlPreview = ({ id, caption }) => {
  const navigate = useNavigate();

  return (
    <li>
      <div onClick={() => navigate(`/howl/${id}`)}>
        {caption}
      </div>
    </li>
  )
}

export default HowlPreview;