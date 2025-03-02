import { useState, useEffect } from "react";
import { getFinance } from "../Api/FinanceApi/FinanceApi";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Button } from "../Components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../Components/ui/popover";
import { Calendar } from "../Components/ui/calendar";
import { CalendarIcon } from "lucide-react";

Chart.register(...registerables);

const Finance = () => {
    const [financeData, setFinanceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState("daily");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        fetchFinance()
    }, []);

    const fetchFinance = async () => {
        try {
            setLoading(true);
            const formattedStartDate = startDate ? startDate.toISOString().split("T")[0] : null;
            const formattedEndDate = endDate ? endDate.toISOString().split("T")[0] : null;

            const response = await getFinance(formattedStartDate, formattedEndDate);
            console.log(response);
            setFinanceData(formatFinanceData(response.data.data));
        } catch (error) {
            console.error("Error occurred", error);
            setError("Failed to load financial data.");
        } finally {
            setLoading(false);
        }
    };

    const handleClick = async () => {
        await fetchFinance();
    };

    if (loading) return <p className="text-gray-500 text-center">Loading financial data...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Gross Profit Section (Visible only when showDetails is false) */}
            {!showDetails && (
                <Card
                    className="p-2 border border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100"
                    onClick={() => setShowDetails(true)}
                >
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-gray-700 text-base font-semibold">
                            Gross Profit
                        </CardTitle>
                        <p className="text-gray-900 text-base font-medium">
                            Tk. {financeData?.total?.totalGrossProfit || 0}
                        </p>
                    </div>
                </Card>
            )}

            {/* Expanded Details (Visible only when showDetails is true) */}
            {showDetails && (
                <div className="space-y-4">
                    {/* Date Range Picker with Search Button (Top Right) */}
                    <div className="flex justify-end space-x-2 mb-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="text-sm py-1 h-8">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? startDate.toLocaleDateString("en-GB") : "Pick a Date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto bg-white">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    disabled={(date) => endDate && date > endDate}
                                />
                            </PopoverContent>
                        </Popover>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="text-sm py-1 h-8">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? endDate.toLocaleDateString("en-GB") : "Pick a Date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto bg-white">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    disabled={(date) => startDate && date < startDate}
                                />
                            </PopoverContent>
                        </Popover>

                        <Button
                            variant="default"
                            className="bg-cyan-600 text-white hover:bg-cyan-700 text-sm py-1 h-8"
                            onClick={handleClick}
                        >
                            Search
                        </Button>
                    </div>

                    {/* Additional Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        <StatCard title="Total Sales" value={financeData?.total?.totalSales} />
                        <StatCard title="Total COGS" value={financeData?.total?.totalCOGS} />
                        <StatCard title="Total Logistics" value={financeData?.total?.totalLogistics} />
                    </div>

                    {/* Tab Controls */}
                    <div className="flex justify-center space-x-2">
                        <Button
                            variant={selectedTab === "daily" ? "default" : "outline"}
                            className="text-sm py-1 h-8"
                            onClick={() => setSelectedTab("daily")}
                        >
                            Daily
                        </Button>
                        <Button
                            variant={selectedTab === "weekly" ? "default" : "outline"}
                            className="text-sm py-1 h-8"
                            onClick={() => setSelectedTab("weekly")}
                        >
                            Weekly
                        </Button>
                        <Button
                            variant={selectedTab === "monthly" ? "default" : "outline"}
                            className="text-sm py-1 h-8"
                            onClick={() => setSelectedTab("monthly")}
                        >
                            Monthly
                        </Button>
                    </div>

                    {/* Charts */}
                    {selectedTab === "daily" && <ChartSection title="Daily Financial Data" data={financeData?.dateWise} />}
                    {selectedTab === "weekly" && (
                        <ChartSection title="Weekly Financial Data" data={financeData?.weekWise} />
                    )}
                    {selectedTab === "monthly" && (
                        <ChartSection title="Monthly Financial Data" data={financeData?.monthWise} />
                    )}

                    {/* Close Button */}
                    <div className="flex justify-center">
                        <Button
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-100 text-sm py-1 h-8"
                            onClick={() => setShowDetails(false)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

const formatFinanceData = (data) => {
    return {
        ...data,
        dateWise: formatDateKeys(data.dateWise),
        weekWise: formatWeekKeys(data.weekWise),
        monthWise: formatMonthKeys(data.monthWise),
    };
};

const formatDateKeys = (data) => {
    if (!data) return {};
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [new Date(key).toLocaleDateString("en-GB"), value])
    );
};

const formatWeekKeys = (data) => {
    if (!data) return {};
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
            const [year, week] = key.match(/\d{4}|\d{1,2}$/g); // Extract year and week
            
            // Get the first day (Monday) of the given year-week
            const firstDayOfYear = new Date(year, 0, 1);
            const daysOffset = (week - 1) * 7; 
            const firstDayOfWeek = new Date(firstDayOfYear.getTime() + daysOffset * 24 * 60 * 60 * 1000);

            // Adjust to Monday
            const dayOfWeek = firstDayOfWeek.getDay();
            const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // If Sunday, move back 6 days
            firstDayOfWeek.setDate(firstDayOfWeek.getDate() + mondayOffset);

            // Get Sunday of the same week
            const lastDayOfWeek = new Date(firstDayOfWeek);
            lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

            // Format as YYYY-MM-DD
            const startDate = firstDayOfWeek.toISOString().split("T")[0];
            const endDate = lastDayOfWeek.toISOString().split("T")[0];

            return [`${startDate} to ${endDate}`, value]; // "YYYY-MM-DD to YYYY-MM-DD"
        })
    );
};



