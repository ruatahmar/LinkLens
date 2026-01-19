import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatClicksByDate } from "../utils/analyticsFormatter";



export default function ClicksChart({analytics}) {
  const data = formatClicksByDate(analytics)
  return (
    <div className="bg-white border rounded-xl p-6 h-80">
      <h2 className="text-xl font-semibold mb-4">
        Clicks over time
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#698796"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
