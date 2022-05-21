import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../../Actions/Actions";
import "./Details.css";

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);
  console.log(id);
  useEffect(() => {
    dispatch(getDetails(id));
  }, []);

  console.log(details);
  return (
    <div className="details">
      {isNaN(id) ? (
        <div>
          <p>Name: {details.name}</p>
          <p>Weight: {details.weight}</p>
          <p>Height: {details.height}</p>
          <p>Life Span: {details.life_span}</p>
          <p>
            Temperaments:{" "}
            {details.temperaments &&
              details.temperaments.map((t) => t.name + ", ")}
          </p>
          <img src={details.image} alt="Altimage.png" />
        </div>
      ) : (
        <div>
          <p>{details.name}</p>
          <p>{details.weight && `Weight: ${details.weight.metric} Kg`}</p>
          <p>{details.height && `Height: ${details.height.metric} Cm`}</p>
          <p>Life Span: {details.life_span}</p>
          <p>{details.temperament}</p>
          <p>
            <img
              src={details.image ? details.image.url : ""}
              alt="Altimage.png"
            />
          </p>
        </div>
      )}
    </div>
  );
}
