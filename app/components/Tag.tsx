import React, { useContext } from "react";
import { getRandomColor } from "@/utils/helper";

interface TagProps{
  name: string;
  onClick: ()=> void;
}

// const Tag: React.FC<TagProps> = ({
//   name,

// }) => {

//   return (
//     <div className="">
//       asdf
//       {name}
//     </div>
//   );
// };

// export default Tag;


const Tag: React.FC<TagProps> = ({
  name,
  onClick
}) => {

  const randomBorderColor = getRandomColor();

  return (
    // <div className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all">
    <div
      className={`mx-2 p-4 inline-block bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all ${onClick ? "cursor-pointer": ""}`}
      style={{ borderColor: randomBorderColor, borderWidth: '2px' }}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        </div>
      </div>

    </div>
  );
};

export default Tag;
