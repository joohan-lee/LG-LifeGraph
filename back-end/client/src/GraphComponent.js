import React from 'react';
import styled from 'styled-components';
import { VictoryChart, VictoryScatter, VictoryAxis, VictoryTooltip, VictoryLine } from 'victory';
import { useAsync } from 'react-async-hook';

const StyledPoint = styled.circle`
  fill: ${(props) => props.color};
`;

// ### Test json Data ###
const testData = [
  { x: "1", y: 13, pic: "http://localhost:3000/img/img1.png", name: "soccer" },
  { x: "2", y: 44, pic: "http://localhost:3000/img/img2.png", name: "trip2" },
  { x: "3", y: 27, pic: "http://localhost:3000/img/img3.png", name: "trip3" },
  { x: "4", y: 93, pic: "http://localhost:3000/img/img4.png", name: "trip4" },
  { x: "5", y: -87, pic: "http://localhost:3000/img/img5.png", name: "trip5" },
  { x: "6", y: -50, pic: "http://localhost:3000/img/img6.png", name: "trip6" },
  { x: "7", y: 27, pic: "http://localhost:3000/img/img7.png", name: "trip7" },
  { x: "8", y: 68, pic: "http://localhost:3000/img/img8.png", name: "trip8" },
  { x: "9", y: -13, pic: "http://localhost:3000/img/img9.png", name: "trip9" },
  { x: "10", y: 54, pic: "http://localhost:3000/img/img10.png", name: "trip10" },
  { x: "11", y: 57, pic: "http://localhost:3000/img/img11.png", name: "marriage" },
  { x: "12", y: 42, pic: "http://localhost:3000/img/img12.png", name: "retirement" },
];

const colors = ["#FF8C94", "#FFAAA6", "#FFD3B5", "#DCEDC2", "#A8E6CE", ];

function MyComponent({ }) {
  const [jsonData, setJsonData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Fetch data from your backend server
    fetch('http://localhost:3000/api/eventRead')
      .then((response) => response.json())
      .then((fetchedData) => {
        setJsonData(fetchedData);
        setLoading(false);
        console.log('fetchedData: ', fetchedData);
        console.log('jsonData: ', jsonData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const temperatures = jsonData.map(({ y }) => y);
  const min = Math.min(...temperatures);
  const max = Math.max(...temperatures);

  const data = jsonData.map((entry) => ({
    ...entry,
    showTooltip: entry.y === max || entry.y === min,
    colorIndex: Math.floor(((entry.y - min) / (max - min)) * (colors.length - 1))
  }));

  const getImage = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  const CustomTooltip = ({ datum }) => {
    console.log('datum', datum);
    const imageUrlAsync = useAsync(getImage, [datum.pic]);
    
    if (imageUrlAsync.isLoading) {
      console.log("loading");
      return <div>Loading...</div>;
    }
  
    if (!imageUrlAsync.result && !imageUrlAsync.loading) {
      console.log("Image not found");
      return null;
    }
  
    // Only render the tooltip if the image is available
    if (imageUrlAsync.currentParams) {
      console.log("url", imageUrlAsync.currentParams);
      return (
        <div>
          {/* {imageUrlAsync.currentParams && (
            // <img src={imageUrlAsync.currentParams} alt="tooltip" width="50" height="50" />
            <img src={datum.pic} alt="tooltip" width="50" height="50" />
          )}
          {!imageUrlAsync.currentParams && <div>Image not available</div>} */}
          {'hi'}
        </div>
      );
    }
  
    return null; // Don't render anything if image is not available
  };

  class CustomFlyout extends React.Component {
    render() {
      const {x, y, orientation, datum} = this.props;
      const newY = orientation === "bottom" ? y - 35 : y + 35;
      
      return (
        <g>
          {/* <circle cx={x} cy={newY} r="20" stroke="tomato" fill="none"/>
          <circle cx={x} cy={newY} r="25" stroke="orange" fill="none"/>
          <circle cx={x} cy={newY} r="30" stroke="gold" fill="none"/> */}
          <text x={x} y={newY + 45} textAnchor="middle" fontSize="14" fill="#4FD1C5">
            {datum.name}
          </text>
          <image x={x - 50} y={newY - 50} width="100" height="100" alt={datum.pic} xlinkHref={datum.pic} loading="lazy"/>
        </g>
      );
    }
  }

  const ScatterPoint = ({ x, y, datum }) => {
    const colorIndex = datum.colorIndex;
    const color = colors[colorIndex];
    return <StyledPoint color={color} cx={x} cy={y} r={6} />;
  };

  const getFillColor = ({ datum }) => {
    const colorIndex = datum.colorIndex;
    return colors[colorIndex];
  };

  return (
    <VictoryChart>
      <VictoryAxis
        dependentAxis
        tickValues={[-100, -50, 0, 50, 100]}
        domain={[100, -100]}
      />
      <VictoryScatter
        data={data}
        // labels={({ datum }) => `${datum.pic}`}
        labels={({ datum }) => ``}
        labelComponent={
          <VictoryTooltip
            flyoutComponent={<CustomFlyout />}
            style={{ labels: { fill: 'white' } }}
          />
        }
        
        style={{
            data: {fill: getFillColor}
            }
        }
      />
      <VictoryLine // Line connecting apexes
        data={data}
        x="x"
        y="y"
        style={{ data: { stroke: 'black', strokeWidth: 0.3 } }}
        interpolation="monotoneX"
      />
    </VictoryChart>
  );
}

export default MyComponent;
