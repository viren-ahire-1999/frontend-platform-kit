export interface LineChartProps {
  data: number[];
  height?: number;
}

export function LineChart({ data, height = 220 }: LineChartProps) {
  const width = 800;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const span = max - min || 1;
  const stepX = data.length > 1 ? width / (data.length - 1) : width;

  const toPoint = (value: number, i: number) => {
    const x = i * stepX;
    const y = height - ((value - min) / span) * height;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };

  const line = data.map(toPoint).join(" ");
  const area = `0,${height} ${line} ${width},${height}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      role="img"
      aria-label="Sessions over time"
    >
      <polygon points={area} fill="var(--fpk-color-info-bg)" opacity={0.6} />
      <polyline
        points={line}
        fill="none"
        stroke="var(--fpk-color-primary)"
        strokeWidth={3}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
