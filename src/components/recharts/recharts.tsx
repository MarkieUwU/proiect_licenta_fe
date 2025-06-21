import { ComponentType } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'

// Type-safe wrapper components for Recharts
export const TypedPieChart = PieChart as unknown as ComponentType<any>
export const TypedPie = Pie as unknown as ComponentType<any>
export const TypedCell = Cell as unknown as ComponentType<any>
export const TypedResponsiveContainer = ResponsiveContainer as unknown as ComponentType<any>
export const TypedTooltip = Tooltip as unknown as ComponentType<any>
export const TypedBarChart = BarChart as unknown as ComponentType<any>
export const TypedBar = Bar as unknown as ComponentType<any>
export const TypedXAxis = XAxis as unknown as ComponentType<any>
export const TypedYAxis = YAxis as unknown as ComponentType<any>
export const TypedCartesianGrid = CartesianGrid as unknown as ComponentType<any>
export const TypedLegend = Legend as unknown as ComponentType<any>
export const TypedLineChart = LineChart as unknown as ComponentType<any>
export const TypedLine = Line as unknown as ComponentType<any>
export const TypedAreaChart = AreaChart as unknown as ComponentType<any>
export const TypedArea = Area as unknown as ComponentType<any>
export const TypedRadarChart = RadarChart as unknown as ComponentType<any>
export const TypedRadar = Radar as unknown as ComponentType<any>
export const TypedPolarGrid = PolarGrid as unknown as ComponentType<any>
export const TypedPolarAngleAxis = PolarAngleAxis as unknown as ComponentType<any>
export const TypedPolarRadiusAxis = PolarRadiusAxis as unknown as ComponentType<any>

// Re-export types from recharts
export type { PieLabelRenderProps } from 'recharts' 