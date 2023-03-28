import React from 'react';
import { Link } from "react-router-dom";

const HowlPreview = ({ id, caption }) =>
    <li>
        <Link to={`/howl/${id}`}>
                {caption}
        </Link>
    </li>

export default HowlPreview;