const formatMonthKeys = (data) => {
    if (!data) return {};
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
            const date = new Date(key);
            const month = date.toLocaleString("en-US", { month: "long" });
            const year = date.getFullYear();
            return [`${month} ${year}`, value];
        })
    );
};

const StatCard = ({ title, value, highlight }) => {
    return (
        <Card className={`p-2 ${highlight ? "border-2 border-cyan-600" : ""}`}>
            <CardHeader className="p-1">
                <CardTitle className={`text-sm ${highlight ? "text-cyan-600" : ""}`}>{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-1">
                <p className={`text-base font-bold ${highlight ? "text-cyan-600" : ""}`}>Tk. {value || 0}</p>
            </CardContent>
        </Card>
    );
};

const ChartSection = ({ title, data }) => {
    if (!data || Object.keys(data).length === 0) return null;

    const labels = Object.keys(data);
    const salesData = Object.values(data).map((item) => item.totalSales || 0);
    const cogsData = Object.values(data).map((item) => item.totalCOGS || 0);
    const logisticsData = Object.values(data).map((item) => item.totalLogistics || 0);
    const profitData = Object.values(data).map((item) => item.grossProfit || 0);

    const chartData = {
        labels,
        datasets: [
            { label: "Sales", data: salesData, backgroundColor: "rgba(75, 192, 192, 0.6)" },
            { label: "COGS", data: cogsData, backgroundColor: "rgba(255, 99, 132, 0.6)" },
            { label: "Logistics", data: logisticsData, backgroundColor: "rgba(54, 162, 235, 0.6)" },
            { label: "Profit", data: profitData, backgroundColor: "rgba(255, 206, 86, 0.6)" },
        ],
    };

    return (
        <Card className="p-2">
            <CardHeader className="p-1">
                <CardTitle className="text-sm">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-1">
                <div className="h-64">
                    <Bar
                        data={chartData}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                y: { beginAtZero: true, ticks: { font: { size: 12 } } },
                                x: { ticks: { font: { size: 12 } } },
                            },
                            plugins: { legend: { labels: { font: { size: 12 } } } },
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default Finance;