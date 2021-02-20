import * as React from "react";
import { render } from "react-dom";
import { Chart } from "react-google-charts";

const GoToChart = () => {
  return (
    <div className='chart-container-primary'>
       <div className='chart-container'>
       <Chart
        width={'500px'}
        height={'300px'}
        chartType="BubbleChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['ID', 'X', 'Y', 'Song Score'],
          ['', 80, 167, 120],
          ['', 79, 136, 130],
          ['', 78, 184, 50],
          ['', 72, 278, 230],
          ['', 81, 200, 210],
          ['', 72, 170, 100],
          ['', 68, 477, 80],
        ]}
        options={{
          colorAxis: { colors: ['yellow', 'red'] },
        }}
        rootProps={{ 'data-testid': '2' }}
      />
      </div>
    </div>
  )
}

export default GoToChart
