import { getLast14DaysRevenue } from "@/app/_data-access/dashboard/get-last-14-days-revenue";
import RevenueChart from "./revenue-chart";

const Last14DaysRevenueCard = async () => {
    const totalLast14DaysRevenue = await getLast14DaysRevenue()
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
        <p className="text-lg font-semibold text-slate-900"> Revenue </p>
        <p className="text-sm text-slate-400">Last 14 days</p>
        <RevenueChart data={totalLast14DaysRevenue} />
    </div>
    )
}
export default Last14DaysRevenueCard;