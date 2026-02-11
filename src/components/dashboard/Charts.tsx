import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const barData = [
  { month: "E", count: 0 },
  { month: "S", count: 0 },
  { month: "E2", count: 0 },
  { month: "S2", count: 0 },
  { month: "E3", count: 0 },
  { month: "S3", count: 0 },
  { month: "E4", count: 0 },
  { month: "S4", count: 0 },
  { month: "E5", count: 0 },
  { month: "S5", count: 0 },
  { month: "E6", count: 0 },
  { month: "S6", count: 0 },
];

const lineData = [
  { month: "Apr", income: 0, expense: 0 },
  { month: "May", income: 0, expense: 0 },
  { month: "Jun", income: 0, expense: 0 },
  { month: "Jul", income: 0, expense: 0 },
  { month: "Aug", income: 0, expense: 0 },
  { month: "Sep", income: 0, expense: 0 },
  { month: "Oct", income: 0, expense: 0 },
  { month: "Nov", income: 0, expense: 0 },
  { month: "Dec", income: 0, expense: 0 },
  { month: "Jan", income: 0, expense: 0 },
  { month: "Feb", income: 0, expense: 0 },
  { month: "Mar", income: 0, expense: 0 },
];

const MonthlyBillyChart = () => (
  <div className="bg-card rounded-lg p-5 border border-border animate-fade-in">
    <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Bilty Created</h3>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={barData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 18% 18%)" />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} />
        <YAxis tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(222 22% 14%)",
            border: "1px solid hsl(222 18% 18%)",
            borderRadius: "8px",
            color: "hsl(210 20% 90%)",
          }}
        />
        <Bar dataKey="count" fill="hsl(142 60% 45%)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
    <p className="text-xs text-muted-foreground text-center mt-2">Months</p>
  </div>
);

const IncomeExpenseChart = () => (
  <div className="bg-card rounded-lg p-5 border border-border animate-fade-in">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-foreground">Income & Expenses</h3>
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-chart-income" />
          <span className="text-muted-foreground">Income</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-chart-expense" />
          <span className="text-muted-foreground">Expense</span>
        </div>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={lineData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 18% 18%)" />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} />
        <YAxis tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(222 22% 14%)",
            border: "1px solid hsl(222 18% 18%)",
            borderRadius: "8px",
            color: "hsl(210 20% 90%)",
          }}
        />
        <Line type="monotone" dataKey="income" stroke="hsl(142 60% 45%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(142 60% 45%)" }} />
        <Line type="monotone" dataKey="expense" stroke="hsl(0 72% 50%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(0 72% 50%)" }} />
      </LineChart>
    </ResponsiveContainer>
    <p className="text-xs text-muted-foreground text-center mt-2">Months</p>
  </div>
);

export { MonthlyBillyChart, IncomeExpenseChart };
