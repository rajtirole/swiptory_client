import React, { useEffect } from "react";
import StoryModal from "../components/modals/storyModal/StoryModal";
import { getStory } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StoryPage = () => {
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const [displayedStory, setDisplayedStory] = React.useState("");
  const { id } = useParams();
  const navigate=useNavigate()
  useEffect(() => {
    (async () => {
      const response = await getStory({ id });
      if (response?.success) {
        setDisplayedStory(response?.data);
      }
      else{
        toast.error("Please Provide Valid Link", {
          position: "top-center",
        });
        navigate('/')

      }
    })();
  }, []);
  console.log('story page ');
  console.log(displayedStory);
  console.log(id);
  return (
    <>
      {displayedStory&&<StoryModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        displayedStory={displayedStory}
        setDisplayedStory={setDisplayedStory}
      ></StoryModal>}
    </>
  );
};

export default StoryPage;
