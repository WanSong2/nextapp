import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import FareListDetail from "./FareListDetail";
import useSceduleStore from "../stores/scheduleStore";
import Loading from "./Loading";
import SearchForm from "./SearchForm";

export default function FareList() {
  const pageParam = useSceduleStore((state) => state.pageParam);
  const mainParam = useSceduleStore((state) => state.mainParam);
  const updatePageParam = useSceduleStore((state) => state.updatePageParam);
  const updateSearchParam = useSceduleStore((state) => state.updateSearchParam);
  const { data, error, status, fetchNextPage, isFetchingNextPage, refetch, isFetching } =
    useInfiniteQuery({
      queryKey: ["items"],
      queryFn: ({ pageParam }) => {
        return new Promise(async (resolve) => {
          try {
            console.log(mainParam);
            const fareData = await getFareData(mainParam);
            resolve({
              data: fareData,
              currentPage: pageParam,
              nextPage:
                pageParam + 1 < fareData.TOTALPAGE ? pageParam + 1 : null,
            });
          } catch (error) {
            resolve({
              data: {},
              currentPage: 0,
              nextPage: 0,
            });
          }
        });
      },
      initialPageParam: pageParam,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
      updatePageParam();
    }
  }, [fetchNextPage, inView]);

  const queryClient = useQueryClient();
  const { mutate, isSuccess, isIdle, isPending } = useMutation({
    mutationFn: async (searchParam) => {
      return await getFareData(
        {
          ...mainParam,
          dep0: searchParam.dep0,
          arr0: searchParam.arr0,
          dep1: searchParam.arr0,
          arr1: searchParam.dep0,
          depdate0: searchParam.depdate0,
          depdate1: searchParam.depdate1,
          page: 1
        }
      );
    },
    onSuccess: (newPost) => {
      console.log("newPost", newPost);
      queryClient.setQueryData(['items'], (oldData) => ({
        pages: [{
          data: newPost,
          currentPage: pageParam,
          nextPage: 1 + 1 < newPost.TOTALPAGE ? 1 + 1 : null
        }],
        pageParams: [1],
      }))

    },
  })

  const onRefresh = async (...params) => {
    updateSearchParam(...params);
    mutate(...params);
  }

  return (
    <div>
      <SearchForm onRefresh={onRefresh} />
      {status === "pending" ? (
        <div>
          <Loading />
        </div>
      ) : isPending ? (
        <Loading />
      ) : status === "error" ? (
        <div>{error.message}</div>
      ) : (
        <div className="flex flex-col gap-2">
          {data?.pages.map((page) => {
            return (
              <ul
                key={page.currentPage}
                role="list"
                className="divide-y divide-gray-100"
              >
                {page.data.FARES?.map((fare, index) => {
                  return <FareListDetail key={index} fare={fare} />;
                })}
              </ul>
            );
          })}
          <div ref={ref}>{isFetchingNextPage && <Loading />}</div>
        </div>
      )}
    </div>
  );
}

const getFareData = async (mainParam) => {
  try {
    const {
      page,
      trip,
      dep0,
      dep1,
      arr0,
      arr1,
      depdate0,
      depdate1,
      comp,
      adt,
      chd,
      inf,
    } = mainParam;

    const response = await fetch(
      "https://local.etoursoft.co.kr:8081/booking/findSkdFareGroup.lts?viewType=xml",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `mode=v3
          &page=${page}
          &trip=${trip}
          &dep0=${dep0}
          &dep1=${dep1}
          &arr0=${arr0}
          &arr1=${arr1}
          &depdate0=${depdate0}
          &depdate1=${depdate1}
          &comp=${comp}
          &adt=${adt}
          &chd=${chd}
          &inf=${inf}
          &isBfm=Y
          &miniFares=N
          &CRuleType=A
          &GscCode=OMEGA`.replaceAll(/\s+/g, ""),
      }
    );
    return await response.json();
  } catch (error) {
    return {};
  }
};
