export const siteMap = [
  {
    top: { label: "상의", value: "tops" },
    sub: [
      { label: "탑&티셔츠", value: "top-tshirts" },
      { label: "집업&자켓", value: "zipup-jackets" },
      { label: "스웻셔츠&후디", value: "sweats-hoodies" },
    ],
  },
  {
    top: { label: "스포츠 브라", value: "sports-bras" },
    sub: [
      { label: "저강도 운동", value: "light" },
      { label: "중강도 운동", value: "medium" },
      { label: "고강도 운동", value: "high" },
    ],
  },
  {
    top: { label: "하의", value: "pants" },
    sub: [
      { label: "쇼츠", value: "shorts" },
      { label: "레깅스", value: "leggings" },
      { label: "팬츠&조거", value: "pants-jogger" },
    ],
  },
  {
    top: { label: "신제품", value: "new" },
    sub: [],
  },
  {
    top: { label: "베스트", value: "best" },
    sub: [],
  },
  {
    top: { label: "브랜드", value: "brands" },
    sub: [],
  },
] as const;
