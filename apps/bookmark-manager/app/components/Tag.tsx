import React, { useContext } from "react";
import { getRandomColor } from "@/utils/helper";
import { Trash2 } from "lucide-react";
import { deleteTagFn } from "@/functions/deleteTag";
import { TagComponentProps } from "@/types/types";
import { GlobalContext } from "./Client";
import DeleteModal from "./Modals/DeleteModal";
import { useModal } from "../hooks/useModal";


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


const Tag: React.FC<TagComponentProps> = ({
  name,
  onClick,
  showDelete = false,
}) => {

  const randomBorderColor = getRandomColor();
  const context = useContext(GlobalContext);
  const { openModal:openConfirmDeleteModal, Modal:ConfirmDeleteModalWrapper, closeModal:closeConfirmDeleteModal } = useModal();

  const deleteTag =async(name: string)=> {
    await deleteTagFn(name)
    context?.refetchTags()
  }

  return (
    // <div className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all">
    <div
      className={`relative mx-2 p-4 inline-block bg-white shadow-lg rounded-lg hover:shadow-2xl transition-all cursor-pointer`}
      style={{ borderColor: randomBorderColor, borderWidth: '2px' }}
    >
      {showDelete && <div className="absolute -top-2 -right-2 border-2 border-[#000] rounded bg-[#fff] p-1" onClick={openConfirmDeleteModal}>
        <Trash2 size="14" />
      </div>}
      <div className="flex items-center space-x-4" onClick={onClick}>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        </div>
      </div>
      <ConfirmDeleteModalWrapper>
        <DeleteModal 
            name={name}
            type="Tag"
            id={name}
            closeModal={closeConfirmDeleteModal}
            refetch={context?.refetchTags}
            deleteFunc={(name)=>deleteTag(name)}
        />
      </ConfirmDeleteModalWrapper>
    </div>
  );
};

export default Tag;
