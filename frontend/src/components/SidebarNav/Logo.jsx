import React from "react";
import { useNavigate } from "react-router-dom";
import { TbDog } from "react-icons/tb";

function Logo() {
  const navigate = useNavigate();
  
  return (
    <div className="d-flex container ps-0">
      <button className="btn btn-light rounded-pill mb-2" onClick={() => navigate('/')}>
        <TbDog style={{height: "40px", width:"40px"}}/>
      </button>
    </div>
  )
}

export default Logo;