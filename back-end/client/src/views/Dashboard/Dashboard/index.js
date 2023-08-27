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


// ### Test json Data ###
const jsonData = [
  { x: "1", y: 13, pic: "test_usc.png", name: "name" },
  { x: "2", y: 44, pic: "image_url_2", name: "name" },
  { x: "3", y: 27, pic: "image_url_3", name: "name" },
  { x: "4", y: 71, pic: "image_url_4", name: "name" },
  { x: "5", y: -87, pic: "image_url_5", name: "name" },
  { x: "6", y: -50, pic: "image_url_6", name: "name" },
  { x: "7", y: 27, pic: "image_url_7", name: "name" },
  { x: "8", y: 68, pic: "image_url_8", name: "name" },
  { x: "9", y: -13, pic: "image_url_9", name: "name" },
  { x: "10", y: 54, pic: "image_url_10", name: "name" },
  { x: "11", y: 57, pic: "image_url_11", name: "name" },
  { x: "12", y: 42, pic: "image_url_12", name: "name" }
];
// ########################

// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
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
          title={"Today's Moneys"}
          amount={"$53,000"}
          percentage={55}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Today's Users"}
          amount={"2,300"}
          percentage={5}
          icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"New Clients"}
          amount={"+3,020"}
          percentage={-14}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Total Sales"}
          amount={"$173,000"}
          percentage={8}
          icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
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
        {/* <EventForm/> */}
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
