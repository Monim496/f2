import React from "react";
import ResponseItem from "./ResponseItem";
import Loading from "../UI/Loading";

const ResponseGrid = (props) => {
  const { data } = props;
  if (!Array.isArray(data)) {
    return <Loading />;
  }
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 list-none p-4 m-6 gap-8">
      {data.map((post) => (
        <ResponseItem key={post._id} data={post} />
      ))}
    </ul>
  );
};

export default ResponseGrid;
