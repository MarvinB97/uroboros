import React from 'react'
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';

const dataBar = [
  { country: 'Enero', value: 130 },
  { country: 'Febrero', value: 165 },
  { country: 'Marzo', value: 142 },
  { country: 'Abril', value: 190 },
  { country: 'Mayo', value: 120 },
];

const dataPie = [
  { id: 'Enero', label: 'Enero', value: 130 },
  { id: 'Febrero', label: 'Febrero', value: 165 },
  { id: 'Marzo', label: 'Marzo', value: 142 },
  { id: 'Abril', label: 'Abril', value: 190 },
  { id: 'Mayo', label: 'Mayo', value: 120 },
];

const dataLine = [
  {
    id: 'Ventas',
    data: [
      { x: 'Enero', y: 130 },
      { x: 'Febrero', y: 165 },
      { x: 'Marzo', y: 142 },
      { x: 'Abril', y: 190 },
      { x: 'Mayo', y: 120 },
    ],
  },
];

const Graficos = () => {
    return (
        <div style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
            <h1 style={{ color: '#3f51b5', textAlign: 'center' }}>GRÁFICOS DE LA OBRA</h1>
            <div style={{ backgroundColor: '#fff', padding: '20px', margin: '10px 0', borderRadius: '5px' }}>
                <p style={{ color: '#3f51b5' }}><b>Gráfico #1:</b> Obra #1</p>
                <div style={{ width: '450px', height: '230px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <ResponsiveBar
      data={dataBar}
      keys={['value']}
      indexBy='country'
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: 'nivo' }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Meses',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Avance de Obra',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
                </div>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #ddd' }}/>
            <div style={{ backgroundColor: '#fff', padding: '20px', margin: '10px 0', borderRadius: '5px' }}>
                <p style={{ color: '#3f51b5' }}><b>Gráfico #2:</b> Obra #2</p>
                <div style={{ width: '450px', height: '225px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <ResponsivePie
      data={dataPie}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: 'nivo' }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextColor="#333333"
      radialLabelsLinkColor={{ from: 'color' }}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />

                </div>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #ddd' }}/>
            <div style={{ backgroundColor: '#fff', padding: '20px', margin: '10px 0', borderRadius: '5px' }}>
                <p style={{ color: '#3f51b5' }}><b>Gráfico #3:</b> Obra #3</p>
                <div style={{ width: '450px', height: '250px', border: '1px solid #ddd', borderRadius: '5px' }}>
                    <div style={{ width: '100%', height: '100%', padding: '10px 0' }}>
                    <ResponsiveLine
      data={dataLine}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Meses',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Avance de Obras',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      colors={{ scheme: 'nivo' }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
                    </div>
                </div>
            </div>
        </div>
    );
}




export default Graficos