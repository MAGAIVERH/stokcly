import { CircleDollarSign, DollarSign, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import Header, { HeaderLeft, HeaderSubtitle, HeaderTitle } from "../_components/header";
import { SummaryCard, SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./_components/summary-card";
import { getDashboard } from "../_data-access/dashboard/get-dashboard";
import { formatCurrency } from "../_helpers/currency";
import RevenueChart from "./_components/revenue-chart";
import MostSoldProductItem from "./_components/most-sold-product-item";

const  Home = async () => {
  const {totalRevenue, todayRevenue, totalSales, totalStock, totalProducts, totalLast14DaysRevenue, mostSoldProducts} = 
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
          <SummaryCard>
            <SummaryCardIcon>
                <DollarSign />
            </SummaryCardIcon>

            <SummaryCardTitle>
            Total Revenue
            </SummaryCardTitle>

            <SummaryCardValue>
              {formatCurrency(totalRevenue)}
            </SummaryCardValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryCardIcon>
                <DollarSign />
            </SummaryCardIcon>

            <SummaryCardTitle>
            Today Revenue
            </SummaryCardTitle>

            <SummaryCardValue>
              {formatCurrency(todayRevenue)}
            </SummaryCardValue>
          </SummaryCard>
        </div>

        <div className="grid grid-cols-3 gap-6">
        <SummaryCard>
            <SummaryCardIcon>
                <CircleDollarSign />
            </SummaryCardIcon>

            <SummaryCardTitle>
            Total Sales
            </SummaryCardTitle>

            <SummaryCardValue>
              {totalSales}
            </SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
            <SummaryCardIcon>
                <PackageIcon />
            </SummaryCardIcon>

            <SummaryCardTitle>
            Total In Stock
            </SummaryCardTitle>

            <SummaryCardValue>
              {totalStock}
            </SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
            <SummaryCardIcon>
                <ShoppingBasketIcon />
            </SummaryCardIcon>

            <SummaryCardTitle>
            Products
            </SummaryCardTitle>

            <SummaryCardValue>
              {totalProducts}
            </SummaryCardValue>
        </SummaryCard>
        </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
          <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
              <p className="text-lg font-semibold text-slate-900"> Revenue </p>
              <p className="text-sm text-slate-400">Last 14 days</p>
              <RevenueChart data={totalLast14DaysRevenue} />
          </div>

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
