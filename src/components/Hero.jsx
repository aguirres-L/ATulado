import React, { useContext } from "react";
import HowItWorks from "./componentsHero/HowItWorks";
import { UserTypeContext } from "../context/UserTypeContext";
import DetailBusiness from "./heroComponents/DetailBusiness";
/* import InstagramReel from "./heroComponents/reelsInstagram/InstagramReel"; */
/* import InstagramReels from './InstagramReels/InstagramReels'; */

const Hero = () => {
  const { setUserType } = useContext(UserTypeContext);

  function createUserProfesional() {
    console.log("click in register Profesional");
    setUserType("Profesional");
  }
  function createUserClients() {
    console.log("click in register createUserClients");
    setUserType("Clients");
  }

  return (
    <>
      <section id="home" className="bg-gradient-to-b from-[#edc3e7] via-white to-[#edc3e7] py-16 md:py-28" >
        <DetailBusiness createUserClients={createUserClients} createUserProfesional={createUserProfesional} />
        <HowItWorks createUserClients={createUserClients} createUserProfesional={createUserProfesional} />
        {/* <ReelsComponentFaceboock/> */}
   {/*      <InstagramReel/> */}
      </section>
    </>
  );
};

export default Hero;
