import React from "react";
import { useNavigate } from "react-router-dom";
import { TbDog } from "react-icons/tb";

function Logo() {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <button className="mb-2" onClick={() => navigate('/')}>
        <TbDog />
      </button>
    </div>
  )
}

export default Logo;