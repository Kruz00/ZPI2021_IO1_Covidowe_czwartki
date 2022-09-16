export function vecChange(data: any[]) {
  if (data.length <= 1) return [];
  const vec = [];
  for (let i = 1; i < data.length; ++i) {
    vec.push(data[i] - data[i - 1]);
  }
  return vec;
}