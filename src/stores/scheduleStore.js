import { create } from "zustand";

const useSceduleStore = create((set) => ({
  pageParam: 1,
  mainParam: {
    mode: "v3",
    page: 1,
    sort: "priceAsc",
    trip: "RT",
    dep0: "ICN",
    dep1: "KIX",
    arr0: "KIX",
    arr1: "ICN",
    depdate0: 20240817,
    depdate1: 20240820,
    comp: "Y",
    adt: 1,
    chd: 0,
    inf: 0,
    isBfm: "Y",
    GscCode: "OMEGA",
  },
  updatePageParam: () => {
    set((prev) => ({
      pageParam: prev.pageParam + 1,
      mainParam: {
        ...prev.mainParam,
        page: prev.mainParam.page + 1,
      },
    }));
  },
  updateSearchParam: (current) => {
    set((prev) => ({
      pageParam: 1,
      mainParam: {
        ...prev.mainParam,
        dep0: current.dep0,
        arr0: current.arr0,
        dep1: current.arr0,
        arr1: current.dep0,
        depdate0: current.depdate0,
        depdate1: current.depdate1,
        page: prev.mainParam.page + 1,
      },
    }));
  },
}));

export default useSceduleStore;
