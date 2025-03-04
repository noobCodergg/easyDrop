import React from 'react';

const Title = ({ icon, text }) => {
  return (
    <div className="flex w-full ">
      <h1 className="text-dark-gray flex items-center gap-2 font-bold">
        {icon}
        {text}
      </h1>
    </div>
  );
};

export default Title;
