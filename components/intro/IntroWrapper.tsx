import IntroScene from "@/pages/introScene";
import DateTimelapse from "@/components/intro/datetimelapse/DateTimelapse";
import StartBtn from "@/components/intro/buttons/StartBtn";
import BeginCryo from "@/components/intro/ui/BeginCryo";
import { createCinematicSlice } from "@/utils/stores/storeIntro";

const IntroWrapper = () => {
  // Store values
  const endCryo = createCinematicSlice((state) => state.endCryo)

  return (
    <>
      <IntroScene />
      <DateTimelapse />
      <StartBtn />
      {!endCryo && <BeginCryo />}
      <audio id="intro-music" autoPlay={true} loop={true}>
        <source src="/musics/StartingCinematic/Interstellar_Main_Theme.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};

export default IntroWrapper;
