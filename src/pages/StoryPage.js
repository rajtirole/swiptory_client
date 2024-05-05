import React, { useEffect } from "react";
import StoryModal from "../components/modals/storyModal/StoryModal";
import { getStory } from "../api/api";
import { useParams } from "react-router-dom";
const StoryPage = () => {
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const [displayedStory, setDisplayedStory] = React.useState("");
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const response = await getStory({ id });
      if (response.success) {
        setDisplayedStory(response?.data);
      }
    })();
  }, []);
  console.log('story page ');
  console.log(displayedStory);
  console.log(id);
  return (
    <>
      <StoryModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        displayedStory={displayedStory}
        setDisplayedStory={setDisplayedStory}
      ></StoryModal>
    </>
  );
};

export default StoryPage;
