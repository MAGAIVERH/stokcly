
import Header, { HeaderLeft, HeaderSubtitle, HeaderTitle } from "../_components/header";
import { getDashboard } from "../_data-access/dashboard/get-dashboard";
import MostSoldProductItem from "./_components/most-sold-product-item";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Suspense } from "react";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalStockCard from "./_components/total-stock-card";
import TotalProductsCard from "./_components/total-products-card";
import { SummaryCardSkeleton } from "./_components/summary-card";
import Last14DaysRevenueCard from "./_components/last-14-days-revenue-card";
import { Skeleton } from "../_components/ui/skeleton";

const  Home = async () => {
  const { 
    mostSoldProducts} = 
  await getDashboard();
  return (
    <div className="w-full space-y-8 m-8 rounded-lg flex flex-col ">
        <Header>
          <HeaderLeft> 
            <HeaderSubtitle>Data Overview</HeaderSubtitle>
            <HeaderTitle>Dashboard</HeaderTitle>
          </HeaderLeft>
        </Header>

        <div className="grid grid-cols-2 gap-6">

            <Suspense 
              fallback={<SummaryCardSkeleton/>} >
            <TotalRevenueCard /> 
            </Suspense>

            <Suspense fallback={<SummaryCardSkeleton/>}>
              <TodayRevenueCard />
            </Suspense>

        </div>

        <div className="grid grid-cols-3 gap-6">

            <Suspense fallback={<SummaryCardSkeleton/>}>
              <TotalSalesCard />
            </Suspense>

            <Suspense fallback={<SummaryCardSkeleton/>}>
              <TotalStockCard />
            </Suspense>

            <Suspense fallback={<SummaryCardSkeleton/>}>
              <TotalProductsCard />
            </Suspense>
        </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
         <Suspense fallback={
          <Skeleton className="bg-white p-6"> 
            <div className="space-y-2">
              <div className="h-5 w-[86.26px] rounded-md bg-gray-200"/>
              <div className="h-5 w-48 rounded-md bg-gray-200"/>
            </div>
         </Skeleton>
         }> 
            <Last14DaysRevenueCard />
         </Suspense>

          <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
              <p className="text-lg font-semibold text-slate-900 p-6"> Best Selling Products </p>

              <div className="overflow-y-auto space-y-7 pb-6 px-6">
                {mostSoldProducts.map((product) => (
                  <MostSoldProductItem key={product.productId} product={product}/>
                ))}
              </div>
          </div>
      </div>
    </div>
  );
  
}
export default Home;
