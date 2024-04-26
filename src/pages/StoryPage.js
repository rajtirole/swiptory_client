import React, { useEffect } from "react";
import StoryModal from "../components/modals/storyModal/StoryModal";
import {getStory} from '../api/api'
import { useParams } from "react-router-dom";


const StoryPage = () => {
    const [modalIsOpen, setIsOpen] = React.useState(true);
    const [displayedStory, setDisplayedStory] = React.useState('');
    const { id } = useParams(); 
    console.log(id);
    useEffect(()=>{
        (async()=>{
            const response= await getStory({id});
        console.log(response);
        if(response.success){
        setDisplayedStory(response?.data)
    }

        })()

    },[])
  return (
    <>
      <StoryModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} displayedStory={displayedStory} setDisplayedStory={setDisplayedStory}></StoryModal>
    </>
  );
};

export default StoryPage;
