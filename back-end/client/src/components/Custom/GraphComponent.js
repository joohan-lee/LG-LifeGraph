import React from 'react';
import styled from 'styled-components';
import { VictoryChart, VictoryScatter, VictoryAxis, VictoryTooltip, VictoryLine } from 'victory';
import { useAsync } from 'react-async-hook';

const StyledPoint = styled.circle`
  fill: ${(props) => props.color};
`;

const colors = ["#A8E6CE", "#DCEDC2", "#FFD3B5", "#FFAAA6", "#FF8C94"];


function MyComponent({ jsonData }) {
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
          {imageUrlAsync.currentParams && (
            <img src={imageUrlAsync.currentParams} alt="tooltip" width="50" height="50" />
          )}
          {!imageUrlAsync.currentParams && <div>Image not available</div>}
        </div>
      );
    }
  
    return null; // Don't render anything if image is not available
  };

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
        labels={({ data }) => `${data.pic}`}
        labelComponent={
          <VictoryTooltip
            flyoutComponent={<CustomTooltip />}
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
