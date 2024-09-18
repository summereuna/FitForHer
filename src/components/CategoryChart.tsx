import { Label, Pie, PieChart } from "recharts";
import { CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { DashboardItemsByBrandIdResponse } from "@/types/order.types";

interface CategoryChartProps {
  data: DashboardItemsByBrandIdResponse;
}

const chartConfig = {
  transactions: {
    label: "판매량",
  },
  tops: {
    label: "상의",
    color: "hsl(var(--chart-3))",
  },
  sportsBras: {
    label: "스포츠브라",
    color: "hsl(var(--chart-4))",
  },
  pants: {
    label: "하의",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const CategoryChart = ({ data }: CategoryChartProps) => {
  const categoryCount: Record<string, number> =
    data?.reduce<Record<string, number>>(
      (acc, item) => {
        const subCategories = item.products.sub_categories;
        const category = subCategories?.categories?.name;

        // 카테고리 이름을 변환하여 키를 맞추기
        const transformedCategory =
          category === "sports-bras" ? "sportsBras" : category;

        if (
          transformedCategory === "tops" ||
          transformedCategory === "sports-bras" ||
          transformedCategory === "pants"
        ) {
          acc[transformedCategory] = (acc[transformedCategory] || 0) + 1;
        }

        return acc;
      },
      {} // 초기값을 빈 객체로 설정
    ) || {}; // categoryCount가 undefined일 경우 빈 객체로 대체

  const chartData = [
    { category: "tops", transactions: 0, fill: "var(--color-tops)" },
    {
      category: "sportsBras",
      transactions: 0,
      fill: `var(--color-sportsBras)`,
    },
    { category: "pants", transactions: 0, fill: "var(--color-pants)" },
  ];

  // 2. chartData 배열을 업데이트
  const updatedChartData = chartData.map((data) => ({
    ...data,
    transactions: categoryCount[data.category] ?? 0,
  }));

  // console.log(updatedChartData);

  const totalTransaction = useMemo(() => {
    return updatedChartData.reduce((acc, curr) => acc + curr.transactions, 0);
  }, []);

  return (
    <CardContent className="flex-1 pb-0">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={updatedChartData}
            dataKey="transactions"
            nameKey="category"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalTransaction.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        총 판매량
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardContent>
  );
};

export default CategoryChart;
