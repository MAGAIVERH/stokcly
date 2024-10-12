import { CircleDollarSign, DollarSign, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import Header, { HeaderLeft, HeaderSubtitle, HeaderTitle } from "../_components/header";
import { SummaryCard, SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./_components/summary-card";
import { getDashboard } from "../_data-access/dashboard/get-dashboard";
import { formatCurrency } from "../_helpers/currency";

const  Home = async () => {
  const {totalRevenue, todayRevenue, totalSales, totalStock, totalProducts} = 
  await getDashboard();
  return (
    <div className="w-full space-y-8 m-8 rounded-lg ">
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
    </div>
  );
  
}
export default Home;
