import React from 'react';
import styled from 'styled-components';
import { VictoryChart, VictoryScatter, VictoryAxis, VictoryTooltip, VictoryLine } from 'victory';
import { useAsync } from 'react-async-hook';

const StyledPoint = styled.circle`
  fill: ${(props) => props.color};
`;

const colors = ["#FF8C94", "#FFAAA6", "#FFD3B5", "#DCEDC2", "#A8E6CE", ];

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
      const imageUrl='data:image/jpeg;base64,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';
      
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
        // domain={[100, -100]}
      domain={{x: [0, 100],y: [100, -100]}}
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
        size={7}
  
        style={{
          data: { fill: getFillColor }
        }}
      />
      <VictoryLine // Line connecting apexes
        data={data}
        x="x"
        y="y"
        style={{ data: { stroke: 'black', strokeWidth: 0.3 } }}
        interpolation="monotoneX"
      />
      <VictoryLine // Horizontal line at y=0
        data={[{ x: Math.min(...data.map(point => point.x)), y: 0 }, { x: Math.max(...data.map(point => point.x)), y: 0 }]}
        x="x"
        y="y"
        style={{ data: { stroke: 'black', strokeWidth: 0.5 } }}
      />
    </VictoryChart>
  );
  
}

export default MyComponent;
