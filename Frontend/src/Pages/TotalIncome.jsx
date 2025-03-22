import CompanyCredentials from '../Components/Common/ComapnyCredentials';
import React, { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Button } from '../Components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "../Components/ui/popover";
import { Calendar } from "../Components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from '../lib/utils';
import { getFinance } from '../Api/FinanceApi/FinanceApi';

const TotalIncome = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [financeData, setFinanceData] = useState(null);

    useEffect(() => {
        fetchFinance();
    }, []);

    const contentRef = useRef();

    const handleDownloadPDF = () => {
        const element = contentRef.current;
        html2pdf()
            .from(element)
            .set({
                margin: 0.5,
                filename: 'income_statement.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            })
            .save();
    };

    const fetchFinance = async () => {
        try {
            const formattedStartDate = startDate ? startDate.toISOString().split("T")[0] : null;
            const formattedEndDate = endDate ? endDate.toISOString().split("T")[0] : null;

            const response = await getFinance(formattedStartDate, formattedEndDate);
            
            setFinanceData(response.data.data.total);
        } catch (error) {
            console.error("Error occurred", error);
        }
    };

    const handleClick = () => {
        fetchFinance();
    };

    const handleDateChange = (field) => (date) => {
        if (field === "startDate") setStartDate(date);
        if (field === "endDate") setEndDate(date);
    };

    return (
        <div className="max-w-[1300px] w-full mx-auto h-screen p-6 bg-white">
            <div ref={contentRef}>
                <CompanyCredentials />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-black text-center flex-1 text-dark-gray">Income Statement</h1>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    
                    <div className="flex space-x-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-[200px] justify-start text-left font-normal",
                                        !startDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? format(startDate, "yyyy-MM-dd") : <span>Pick start date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    className="bg-white"
                                    mode="single"
                                    selected={startDate}
                                    onSelect={handleDateChange("startDate")}
                                    disabled={(date) => endDate && date > endDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-[200px] justify-start text-left font-normal",
                                        !endDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? format(endDate, "yyyy-MM-dd") : <span>Pick end date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    className="bg-white"
                                    mode="single"
                                    selected={endDate}
                                    onSelect={handleDateChange("endDate")}
                                    disabled={(date) => startDate && date < startDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                        <Button variant="default" onClick={handleClick}>Search</Button>
                    </div>

                    <table className="w-full text-left border-collapse">
                        <tbody>
                            <tr className="py-2">
                                <td className="text-lg">Total Sales</td>
                                <td className="text-lg">Tk.{financeData?.totalSales || "0.00"}</td>
                            </tr>
                            <tr className="py-2">
                                <td className="text-lg">Total Costs of Goods Sold</td>
                                <td className="text-lg">Tk.{financeData?.totalCOGS || "0.00"}</td>
                            </tr>
                          
                            <tr className="border-b border-gray-300">
                                <td className="text-lg pb-6">Total Logistics</td>
                                <td className="text-lg pb-6">Tk.{financeData?.totalLogistics || "0.00"}</td>
                            </tr>
                            <tr >
                                <td><strong className="text-xl text-dark-gray">Gross Profit</strong></td>
                                <td><strong className="text-xl">Tk.{financeData?.totalGrossProfit || "0.00"}</strong></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <Button onClick={handleDownloadPDF} variant='default'>
                    Download PDF
                </Button>
            </div>
        </div>
    );
};

export default TotalIncome;
