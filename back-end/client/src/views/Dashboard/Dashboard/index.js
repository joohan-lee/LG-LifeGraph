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
          chart={<LineChart />}
        />
        <BuiltByDevelopers
          title={"Add"}
          name={"Purity UI Dashboard"}
          description={
            "From colors, cards, typography to complex elements, you will find the full documentation."
          }
        />


      </Grid>

    </Flex>
  );
}
