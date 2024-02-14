import React from "react";
import Loading from "../UI/Loading";
import Specificitem from "./SpecificItem";

const SpecificGrid = (props) => {
  const { data } = props;
  if (!Array.isArray(data)) {
    return <Loading />;
  }

  return (
    <ul className="flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
      {data.map((post) => (
        <Specificitem key={post._id} data={post} />
      ))}
    </ul>
  );
};

export default SpecificGrid;
