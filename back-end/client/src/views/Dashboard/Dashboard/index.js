// Chakra imports
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/people-image.png";
import logoChakra from "assets/svg/logo-white.svg";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import GraphComponent from 'components/Custom/GraphComponent'; 
import EventForm from 'components/Custom/EventForm';     

import Img1 from "assets/img/pics/img1.png";
import Img2 from "assets/img/pics/img2.png";
import Img3 from "assets/img/pics/img3.png";
import Img4 from "assets/img/pics/img4.png";
import Img5 from "assets/img/pics/img5.png";
import Img6 from "assets/img/pics/img6.png";
import Img7 from "assets/img/pics/img7.png";
import Img8 from "assets/img/pics/img8.png";
import Img9 from "assets/img/pics/img9.png";
import Img10 from "assets/img/pics/img10.png";
import Img11 from "assets/img/pics/img11.png";
import Img12 from "assets/img/pics/img12.png";


// ### Test json Data ###
const jsonData = [
  { x: "1", y: 13, pic: Img1, name: "soccer" },
  { x: "2", y: 44, pic: Img2, name: "trip2" },
  { x: "3", y: 27, pic: Img3, name: "trip3" },
  { x: "4", y: 93, pic: Img4, name: "trip4" },
  { x: "5", y: -87, pic: Img5, name: "trip5" },
  { x: "6", y: -50, pic: Img6, name: "trip6" },
  { x: "7", y: 27, pic: Img7, name: "trip7" },
  { x: "8", y: 68, pic: Img8, name: "trip8" },
  { x: "9", y: -13, pic: Img9, name: "trip9" },
  { x: "10", y: 54, pic: Img10, name: "trip10" },
  { x: "11", y: 57, pic: Img11, name: "marriage" },
  { x: "12", y: 42, pic: Img12, name: "retirement" },
];
// ########################

// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
  DBFirstIcon,
  DBSecondIcon,
  DBThirdIcon,
  DBFourthIcon
  
} from "components/Icons/Icons.js";
import React from "react";
import { dashboardTableData, timelineData } from "variables/general";
import ActiveUsers from "./components/ActiveUsers";
import BuiltByDevelopers from "./components/BuiltByDevelopers";
import MiniStatistics from "./components/MiniStatistics";
import OrdersOverview from "./components/OrdersOverview";
import Projects from "./components/Projects";
import SalesOverview from "./components/SalesOverview";
import WorkWithTheRockets from "./components/WorkWithTheRockets";

export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
        <MiniStatistics
          title={"Current Life Score"}
          amount={"80%"}
          percentage={15}
          icon={<DBFirstIcon h={"40px"} w={"40px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"T3 Months Score"}
          amount={"65%"}
          percentage={12}
          icon={<DBSecondIcon h={"40px"} w={"40px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Memorable Events (12M)"}
          amount={"+7"}
          percentage={-2}
          icon={<DBThirdIcon h={"40px"} w={"40px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Future Events"}
          amount={"+2"}
          percentage={5}
          icon={<DBFourthIcon h={"40px"} w={"40px"} color={iconBoxInside} />}
        />
      </SimpleGrid>
      <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my='26px'
        gap='24px'>
                  <SalesOverview
          title={"My Life Graph"}
          percentage={5}
          chart={ <GraphComponent jsonData={jsonData}/>}
        />
        <EventForm/>
        {/* <BuiltByDevelopers
          title={"Add"}
          name={"Purity UI Dashboard"}
          description={
            "From colors, cards, typography to complex elements, you will find the full documentation."
          }
        /> */}


      </Grid>

    </Flex>
  );
}
